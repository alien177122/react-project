import { Fragment, useState } from 'react'
import { EXERCISES, TYPE_LABELS } from '../data/exercises'
import { PlateDiagram } from './PlateDiagram'
import type { WeekScheme, TrainingDayDef } from '../types'
import { calcWarmupSets, volumeClass } from '../utils/calc'

function formatWeight(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

function barWeightForType(type: 'A' | 'B' | 'C' | 'D'): number {
  return type === 'B' ? 10 : 20
}

function loadNoteForExercise(config: (typeof EXERCISES)[string] | undefined): string {
  if (!config) return 'Это упражнение: схема блинов не применяется.'

  if (config.isPullup) {
    return 'Для подтягиваний рабочая нагрузка показана как доп. вес к весу тела.'
  }

  if (config.type === 'D') {
    return `${TYPE_LABELS[config.type]}: подбери удобное положение. Амплитуда не слишком большая и не слишком маленькая; идеально — 90–120 градусов.`
  }

  return `${TYPE_LABELS[config.type]}: схема блинов не применяется.`
}

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
  const [openExerciseKey, setOpenExerciseKey] = useState<string | null>(null)

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
          {exercises.map(ex => {
            const config = EXERCISES[ex.key]
            const isOpen = openExerciseKey === ex.key
            const panelId = `training-load-${dayDef.dayNumber}-${weekIndex + 1}-${ex.key}`
            const displayWeight = ex.isPullup && ex.extraWeight != null
              ? (ex.extraWeight >= 0 ? `+${ex.extraWeight.toFixed(1)}` : ex.extraWeight.toFixed(1))
              : ex.weight.toFixed(1)
            const barWeight = config ? barWeightForType(config.type) : 20
            const canShowPlates = !!config && !config.isPullup && (config.type === 'A' || config.type === 'B')
            const warmups = config
              ? calcWarmupSets(ex.weight, config).map(set => ({
                ...set,
                weight: canShowPlates ? Math.max(set.weight, barWeight) : set.weight,
              }))
              : []

            return (
              <Fragment key={ex.key}>
                <tr className={isOpen ? 'training-row is-expanded' : 'training-row'}>
                  <td className="training-exercise-cell">
                    <button
                      type="button"
                      className="training-exercise-trigger"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenExerciseKey(isOpen ? null : ex.key)}
                    >
                      <span>{ex.name}</span>
                      <span className="training-exercise-trigger__hint">
                        {isOpen ? 'Скрыть' : 'Разбор'}
                      </span>
                    </button>
                  </td>
                  <td className="w-kg">
                    {displayWeight}
                  </td>
                  <td className="w-sr">
                    {ex.scheme.sets !== 4
                      ? <><b>{ex.scheme.sets}</b> × {ex.scheme.reps}</>
                      : <>{ex.scheme.sets} × {ex.scheme.reps}</>}
                  </td>
                  <td className={volumeClass(ex.totalReps)}>{ex.totalReps}</td>
                </tr>
                {isOpen && (
                  <tr className="training-load-row">
                    <td colSpan={4}>
                      <div
                        className="ta-shell training-load-menu"
                        id={panelId}
                        role="region"
                        aria-label={`Схема и разминка: ${ex.name}`}
                      >
                        <div className="training-load-menu__head">
                          <div>
                            <div className="training-load-menu__eyebrow">Схема подхода</div>
                            <h3 className="training-load-menu__title">{ex.name}</h3>
                          </div>
                          <div className="training-load-menu__work">
                            <span>{displayWeight}</span>
                            <small>кг · {ex.scheme.sets} × {ex.scheme.reps}</small>
                          </div>
                        </div>

                        {canShowPlates ? (
                          <PlateDiagram weight={ex.weight} barWeight={barWeight} />
                        ) : (
                          <div className="training-load-menu__note">
                            {loadNoteForExercise(config)}
                          </div>
                        )}

                        <div className="training-load-menu__section">
                          <div className="training-load-menu__eyebrow">Разминочные подходы</div>
                          {warmups.length > 0 ? (
                            <ul className="training-warmups" aria-label={`Разминочные подходы для ${ex.name}`}>
                              {warmups.map(warmup => (
                                <li className="training-warmups__item" key={`${warmup.label}-${warmup.weight}-${warmup.reps}`}>
                                  <span className="training-warmups__label">{warmup.label}</span>
                                  <span className="training-warmups__weight">{formatWeight(warmup.weight)} кг</span>
                                  <span className="training-warmups__reps">{warmup.reps} повт</span>
                                  <span className="training-warmups__rest">{warmup.rest}</span>
                                  <span className="training-warmups__purpose">{warmup.purpose}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="training-load-menu__note">
                              Разминка: 2–3 лёгких подхода с собственным весом, затем рабочая схема.
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
