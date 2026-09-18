import {calcWorkingWeight} from '@training/shared/utils/calc';
import {EXERCISES} from '@training/shared/data/exercises';

export interface WeekRow {
  week: number;
  weight: number;
  pct: number;
  sets: number;
  reps: number;
  phase: string;
  isDeload: boolean;
}

export function buildExerciseWeeks(exerciseKey: string, oneRM: number): WeekRow[] {
  const config = EXERCISES[exerciseKey];
  if (!config || !(oneRM > 0)) return [];

  return config.percentages.map((pct, index) => {
    const scheme = config.weekSchemes[index] ?? {sets: 0, reps: 0};
    return {
      week: index + 1,
      weight: calcWorkingWeight(oneRM, pct, config),
      pct,
      sets: scheme.sets,
      reps: scheme.reps,
      phase: index < 4 ? 'Объём' : index === 4 ? 'Разгрузка' : index < 7 ? 'Сила' : 'Пик',
      isDeload: index === 4,
    };
  });
}

export function formatKg(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
