import type { CSSProperties } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export interface PercentRow {
  pct: string
  reps: string
  zone: string
  color: string
  /** 0–1, visual bar width */
  scale: number
}

export interface RpeRow {
  rpe: string
  reserve: string
  desc: string
  color: string
}

interface SpecsTablesProps {
  percentRows: readonly PercentRow[]
  rpeRows: readonly RpeRow[]
}

export function SpecsTables({ percentRows, rpeRows }: SpecsTablesProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    rootMargin: '0px 0px -15% 0px',
  })

  return (
    <div ref={ref} className={`ta-specs${isVisible ? ' is-visible' : ''}`}>
      <div className="ta-specs-card">
        <div className="ta-specs-card-head">
          <span className="ta-specs-card-eyebrow">Intensity</span>
          <h3 className="ta-specs-card-title">% от 1ПМ и зоны</h3>
        </div>

        <div
          className="ta-bar-list"
          role="table"
          aria-label="Процент от 1ПМ, повторения и зоны"
        >
          <div className="ta-bar-row" role="row" style={{ borderBottomColor: 'rgba(255,255,255,0.08)' }}>
            <span className="ta-bar-label" style={{ color: 'var(--ta-text-muted)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>% ПМ</span>
            <span style={{ color: 'var(--ta-text-muted)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Повторения
            </span>
            <span className="ta-bar-zone" style={{ color: 'var(--ta-text-muted)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Зона
            </span>
          </div>
          {percentRows.map((row) => {
            const style: CSSProperties = {
              ['--ta-bar-color' as string]: row.color,
              ['--ta-bar-scale' as string]: row.scale,
            }
            return (
              <div key={row.pct} className="ta-bar-row" role="row" style={style}>
                <span className="ta-bar-label" role="cell">{row.pct}</span>
                <div className="ta-bar-track" role="cell" aria-label={`${row.reps} повторений`}>
                  <div className="ta-bar-fill" />
                </div>
                <span className="ta-bar-zone" role="cell">
                  <span style={{ color: 'var(--ta-text)', marginRight: 8 }}>{row.reps}</span>
                  <span>{row.zone}</span>
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="ta-specs-card">
        <div className="ta-specs-card-head">
          <span className="ta-specs-card-eyebrow">Effort</span>
          <h3 className="ta-specs-card-title">Шкала RPE</h3>
        </div>

        <div className="ta-rpe" role="table" aria-label="Шкала RPE">
          {rpeRows.map((row) => {
            const style: CSSProperties = {
              ['--ta-rpe-color' as string]: row.color,
            }
            return (
              <div key={row.rpe} className="ta-rpe-row" role="row" style={style}>
                <span className="ta-rpe-num" role="cell">{row.rpe}</span>
                <span className="ta-rpe-reserve" role="cell">
                  {row.reserve}
                </span>
                <span className="ta-rpe-desc" role="cell">{row.desc}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
