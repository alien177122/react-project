import {z} from 'zod'

export const StrengthFormulaOverviewSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  parameters: z.array(z.string().min(1)).min(1),
  rounding: z.string().min(1),
  logic: z.string().min(1),
})

export const StrengthFactorTierSchema = z.object({
  rank: z.enum(['S-TIER', 'A-TIER', 'B-TIER', 'C-TIER', 'F-TIER']),
  zone: z.string().min(1),
  keyParameters: z.array(z.string().min(1)).min(1),
  trigger: z.string().min(1),
  color: z.string().min(1),
  textColor: z.string().min(1).optional(),
})

export const StrengthWavePhaseSchema = z.object({
  phase: z.string().min(1),
  weeks: z.string().min(1),
  goal: z.string().min(1),
  intensity: z.string().min(1),
  scheme: z.string().min(1),
  volume: z.string().min(1),
  focus: z.string().min(1),
  color: z.string().min(1),
})

export const StrengthWarmupStepSchema = z.object({
  stage: z.string().min(1),
  weight: z.string().min(1),
  reps: z.string().min(1),
  rest: z.string().min(1),
  goal: z.string().min(1),
  color: z.string().min(1),
  isWorkSet: z.boolean().optional(),
})

export const StrengthScienceCardSchema = z.object({
  id: z.string().min(1),
  group: z.string().min(1),
  category: z.enum(['Сила', 'Техника', 'Восстановление']),
  difficulty: z.number().int().min(1).max(3),
  question: z.string().min(1),
  answer: z.string().min(1),
  application: z.string().min(1),
  source: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  color: z.string().min(1),
})

export const StrengthProtocolStepSchema = z.object({
  step: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  bullets: z.array(z.string().min(1)).optional(),
  color: z.string().min(1),
})

export const StrengthFormulaDataSchema = z.object({
  overview: StrengthFormulaOverviewSchema,
  factorTiers: z.array(StrengthFactorTierSchema).min(1),
  wavePhases: z.array(StrengthWavePhaseSchema).min(1),
  bicepsNote: z.string().min(1),
  warmupStack: z.array(StrengthWarmupStepSchema).min(1),
  scienceCards: z.array(StrengthScienceCardSchema).min(1),
  protocolSteps: z.array(StrengthProtocolStepSchema).min(1),
})

export type StrengthFormulaOverview = z.infer<typeof StrengthFormulaOverviewSchema>
export type StrengthFactorTier = z.infer<typeof StrengthFactorTierSchema>
export type StrengthWavePhase = z.infer<typeof StrengthWavePhaseSchema>
export type StrengthWarmupStep = z.infer<typeof StrengthWarmupStepSchema>
export type StrengthScienceCard = z.infer<typeof StrengthScienceCardSchema>
export type StrengthProtocolStep = z.infer<typeof StrengthProtocolStepSchema>
export type StrengthFormulaData = z.infer<typeof StrengthFormulaDataSchema>

const strengthFormulaDataInput = {
  overview: {
    title: 'Формула силы',
    subtitle:
      'Системный конспект, 8-недельная волновая прогрессия и 13 научных карточек для заметок, печати и ежедневного трекинга.',
    parameters: ['Присед 120 кг', 'Жим 120 кг', 'Бицепс 60 кг'],
    rounding: 'CEILING(вес / 2.5) × 2.5',
    logic: 'Накопление -> интенсификация -> откат -> пик',
  },
  factorTiers: [
    {
      rank: 'S-TIER',
      zone: 'Фундамент',
      keyParameters: [
        '>85% 1ПМ',
        '2-3 экспозиции в неделю',
        'специфичность',
        'отдых 5+ минут',
        'сон 7-9 часов',
        'профицит калорий',
      ],
      trigger: 'Если этого нет, всё остальное даёт мало отдачи.',
      color: '#ff4d4d',
    },
    {
      rank: 'A-TIER',
      zone: 'Оптимум',
      keyParameters: [
        '3-6 сетов',
        'RPE 8-9 / RIR 1-2',
        'периодизация',
        'делоад',
        'авторегуляция',
        'взрывные подходы 40-60%',
      ],
      trigger: 'Подключай, когда база стабильна и восстановление под контролем.',
      color: '#ff9f40',
    },
    {
      rank: 'B-TIER',
      zone: 'Тюнинг',
      keyParameters: [
        'подсобка',
        'паузы',
        'объёмная база 65-80%',
        'изоляция 12-20 повторений',
      ],
      trigger:
        'Шлифуй слабые звенья, но не перегружай ЦНС вспомогательной работой.',
      color: '#ffcc5c',
      textColor: '#1a1a1a',
    },
    {
      rank: 'C-TIER',
      zone: 'Спецметоды',
      keyParameters: ['негативы', 'цепи и резина', 'изометрия'],
      trigger: 'Точечный инструмент для опытных, а не замена базе.',
      color: '#5ba4ff',
    },
    {
      rank: 'F-TIER',
      zone: 'Мусор',
      keyParameters: [
        'внутренний фокус',
        'отказ в каждом сете',
        'отдых <2 минут',
        'пампинг вместо задачи',
        'нестабильная опора',
        'дефицит калорий',
      ],
      trigger: 'Крадут силу, мешают технике и повышают риск травмы.',
      color: '#666666',
    },
  ],
  wavePhases: [
    {
      phase: 'Накопление',
      weeks: '1-2',
      goal: 'Гипертрофия и техника',
      intensity: '70-74% 1ПМ',
      scheme: '4×8 -> 4×7',
      volume: '32 -> 28 повторов',
      focus: 'RIR 2, полный ROM, контроль эксцентрики.',
      color: '#ff9f40',
    },
    {
      phase: 'Переход',
      weeks: '3-4',
      goal: 'Адаптация и сила',
      intensity: '79-83% 1ПМ',
      scheme: '4×6 -> 4×5',
      volume: '24 -> 20 повторов',
      focus: 'Внешний фокус, отдых 4-5 минут, RIR 1-2.',
      color: '#ff6b35',
    },
    {
      phase: 'Делоад',
      weeks: '5',
      goal: 'Суперкомпенсация',
      intensity: '~77% 1ПМ',
      scheme: '4×6',
      volume: '24 повтора',
      focus: 'Снижение RPE до 7, восстановление суставов и техники.',
      color: '#5ba4ff',
    },
    {
      phase: 'Пик',
      weeks: '6-8',
      goal: 'Максимальная сила',
      intensity: '81-92% 1ПМ',
      scheme: '4×5 -> 4×3',
      volume: '20 -> 12 повторов',
      focus: 'Скоростное намерение, RIR 0-1, кластеры при усталости.',
      color: '#3affb8',
    },
  ],
  bicepsNote:
    'Для бицепса стандартные 3 сета расширены до 4-5, что даёт прирост объёма примерно на 33-40%. Суммируй этот стресс с тяговыми движениями дня. Если локти начинают гореть, сразу убирай один сет.',
  warmupStack: [
    {
      stage: 'Разминка 1',
      weight: '20 кг',
      reps: '12',
      rest: '1-2 мин',
      goal: 'Активация, пульс и мобильность.',
      color: '#5ba4ff',
    },
    {
      stage: 'Разминка 2',
      weight: '35-45 кг',
      reps: '6',
      rest: '2-3 мин',
      goal: 'Прогрев суставов и мягкий старт ЦНС.',
      color: '#5ba4ff',
    },
    {
      stage: 'Разминка 3',
      weight: '55-60 кг',
      reps: '5',
      rest: '2-3 мин',
      goal: 'Нейроактивация и фиксация паттерна движения.',
      color: '#ff9f40',
    },
    {
      stage: 'Разминка 4',
      weight: '70-72.5 кг',
      reps: '4',
      rest: '3-4 мин',
      goal: 'Подгонка под рабочий тонус.',
      color: '#ff9f40',
    },
    {
      stage: 'Рабочие подходы ×4',
      weight: '85.0 кг',
      reps: '8',
      rest: '4-5 мин',
      goal: 'Полная отдача и внешний фокус.',
      color: '#ff6b35',
      isWorkSet: true,
    },
  ],
  scienceCards: [
    {
      id: 'strength_formula_specificity',
      group: 'Специфичность & перенос',
      category: 'Сила',
      difficulty: 1,
      question: 'Почему специфичность стоит выше остальных факторов?',
      answer:
        'Рост силы переносится туда, где совпадают паттерн, амплитуда, скорость и тип сокращения. Сила - это навык координации, а не только масса.',
      application:
        'Если цель - жим 1ПМ, 2-3 касания штанги в неделю полезнее, чем набор случайной изоляции.',
      source: 'Saeterbakken et al., 2025',
      tags: ['специфичность', '1ПМ'],
      color: '#ff6b35',
    },
    {
      id: 'strength_formula_load_zone',
      group: 'Специфичность & перенос',
      category: 'Сила',
      difficulty: 1,
      question: 'Какая зона интенсивности лучше для 1ПМ?',
      answer:
        'Лучше всего работают нагрузки выше 80% 1ПМ в диапазоне 1-6 повторений. Тяжёлые веса учат рекрутировать высокопороговые моторные единицы и работать в соревновательной механике.',
      application:
        'Хороший ориентир - присед 4×3 на 82-85% 1ПМ с запасом 1-3 повтора.',
      source: 'Lopez et al., 2021',
      tags: ['интенсивность', 'тяжёлые веса'],
      color: '#ff6b35',
    },
    {
      id: 'strength_formula_neural_component',
      group: 'Специфичность & перенос',
      category: 'Техника',
      difficulty: 2,
      question: 'Как сила растёт быстрее массы?',
      answer:
        'За счёт нейромышечной адаптации: рекрутирования, синхронизации и снижения антагонистического торможения. Сила может заметно расти даже при почти неизменной массе тела.',
      application:
        'После 6-8 недель силового блока рост 1ПМ без визуального набора массы - нормальный сценарий.',
      source: 'Rong et al., 2025',
      tags: ['нейроадаптация', 'координация'],
      color: '#ff9f40',
    },
    {
      id: 'strength_formula_sets',
      group: 'Объём & частота',
      category: 'Сила',
      difficulty: 1,
      question: '1 сет или несколько для роста силы?',
      answer:
        'Несколько качественных сетов выигрывают у одиночного. Сила лучше растёт от повторяемых тяжёлых экспозиций, а не от одного пикового усилия.',
      application:
        'Вместо 1×5 используй top set и 2-3 back-off сета в той же задаче.',
      source: 'Krieger, 2009',
      tags: ['сеты', 'объём'],
      color: '#ff6b35',
    },
    {
      id: 'strength_formula_frequency',
      group: 'Объём & частота',
      category: 'Сила',
      difficulty: 2,
      question: 'Частота 3 раза в неделю лучше 1-2 раз при равном объёме?',
      answer:
        'Магии в самой частоте нет. Её плюс - разнести объём на менее утомляющие сессии и сохранить качество повторов и техники.',
      application:
        '6 тяжёлых сетов жима часто лучше разбить на 3 сессии по 2 сета, чем сделать всё за один день.',
      source: 'Grgic et al., 2018',
      tags: ['частота', 'восстановление'],
      color: '#ff9f40',
    },
    {
      id: 'strength_formula_rest',
      group: 'Объём & частота',
      category: 'Восстановление',
      difficulty: 1,
      question: 'Почему отдых 3-5 минут лучше для силы?',
      answer:
        'Длинный отдых сохраняет повторения, тоннаж и качество усилия. Короткие паузы поднимают метаболическую усталость и мешают повторно выдавать высокий уровень силы.',
      application:
        'После приседа 3×3 на 85% держи около 4 минут отдыха вместо 90 секунд.',
      source: 'de Salles et al., 2009',
      tags: ['отдых', 'межсетные паузы'],
      color: '#ff6b35',
    },
    {
      id: 'strength_formula_rom',
      group: 'Техника & управление усталостью',
      category: 'Техника',
      difficulty: 2,
      question: 'Когда полная амплитуда лучше частичной?',
      answer:
        'Полная амплитуда обычно даёт лучший общий рост силы и мышц. Частичная амплитуда полезна только для конкретного угла или слабой точки.',
      application:
        'База - полный присед. Pin squat или частичная амплитуда - только как вспомогательный инструмент.',
      source: 'Pallarés et al., 2021',
      tags: ['амплитуда', 'слабые точки'],
      color: '#5ba4ff',
    },
    {
      id: 'strength_formula_failure',
      group: 'Техника & управление усталостью',
      category: 'Восстановление',
      difficulty: 2,
      question: 'Нужно ли работать до отказа для силы?',
      answer:
        'Нет. При равном объёме отказ не даёт преимущества по силе, но создаёт больше усталости и удлиняет восстановление.',
      application: 'Держи рабочие сеты около RIR 1-3 вместо постоянного RPE 10.',
      source: 'Grgic et al., 2022',
      tags: ['отказ', 'RIR'],
      color: '#ff4d4d',
    },
    {
      id: 'strength_formula_intent_velocity',
      group: 'Техника & управление усталостью',
      category: 'Техника',
      difficulty: 2,
      question: 'Нужно ли ускорять штангу на тяжёлых весах?',
      answer:
        'Да. Намерение максимально ускорить концентрику поддерживает высокое нервно-мышечное усилие, даже если фактическая скорость штанги низкая.',
      application:
        'В жиме 6×2 на 75% опускай контролируемо, а вверх работай с намерением взорваться.',
      source: 'Davies et al., 2017',
      tags: ['скорость', 'намерение'],
      color: '#5ba4ff',
    },
    {
      id: 'strength_formula_periodization',
      group: 'Периодизация & VBT',
      category: 'Сила',
      difficulty: 2,
      question: 'Что реально даёт периодизация?',
      answer:
        'Она помогает организовать колебания интенсивности и усталости. При равном объёме разница между линейной и волновой моделями обычно невелика.',
      application:
        'Практичный блок: 3 недели накопления, 3 интенсификации, 1 подводка и 1 разгрузка.',
      source: 'Moesgaard et al., 2022',
      tags: ['периодизация', 'блоки'],
      color: '#3affb8',
    },
    {
      id: 'strength_formula_vbt_settings',
      group: 'Периодизация & VBT',
      category: 'Техника',
      difficulty: 3,
      question: 'Какие настройки VBT практичны для силы?',
      answer:
        'Часто лучше всего работают 70-80% 1ПМ, 3-5 сетов, 2-4 минуты отдыха и порог потери скорости 15-30%. Это позволяет дозировать усталость без лишнего накопления.',
      application:
        'В приседе можно вести 5×3 на 75-80% и обрывать сет при 20% velocity loss.',
      source: 'Zhang et al., 2023',
      tags: ['VBT', 'velocity loss'],
      color: '#3affb8',
    },
    {
      id: 'strength_formula_vbt_vs_percent',
      group: 'Периодизация & VBT',
      category: 'Техника',
      difficulty: 3,
      question: 'Когда VBT лучше, чем процент от 1ПМ?',
      answer:
        'Когда готовность сильно гуляет из-за стресса, недосыпа или сезона. Скорость даёт обратную связь по текущему состоянию, а не по старому тесту.',
      application:
        'Если по плану стоит 80%, но скорость выглядит как 85%, VBT подскажет опустить вес в нужную зону.',
      source: 'Zhang et al., 2022',
      tags: ['VBT', 'авторегуляция'],
      color: '#3affb8',
    },
    {
      id: 'strength_formula_variable_resistance',
      group: 'Периодизация & VBT',
      category: 'Сила',
      difficulty: 3,
      question: 'Когда нужны цепи и резина?',
      answer:
        'Они могут помочь тренированным атлетам за счёт сверхнагрузки в зоне механического преимущества, но не заменяют базовую тяжёлую работу.',
      application:
        'Жим с цепями уместен в блоке на локаут, если старт стабильный, а скорость теряется в верхней части амплитуды.',
      source: 'Dos Santos et al., 2022',
      tags: ['цепи', 'переменное сопротивление'],
      color: '#3affb8',
    },
  ],
  protocolSteps: [
    {
      step: '01',
      title: 'Тест 1ПМ',
      description:
        'Проведи тест за 5-7 дней до старта. Если не хочешь тестировать максимум, оцени 1ПМ по формуле вес × (1 + повторы / 30) из отказного подхода на 3-5 ПМ.',
      color: '#ff6b35',
    },
    {
      step: '02',
      title: 'Жёсткие правила',
      bullets: [
        'Отдых 4-5 минут между рабочими сетами.',
        'Сон не меньше 7 часов и калорийный профицит +200-300 ккал.',
        'Отказ оставляй только на последние сеты изоляции, ориентир RIR 0-1.',
      ],
      color: '#ff9f40',
    },
    {
      step: '03',
      title: 'Авторегуляция',
      bullets: [
        'Если уже на втором сете RPE >= 9.5, снижай вес на 2.5-5 кг до конца блока.',
        'Если скорость штанги падает более чем на 25% от первого сета, сокращай работу на один сет.',
      ],
      color: '#5ba4ff',
    },
    {
      step: '04',
      title: 'Трекинг',
      description:
        'Записывай фактический вес, повторы и RPE после каждой тренировки. Волновая прогрессия работает только при честном журнале.',
      color: '#3affb8',
    },
  ],
} satisfies z.input<typeof StrengthFormulaDataSchema>

const strengthFormulaFallback: StrengthFormulaData = {
  overview: {
    title: 'Формула силы',
    subtitle: 'Данные секции временно недоступны.',
    parameters: [],
    rounding: 'Недоступно',
    logic: 'Недоступно',
  },
  factorTiers: [],
  wavePhases: [],
  bicepsNote: 'Данные секции временно недоступны.',
  warmupStack: [],
  scienceCards: [],
  protocolSteps: [],
}

const parsedStrengthFormulaData =
  StrengthFormulaDataSchema.safeParse(strengthFormulaDataInput)

const runtimeProcess =
  typeof globalThis === 'object' && 'process' in globalThis
    ? (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process
    : undefined

if (
  !parsedStrengthFormulaData.success &&
  runtimeProcess?.env?.NODE_ENV !== 'production'
) {
  console.warn(
    '[strength-formula] Zod validation failed, using fallback data.',
    parsedStrengthFormulaData.error.flatten(),
  )
}

export const strengthFormulaData: StrengthFormulaData =
  parsedStrengthFormulaData.success
    ? parsedStrengthFormulaData.data
    : strengthFormulaFallback

export const STRENGTH_FORMULA_OVERVIEW = strengthFormulaData.overview
export const STRENGTH_FACTOR_TIERS = strengthFormulaData.factorTiers
export const STRENGTH_WAVE_PHASES = strengthFormulaData.wavePhases
export const STRENGTH_BICEPS_NOTE = strengthFormulaData.bicepsNote
export const STRENGTH_WARMUP_STACK = strengthFormulaData.warmupStack
export const STRENGTH_SCIENCE_CARDS = strengthFormulaData.scienceCards
export const STRENGTH_PROTOCOL_STEPS = strengthFormulaData.protocolSteps
