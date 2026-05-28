import { useState, type CSSProperties, type KeyboardEvent } from 'react'
import type { ExerciseConfig, SavedExercise } from '../types'
import { usePeriodization, type PeriodWeek } from '../hooks/usePeriodization'

function formatWeight(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

function weightLabel(config: ExerciseConfig, week: PeriodWeek): string {
  if (!config.isPullup) return `${formatWeight(week.weight)} кг`
  return `${week.weight >= 0 ? '+' : ''}${formatWeight(week.weight)} кг`
}

function phaseHint(phase: PeriodWeek['phase']): string {
  if (phase === 'Deload') return 'восстановление'
  if (phase === 'Peak') return 'пик'
  if (phase === 'Intensification') return 'интенсификация'
  return 'накопление'
}

const TIP_WIDTH = 232
const TIP_HEIGHT = 78
const TIP_MARGIN = 16
const CHART_WIDTH = 800

export default function PeriodizationChart({
  config,
  result,
}: {
  config: ExerciseConfig
  result: SavedExercise
}) {
  const { weeks, phases, linePath, areaPath, viewBox, grid } = usePeriodization(config, result)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex == null ? null : weeks[activeIndex]
  const tipX = active
    ? Math.max(TIP_MARGIN, Math.min(CHART_WIDTH - TIP_WIDTH - TIP_MARGIN, active.x - TIP_WIDTH / 2))
    : TIP_MARGIN

  const keyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setActiveIndex(null)
      return
    }
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const current = activeIndex ?? 0
    const delta = event.key === 'ArrowRight' ? 1 : -1
    setActiveIndex(Math.max(0, Math.min(weeks.length - 1, current + delta)))
  }

  return (
    <section className="ta-period" aria-label={`График периодизации, ${weeks.length} недель`}>
      <div className="ta-period__phases" aria-hidden="true">
        {phases.map((phase) => (
          <span
            key={phase.label}
            className="ta-period__phase"
            style={{
              flexGrow: phase.weeks,
              '--phase-color': `var(${phase.colorVar})`,
              '--phase-bg': `var(${phase.tintVar})`,
            } as CSSProperties}
          >
            {phase.label}
          </span>
        ))}
      </div>

      <div className="ta-period__scroll">
        <svg
          className="ta-period__svg"
          viewBox={viewBox}
          preserveAspectRatio="none"
          role="img"
          aria-labelledby="period-title period-desc"
        >
          <title id="period-title">График периодизации</title>
          <desc id="period-desc">
            8 недель: интенсивность в процентах и объём в повторениях. Неделя 5 — разгрузка.
          </desc>
          {grid.map((y) => <line key={y} className="ta-period__grid" x1="56" x2="744" y1={y} y2={y} />)}
          <text className="ta-period__axis" x="12" y="34">%</text>
          <text className="ta-period__axis" x="748" y="34">повт</text>
          <path className="ta-period__area" d={areaPath} />
          <path className="ta-period__line" d={linePath} pathLength={1} />
          {weeks.map((week, index) => (
            <g key={week.week}>
              <rect
                className={`ta-period__bar${activeIndex === index ? ' is-active' : ''}`}
                x={week.barX}
                y={week.barY}
                width="40"
                height={week.barHeight}
                style={{ animationDelay: `${index * 60}ms` }}
                onPointerEnter={() => setActiveIndex(index)}
                onPointerLeave={() => setActiveIndex(null)}
              />
              <circle
                className={`ta-period__point${activeIndex === index ? ' is-active' : ''}`}
                cx={week.x}
                cy={week.y}
                r="4"
                onPointerEnter={() => setActiveIndex(index)}
                onPointerLeave={() => setActiveIndex(null)}
              />
              <text className="ta-period__week-label" x={week.x} y="264" textAnchor="middle">{week.week}</text>
            </g>
          ))}
          {active && (
            <g className="ta-period__tip" transform={`translate(${tipX}, 14)`}>
              <line className="ta-period__cursor" x1={active.x - tipX} x2={active.x - tipX} y1="0" y2="228" />
              <rect width={TIP_WIDTH} height={TIP_HEIGHT} rx="10" />
              <text x="14" y="21">Неделя {active.week} · {active.phase}</text>
              <text x="14" y="42">{weightLabel(config, active)} · {active.sets} × {active.reps}</text>
              <text x="14" y="63">{active.totalReps} повт · {phaseHint(active.phase)}</text>
            </g>
          )}
        </svg>
      </div>

      <div className="ta-period__weeks" role="listbox" aria-label="Недели периода" onKeyDown={keyDown}>
        {weeks.map((week, index) => (
          <button
            key={week.week}
            id={`period-week-${week.week}`}
            className={`ta-period-week${activeIndex === index ? ' is-active' : ''}`}
            type="button"
            role="option"
            aria-selected={activeIndex === index}
            onFocus={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <span>Нед {week.week}</span>
            <strong>{weightLabel(config, week)}</strong>
            <span>{week.sets} × {week.reps}</span>
            <span>{week.totalReps} повт</span>
            <em>{week.phase}</em>
          </button>
        ))}
      </div>
    </section>
  )
}
