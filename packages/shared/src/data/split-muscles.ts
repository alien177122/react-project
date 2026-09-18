import type {SplitMuscleId} from '../types/index.ts';

export const SPLIT_MUSCLES: SplitMuscleId[] = [
  'chest',
  'biceps',
  'legs',
  'shoulders',
  'back',
  'triceps',
];

export const SPLIT_MUSCLE_LABELS: Record<SplitMuscleId, string> = {
  chest: 'Грудь',
  biceps: 'Бицепс',
  legs: 'Ноги',
  shoulders: 'Плечи',
  back: 'Спина',
  triceps: 'Трицепс',
};

export type SplitBodyRegion = 'upper' | 'lower';

/** Accent tints for split exercise picker cards (quiet UI, one hue per group). */
export const SPLIT_MUSCLE_COLORS: Record<SplitMuscleId, string> = {
  chest: '#ffb020',
  back: '#5ba4ff',
  shoulders: '#e85a2a',
  biceps: '#4090ee',
  triceps: '#b83a18',
  legs: '#3affb8',
};

export const SPLIT_MUSCLE_REGION: Record<SplitMuscleId, SplitBodyRegion> = {
  chest: 'upper',
  back: 'upper',
  shoulders: 'upper',
  biceps: 'upper',
  triceps: 'upper',
  legs: 'lower',
};

export type SplitBodyRegionFilter = 'all' | SplitBodyRegion;

export const SPLIT_BODY_REGION_LABELS: Record<SplitBodyRegionFilter, string> = {
  all: 'Все',
  upper: 'Верх тела',
  lower: 'Низ тела',
};

export const UPPER_BODY_MUSCLES: SplitMuscleId[] = [
  'chest',
  'back',
  'shoulders',
  'biceps',
  'triceps',
];

export const LOWER_BODY_MUSCLES: SplitMuscleId[] = ['legs'];

export function emptyBaseline(): Record<SplitMuscleId, number> {
  return {
    chest: 0,
    biceps: 0,
    legs: 0,
    shoulders: 0,
    back: 0,
    triceps: 0,
  };
}
