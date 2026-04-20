/**
 * Fetch vertebrate taxonomy data from ChecklistBank (Catalogue of Life) and PhyloPic.
 * This script does NOT run during `npm run build` — it must be run manually
 * and the resulting JSON committed to the repo.
 *
 * ── Update cycle ─────────────────────────────────────────────────────────────
 *  1. (optional) Verify divergences from CoL live data:
 *       npm run fetch-taxonomy:check
 *
 *  2. If a taxon shows "? no colId", find its CoL ID:
 *       npm run fetch-taxonomy:find -- "Taxon Name"
 *     Then pin the returned colId in the SEED below.
 *
 *  3. Enrich and write JSON:
 *       npm run fetch-taxonomy
 *
 *  4. Commit the updated src/data/vertebrate-taxa.json.
 *
 * ── Editing taxa ─────────────────────────────────────────────────────────────
 *  - Add/remove taxa in the SEED constant below.
 *  - phylopicUuid: set manually; never auto-overwritten if non-empty.
 *  - colId: confirm once with --find, then pin here permanently.
 *  - phylopicSize / phylopicScale / phylopicRotate: visual fine-tuning only.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

const ROOT = join(import.meta.dirname, '..')
const OUT_JSON = join(ROOT, 'src/data/vertebrate-taxa.json')
const CLB = 'https://api.checklistbank.org'
// COL dataset alias:
//   '3LR'    = latest monthly base release (curated, extant-biased, recommended for living diversity charts)
//   '314774' = COL 2026-04-07 XR (eXtended Release — matches col.plus website but includes fossil taxa,
//               e.g. Actinistia=25 instead of 2, Crocodylia=99 instead of 27)
// After a new XR is published, bump the number to match the new ChecklistBank dataset key.
const COL_DATASET = '3LR'
const GBIF = 'https://api.gbif.org/v1'
const PHYLOPIC = 'https://api.phylopic.org'

// ── Types ─────────────────────────────────────────────────────────────────────

interface SeedTaxon {
  id: string
  name: string
  vernacular: string
  rank: string
  colId: string          // empty = unknown — script will try to auto-match via CLB
  speciesCount: number   // fallback if CoL fetch fails
  phylopicUuid: string   // non-empty = pinned (never auto-overwritten)
  phylopicSize?: number
  phylopicScale?: number
  phylopicRotate?: number
  children: SeedTaxon[]
}

interface SeedGroup {
  id: string
  name: string
  vernacular: string
  color: string
  taxa: SeedTaxon[]
}

export interface RankCounts {
  order: number
  family: number
  genus: number
  species: number
}

interface OutputTaxon extends SeedTaxon {
  rankCounts: RankCounts
}

interface OutputGroup extends Omit<SeedGroup, 'taxa'> {
  taxa: OutputTaxon[]
}

interface OutputData {
  fetchedAt: string
  groups: OutputGroup[]
}

// ── SEED ─────────────────────────────────────────────────────────────────────
// colId: Catalogue of Life 2024 taxon ID (confirm once via --find, then pin)
// phylopicUuid: pinned — script never overwrites a non-empty value
// speciesCount: fallback displayed while colId is unknown

const SEED: SeedGroup[] = [
  {
    id: 'agnatha', name: 'Agnatha', vernacular: 'Peixes sem mandíbula', color: '#94a3b8',
    taxa: [
      { id: 'myxinoidea', name: 'Myxinoidea', vernacular: 'Peixes-bruxa', rank: 'class',
        colId: '6225G',  // CoL: Myxini (class) — closest match for Myxinoidea
        phylopicUuid: '0aa2bc4c-9c63-421d-8560-79b82e8635c4',
        speciesCount: 94, children: [] },
      { id: 'petromyzontidae', name: 'Petromyzontidae', vernacular: 'Lampreias', rank: 'family',
        colId: 'KVMH7',
        phylopicUuid: '1e04eace-cee7-4fd1-ac33-bb34c5f24fb6',
        speciesCount: 54, children: [] },
    ],
  },
  {
    id: 'chondrichthyes', name: 'Chondrichthyes', vernacular: 'Peixes cartilaginosos', color: '#3b82f6',
    taxa: [
      { id: 'chondrichthyes', name: 'Chondrichthyes', vernacular: 'Tubarões e raias', rank: 'class',
        colId: '8X6G5',
        phylopicUuid: 'd5c50aee-e11c-4063-8903-cc6604a6b417',
        speciesCount: 1160, children: [] },
    ],
  },
  {
    id: 'osteichthyes', name: 'Osteichthyes', vernacular: 'Peixes ósseos', color: '#06b6d4',
    taxa: [
      {
        id: 'actinopterygii', name: 'Actinopterygii', vernacular: 'Peixes de nadadeiras radiadas', rank: 'class',
        colId: '8VR36',
        phylopicUuid: '7f413b81-2f0c-4e54-9f8f-effec43e28a7',
        speciesCount: 41467,
        children: [
          { id: 'cladistia', name: 'Cladistia', vernacular: 'Bichires', rank: 'subclass', colId: '', phylopicUuid: '6d16ae40-b1b2-4b67-a161-2fd1eb7b0024', speciesCount: 14, children: [] },
          { id: 'chondrostei', name: 'Chondrostei', vernacular: 'Esturjões e peixes-espátula', rank: 'subclass', colId: '', phylopicUuid: '5ce55e7c-827d-4049-b128-ae0bc8fb2981', speciesCount: 109, children: [] },
          { id: 'holostei', name: 'Holostei', vernacular: 'Gares e amias', rank: 'subclass', colId: '', phylopicUuid: 'fd00131d-7916-44bb-9420-2aaac7cf6798', speciesCount: 68, children: [] },
          { id: 'teleostei', name: 'Teleostei', vernacular: 'Peixes ósseos modernos', rank: 'infraclass', colId: '', phylopicUuid: '7f413b81-2f0c-4e54-9f8f-effec43e28a7', speciesCount: 41276, children: [] }
        ]
      },
      { id: 'actinistia', name: 'Actinistia', vernacular: 'Celacanto', rank: 'order',
        colId: 'YW',     // CoL: Coelacanthiformes (order)
        phylopicUuid: 'ff131fa9-0ac4-4e6d-8df9-c44226ea4e7c',
        speciesCount: 2, children: [] },
      { id: 'dipnoi', name: 'Dipnoi', vernacular: 'Peixes-pulmonados', rank: 'subclass',
        colId: 'KV2DT',  // CoL: Ceratodontiformes (order) — closest match for Dipnoi
        phylopicUuid: '3bfadee3-c4c5-408e-a1b8-e09bec80bc7f',
        speciesCount: 6, children: [] },
    ],
  },
  {
    id: 'amphibia', name: 'Amphibia', vernacular: 'Anfíbios', color: '#22c55e',
    taxa: [
      { id: 'anura', name: 'Anura', vernacular: 'Sapos e rãs', rank: 'order',
        colId: 'PW',
        phylopicUuid: 'c387bde8-a9de-4101-928b-e99f2a7a33e5',
        speciesCount: 7500, children: [] },
      { id: 'caudata', name: 'Caudata', vernacular: 'Salamandras', rank: 'order',
        colId: 'W3',
        phylopicUuid: 'd1644001-d86d-4541-9501-295a873aed2a',
        speciesCount: 770, children: [] },
      { id: 'gymnophiona', name: 'Gymnophiona', vernacular: 'Cecílias', rank: 'order',
        colId: '623BD',
        phylopicUuid: '4dd27c92-9daf-4217-b35d-03487bc4a96d',
        speciesCount: 220, children: [] },
    ],
  },
  {
    id: 'reptilia', name: 'Reptilia', vernacular: 'Répteis', color: '#f59e0b',
    taxa: [
      { id: 'squamata', name: 'Squamata', vernacular: 'Lagartos e serpentes', rank: 'order',
        colId: '45C',
        phylopicUuid: '88177b24-a78b-4049-8280-cc4c74b5df46',
        speciesCount: 10900, children: [] },
      { id: 'testudines', name: 'Testudines', vernacular: 'Tartarugas', rank: 'order',
        colId: '477',
        phylopicUuid: '024aecf4-c748-4327-818e-7e1af4b1d7f8',
        speciesCount: 360, children: [] },
      { id: 'crocodilia', name: 'Crocodilia', vernacular: 'Crocodilos', rank: 'order',
        colId: '329',    // CoL: Crocodylia (spelling variant)
        phylopicUuid: 'ba019355-a056-40e7-b515-f7080cd9848b',
        speciesCount: 27, children: [] },
      { id: 'rhynchocephalia', name: 'Rhynchocephalia', vernacular: 'Tuatara', rank: 'order',
        colId: '8FV6K',  // CoL: Sphenodontida (suborder) — Rhynchocephalia not in 3LR
        phylopicUuid: '598318f1-e488-443d-9d86-0d640c377ee7',
        speciesCount: 1, children: [] },
    ],
  },
  {
    id: 'aves', name: 'Aves', vernacular: 'Aves', color: '#ef4444',
    taxa: [
      {
        id: 'aves', name: 'Aves', vernacular: 'Aves', rank: 'class',
        colId: 'V2',
        phylopicUuid: 'b3d81818-b362-462c-b559-e0fc7c7e9978',
        speciesCount: 12588,
        children: [
          { id: 'palaeognathae', name: 'Palaeognathae', vernacular: 'Ratitas e tinamus', rank: 'infraclass', colId: '', phylopicUuid: '02f381ca-4c78-455c-9957-ad8be835feb5', speciesCount: 72, children: [] },
          { id: 'neognathae', name: 'Neognathae', vernacular: 'Aves modernas', rank: 'infraclass', colId: '', phylopicUuid: 'b3d81818-b362-462c-b559-e0fc7c7e9978', speciesCount: 12516, children: [] }
        ]
      },
    ],
  },
  {
    id: 'mammalia', name: 'Mammalia', vernacular: 'Mamíferos', color: '#8b5cf6',
    taxa: [
      {
        id: 'mammalia', name: 'Mammalia', vernacular: 'Mamíferos', rank: 'class',
        colId: '6224G',
        phylopicUuid: '314cbfd5-f93e-4304-8799-169c66ea66eb',
        speciesCount: 8768,
        children: [
          { id: 'monotremata', name: 'Monotremata', vernacular: 'Monotremados', rank: 'order', colId: '', phylopicUuid: '162021b6-349b-4a64-906f-33d4a191b30e', speciesCount: 19, children: [] },
          { id: 'marsupialia', name: 'Marsupialia', vernacular: 'Marsupiais', rank: 'infraclass', colId: '', phylopicUuid: '46cc984c-240f-461f-a8d4-7dcf3e0088d9', speciesCount: 700, children: [] },
          { id: 'eutheria', name: 'Eutheria', vernacular: 'Placentários', rank: 'infraclass', colId: '', phylopicUuid: '4e9a0149-9a93-4cd4-ab49-4a98958444f4', speciesCount: 7961, children: [] }
        ]
      },
    ],
  },
]

// ── CLB helpers ───────────────────────────────────────────────────────────────

async function clbGet(path: string): Promise<any> {
  const res = await fetch(`${CLB}${path}`, { signal: AbortSignal.timeout(12000) })
  if (!res.ok) throw new Error(`CLB ${path} → HTTP ${res.status}`)
  return res.json()
}

async function autoMatchColId(
  name: string, rank: string
): Promise<{ colId: string; matchedName: string; matchType: string } | null> {
  // Try match endpoint (works for COL2024 and XR datasets, not 3LR)
  try {
    const data = await clbGet(
      `/dataset/${COL_DATASET}/match/nameusage?q=${encodeURIComponent(name)}&rank=${rank.toUpperCase()}`
    )
    if (data.usage?.id) {
      return {
        colId: data.usage.id as string,
        matchedName: (data.usage.name?.scientificName ?? data.usage.label ?? name) as string,
        matchType: (data.type ?? 'exact') as string,
      }
    }
  } catch { /* fallthrough */ }

  // Fallback: nameusage/search (works for all datasets including 3LR)
  try {
    const data = await clbGet(
      `/dataset/${COL_DATASET}/nameusage/search?q=${encodeURIComponent(name)}&rank=${rank.toUpperCase()}&limit=1`
    )
    const hit = data.result?.[0]
    const id = hit?.usage?.id ?? hit?.id
    if (!id) return null
    return {
      colId: id as string,
      matchedName: (hit?.usage?.label ?? hit?.label ?? name) as string,
      matchType: 'search',
    }
  } catch {
    return null
  }
}

async function fetchColCounts(colId: string): Promise<RankCounts> {
  // Include PROVISIONALLY_ACCEPTED to match the counts shown on col.plus website (base release)
  const statusFilter = 'status=ACCEPTED&status=PROVISIONALLY_ACCEPTED'
  const [order, family, genus, species] = await Promise.all(
    (['ORDER', 'FAMILY', 'GENUS', 'SPECIES'] as const).map(async rank => {
      try {
        const data = await clbGet(
          `/dataset/${COL_DATASET}/nameusage/search?taxonID=${colId}` +
          `&rank=${rank}&${statusFilter}&limit=0`
        )
        return (data.total ?? 0) as number
      } catch {
        return 0
      }
    })
  )
  return { order, family, genus, species }
}

// ── GBIF helpers (used only for --find discovery) ─────────────────────────────

async function gbifGet(path: string): Promise<any> {
  const res = await fetch(`${GBIF}${path}`, { signal: AbortSignal.timeout(12000) })
  if (!res.ok) throw new Error(`GBIF ${path} → HTTP ${res.status}`)
  return res.json()
}

// ── PhyloPic helpers ──────────────────────────────────────────────────────────

async function fetchPhyloPicUuid(name: string): Promise<string> {
  try {
    const rootRes = await fetch(PHYLOPIC, { signal: AbortSignal.timeout(8000) })
    if (!rootRes.ok) return ''
    const root = await rootRes.json() as any
    const build: number = root.build
    const url = `${PHYLOPIC}/images?filter_name=${encodeURIComponent(name.toLowerCase())}&build=${build}&page=0&embed_items=true`
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) })
    if (!res.ok) return ''
    const data = await res.json() as any
    const items: any[] = data._embedded?.items ?? []
    if (!items.length) return ''
    const selfHref: string = items[0]?._links?.self?.href ?? ''
    const match = selfHref.match(/\/images\/([^?]+)/)
    return match?.[1] ?? ''
  } catch {
    return ''
  }
}

// ── --find mode ───────────────────────────────────────────────────────────────

async function findMode(name: string): Promise<void> {
  console.log(`\nSearching CoL (${COL_DATASET}) for: "${name}"\n`)
  try {
    // Primary: CLB exact match
    const match = await autoMatchColId(name, 'species') // rank will be ignored for search
      ?? await autoMatchColId(name, 'genus')
      ?? await autoMatchColId(name, 'family')
      ?? await autoMatchColId(name, 'order')
      ?? await autoMatchColId(name, 'class')

    if (match) {
      console.log(`  Matched → colId=${match.colId}  name="${match.matchedName}"  type=${match.matchType}\n`)
      console.log(`  To pin: add  colId: '${match.colId}'  to the taxon in SEED (scripts/fetch-taxonomy.ts)`)
    } else {
      console.log('  No match in CoL. Trying GBIF for discovery only…\n')
      const data = await gbifGet(
        `/species/search?q=${encodeURIComponent(name)}&status=ACCEPTED&limit=15`
      )
      const results: any[] = data.results ?? []
      if (!results.length) { console.log('  No results on GBIF either.'); return }

      console.log('gbifKey'.padEnd(12) + 'Rank'.padEnd(16) + 'Canonical Name'.padEnd(32) + 'Parent')
      console.log('─'.repeat(76))
      for (const r of results) {
        console.log(
          String(r.key ?? '').padEnd(12) +
          (r.rank ?? '').padEnd(16) +
          (r.canonicalName ?? r.scientificName ?? '').padEnd(32) +
          (r.parent ?? '')
        )
      }
      console.log('\n  Use the canonical name above to re-run --find for a closer CoL match.')
    }
  } catch (e) {
    console.error('Error:', e)
  }
}

// ── --check mode ──────────────────────────────────────────────────────────────

async function checkMode(): Promise<void> {
  const existing: any = existsSync(OUT_JSON)
    ? JSON.parse(readFileSync(OUT_JSON, 'utf-8'))
    : { groups: [] }

  const storedMap = new Map<string, { speciesCount: number; rankCounts?: RankCounts }>()
  for (const g of existing.groups ?? []) {
    for (const t of g.taxa ?? []) {
      storedMap.set(t.id, { speciesCount: t.speciesCount ?? 0, rankCounts: t.rankCounts })
    }
  }

  const allTaxa = SEED.flatMap(g => g.taxa.map(t => ({ ...t, groupName: g.name })))

  console.log('\n' +
    'Taxon'.padEnd(22) + 'Group'.padEnd(18) +
    'colId'.padEnd(10) + 'Stored spp'.padEnd(13) +
    'CoL spp'.padEnd(12) + 'Diff'
  )
  console.log('─'.repeat(82))

  for (const t of allTaxa) {
    const stored = storedMap.get(t.id)?.speciesCount ?? t.speciesCount
    let liveSpp = '—'
    let diff = ''
    let colId = t.colId
    let flag = colId ? '' : '? no colId'

    if (!colId) {
      const m = await autoMatchColId(t.name, t.rank)
      if (m) { colId = m.colId; flag = `auto:${colId}` }
    }

    if (colId) {
      try {
        const counts = await fetchColCounts(colId)
        liveSpp = counts.species > 0 ? counts.species.toLocaleString() : '?(0)'
        const d = counts.species - stored
        diff = counts.species > 0 ? (d >= 0 ? '+' : '') + d.toLocaleString() : ''
        flag = counts.species > 0
          ? (Math.abs(d) > stored * 0.1 ? '⚠' : '✓')
          : '?counts=0'
      } catch {
        liveSpp = 'ERR'
        flag = '✗'
      }
    }

    console.log(
      t.name.padEnd(22) +
      t.groupName.padEnd(18) +
      (colId || '—').padEnd(10) +
      stored.toLocaleString().padEnd(13) +
      liveSpp.padEnd(12) +
      diff.padEnd(10) +
      flag
    )
  }

  console.log('\nLegend: ✓ <10% diff  ⚠ >10% diff  ? needs attention  ?counts=0 endpoint not returning\n')
  console.log('Taxa with no colId: run  npm run fetch-taxonomy:find -- "Name"')
  console.log('To update counts:        npm run fetch-taxonomy\n')
}

// ── enrich mode (default) ─────────────────────────────────────────────────────

async function enrichTaxon(taxon: SeedTaxon): Promise<OutputTaxon> {
  let { colId, phylopicUuid } = taxon

  if (!colId) {
    process.stdout.write(`  ${taxon.name}: colId unknown — auto-matching… `)
    const match = await autoMatchColId(taxon.name, taxon.rank)
    if (match) {
      colId = match.colId
      console.log(`→ ${colId} "${match.matchedName}" [${match.matchType}]`)
    } else {
      console.log(`no match. Run: npm run fetch-taxonomy:find -- "${taxon.name}"`)
    }
  }

  let rankCounts: RankCounts = { order: 0, family: 0, genus: 0, species: 0 }
  if (colId) {
    process.stdout.write(`  ${taxon.name}: fetching CoL counts (${colId})… `)
    rankCounts = await fetchColCounts(colId)
    if (rankCounts.species > 0) {
      console.log(
        `spp=${rankCounts.species.toLocaleString()}  gen=${rankCounts.genus.toLocaleString()}` +
        `  fam=${rankCounts.family.toLocaleString()}  ord=${rankCounts.order.toLocaleString()}`
      )
    } else {
      console.log(`counts returned 0 — keeping fallback speciesCount=${taxon.speciesCount}`)
    }
  }

  const speciesCount = rankCounts.species > 0 ? rankCounts.species : taxon.speciesCount

  if (!phylopicUuid) {
    process.stdout.write(`  ${taxon.name}: fetching PhyloPic… `)
    phylopicUuid = await fetchPhyloPicUuid(taxon.name)
    console.log(phylopicUuid ? `→ ${phylopicUuid}` : 'not found')
  }

  const children: OutputTaxon[] = []
  for (const child of taxon.children) {
    children.push(await enrichTaxon(child))
  }

  return { ...taxon, colId, speciesCount, phylopicUuid, rankCounts, children }
}

async function enrichMode(): Promise<void> {
  const groups: OutputGroup[] = []

  for (const group of SEED) {
    console.log(`\nGroup: ${group.name}`)
    const taxa: OutputTaxon[] = []
    for (const taxon of group.taxa) {
      taxa.push(await enrichTaxon(taxon))
    }
    groups.push({ ...group, taxa })
  }

  const output: OutputData = { fetchedAt: new Date().toISOString(), groups }
  writeFileSync(OUT_JSON, JSON.stringify(output, null, 2))
  console.log(`\n✓ Written to ${OUT_JSON}`)
}

// ── Main ──────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2)

if (args.includes('--find')) {
  const nameIdx = args.indexOf('--find') + 1
  const name = args[nameIdx]
  if (!name) { console.error('Usage: npm run fetch-taxonomy:find -- "Taxon Name"'); process.exit(1) }
  findMode(name).catch(console.error)
} else if (args.includes('--check')) {
  checkMode().catch(console.error)
} else {
  enrichMode().catch(e => { console.error(e); process.exit(1) })
}
