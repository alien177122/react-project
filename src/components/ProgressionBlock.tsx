import { useMemo, useState } from 'react'
import type { ExerciseConfig, SavedExercise } from '../types'
import { calcWorkingWeight, volumeClass } from '../utils/calc'
import WaveChart from './WaveChart'

// ============================================================
// БЛОК ПРОГРЕССИИ — таблица рабочих весов на 8 недель
// При наведении на строку — подсвечивается соответствующий столбец волн-графика
// Для подтягиваний (isPullup) — показывает "+X кг к телу" вместо абсолютного веса
// ============================================================
export default function ProgressionBlock({ config, result }: { config: ExerciseConfig; result: SavedExercise }) {
  const [hovRow, setHovRow] = useState<number | null>(null)

  const weekRows = useMemo(() => config.percentages.map((pct, i) => {
    const totalWeight = calcWorkingWeight(result.oneRM, pct, config)
    const scheme = config.weekSchemes[i]
    const totalReps = scheme.sets * scheme.reps
    const displayWeight = config.isPullup && result.bodyWeight != null
      ? totalWeight - result.bodyWeight
      : totalWeight
    return { week: i + 1, pct, weight: displayWeight, rawWeight: totalWeight, scheme, totalReps }
  }), [config, result.bodyWeight, result.oneRM])

  const weightColLabel = config.isPullup ? '+кг к телу' : 'Вес, кг'

  return (
    <div className="pb">
      <div className="pb-head">
        <span className="pb-head-name">{config.name}</span>
        <span className="pb-head-1rm">
          1ПМ = {result.oneRM} кг
          {config.isPullup && result.bodyWeight != null && (
            <span style={{ color: 'var(--muted)', fontSize: 12, marginLeft: 8 }}>
              (тело {result.bodyWeight} кг)
            </span>
          )}
        </span>
      </div>
      <table className="pt">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Нед</th>
            <th>{weightColLabel}</th>
            <th>Схема</th>
            <th>Повт итого</th>
          </tr>
        </thead>
        <tbody>
          {weekRows.map((row, i) => (
            <tr key={row.week}
              onMouseEnter={() => setHovRow(i)}
              onMouseLeave={() => setHovRow(null)}
            >
              <td className="w-label" style={{ textAlign: 'left' }}>{row.week}</td>
              <td className="w-kg">
                {config.isPullup
                  ? (row.weight >= 0 ? `+${row.weight.toFixed(1)}` : row.weight.toFixed(1))
                  : row.weight.toFixed(1)}
              </td>
              <td className="w-sr">
                {row.scheme.sets !== 4
                  ? <><b>{row.scheme.sets}</b> × {row.scheme.reps}</>
                  : <>{row.scheme.sets} × {row.scheme.reps}</>}
              </td>
              <td className={volumeClass(row.totalReps)}>{row.totalReps}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <WaveChart schemes={config.weekSchemes} activeIndex={hovRow} />
    </div>
  )
}
