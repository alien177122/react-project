import type {ExerciseConfig, TrainingDayDef} from '../types/index.ts';

export const TRAINING_DAYS: TrainingDayDef[] = [
  {
    dayNumber: 1,
    name: 'Толчок + Ноги',
    exerciseKeys: ['bench', 'legPress', 'legExt', 'curl', 'lateralRaise'],
  },
  {dayNumber: 2, name: 'Ноги + Тяга', exerciseKeys: ['squat', 'dbPress', 'pullUp', 'legExt']},
  {dayNumber: 3, name: 'Плечи + Ноги', exerciseKeys: ['ohp', 'row', 'gluteBridge', 'legCurl']},
];

export const EXERCISES: Record<string, ExerciseConfig> = {
  bench: {
    name: 'Жим штанги лёжа',
    type: 'A',
    step: 2.5,
    warmupStep: 5,
    primaryMuscle: 'chest',
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      {sets: 4, reps: 8},
      {sets: 4, reps: 7},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 4},
      {sets: 4, reps: 3},
    ],
  },
  squat: {
    name: 'Приседания со штангой',
    type: 'A',
    step: 2.5,
    warmupStep: 5,
    primaryMuscle: 'legs',
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      {sets: 4, reps: 8},
      {sets: 4, reps: 7},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 4},
      {sets: 4, reps: 3},
    ],
  },
  gluteBridge: {
    name: 'Ягодичный мост',
    type: 'A',
    step: 2.5,
    warmupStep: 5,
    primaryMuscle: 'legs',
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      {sets: 4, reps: 8},
      {sets: 4, reps: 7},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 4},
      {sets: 4, reps: 3},
    ],
  },
  legPress: {
    name: 'Жим ногами',
    type: 'D',
    step: 3,
    warmupStep: 5,
    primaryMuscle: 'legs',
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      {sets: 3, reps: 8},
      {sets: 4, reps: 7},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 3, reps: 7},
      {sets: 4, reps: 6},
      {sets: 3, reps: 5},
      {sets: 4, reps: 4},
    ],
  },
  row: {
    name: 'Тяга штанги к поясу',
    type: 'A',
    step: 2.5,
    warmupStep: 5,
    primaryMuscle: 'back',
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      {sets: 4, reps: 8},
      {sets: 4, reps: 7},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 4},
      {sets: 4, reps: 3},
    ],
  },
  pullUp: {
    name: 'Подтягивания',
    type: 'A',
    step: 2.5,
    warmupStep: 2.5,
    primaryMuscle: 'back',
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      {sets: 3, reps: 8},
      {sets: 4, reps: 7},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 3, reps: 7},
      {sets: 4, reps: 6},
      {sets: 3, reps: 5},
      {sets: 4, reps: 4},
    ],
    usesBodyWeight: true,
    isPullup: true,
  },
  ohp: {
    name: 'Жим штанги стоя',
    type: 'B',
    step: 2.5,
    warmupStep: 2.5,
    primaryMuscle: 'shoulders',
    percentages: [68, 75, 79, 85, 71, 77, 83, 88],
    weekSchemes: [
      {sets: 4, reps: 8},
      {sets: 4, reps: 7},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 4},
      {sets: 4, reps: 3},
    ],
  },
  curl: {
    name: 'Подъём штанги на бицепс',
    type: 'B',
    step: 2.5,
    warmupStep: 2.5,
    primaryMuscle: 'biceps',
    percentages: [68, 75, 79, 85, 71, 77, 83, 88],
    weekSchemes: [
      {sets: 3, reps: 8},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 4},
      {sets: 3, reps: 8},
      {sets: 4, reps: 6},
      {sets: 3, reps: 5},
      {sets: 3, reps: 4},
    ],
  },
  dbPress: {
    name: 'Жим гантелей лёжа',
    type: 'C',
    step: 2,
    warmupStep: 2,
    primaryMuscle: 'chest',
    percentages: [65, 68, 72, 75, 69, 73, 77, 80],
    weekSchemes: [
      {sets: 3, reps: 10},
      {sets: 3, reps: 10},
      {sets: 3, reps: 8},
      {sets: 3, reps: 8},
      {sets: 4, reps: 8},
      {sets: 3, reps: 8},
      {sets: 3, reps: 8},
      {sets: 4, reps: 6},
    ],
  },
  lateralRaise: {
    name: 'Махи с гантелями в стороны',
    type: 'C',
    step: 1,
    warmupStep: 1,
    primaryMuscle: 'shoulders',
    percentages: [65, 68, 72, 75, 69, 73, 77, 80],
    weekSchemes: [
      {sets: 3, reps: 10},
      {sets: 3, reps: 10},
      {sets: 3, reps: 8},
      {sets: 3, reps: 8},
      {sets: 4, reps: 8},
      {sets: 3, reps: 8},
      {sets: 3, reps: 8},
      {sets: 4, reps: 6},
    ],
  },
  legExt: {
    name: 'Разгибания ног',
    type: 'D',
    step: 3,
    warmupStep: 3,
    primaryMuscle: 'legs',
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      {sets: 3, reps: 8},
      {sets: 4, reps: 7},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 3, reps: 7},
      {sets: 4, reps: 6},
      {sets: 3, reps: 5},
      {sets: 4, reps: 4},
    ],
  },
  legCurl: {
    name: 'Сгибания ног',
    type: 'D',
    step: 3,
    warmupStep: 3,
    primaryMuscle: 'legs',
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      {sets: 3, reps: 8},
      {sets: 4, reps: 7},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 3, reps: 7},
      {sets: 4, reps: 6},
      {sets: 3, reps: 5},
      {sets: 4, reps: 4},
    ],
  },
};

/**
 * Split-only catalog entries (not Program 2.0 training unlock / calculator wheel).
 * Added for constructor muscle pools (chest dips, legs deadlift, triceps isolation).
 */
export const SPLIT_EXTRA_EXERCISES: Record<string, ExerciseConfig> = {
  dips: {
    name: 'Брусья с весом',
    type: 'A',
    step: 2.5,
    warmupStep: 2.5,
    primaryMuscle: 'chest',
    percentages: [66, 70, 74, 79, 72, 76, 81, 86],
    weekSchemes: [
      {sets: 4, reps: 8},
      {sets: 4, reps: 7},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 4},
      {sets: 4, reps: 3},
    ],
    usesBodyWeight: true,
  },
  deadlift: {
    name: 'Становая тяга',
    type: 'A',
    step: 2.5,
    warmupStep: 5,
    // Primary: glutes + hamstrings; erectors assist — classify as legs for split tint/filters.
    primaryMuscle: 'legs',
    percentages: [65, 70, 75, 80, 72, 77, 82, 87],
    weekSchemes: [
      {sets: 3, reps: 6},
      {sets: 3, reps: 5},
      {sets: 4, reps: 4},
      {sets: 4, reps: 3},
      {sets: 3, reps: 5},
      {sets: 4, reps: 4},
      {sets: 3, reps: 3},
      {sets: 3, reps: 2},
    ],
  },
  /** Same type-B volume/percent program as curl; isolation for triceps. */
  lyingTricepExt: {
    name: 'Разгибание на трицепс лёжа',
    type: 'B',
    step: 2.5,
    warmupStep: 2.5,
    primaryMuscle: 'triceps',
    percentages: [68, 75, 79, 85, 71, 77, 83, 88],
    weekSchemes: [
      {sets: 3, reps: 8},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 4, reps: 4},
      {sets: 3, reps: 8},
      {sets: 4, reps: 6},
      {sets: 3, reps: 5},
      {sets: 3, reps: 4},
    ],
  },
  /** Seated calf machine — type D (machine calc) like leg curl / leg extension. */
  seatedCalfRaise: {
    name: 'Подъёмы на икры сидя в тренажёре',
    type: 'D',
    step: 3,
    warmupStep: 3,
    primaryMuscle: 'legs',
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      {sets: 3, reps: 8},
      {sets: 4, reps: 7},
      {sets: 4, reps: 6},
      {sets: 4, reps: 5},
      {sets: 3, reps: 7},
      {sets: 4, reps: 6},
      {sets: 3, reps: 5},
      {sets: 4, reps: 4},
    ],
  },
};

/** Program 2.0 + split extras — lookups for constructor / persistence of split 1RM. */
export const CATALOG_EXERCISES: Record<string, ExerciseConfig> = {
  ...EXERCISES,
  ...SPLIT_EXTRA_EXERCISES,
};

export const TYPE_LABELS: Record<string, string> = {
  A: 'Тип А — Штанга крупная',
  B: 'Тип Б — Штанга малая',
  C: 'Тип В — Гантели',
  D: 'Тип Г — Тренажёр',
};

/** Program 2.0 unlock / saved-list limit (canon: 12). */
export const EX_COUNT = Object.keys(EXERCISES).length;

export const TYPE_COLORS: Record<string, string> = {
  A: '#ffb020',
  B: '#ffc94d',
  C: '#5ba4ff',
  D: '#3affb8',
};

export const SHORT_NAMES: Record<string, string> = {
  bench: 'Жим лёжа',
  dips: 'Брусья',
  squat: 'Присед',
  gluteBridge: 'Яг. мост',
  deadlift: 'Становая',
  legPress: 'Жим ног',
  row: 'Тяга к поясу',
  pullUp: 'Подтяг.',
  ohp: 'Жим стоя',
  curl: 'Бицепс',
  lyingTricepExt: 'Трицепс лёжа',
  dbPress: 'Жим ГН',
  lateralRaise: 'Махи',
  legExt: 'Разг. ног',
  legCurl: 'Сгиб. ног',
  seatedCalfRaise: 'Икры сидя',
};

/** Calculator / training picker order — Program 2.0 only. */
export const WHEEL_ORDER: string[] = [
  'bench',
  'squat',
  'gluteBridge',
  'legPress',
  'row',
  'ohp',
  'curl',
  'dbPress',
  'lateralRaise',
  'pullUp',
  'legCurl',
  'legExt',
];

/**
 * Split picker order: training set + extras.
 * Legs compounds first (deadlift → bridge → squat → press), isolation last.
 */
export const CATALOG_WHEEL_ORDER: string[] = [
  'bench',
  'dips',
  'deadlift',
  'gluteBridge',
  'squat',
  'legPress',
  'row',
  'ohp',
  'curl',
  'lyingTricepExt',
  'dbPress',
  'lateralRaise',
  'pullUp',
  'legCurl',
  'legExt',
  'seatedCalfRaise',
];

export function getCatalogExercise(key: string): ExerciseConfig | undefined {
  return CATALOG_EXERCISES[key];
}

export function isCatalogExerciseKey(key: string): boolean {
  return Object.prototype.hasOwnProperty.call(CATALOG_EXERCISES, key);
}
