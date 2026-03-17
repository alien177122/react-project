import type { WeekScheme, TrainingDayDef } from '../types'
import { volumeClass } from '../utils/calc'

// ============================================================
// КАРТОЧКА ДНЯ ТРЕНИРОВКИ — используется во вкладке "Тренировка"
// isPreview=true → затемнённая карточка "следующего дня"
// ============================================================
export default function TrainingDayCard({ dayDef, weekIndex, exercises, isPreview }: {
  dayDef: TrainingDayDef; weekIndex: number
  exercises: {
    key: string; name: string; weight: number; scheme: WeekScheme; totalReps: number
    isPullup?: boolean; extraWeight?: number
  }[]
  isPreview?: boolean
}) {
  return (
    <div className={`training-card${isPreview ? ' training-card-preview' : ''}`}>
      <div className="training-card-head">
        <span className="training-card-day">День {dayDef.dayNumber}</span>
        <span className="training-card-name">{dayDef.name}</span>
        <span className="training-card-week">Нед {weekIndex + 1}</span>
      </div>
      <table className="pt">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Упражнение</th>
            <th>Вес, кг</th><th>Схема</th><th>Повт</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map(ex => (
            <tr key={ex.key}>
              <td style={{ textAlign: 'left', color: '#fff', fontSize: 13, fontWeight: 500 }}>{ex.name}</td>
              <td className="w-kg">
                {ex.isPullup && ex.extraWeight != null
                  ? (ex.extraWeight >= 0 ? `+${ex.extraWeight.toFixed(1)}` : ex.extraWeight.toFixed(1))
                  : ex.weight.toFixed(1)}
              </td>
              <td className="w-sr">
                {ex.scheme.sets !== 4
                  ? <><b>{ex.scheme.sets}</b> × {ex.scheme.reps}</>
                  : <>{ex.scheme.sets} × {ex.scheme.reps}</>}
              </td>
              <td className={volumeClass(ex.totalReps)}>{ex.totalReps}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
