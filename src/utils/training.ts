import { EXERCISES, TRAINING_DAYS } from '../data/exercises.ts'
import type { SavedExercise, WeekScheme } from '../types/index.ts'
import { calcWorkingWeight } from './calc.ts'

export interface TrainingExerciseRow {
  key: string
  name: string
  weight: number
  scheme: WeekScheme
  totalReps: number
  isPullup?: boolean
  extraWeight?: number
}

export function getTrainingExercises(
  dayIdx: number,
  weekIdx: number,
  savedExercises: SavedExercise[],
): TrainingExerciseRow[] {
  const day = TRAINING_DAYS[dayIdx]
  if (!day) return []

  const savedByKey = new Map(savedExercises.map(saved => [saved.exerciseKey, saved]))

  return day.exerciseKeys.flatMap(key => {
    const config = EXERCISES[key]
    const saved = savedByKey.get(key)
    if (!config || !saved) return []

    const totalWeight = calcWorkingWeight(saved.oneRM, config.percentages[weekIdx], config)
    const scheme = config.weekSchemes[weekIdx]
    const isPullup = !!config.isPullup
    const extraWeight = isPullup && saved.bodyWeight != null
      ? totalWeight - saved.bodyWeight
      : undefined

    return [{
      key,
      name: config.name,
      weight: totalWeight,
      scheme,
      totalReps: scheme.sets * scheme.reps,
      isPullup,
      extraWeight,
    }]
  })
}
