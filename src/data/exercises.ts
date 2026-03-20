import type { ExerciseConfig, TrainingDayDef } from '../types'

// ============================================================
// ТРЕНИРОВОЧНЫЙ СПЛИТ — 3-дневная программа
// День 1: жим + ноги, День 2: ноги + тяга, День 3: плечи + ноги
// ============================================================
export const TRAINING_DAYS: TrainingDayDef[] = [
  { dayNumber: 1, name: 'Толчок + Ноги',  exerciseKeys: ['bench', 'legPress', 'legExt', 'curl', 'lateralRaise'] },
  { dayNumber: 2, name: 'Ноги + Тяга',    exerciseKeys: ['squat', 'dbPress', 'pullUp', 'legExt'] },
  { dayNumber: 3, name: 'Плечи + Ноги',   exerciseKeys: ['ohp', 'row', 'gluteBridge', 'legCurl'] },
]

// ============================================================
// УПРАЖНЕНИЯ — конфиг каждого упражнения
// Типы округления рабочего веса:
//   A = штанга крупная (CEIL / 2.5 кг)
//   B = штанга малая (CEIL / 2.5 кг)
//   C = гантели (FLOOR / 1–2 кг)
//   D = тренажёр (CEIL / 3 кг)
// percentages[i] — % от 1ПМ на i-й неделе (0–7)
// weekSchemes[i] — {sets, reps} на i-й неделе
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
  // Жим ногами — тренажёр, тип D (округление CEIL / 3 кг)
  legPress: {
    name: 'Жим ногами', type: 'D', step: 3, warmupStep: 5,
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      {sets:3,reps:8},{sets:4,reps:7},{sets:4,reps:6},{sets:4,reps:5},
      {sets:3,reps:7},{sets:4,reps:6},{sets:3,reps:5},{sets:4,reps:4},
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
  // Подтягивания: isPullup=true → рабочий вес хранится как (тело + доп.)
  // В прогрессии отображается только прибавка к весу тела
  pullUp: {
    name: 'Подтягивания', type: 'A', step: 2.5, warmupStep: 2.5,
    percentages: [65, 68, 70, 76, 68, 73, 75, 80],
    weekSchemes: [
      {sets:3,reps:8},{sets:4,reps:7},{sets:4,reps:6},{sets:4,reps:5},
      {sets:3,reps:7},{sets:4,reps:6},{sets:3,reps:5},{sets:4,reps:4},
    ],
    isPullup: true, // флаг: форма ввода показывает 2 поля — вес тела + доп. вес
  },
  // OHP: 4 подхода всех недель (добавлено после убирания французского жима)
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

// Метки типов для UI-подсказок
export const TYPE_LABELS: Record<string, string> = {
  A: 'Тип А — Штанга крупная', B: 'Тип Б — Штанга малая',
  C: 'Тип В — Гантели',        D: 'Тип Г — Тренажёр',
}

// EX_COUNT используется для счётчика "X/12 сохранено" и блокировки вкладки тренировки
export const EX_COUNT = Object.keys(EXERCISES).length

// Цвета сегментов колеса и доната по типу упражнения
export const TYPE_COLORS: Record<string, string> = {
  A: '#ff6b35', B: '#ff9f40', C: '#5ba4ff', D: '#3affb8',
}

// Короткие имена для колеса-выбора упражнений (ограничено шириной сегмента)
export const SHORT_NAMES: Record<string, string> = {
  bench: 'Жим лёжа', squat: 'Присед', gluteBridge: 'Яг. мост', legPress: 'Жим ног', row: 'Тяга к поясу',
  pullUp: 'Подтяг.', ohp: 'Жим стоя', curl: 'Бицепс', dbPress: 'Жим ГН',
  lateralRaise: 'Махи', legExt: 'Разг. ног', legCurl: 'Сгиб. ног',
}

// Порядок упражнений в колесе: по часовой стрелке от 12 часов
export const WHEEL_ORDER: string[] = [
  'bench', 'squat', 'gluteBridge', 'legPress', 'row',
  'ohp', 'curl',
  'dbPress', 'lateralRaise',
  'pullUp', 'legExt', 'legCurl',
]
