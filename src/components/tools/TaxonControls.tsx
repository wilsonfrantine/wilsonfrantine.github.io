import type { Group } from './VertebrateChart'

interface Props {
  groups: Group[]
  visibleGroups: Set<string>
  onToggleGroup: (id: string) => void
  scaleType: 'log' | 'linear'
  onToggleScale: () => void
  visibleRings: Set<number>
  onToggleRing: (n: number) => void
  phylopicLevel: 0 | 2 | 3
  onSetPhylopicLevel: (n: 0 | 2 | 3) => void
  distributionMode: 'smooth' | 'repel'
  onSetDistributionMode: (m: 'smooth' | 'repel') => void
}

export default function TaxonControls({
  groups, visibleGroups, onToggleGroup,
  scaleType, onToggleScale,
  visibleRings, onToggleRing,
  phylopicLevel, onSetPhylopicLevel,
  distributionMode, onSetDistributionMode,
}: Props) {
  return (
    <div className="flex flex-col gap-3 mb-8 bg-white dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-300">

      {/* Row 1: group filters + scale toggle */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {groups.map(g => {
            const active = visibleGroups.has(g.id)
            return (
              <button
                key={g.id}
                onClick={() => onToggleGroup(g.id)}
                title={g.vernacular}
                className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all duration-200 border ${
                  active ? 'text-white border-transparent' : 'bg-transparent'
                }`}
                style={
                  active
                    ? { backgroundColor: g.color }
                    : { color: g.color, borderColor: g.color, opacity: 0.5 }
                }
              >
                {g.name}
              </button>
            )
          })}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onSetDistributionMode(distributionMode === 'smooth' ? 'repel' : 'smooth')}
            className="px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-300 dark:border-slate-700"
          >
            dist: {distributionMode}
          </button>
          <button
            onClick={onToggleScale}
            className="px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-300 dark:border-slate-700"
          >
            escala: {scaleType === 'log' ? 'log₁₀' : 'linear'}
          </button>
        </div>
      </div>

      {/* Row 2: ring toggles + phylopic level toggles */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mr-1">anéis</span>
        {[1, 2, 3].map(n => {
          const active = visibleRings.has(n)
          return (
            <button
              key={n}
              onClick={() => onToggleRing(n)}
              title={['Grupos internos', 'Classes / ordens', 'Subgrupos'][n - 1]}
              className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all border ${
                active
                  ? 'bg-sky-500/20 border-sky-500/50 text-sky-600 dark:text-sky-400'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              nível {n}
            </button>
          )
        })}

        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-4 mr-1">ícones</span>
        {([2, 3] as const).map(n => {
          const active = phylopicLevel === n
          return (
            <button
              key={n}
              onClick={() => onSetPhylopicLevel(active ? 0 : n)}
              title={['Silhuetas de classes e ordens', 'Silhuetas de subgrupos'][n - 2]}
              className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all border ${
                active
                  ? 'bg-violet-500/20 border-violet-500/50 text-violet-600 dark:text-violet-400'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              nível {n}
            </button>
          )
        })}
      </div>
    </div>
  )
}
