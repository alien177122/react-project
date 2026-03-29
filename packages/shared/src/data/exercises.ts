import type { ExerciseConfig, TrainingDayDef } from '../types/index.ts'

export const TRAINING_DAYS: TrainingDayDef[] = [
  { dayNumber: 1, name: 'Толчок + Ноги', exerciseKeys: ['bench', 'legPress', 'legExt', 'curl', 'lateralRaise'] },
  { dayNumber: 2, name: 'Ноги + Тяга', exerciseKeys: ['squat', 'dbPress', 'pullUp', 'legExt'] },
  { dayNumber: 3, name: 'Плечи + Ноги', exerciseKeys: ['ohp', 'row', 'gluteBridge', 'legCurl'] },
]

export const EXERCISES: Record<string, ExerciseConfig> = {
  bench: {
    name: 'Жим штанги лёжа', type: 'A', step: 2.5, warmupStep: 5,
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      { sets: 4, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 4, reps: 6 }, { sets: 4, reps: 5 }, { sets: 4, reps: 4 }, { sets: 4, reps: 3 },
    ],
  },
  squat: {
    name: 'Приседания со штангой', type: 'A', step: 2.5, warmupStep: 5,
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      { sets: 4, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 4, reps: 6 }, { sets: 4, reps: 5 }, { sets: 4, reps: 4 }, { sets: 4, reps: 3 },
    ],
  },
  gluteBridge: {
    name: 'Ягодичный мост', type: 'A', step: 2.5, warmupStep: 5,
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      { sets: 4, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 4, reps: 6 }, { sets: 4, reps: 5 }, { sets: 4, reps: 4 }, { sets: 4, reps: 3 },
    ],
  },
  legPress: {
    name: 'Жим ногами', type: 'D', step: 3, warmupStep: 5,
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      { sets: 3, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 3, reps: 7 }, { sets: 4, reps: 6 }, { sets: 3, reps: 5 }, { sets: 4, reps: 4 },
    ],
  },
  row: {
    name: 'Тяга штанги к поясу', type: 'A', step: 2.5, warmupStep: 5,
    percentages: [68, 73, 78, 83, 75, 79, 85, 90],
    weekSchemes: [
      { sets: 4, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 4, reps: 6 }, { sets: 4, reps: 5 }, { sets: 4, reps: 4 }, { sets: 4, reps: 3 },
    ],
  },
  pullUp: {
    name: 'Подтягивания', type: 'A', step: 2.5, warmupStep: 2.5,
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      { sets: 3, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 3, reps: 7 }, { sets: 4, reps: 6 }, { sets: 3, reps: 5 }, { sets: 4, reps: 4 },
    ],
    isPullup: true,
  },
  ohp: {
    name: 'Жим штанги стоя', type: 'B', step: 2.5, warmupStep: 2.5,
    percentages: [68, 75, 79, 85, 71, 77, 83, 88],
    weekSchemes: [
      { sets: 4, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 4, reps: 6 }, { sets: 4, reps: 5 }, { sets: 4, reps: 4 }, { sets: 4, reps: 3 },
    ],
  },
  curl: {
    name: 'Подъём штанги на бицепс', type: 'B', step: 2.5, warmupStep: 2.5,
    percentages: [68, 75, 79, 85, 71, 77, 83, 88],
    weekSchemes: [
      { sets: 3, reps: 8 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 }, { sets: 4, reps: 4 },
      { sets: 3, reps: 8 }, { sets: 4, reps: 6 }, { sets: 3, reps: 5 }, { sets: 3, reps: 4 },
    ],
  },
  dbPress: {
    name: 'Жим гантелей лёжа', type: 'C', step: 2, warmupStep: 2,
    percentages: [65, 68, 72, 75, 69, 73, 77, 80],
    weekSchemes: [
      { sets: 3, reps: 10 }, { sets: 3, reps: 10 }, { sets: 3, reps: 8 }, { sets: 3, reps: 8 },
      { sets: 4, reps: 8 }, { sets: 3, reps: 8 }, { sets: 3, reps: 8 }, { sets: 4, reps: 6 },
    ],
  },
  lateralRaise: {
    name: 'Махи с гантелями в стороны', type: 'C', step: 1, warmupStep: 1,
    percentages: [65, 68, 72, 75, 69, 73, 77, 80],
    weekSchemes: [
      { sets: 3, reps: 10 }, { sets: 3, reps: 10 }, { sets: 3, reps: 8 }, { sets: 3, reps: 8 },
      { sets: 4, reps: 8 }, { sets: 3, reps: 8 }, { sets: 3, reps: 8 }, { sets: 4, reps: 6 },
    ],
  },
  legExt: {
    name: 'Разгибания ног', type: 'D', step: 3, warmupStep: 3,
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      { sets: 3, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 3, reps: 7 }, { sets: 4, reps: 6 }, { sets: 3, reps: 5 }, { sets: 4, reps: 4 },
    ],
  },
  legCurl: {
    name: 'Сгибания ног', type: 'D', step: 3, warmupStep: 3,
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      { sets: 3, reps: 8 }, { sets: 4, reps: 7 }, { sets: 4, reps: 6 }, { sets: 4, reps: 5 },
      { sets: 3, reps: 7 }, { sets: 4, reps: 6 }, { sets: 3, reps: 5 }, { sets: 4, reps: 4 },
    ],
  },
}

export const TYPE_LABELS: Record<string, string> = {
  A: 'Тип А — Штанга крупная',
  B: 'Тип Б — Штанга малая',
  C: 'Тип В — Гантели',
  D: 'Тип Г — Тренажёр',
}

export const EX_COUNT = Object.keys(EXERCISES).length

export const TYPE_COLORS: Record<string, string> = {
  A: '#ff6b35',
  B: '#ff9f40',
  C: '#5ba4ff',
  D: '#3affb8',
}

export const SHORT_NAMES: Record<string, string> = {
  bench: 'Жим лёжа',
  squat: 'Присед',
  gluteBridge: 'Яг. мост',
  legPress: 'Жим ног',
  row: 'Тяга к поясу',
  pullUp: 'Подтяг.',
  ohp: 'Жим стоя',
  curl: 'Бицепс',
  dbPress: 'Жим ГН',
  lateralRaise: 'Махи',
  legExt: 'Разг. ног',
  legCurl: 'Сгиб. ног',
}

export const WHEEL_ORDER: string[] = [
  'bench', 'squat', 'gluteBridge', 'legPress', 'row',
  'ohp', 'curl',
  'dbPress', 'lateralRaise',
  'pullUp', 'legExt', 'legCurl',
]
