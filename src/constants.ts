import type { TrainingDayDef, ExerciseConfig, MuscleMeta } from './types';

// ============================================================
// ТРЕНИРОВОЧНЫЙ СПЛИТ — 3-дневная программа
// День 1: жим + ноги, День 2: ноги + тяга, День 3: плечи + ноги
// ============================================================
export const TRAINING_DAYS: TrainingDayDef[] = [
  { dayNumber: 1, name: 'Толчок + Ноги',  exerciseKeys: ['bench', 'gluteBridge', 'legExt', 'curl', 'lateralRaise'] },
  { dayNumber: 2, name: 'Ноги + Тяга',    exerciseKeys: ['squat', 'dbPress', 'pullUp', 'legExt'] },
  { dayNumber: 3, name: 'Плечи + Ноги',   exerciseKeys: ['ohp', 'row', 'gluteBridge', 'legCurl'] },
]

// ============================================================
// УПРАЖНЕНИЯ — конфиг каждого упражнения
// ============================================================
export const EXERCISES: Record<string, ExerciseConfig> = {
  bench: {
    name: 'Жим штанги лёжа', type: 'A', step: 2.5, warmupStep: 5,
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      {sets:4,reps:8},{sets:4,reps:7},{sets:4,reps:6},{sets:4,reps:5},
      {sets:4,reps:6},{sets:4,reps:5},{sets:4,reps:4},{sets:4,reps:3},
    ],
  },
  squat: {
    name: 'Приседания со штангой', type: 'A', step: 2.5, warmupStep: 5,
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      {sets:4,reps:8},{sets:4,reps:7},{sets:4,reps:6},{sets:4,reps:5},
      {sets:4,reps:6},{sets:4,reps:5},{sets:4,reps:4},{sets:4,reps:3},
    ],
  },
  gluteBridge: {
    name: 'Ягодичный мост', type: 'A', step: 2.5, warmupStep: 5,
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      {sets:4,reps:8},{sets:4,reps:7},{sets:4,reps:6},{sets:4,reps:5},
      {sets:4,reps:6},{sets:4,reps:5},{sets:4,reps:4},{sets:4,reps:3},
    ],
  },
  row: {
    name: 'Тяга штанги к поясу', type: 'A', step: 2.5, warmupStep: 5,
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      {sets:4,reps:8},{sets:4,reps:7},{sets:4,reps:6},{sets:4,reps:5},
      {sets:4,reps:6},{sets:4,reps:5},{sets:4,reps:4},{sets:4,reps:3},
    ],
  },
  pullUp: {
    name: 'Подтягивания', type: 'A', step: 2.5, warmupStep: 2.5,
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      {sets:3,reps:8},{sets:4,reps:7},{sets:4,reps:6},{sets:4,reps:5},
      {sets:3,reps:7},{sets:4,reps:6},{sets:3,reps:5},{sets:4,reps:4},
    ],
    isPullup: true,
  },
  ohp: {
    name: 'Жим штанги стоя', type: 'B', step: 2.5, warmupStep: 2.5,
    percentages: [68, 75, 79, 85, 71, 77, 83, 88],
    weekSchemes: [
      {sets:4,reps:8},{sets:4,reps:7},{sets:4,reps:6},{sets:4,reps:5},
      {sets:4,reps:6},{sets:4,reps:5},{sets:4,reps:4},{sets:4,reps:3},
    ],
  },
  curl: {
    name: 'Подъём штанги на бицепс', type: 'B', step: 2.5, warmupStep: 2.5,
    percentages: [68, 75, 79, 85, 71, 77, 83, 88],
    weekSchemes: [
      {sets:3,reps:8},{sets:4,reps:6},{sets:4,reps:5},{sets:4,reps:4},
      {sets:3,reps:8},{sets:4,reps:6},{sets:3,reps:5},{sets:3,reps:4},
    ],
  },
  dbPress: {
    name: 'Жим гантелей лёжа', type: 'C', step: 2, warmupStep: 2,
    percentages: [65, 68, 72, 75, 69, 73, 77, 80],
    weekSchemes: [
      {sets:3,reps:10},{sets:3,reps:10},{sets:3,reps:8},{sets:3,reps:8},
      {sets:4,reps:8}, {sets:3,reps:8}, {sets:3,reps:8},{sets:4,reps:6},
    ],
  },
  lateralRaise: {
    name: 'Махи с гантелями в стороны', type: 'C', step: 1, warmupStep: 1,
    percentages: [65, 68, 72, 75, 69, 73, 77, 80],
    weekSchemes: [
      {sets:3,reps:10},{sets:3,reps:10},{sets:3,reps:8},{sets:3,reps:8},
      {sets:4,reps:8}, {sets:3,reps:8}, {sets:3,reps:8},{sets:4,reps:6},
    ],
  },
  legExt: {
    name: 'Разгибания ног', type: 'D', step: 3, warmupStep: 3,
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      {sets:3,reps:8},{sets:4,reps:7},{sets:4,reps:6},{sets:4,reps:5},
      {sets:3,reps:7},{sets:4,reps:6},{sets:3,reps:5},{sets:4,reps:4},
    ],
  },
  legCurl: {
    name: 'Сгибания ног', type: 'D', step: 3, warmupStep: 3,
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      {sets:3,reps:8},{sets:4,reps:7},{sets:4,reps:6},{sets:4,reps:5},
      {sets:3,reps:7},{sets:4,reps:6},{sets:3,reps:5},{sets:4,reps:4},
    ],
  },
}

export const TYPE_LABELS: Record<string, string> = {
  A: 'Тип А — Штанга крупная', B: 'Тип Б — Штанга малая',
  C: 'Тип В — Гантели',        D: 'Тип Г — Тренажёр',
}

export const EX_COUNT = Object.keys(EXERCISES).length // 11

export const TYPE_COLORS: Record<string, string> = {
  A: '#e8ff3a', B: '#ff9f40', C: '#5ba4ff', D: '#3affb8',
}

export const SHORT_NAMES: Record<string, string> = {
  bench: 'Жим лёжа', squat: 'Присед', gluteBridge: 'Яг. мост', row: 'Тяга к поясу',
  pullUp: 'Подтяг.', ohp: 'Жим стоя', curl: 'Бицепс', dbPress: 'Жим ГН',
  lateralRaise: 'Махи', legExt: 'Разг. ног', legCurl: 'Сгиб. ног',
}

export const WHEEL_ORDER: string[] = [
  'bench', 'squat', 'gluteBridge', 'row',
  'ohp', 'curl',
  'dbPress', 'lateralRaise',
  'pullUp', 'legExt', 'legCurl',
]

export const MUSCLE_CONTRIB: Record<string, Record<string, number>> = {
  bench:        { chest: 1.0, triceps: 0.4, front_delt: 0.2 },
  gluteBridge:  { glutes: 0.8, hamstrings: 0.2 },
  squat:        { quads: 0.6, glutes: 0.4 },
  row:          { lats: 0.5, traps: 0.3, biceps: 0.2, rear_delt: 0.2 },
  pullUp:       { lats: 0.7, biceps: 0.3 }, // подтягивания = те же мышцы что и верт. тяга
  ohp:          { front_delt: 0.7, mid_delt: 0.3, triceps: 0.3 },
  curl:         { biceps: 1.0 },
  dbPress:      { chest: 0.7, triceps: 0.3, front_delt: 0.2 },
  lateralRaise: { mid_delt: 1.0 },
  legExt:       { quads: 1.0 },
  legCurl:      { hamstrings: 1.0 },
}

export const MUSCLE_META: Record<string, MuscleMeta> = {
  // Push — yellow family
  chest:      { label: 'Грудь',          color: '#e8ff3a', catKey: 'push' },
  front_delt: { label: 'Перед. дельта',  color: '#cce000', catKey: 'push' },
  mid_delt:   { label: 'Сред. дельта',   color: '#aabf00', catKey: 'push' },
  triceps:    { label: 'Трицепс',        color: '#8ea000', catKey: 'push' },
  // Pull — blue family
  lats:       { label: 'Широчайшие',     color: '#5ba4ff', catKey: 'pull' },
  biceps:     { label: 'Бицепс',         color: '#4090ee', catKey: 'pull' },
  traps:      { label: 'Трапеции',       color: '#2b77d4', catKey: 'pull' },
  rear_delt:  { label: 'Задн. дельта',   color: '#1a5eb8', catKey: 'pull' },
  // Legs — green family
  quads:      { label: 'Квадрицепсы',    color: '#3affb8', catKey: 'legs' },
  glutes:     { label: 'Ягодичные',      color: '#00e099', catKey: 'legs' },
  hamstrings: { label: 'Бицепс бедра',   color: '#00b878', catKey: 'legs' },
}

export const MUSCLE_ORDER = [
  'chest','front_delt','mid_delt','triceps',
  'lats','biceps','traps','rear_delt',
  'quads','glutes','hamstrings',
]

export const CAT_ORDER = ['push','pull','legs'] as const

export const CAT_META: Record<string, { label: string; color: string }> = {
  push: { label: 'Жим',  color: '#e8ff3a' },
  pull: { label: 'Тяга', color: '#5ba4ff' },
  legs: { label: 'Ноги', color: '#3affb8' },
}
