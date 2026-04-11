import type { WeekScheme } from '../types'
import { barColor } from '../utils'

export function WaveChart({ schemes, activeIndex }: { schemes: WeekScheme[]; activeIndex?: number | null }) {
  const totals = schemes.map(s => s.sets * s.reps)
  const max = Math.max(...totals)
  const anyHov = activeIndex !== null && activeIndex !== undefined

  return (
    <div style={{ padding: '10px 12px' }}>
      <div className="wave-wrap">
        {totals.map((t, i) => {
          const pct = max > 0 ? (t / max) * 100 : 0
          const isActive = activeIndex === i
          return (
            <div key={i}
              className={`wave-bar${isActive ? ' wave-active' : ''}`}
              style={{
                height: `${pct}%`,
                background: barColor(t),
                opacity: anyHov ? (isActive ? 1 : 0.18) : 0.85,
              }}
            />
          )
        })}
      </div>
      <div className="wave-labs">
        {schemes.map((_, i) => (
          <div key={i} className="wave-lab" style={{
            color: activeIndex === i ? '#fff' : undefined,
            fontWeight: activeIndex === i ? '600' : undefined,
          }}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
