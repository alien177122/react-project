import type { SplitMuscleId } from '../types/index.ts'

export const SPLIT_MUSCLES: SplitMuscleId[] = [
  'chest',
  'biceps',
  'legs',
  'shoulders',
  'back',
  'triceps',
]

export const SPLIT_MUSCLE_LABELS: Record<SplitMuscleId, string> = {
  chest: 'Грудь',
  biceps: 'Бицепс',
  legs: 'Ноги',
  shoulders: 'Плечи',
  back: 'Спина',
  triceps: 'Трицепс',
}

export function emptyBaseline(): Record<SplitMuscleId, number> {
  return {
    chest: 0,
    biceps: 0,
    legs: 0,
    shoulders: 0,
    back: 0,
    triceps: 0,
  }
}
