import type {SplitMuscleId, TrainingDayDef} from '../../types/index.ts';

export type ExerciseCategoryV3 = 'barbell' | 'dumbbell' | 'bodyweight' | 'machine';

export interface ExerciseConfigV3 {
  name: string;
  alternativeName?: string;
  category: ExerciseCategoryV3;
  step: number;
  primaryMuscle: SplitMuscleId;
  isPullup?: boolean;
}

export const EXERCISES_V3: Record<string, ExerciseConfigV3> = {
  bench: {
    name: 'Жим штанги лежа',
    alternativeName: 'Жим в хаммере',
    category: 'barbell',
    step: 2.5,
    primaryMuscle: 'chest',
  },
  barbellCurl: {
    name: 'Подъём штанги на бицепс',
    category: 'barbell',
    step: 2.5,
    primaryMuscle: 'biceps',
  },
  inclineDbPress: {
    name: 'Жим гантелей на наклонной 30–40°',
    category: 'dumbbell',
    step: 2.0,
    primaryMuscle: 'chest',
  },
  scottCurl: {
    name: 'Сгибания на скамье Скотта',
    category: 'dumbbell',
    step: 2.0,
    primaryMuscle: 'biceps',
  },
  crunch: {
    name: 'Скручивания для пресса',
    category: 'bodyweight',
    step: 0,
    primaryMuscle: 'chest',
  },
  squat: {
    name: 'Приседания со штангой',
    alternativeName: 'Приседания в гакке',
    category: 'barbell',
    step: 2.5,
    primaryMuscle: 'legs',
  },
  lateralRaise: {
    name: 'Махи гантелей в стороны',
    category: 'dumbbell',
    step: 2.0,
    primaryMuscle: 'shoulders',
  },
  lunge: {
    name: 'Выпады с гантелями',
    category: 'dumbbell',
    step: 2.0,
    primaryMuscle: 'legs',
  },
  facePull: {
    name: 'Лицевая тяга блока',
    alternativeName: 'Махи в наклоне / Пек-Дек',
    category: 'machine',
    step: 2.0,
    primaryMuscle: 'shoulders',
  },
  legExt: {
    name: 'Разгибания ног сидя',
    category: 'machine',
    step: 2.0,
    primaryMuscle: 'legs',
  },
  ohp: {
    name: 'Армейский жим',
    alternativeName: 'Жим гантелей сидя',
    category: 'barbell',
    step: 2.5,
    primaryMuscle: 'shoulders',
  },
  pullUp: {
    name: 'Подтягивания',
    alternativeName: 'Гравитрон / тяга верт. блока',
    category: 'barbell',
    step: 2.5,
    primaryMuscle: 'back',
    isPullup: true,
  },
  closeGripBench: {
    name: 'Жим узким хватом',
    alternativeName: 'Отжимания на брусьях',
    category: 'barbell',
    step: 2.5,
    primaryMuscle: 'triceps',
  },
  cableRow: {
    name: 'Тяга горизонтального блока',
    alternativeName: 'Тяга гантели в наклоне',
    category: 'machine',
    step: 2.0,
    primaryMuscle: 'back',
  },
  tricepsPushdown: {
    name: 'Разгибания на блоке',
    category: 'machine',
    step: 2.0,
    primaryMuscle: 'triceps',
  },
  deadlift: {
    name: 'Становая тяга',
    alternativeName: 'Мёртвая тяга',
    category: 'barbell',
    step: 2.5,
    // Primary: glutes + hamstrings; erectors assist — classify as legs.
    primaryMuscle: 'legs',
  },
  legPress: {
    name: 'Жим платформы ногами',
    category: 'barbell',
    step: 2.5,
    primaryMuscle: 'legs',
  },
  bentOverRow: {
    name: 'Тяга штанги в наклоне',
    alternativeName: 'Тяга в хаммере',
    category: 'barbell',
    step: 2.5,
    primaryMuscle: 'back',
  },
  legCurl: {
    name: 'Сгибания ног в тренажёре',
    category: 'machine',
    step: 2.0,
    primaryMuscle: 'legs',
  },
  calfRaise: {
    name: 'Подъёмы на носки',
    category: 'machine',
    step: 2.0,
    primaryMuscle: 'legs',
  },
};

export const TRAINING_DAYS_V3: TrainingDayDef[] = [
  {
    dayNumber: 1,
    name: 'Грудь + бицепс + пресс',
    exerciseKeys: ['bench', 'barbellCurl', 'inclineDbPress', 'scottCurl', 'crunch'],
  },
  {
    dayNumber: 2,
    name: 'Ноги + плечи',
    exerciseKeys: ['squat', 'lateralRaise', 'lunge', 'facePull', 'legExt'],
  },
  {
    dayNumber: 3,
    name: 'Плечи + спина + трицепс',
    exerciseKeys: ['ohp', 'pullUp', 'closeGripBench', 'cableRow', 'tricepsPushdown'],
  },
  {
    dayNumber: 4,
    name: 'Спина + ноги',
    exerciseKeys: ['deadlift', 'legPress', 'bentOverRow', 'legCurl', 'calfRaise'],
  },
];

export const CATEGORY_LABELS_V3: Record<ExerciseCategoryV3, string> = {
  barbell: 'Штанга',
  dumbbell: 'Гантели',
  bodyweight: 'Собственный вес',
  machine: 'Тренажёр',
};

export const CATEGORY_COLORS_V3: Record<ExerciseCategoryV3, string> = {
  barbell: '#ffb020',
  dumbbell: '#5ba4ff',
  bodyweight: '#c4a1ff',
  machine: '#3affb8',
};

export const EXERCISE_ORDER_V3 = [...new Set(TRAINING_DAYS_V3.flatMap(day => day.exerciseKeys))];

export const EXERCISE_KEYS_V3 = Object.keys(EXERCISES_V3);
export const EX_COUNT_V3 = EXERCISE_KEYS_V3.length;

export function isV3ExerciseKey(key: string): boolean {
  return key in EXERCISES_V3;
}
