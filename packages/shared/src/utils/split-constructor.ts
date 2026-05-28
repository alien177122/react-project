import {EXERCISES, TRAINING_DAYS} from '../data/exercises.ts';
import {
  DEFAULT_LEG_EXERCISES,
  EXERCISES_BY_MUSCLE,
  SPLIT_DAY_LIMITS,
  normalizeLegExercises,
} from '../data/split-exercises.ts';
import {emptyBaseline} from '../data/split-muscles.ts';
import {MUSCLE_CONTRIB} from '../data/muscles.ts';
import type {
  CustomSplit,
  SavedExercise,
  SplitDayConfig,
  SplitMuscleId,
  WeekScheme,
} from '../types/index.ts';
import {calcWorkingWeight} from './calc.ts';
import {buildLinearWorkingSets} from './pyramid.ts';
import type {TrainingExerciseRow} from './training.ts';

const TRICEPS_CONTRIB_KEYS = ['bench', 'dbPress', 'ohp'] as const;

export function distributeSets(total: number, days: number, minPerDay = 2): number[] {
  if (days <= 0) return [];
  if (days === 1) return [Math.max(1, Math.round(total))];

  const roundedTotal = Math.max(0, Math.round(total));
  const minTotal = days * minPerDay;

  if (roundedTotal < minTotal) {
    const result = Array<number>(days).fill(minPerDay);
    let excess = result.reduce((sum, value) => sum + value, 0) - roundedTotal;
    for (let i = result.length - 1; excess > 0 && i >= 0; i -= 1) {
      const reduceBy = Math.min(excess, result[i] - 1);
      result[i] -= reduceBy;
      excess -= reduceBy;
    }
    return result;
  }

  const result = Array<number>(days).fill(minPerDay);
  let remainder = roundedTotal - minTotal;
  let index = 0;
  while (remainder > 0) {
    result[index] += 1;
    remainder -= 1;
    index = (index + 1) % days;
  }
  return result;
}

export function getBaselineSetsPerMuscle(weekIndex: number): Record<SplitMuscleId, number> {
  const baseline = emptyBaseline();

  for (const day of TRAINING_DAYS) {
    for (const exerciseKey of day.exerciseKeys) {
      const config = EXERCISES[exerciseKey];
      if (!config) continue;
      const scheme = config.weekSchemes[weekIndex];
      if (!scheme) continue;
      baseline[config.primaryMuscle] += scheme.sets;
    }
  }

  for (const exerciseKey of TRICEPS_CONTRIB_KEYS) {
    const config = EXERCISES[exerciseKey];
    const contrib = MUSCLE_CONTRIB[exerciseKey]?.triceps;
    if (!config || !contrib) continue;

    const appearsInProgram = TRAINING_DAYS.some(day => day.exerciseKeys.includes(exerciseKey));
    if (!appearsInProgram) continue;

    const scheme = config.weekSchemes[weekIndex];
    if (!scheme) continue;
    baseline.triceps += scheme.sets * contrib;
  }

  for (const muscle of Object.keys(baseline) as SplitMuscleId[]) {
    baseline[muscle] = Math.round(baseline[muscle]);
  }

  return baseline;
}

function daysForMuscle(split: CustomSplit, muscle: SplitMuscleId): SplitDayConfig[] {
  return split.days
    .filter(day => day.muscles.includes(muscle))
    .sort((a, b) => a.dayNumber - b.dayNumber);
}

function intensityMultiplier(
  split: CustomSplit,
  muscle: SplitMuscleId,
  dayNumber: 1 | 2 | 3,
): number {
  if (!split.varyIntensity) return 1;
  const ordered = daysForMuscle(split, muscle);
  const index = ordered.findIndex(day => day.dayNumber === dayNumber);
  if (index <= 0) return 1;
  return 0.9;
}

export interface BuildPreviewParams {
  split: CustomSplit;
  dayNumber: 1 | 2 | 3;
  weekIndex: number;
  savedExercises: SavedExercise[];
}

/** Exercise keys allowed on a day (max 4, max 2 legs from split.legExercises). */
export function exerciseKeysForDay(split: CustomSplit, dayNumber: 1 | 2 | 3): string[] {
  const day = split.days.find(entry => entry.dayNumber === dayNumber);
  if (!day) return [];

  const legKeys = new Set<string>(normalizeLegExercises(split.legExercises));
  const keys: string[] = [];

  for (const muscle of day.muscles) {
    if (keys.length >= SPLIT_DAY_LIMITS.MAX_EXERCISES_PER_DAY) break;

    const pool = muscle === 'legs' ? [...legKeys] : EXERCISES_BY_MUSCLE[muscle];

    for (const exerciseKey of pool) {
      if (keys.length >= SPLIT_DAY_LIMITS.MAX_EXERCISES_PER_DAY) break;
      if (!EXERCISES[exerciseKey]) continue;
      if (keys.includes(exerciseKey)) continue;
      keys.push(exerciseKey);
    }
  }

  for (const [exerciseKey, overrideDay] of Object.entries(split.exerciseDayOverrides ?? {})) {
    if (overrideDay !== dayNumber || !EXERCISES[exerciseKey]) continue;
    if (keys.includes(exerciseKey)) continue;
    const config = EXERCISES[exerciseKey];
    if (config.primaryMuscle === 'legs' && !legKeys.has(exerciseKey)) continue;
    if (keys.length >= SPLIT_DAY_LIMITS.MAX_EXERCISES_PER_DAY) {
      keys.pop();
    }
    keys.push(exerciseKey);
  }

  return keys.slice(0, SPLIT_DAY_LIMITS.MAX_EXERCISES_PER_DAY);
}

export function buildDayPreview(params: BuildPreviewParams): TrainingExerciseRow[] {
  const {split, dayNumber, weekIndex, savedExercises} = params;
  const day = split.days.find(entry => entry.dayNumber === dayNumber);
  if (!day) return [];

  const savedByKey = new Map(savedExercises.map(saved => [saved.exerciseKey, saved]));
  const allowedKeys = exerciseKeysForDay(split, dayNumber);
  const rows: TrainingExerciseRow[] = [];

  for (const exerciseKey of allowedKeys) {
    const config = EXERCISES[exerciseKey];
    if (!config) continue;

    const overrideDay = split.exerciseDayOverrides?.[exerciseKey];
    const muscle = config.primaryMuscle;
    const muscleDays = daysForMuscle(split, muscle);

    let targetDays = muscleDays;
    if (overrideDay) {
      const overrideConfig = split.days.find(entry => entry.dayNumber === overrideDay);
      targetDays = overrideConfig ? [overrideConfig] : [];
    }

    if (!targetDays.some(entry => entry.dayNumber === dayNumber)) continue;
    if (!day.muscles.includes(muscle) && !overrideDay) continue;

    const schemeBase = config.weekSchemes[weekIndex];
    if (!schemeBase) continue;

    const weeklySets = schemeBase.sets;
    const dayIndex = targetDays.findIndex(entry => entry.dayNumber === dayNumber);
    if (dayIndex < 0) continue;

    const distributed = distributeSets(weeklySets, targetDays.length);
    const sets = distributed[dayIndex] ?? weeklySets;
    if (sets <= 0) continue;

    const scheme: WeekScheme = {sets, reps: schemeBase.reps};
    const intensityMul = intensityMultiplier(split, muscle, dayNumber);
    const percentage = config.percentages[weekIndex];
    const saved = savedByKey.get(exerciseKey);

    let weight = 0;
    let extraWeight: number | undefined;

    if (split.weightMode === 'scheme_only') {
      weight = 0;
    } else if (split.weightMode === 'fixed') {
      const fixed = split.fixedWeights?.[exerciseKey]?.[weekIndex];
      weight = typeof fixed === 'number' && fixed > 0 ? fixed : 0;
    } else if (saved && typeof percentage === 'number') {
      const adjustedPct = percentage * intensityMul;
      const totalWeight = calcWorkingWeight(saved.oneRM, adjustedPct, config);
      weight = totalWeight;
      if (config.isPullup && saved.bodyWeight != null) {
        extraWeight = totalWeight - saved.bodyWeight;
      }
    }

    const workingSets = buildLinearWorkingSets(weight, scheme.sets, scheme.reps);

    rows.push({
      key: exerciseKey,
      name: config.name,
      weight,
      scheme,
      totalReps: workingSets.reduce((sum, set) => sum + set.reps, 0),
      exerciseType: config.type,
      warmupStep: config.warmupStep,
      isPullup: config.isPullup,
      extraWeight,
      progressionMode: 'linear',
      workingSets,
      warmupTopWeight: weight,
    });
  }

  return rows.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
}

export function createDefaultSplit(name = 'Мой сплит'): CustomSplit {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name,
    daysPerWeek: 3,
    varyIntensity: true,
    weightMode: 'progression',
    days: [
      {dayNumber: 1, muscles: ['chest', 'biceps']},
      {dayNumber: 2, muscles: ['legs', 'shoulders']},
      {dayNumber: 3, muscles: ['back', 'triceps']},
    ],
    legExercises: [...DEFAULT_LEG_EXERCISES],
    createdAt: now,
    updatedAt: now,
  };
}

export function mergeToTwoDays(days: SplitDayConfig[]): SplitDayConfig[] {
  const day1 = days.find(day => day.dayNumber === 1);
  const day2 = days.find(day => day.dayNumber === 2);
  const day3 = days.find(day => day.dayNumber === 3);

  const mergedMuscles = [
    ...(day1?.muscles ?? []),
    ...(day2?.muscles ?? []),
    ...(day3?.muscles ?? ['back', 'triceps']),
  ];

  const unique = [...new Set(mergedMuscles)] as SplitMuscleId[];

  return [
    {dayNumber: 1, muscles: day1?.muscles ?? ['chest', 'biceps'], label: day1?.label},
    {
      dayNumber: 2,
      muscles: unique.filter(muscle => !(day1?.muscles ?? []).includes(muscle)),
      label: day2?.label,
    },
  ];
}

export function allMusclesAssigned(split: CustomSplit): boolean {
  const assigned = new Set<SplitMuscleId>();
  for (const day of split.days) {
    if (day.muscles.length === 0) return false;
    for (const muscle of day.muscles) {
      if (assigned.has(muscle)) return false;
      assigned.add(muscle);
    }
  }
  return assigned.size === 6;
}

export function validateSplit(split: CustomSplit): string | null {
  if (!split.name.trim()) return 'Укажите название сплита';
  if (split.name.length > 40) return 'Название не длиннее 40 символов';
  if (split.daysPerWeek !== 2 && split.daysPerWeek !== 3) return 'Недопустимое число дней';
  if (split.days.length !== split.daysPerWeek) return 'Число дней не совпадает с настройкой';
  if (!allMusclesAssigned(split)) return 'Назначьте все 6 групп мышц по одному разу';
  return null;
}
