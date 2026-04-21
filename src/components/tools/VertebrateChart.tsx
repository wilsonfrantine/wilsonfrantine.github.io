import { useState, useMemo, useRef } from 'react'
import * as d3 from 'd3'
import TaxonControls from './TaxonControls'

export interface RankCounts {
  order: number; family: number; genus: number; species: number;
}

export interface Taxon {
  id: string; name: string; vernacular: string; rank: string;
  speciesCount: number; colId: string; gbifKey?: number;
  rankCounts?: RankCounts; phylopicUuid: string;
  // phylopicSize: base size in SVG units (default 48)
  // phylopicScale: multiplier applied on top of size (default 1.0)
  // phylopicRotate: rotation in degrees relative to the phylopic center
  phylopicSize?: number; phylopicScale?: number; phylopicRotate?: number;
  children: Taxon[];
}

export interface Group {
  id: string; name: string; vernacular: string; color: string; taxa: Taxon[];
}

export interface VertebrateData { fetchedAt: string; groups: Group[]; }

interface HoverInfo {
  name: string; vernacular: string; speciesCount: number;
  pct: string; color: string; rank?: string;
}

interface PhylopicItem {
  data: any
  naturalAngle: number
  distributedAngle: number
  size: number
  cx: number; cy: number
  x: number; y: number
  rotate: number
  leaderPath: string
  labelX: number; labelY: number; labelY2: number
  textAnchor: 'start' | 'end' | 'middle'
}

// ── Layout constants ───────────────────────────────────────────────────────────
const SIZE = 1000
const CX = SIZE / 2
const CY = SIZE / 2
const INNER_R = 90
const MID_R = 175
const SUB_R = 245
const OUTER_R = 300
const PHYLOPIC_R_L2 = 430      // level-2 icons: far out for visual separation
const PHYLOPIC_R_L3 = 390      // level-3 icons: closer to the outer ring
const LEADER_CURVE_R_BASE = 320
const LEADER_TRACK_STEP = -2   // radial gap between non-overlapping arc tracks
const DEFAULT_PHYLOPIC_SIZE = 100  // 48 * 1.15
const EXT_LABEL_MARGIN = 5
const FONT_INNER_LABEL = 13 // 10 * 1.1
const LABEL_CHAR_WIDTH = FONT_INNER_LABEL * 0.6

// ── Helpers ───────────────────────────────────────────────────────────────────
function splitLines(text: string): [string] | [string, string] {
  const words = text.split(' ')
  if (words.length <= 1) return [text]
  const mid = Math.ceil(words.length / 2)
  const line2 = words.slice(mid).join(' ')
  return line2 ? [words.slice(0, mid).join(' '), line2] : [text]
}

function safeRotateDeg(midAngle: number): number {
  const deg = midAngle * (180 / Math.PI)
  if (deg > 90 && deg < 270) return deg - 180
  if (deg >= 270) return deg - 360
  return deg
}

function polar(r: number, angle: number) {
  return { x: r * Math.sin(angle), y: -r * Math.cos(angle) }
}

// Spreads sorted angles so consecutive ones are at least minSep apart,
// then re-centres the distribution around the original centre of mass.
function enforceMinSep(sortedAngles: number[], minSep: number): number[] {
  const n = sortedAngles.length
  if (n <= 1) return [...sortedAngles]
  const out = [...sortedAngles]
  for (let i = 1; i < n; i++) out[i] = Math.max(out[i], out[i - 1] + minSep)
  const origCenter = sortedAngles.reduce((s, a) => s + a, 0) / n
  const newCenter  = out.reduce((s, a) => s + a, 0) / n
  const shift = origCenter - newCenter
  return out.map(a => a + shift)
}

function makeHover(
  name: string, vernacular: string, speciesCount: number,
  color: string, rank: string | undefined, totalSpecies: number
): HoverInfo {
  return {
    name, vernacular, speciesCount, color, rank,
    pct: totalSpecies > 0 ? (speciesCount / totalSpecies * 100).toFixed(1) : '0',
  }
}

export default function VertebrateChart({ data }: { data: VertebrateData }) {
  const [visibleGroups, setVisibleGroups] = useState<Set<string>>(() => new Set(data.groups.map(g => g.id)))
  const [scaleType, setScaleType] = useState<'log' | 'linear'>('linear')
  // rings: 1 = inner group band, 2 = main taxa, 3 = sub-taxa
  const [visibleRings, setVisibleRings] = useState<Set<number>>(new Set([1, 2]))
  // phylopicLevel: exclusive — 0 = off, 2 = show taxa silhouettes, 3 = show sub-taxa silhouettes
  const [phylopicLevel, setPhylopicLevel] = useState<0 | 2 | 3>(2)
  // distributionMode: smooth = evenly spaced (global), repel = clustered near group with repulsion
  const [distributionMode, setDistributionMode] = useState<'smooth' | 'repel'>('smooth')
  const [clickedInfo, setClickedInfo] = useState<HoverInfo | null>(null)
  const [clickedPos, setClickedPos] = useState<{ x: number; y: number } | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [containerWidth, setContainerWidth] = useState(820)
  const [exporting, setExporting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  async function exportSVG() {
    const svg = svgRef.current
    if (!svg || exporting) return
    setExporting(true)
    try {
      const clone = svg.cloneNode(true) as SVGSVGElement
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

      // Inline computed fill + font styles from live DOM so Tailwind classes resolve
      const origTexts = Array.from(svg.querySelectorAll('text'))
      const cloneTexts = Array.from(clone.querySelectorAll('text'))
      origTexts.forEach((el, i) => {
        const cs = window.getComputedStyle(el)
        const ci = cloneTexts[i]
        ci.style.fill = cs.fill
        ci.style.fontFamily = cs.fontFamily
        ci.style.fontWeight = cs.fontWeight
        ci.style.fontSize = cs.fontSize
      })

      // Fetch Google Fonts CSS and replace each font URL with base64 data URI
      let fontStyles = ''
      try {
        const FONT_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;700&display=swap'
        let css = await fetch(FONT_URL).then(r => r.text())
        const fontUrls = [...css.matchAll(/url\(([^)]+)\)/g)].map(m => m[1].replace(/['"]/g, ''))
        for (const fu of fontUrls) {
          const fontBlob = await fetch(fu).then(r => r.blob())
          const dataUri = await new Promise<string>((res, rej) => {
            const reader = new FileReader()
            reader.onload = () => res(reader.result as string)
            reader.onerror = rej
            reader.readAsDataURL(fontBlob)
          })
          css = css.replace(fu, dataUri)
        }
        fontStyles = css
      } catch { /* fonts not available — skip embedding */ }

      const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style')
      styleEl.textContent = fontStyles
      clone.insertBefore(styleEl, clone.firstChild)

      const str = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`
      const blob = new Blob([str], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'vertebrate-diversity.svg'; a.click()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(false)
    }
  }

  const ring3Visible = visibleRings.has(3)

  const filteredGroups = useMemo(
    () => data.groups.filter(g => visibleGroups.has(g.id)),
    [data.groups, visibleGroups]
  )

  const { groupNodes, level1Nodes, level2Nodes } = useMemo(() => {
    const processTaxon = (t: Taxon, color: string): any => ({
      ...t, groupColor: color, isGroup: false as const,
      children: t.children?.map(c => processTaxon(c, color))
    })

    const hierarchyData = {
      id: 'root',
      children: filteredGroups.map(g => ({
        id: g.id, name: g.name, vernacular: g.vernacular, color: g.color,
        isGroup: true as const, children: g.taxa.map(t => processTaxon(t, g.color)),
      })),
    }

    const root = d3.hierarchy<any>(hierarchyData).sum(d => {
      if (d.isGroup) return 0
      if (!d.children || d.children.length === 0) {
        return scaleType === 'log' ? Math.log10(Math.max(d.speciesCount, 1)) : d.speciesCount
      }
      return 0
    })

    root.eachAfter(node => {
      if (node.depth > 0 && !node.data.isGroup) {
        const childSum = node.children?.reduce((s, c) => s + (c.value || 0), 0) || 0
        const manual = scaleType === 'log'
          ? Math.log10(Math.max(node.data.speciesCount, 1))
          : node.data.speciesCount
        node.value = Math.max(manual, childSum, 0.0001)
      }
    })

    d3.partition<any>().size([2 * Math.PI, 1])(root)
    const nodes = root.descendants() as d3.HierarchyRectangularNode<any>[]
    return {
      groupNodes: nodes.filter(d => d.depth === 1),
      level1Nodes: nodes.filter(d => d.depth === 2),
      level2Nodes: nodes.filter(d => d.depth === 3),
    }
  }, [filteredGroups, scaleType])

  const groupArc = useMemo(() =>
    d3.arc<any>().innerRadius(INNER_R).outerRadius(MID_R - 2)
      .startAngle(d => d.x0).endAngle(d => d.x1).padAngle(0.002), [])

  const level1Arc = useMemo(() =>
    d3.arc<any>().innerRadius(MID_R).outerRadius(ring3Visible ? SUB_R - 1 : OUTER_R)
      .startAngle(d => d.x0).endAngle(d => d.x1).padAngle(0.002),
    [ring3Visible])

  const level2Arc = useMemo(() =>
    d3.arc<any>().innerRadius(SUB_R).outerRadius(OUTER_R)
      .startAngle(d => d.x0).endAngle(d => d.x1).padAngle(0.001), [])

  // Total species of all visible groups (used for percentage calculation)
  const totalSpecies = useMemo(() =>
    level1Nodes.reduce((sum, n) => sum + (n.data.speciesCount || 0), 0),
    [level1Nodes])

  // ── Phylopic placement with Z-connectors ─────────────────────────────────────
  // smooth: global even spacing (order-preserving → no straight-segment crossings)
  // repel:  natural positions + enforced minimum separation per parent group
  // Arc overlap is prevented via greedy interval coloring of Z-connector tracks.
  const processedPhylopics = useMemo((): PhylopicItem[] => {
    const candidates: d3.HierarchyRectangularNode<any>[] =
      phylopicLevel === 2 ? level1Nodes.filter(n => n.data.phylopicUuid) :
      phylopicLevel === 3 ? level2Nodes.filter(n => n.data.phylopicUuid) : []
    const n = candidates.length
    if (n === 0) return []

    const TWO_PI = 2 * Math.PI
    const phyloR = phylopicLevel === 3 ? PHYLOPIC_R_L3 : PHYLOPIC_R_L2

    candidates.sort((a, b) => (a.x0 + a.x1) / 2 - (b.x0 + b.x1) / 2)

    // ── Destination angles ──────────────────────────────────────────────────────
    let destAngles: number[]

    if (distributionMode === 'smooth') {
      destAngles = candidates.map((_, i) => (i + 0.5) * (TWO_PI / n))
    } else {
      // Repel: each icon starts at its natural midAngle, then siblings within the
      // same parent section are pushed apart until no two overlap.
      destAngles = candidates.map(node => (node.x0 + node.x1) / 2)

      const byParent = new Map<string, number[]>()
      candidates.forEach((node, i) => {
        const pid = node.parent?.data?.id ?? '__root__'
        if (!byParent.has(pid)) byParent.set(pid, [])
        byParent.get(pid)!.push(i)
      })

      byParent.forEach(idxs => {
        if (idxs.length <= 1) return
        const maxSize = Math.max(...idxs.map(i => {
          const d = candidates[i].data
          return (d.phylopicSize || DEFAULT_PHYLOPIC_SIZE) * (d.phylopicScale || 1)
        }))
        const minSep = (maxSize + 8) / phyloR
        const natural = idxs.map(i => destAngles[i])
        const spread  = enforceMinSep(natural, minSep)
        idxs.forEach((i, k) => { destAngles[i] = spread[k] })
      })
    }

    // ── Arc-section track assignment (greedy interval coloring) ─────────────────
    type Iv = { idx: number; start: number; end: number; trackLevel: number }
    const intervals: Iv[] = candidates.map((node, i) => {
      const ma = (node.x0 + node.x1) / 2
      const a  = destAngles[i]
      const cw = ((a - ma) + TWO_PI) % TWO_PI
      let start: number, end: number
      if (cw <= Math.PI) { start = ma; end = ma + cw }
      else               { start = a;  end = a  + (TWO_PI - cw) }
      return { idx: i, start, end, trackLevel: 0 }
    })
    const sortedIv = [...intervals].sort((a, b) => a.start - b.start)
    const levelEnds: number[] = []
    sortedIv.forEach(iv => {
      let lvl = levelEnds.findIndex(e => e <= iv.start)
      if (lvl === -1) { lvl = levelEnds.length; levelEnds.push(iv.end) }
      else levelEnds[lvl] = iv.end
      iv.trackLevel = lvl
    })

    // ── Build items ─────────────────────────────────────────────────────────────
    return candidates.map((node, i) => {
      const ma   = (node.x0 + node.x1) / 2
      const a    = destAngles[i]
      const size = (node.data.phylopicSize || DEFAULT_PHYLOPIC_SIZE) * (node.data.phylopicScale || 1)
      const trackRadius = LEADER_CURVE_R_BASE + intervals[i].trackLevel * LEADER_TRACK_STEP

      const startPt = polar(OUTER_R + 3, ma)
      const bend1   = polar(trackRadius, ma)
      const bend2   = polar(trackRadius, a)
      const endPt   = polar(phyloR - size / 2 - 4, a)
      const cw      = ((a - ma) + TWO_PI) % TWO_PI
      const sweep   = cw > Math.PI ? 0 : 1
      const leaderPath = `M ${startPt.x} ${startPt.y} L ${bend1.x} ${bend1.y} A ${trackRadius} ${trackRadius} 0 0 ${sweep} ${bend2.x} ${bend2.y} L ${endPt.x} ${endPt.y}`

      const pos = polar(phyloR, a)

      // ── Label positioning by angular zone ──────────────────────────────────────
      // Top (330-30°) and bottom (150-210°): label placed radially beyond the icon.
      // Sides (30-150° and 210-330°): label placed below the icon to avoid overlap.
      const isTopBottom = Math.abs(Math.cos(a)) > 0.5 // |angle from top/bottom| < 30°
      let labelX: number, labelY: number, labelY2: number
      let textAnchor: 'start' | 'end' | 'middle'

      if (isTopBottom) {
        const lp = polar(phyloR + size / 2 + EXT_LABEL_MARGIN, a)
        labelX    = lp.x
        labelY    = lp.y
        labelY2   = lp.y + 14
        textAnchor = Math.abs(Math.sin(a)) < 0.12 ? 'middle' : Math.sin(a) > 0 ? 'start' : 'end'
      } else {
        labelX    = pos.x
        labelY    = pos.y + size / 2.25 - EXT_LABEL_MARGIN * 2
        labelY2   = pos.y + size / 2 - EXT_LABEL_MARGIN
        textAnchor = 'middle'
      }

      return {
        data: node.data,
        naturalAngle: ma,
        distributedAngle: a,
        size,
        cx: pos.x, cy: pos.y,
        x: pos.x - size / 2, y: pos.y - size / 2,
        rotate: node.data.phylopicRotate || 0,
        leaderPath,
        labelX, labelY, labelY2, textAnchor,
      }
    })
  }, [level1Nodes, level2Nodes, phylopicLevel, distributionMode])

  // ── Arc event handlers ────────────────────────────────────────────────────────
  function handleArcClick(e: React.MouseEvent, info: HoverInfo) {
    e.stopPropagation()
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    setClickedInfo(prev => prev?.name === info.name ? null : info)
    setClickedPos(pos)
  }

  function arcOpacity(id: string, name: string, base: number, active: number): number {
    if (hoveredId === id) return active
    if (clickedInfo?.name === name) return active - 0.05
    return base
  }

  return (
    <div className="w-full">
      <TaxonControls
        groups={data.groups} visibleGroups={visibleGroups}
        onToggleGroup={(id) => setVisibleGroups(prev => {
          const next = new Set(prev)
          if (next.has(id) && next.size > 1) next.delete(id); else next.add(id)
          return next
        })}
        scaleType={scaleType} onToggleScale={() => setScaleType(s => s === 'log' ? 'linear' : 'log')}
        visibleRings={visibleRings}
        onToggleRing={(n) => setVisibleRings(prev => {
          const next = new Set(prev); next.has(n) ? next.delete(n) : next.add(n); return next
        })}
        phylopicLevel={phylopicLevel}
        onSetPhylopicLevel={(n) => setPhylopicLevel(n)}
        distributionMode={distributionMode}
        onSetDistributionMode={setDistributionMode}
      />

      <div
        ref={containerRef}
        className="relative"
        onMouseMove={(e) => setContainerWidth(e.currentTarget.getBoundingClientRect().width)}
        onClick={() => { setClickedInfo(null); setClickedPos(null) }}
      >
        <svg
          ref={svgRef}
          viewBox={`-25 -25 ${SIZE + 75} ${SIZE + 75}`}
          style={{ minWidth: '540px' }}
          className="w-full max-w-[980px] mx-auto block"
        >
          <g transform={`translate(${CX}, ${CY})`}>

            {/* Ring 2: main taxa */}
            {visibleRings.has(2) && level1Nodes.map(d => (
              <path
                key={d.data.id}
                d={level1Arc(d)!}
                fill={d.data.groupColor}
                opacity={arcOpacity(d.data.id, d.data.name, 0.25, 0.6)}
                className="cursor-pointer transition-opacity duration-100"
                onMouseEnter={() => setHoveredId(d.data.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(e) => handleArcClick(e, makeHover(
                  d.data.name, d.data.vernacular, d.data.speciesCount,
                  d.data.groupColor, d.data.rank, totalSpecies
                ))}
              />
            ))}

            {/* Ring 3: sub-taxa */}
            {visibleRings.has(3) && level2Nodes.map(d => (
              <path
                key={d.data.id}
                d={level2Arc(d)!}
                fill={d.data.groupColor}
                opacity={arcOpacity(d.data.id, d.data.name, 0.35, 0.65)}
                className="cursor-pointer transition-opacity duration-100"
                onMouseEnter={() => setHoveredId(d.data.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(e) => handleArcClick(e, makeHover(
                  d.data.name, d.data.vernacular, d.data.speciesCount,
                  d.data.groupColor, d.data.rank, totalSpecies
                ))}
              />
            ))}

            {/* Ring 1: inner group band */}
            {visibleRings.has(1) && groupNodes.map(d => {
              const g = filteredGroups.find(x => x.id === d.data.id)
              const total = g?.taxa.reduce((s, t) => s + t.speciesCount, 0) ?? 0
              return (
                <path
                  key={d.data.id}
                  d={groupArc(d)!}
                  fill={d.data.color}
                  opacity={arcOpacity(d.data.id, d.data.name, 0.88, 0.97)}
                  className="cursor-pointer transition-opacity duration-100"
                  onMouseEnter={() => setHoveredId(d.data.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={(e) => handleArcClick(e, makeHover(
                    d.data.name, d.data.vernacular, total,
                    d.data.color, 'Grupo', totalSpecies
                  ))}
                />
              )
            })}

            {/* Silhouettes (phylopics) + leader lines */}
            {processedPhylopics.map(p => {
              const isHovered = hoveredId === p.data.id
              return (
                <g key={`phylo-${p.data.id}`}>
                  <path
                    d={p.leaderPath} fill="none"
                    stroke={p.data.groupColor}
                    strokeWidth={isHovered ? 1.5 : 0.8}
                    opacity={isHovered ? 0.7 : 0.4}
                  />
                  {isHovered && (
                    <circle
                      cx={p.cx} cy={p.cy} r={p.size / 2 + 6}
                      fill={p.data.groupColor} opacity={0.2}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                  <image
                    href={`https://images.phylopic.org/images/${p.data.phylopicUuid}/vector.svg`}
                    x={p.x} y={p.y} width={p.size} height={p.size}
                    transform={p.rotate ? `rotate(${p.rotate}, ${p.cx}, ${p.cy})` : undefined}
                    style={{ pointerEvents: 'none', opacity: isHovered ? 1 : 0.9 }}
                    className="dark:invert brightness-0 dark:brightness-200"
                  />
                  <text
                    x={p.labelX} y={p.labelY}
                    textAnchor={p.textAnchor} dominantBaseline="middle"
                    fontSize={12} className="fill-slate-600 dark:fill-slate-400 font-bold"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >{p.data.name}</text>
                  <text
                    x={p.labelX} y={p.labelY2}
                    textAnchor={p.textAnchor} dominantBaseline="middle"
                    fontSize={10} className="fill-slate-400 dark:fill-slate-500 font-medium"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >{p.data.speciesCount.toLocaleString('pt-BR')} spp.</text>
                  <circle
                    cx={p.cx} cy={p.cy} r={p.size / 2 + 6}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredId(p.data.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={(e) => handleArcClick(e, makeHover(
                      p.data.name, p.data.vernacular, p.data.speciesCount,
                      p.data.groupColor, p.data.rank, totalSpecies
                    ))}
                  />
                </g>
              )
            })}


            {/* Inner ring group labels — omit when longest line exceeds arc width */}
            {visibleRings.has(1) && groupNodes.map(d => {
              const r = (INNER_R + MID_R) / 2
              const arcLen = (d.x1 - d.x0) * r
              const lines = splitLines(d.data.vernacular)
              const maxLineChars = Math.max(...lines.map(l => l.length))
              if (arcLen < maxLineChars * LABEL_CHAR_WIDTH + 6) return null
              const mid = (d.x0 + d.x1) / 2
              const p = polar(r, mid)
              const rot = safeRotateDeg(mid)
              const g = filteredGroups.find(gr => gr.id === d.data.id)
              const total = g?.taxa.reduce((s, t) => s + t.speciesCount, 0) ?? 0
              const pct = totalSpecies > 0 ? (total / totalSpecies * 100).toFixed(1) : '0'
              return (
                <g key={`lbl-grp-${d.data.id}`} transform={`rotate(${rot}, ${p.x}, ${p.y})`} style={{ pointerEvents: 'none' }}>
                  {lines.map((l, i) => (
                    <text key={i} x={p.x} y={p.y - 7 + i * 13} textAnchor="middle" fontSize={11} fontWeight="700" className="fill-slate-800 dark:fill-slate-100">{l}</text>
                  ))}
                  <text x={p.x} y={p.y + lines.length * 7 + 2} textAnchor="middle" fontSize={10} fontWeight="600" className="fill-slate-700 dark:fill-slate-200">{pct}%</text>
                </g>
              )
            })}

            {/* Ring 2 internal labels */}
            {visibleRings.has(2) && level1Nodes.map(d => {
              const mid = (d.x0 + d.x1) / 2
              const r = (MID_R + (ring3Visible ? SUB_R : OUTER_R)) / 2
              const p = polar(r, mid)
              const rot = safeRotateDeg(mid)
              if ((d.x1 - d.x0) * r < d.data.name.length * LABEL_CHAR_WIDTH + 8) return null
              return (
                <text
                  key={`lbl-l1-${d.data.id}`}
                  x={p.x} y={p.y}
                  transform={`rotate(${rot}, ${p.x}, ${p.y})`}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={FONT_INNER_LABEL} fontWeight="700"
                  className="fill-slate-800 dark:fill-slate-100"
                  style={{ pointerEvents: 'none' }}
                >{d.data.name}</text>
              )
            })}

            {/* Ring 3 internal labels */}
            {visibleRings.has(3) && level2Nodes.map(d => {
              const mid = (d.x0 + d.x1) / 2
              const r = (SUB_R + OUTER_R) / 2
              const p = polar(r, mid)
              const rot = safeRotateDeg(mid)
              if ((d.x1 - d.x0) * r < d.data.name.length * LABEL_CHAR_WIDTH + 8) return null
              return (
                <text
                  key={`lbl-l2-${d.data.id}`}
                  x={p.x} y={p.y}
                  transform={`rotate(${rot}, ${p.x}, ${p.y})`}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={FONT_INNER_LABEL - 1} fontWeight="600"
                  className="fill-slate-700 dark:fill-slate-200"
                  style={{ pointerEvents: 'none' }}
                >{d.data.name}</text>
              )
            })}

            {/* Center label */}
            <g style={{ pointerEvents: 'none' }}>
              <text y={-14} textAnchor="middle" fontSize={15} className="fill-slate-600 dark:fill-slate-400 font-bold">Vertebrados</text>
              <text y={10} textAnchor="middle" fontSize={13} className="fill-slate-400 dark:fill-slate-500 font-medium">{totalSpecies.toLocaleString('pt-BR')} spp.</text>
            </g>
          </g>
        </svg>

        {/* Click info panel */}
        {clickedInfo && clickedPos && (
          <div
            style={{
              position: 'absolute',
              left: clickedPos.x > containerWidth * 0.6 ? clickedPos.x - 16 : clickedPos.x + 16,
              top: Math.max(8, clickedPos.y - 10),
              transform: clickedPos.x > containerWidth * 0.6 ? 'translateX(-100%)' : undefined,
              pointerEvents: 'none',
              zIndex: 10,
            }}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-4 w-56 shadow-2xl transition-colors duration-300"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{clickedInfo.rank ?? 'Táxon'}</span>
            <h3 className="text-slate-900 dark:text-white font-bold italic mt-1 text-base leading-snug">{clickedInfo.name}</h3>
            <p className="text-slate-400 text-sm mt-0.5">{clickedInfo.vernacular}</p>
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-baseline gap-2">
              <span className="text-2xl font-bold tabular-nums" style={{ color: clickedInfo.color }}>{clickedInfo.speciesCount.toLocaleString('pt-BR')}</span>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">spp.</span>
              <span className="ml-auto text-slate-500 text-sm font-mono font-medium">{clickedInfo.pct}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Export button */}
      <div className="flex justify-end mt-3">
        <button
          onClick={exportSVG}
          disabled={exporting}
          className="px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all disabled:opacity-40"
        >
          {exporting ? 'aguarde…' : '↓ exportar svg'}
        </button>
      </div>
    </div>
  )
}
