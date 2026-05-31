import { useState, useEffect, useMemo } from 'react'
import './src/App.css'
import { calc1RM } from './src/utils/calculations'

// ============================================================
// TYPES — описывают форму всех данных в приложении
// ============================================================

// Схема подхода для одной недели: сколько подходов × сколько повторений
interface WeekScheme { sets: number; reps: number }

// Конфиг упражнения: имя, тип округления, шаг, проценты и схемы на 8 недель
interface ExerciseConfig {
  name: string; type: 'A' | 'B' | 'C' | 'D'
  step: number; warmupStep: number
  percentages: number[]; weekSchemes: WeekScheme[]
  isPullup?: boolean // особый флаг: вес = тело + доп. вес
}

// Сохранённый тестовый подход и рассчитанный 1ПМ пользователя
interface SavedExercise {
  exerciseKey: string; testWeight: number; testReps: number; oneRM: number; date: string
  bodyWeight?: number // только для подтягиваний — вес тела для отображения прибавки
}

// Прогресс по 8-недельному циклу: единый счётчик завершённых тренировок
interface TrainingProgress { completedSessions: number }

// Данные пользователя, хранящиеся на сервере
interface UserData {
  name: string; exercises: SavedExercise[]; trainingProgress?: TrainingProgress
}

// Описание тренировочного дня: какие упражнения входят
interface TrainingDayDef { dayNumber: 1|2|3; name: string; exerciseKeys: string[] }

// ============================================================
// ТРЕНИРОВОЧНЫЙ СПЛИТ — 3-дневная программа
// День 1: жим + ноги, День 2: ноги + тяга, День 3: плечи + ноги
// ============================================================
const TRAINING_DAYS: TrainingDayDef[] = [
  { dayNumber: 1, name: 'Толчок + Ноги',  exerciseKeys: ['bench', 'gluteBridge', 'legExt', 'curl', 'lateralRaise'] },
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
const EXERCISES: Record<string, ExerciseConfig> = {
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
const TYPE_LABELS: Record<string, string> = {
  A: 'Тип А — Штанга крупная', B: 'Тип Б — Штанга малая',
  C: 'Тип В — Гантели',        D: 'Тип Г — Тренажёр',
}

// Неделя отката (индекс 4 = нед. 5): вес снижается, объём восстанавливается
// const DELOAD_WEEK = 4 // не используется в рендере — стилизация убрана по запросу
// EX_COUNT используется для счётчика "X/11 сохранено" и блокировки вкладки тренировки
const EX_COUNT = Object.keys(EXERCISES).length // 11

// Цвета сегментов колеса и доната по типу упражнения
const TYPE_COLORS: Record<string, string> = {
  A: '#e8ff3a', B: '#ff9f40', C: '#5ba4ff', D: '#3affb8',
}

// Короткие имена для колеса-выбора упражнений (ограничено шириной сегмента)
const SHORT_NAMES: Record<string, string> = {
  bench: 'Жим лёжа', squat: 'Присед', gluteBridge: 'Яг. мост', row: 'Тяга к поясу',
  pullUp: 'Подтяг.', ohp: 'Жим стоя', curl: 'Бицепс', dbPress: 'Жим ГН',
  lateralRaise: 'Махи', legExt: 'Разг. ног', legCurl: 'Сгиб. ног',
}

// Порядок упражнений в колесе: по часовой стрелке от 12 часов
const WHEEL_ORDER: string[] = [
  'bench', 'squat', 'gluteBridge', 'row',
  'ohp', 'curl',
  'dbPress', 'lateralRaise',
  'pullUp', 'legExt', 'legCurl',
]

// ============================================================
// РАСЧЁТЫ
// ============================================================

// Округляет рабочий вес до ближайшего шага с учётом типа снаряда
// Гантели (C) — округление вниз (FLOOR), штанги/тренажёры — вверх (CEIL)
function roundWeight(value: number, step: number, type: 'A'|'B'|'C'|'D'): number {
  if (type === 'C') return Math.floor(value / step) * step
  return Math.ceil(value / step) * step
}

// Рабочий вес на конкретной неделе = 1ПМ × процент / 100, затем округление
function calcWorkingWeight(oneRM: number, pct: number, cfg: ExerciseConfig): number {
  return roundWeight(oneRM * (pct / 100), cfg.step, cfg.type)
}

// CSS-класс для колонки "Повт итого" в таблице прогрессии
// Жёлтый ≥28, Серый 17–27, Красный ≤16
function volumeClass(t: number): string {
  if (t >= 28) return 'v-hi'
  if (t <= 16) return 'v-lo'
  return 'v-md'
}

// Цвет столбца волнового графика — совпадает с цветом объёмного класса
function barColor(t: number): string {
  if (t >= 28) return 'var(--accent,#e8ff3a)'
  if (t <= 16) return '#ff4d4d'
  return '#ff9f40'
}

// ============================================================
// API — работа с сервером (server/index.mjs, порт 3001)
// URL сервера берётся из .env.local (VITE_API_URL) или localhost
// ============================================================
const API = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3001/api'

// Декодирует JWT-токен и извлекает имя пользователя из payload
// Используется при восстановлении сессии из localStorage
function jwtName(token: string): string | null {
  try { return JSON.parse(atob(token.split('.')[1])).name ?? null } catch { return null }
}

// Загружает данные пользователя (упражнения, прогресс) с сервера
// При ошибке (нет сети, 401) возвращает пустой объект — не крашит приложение
async function loadUser(name: string, token: string): Promise<UserData> {
  try {
    const r = await fetch(`${API}/users/${encodeURIComponent(name)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!r.ok) return { name, exercises: [] }
    return r.json()
  } catch {
    return { name, exercises: [] }
  }
}

// Сохраняет все данные пользователя на сервер одним PUT-запросом
// Вызывается после каждого изменения (расчёт, удаление, завершение тренировки)
async function saveUser(data: UserData, token: string): Promise<void> {
  await fetch(`${API}/users/${encodeURIComponent(data.name)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
}

// Вход / регистрация: отправляет имя + пароль, получает JWT-токен
async function apiAuth(path: string, body: object): Promise<{ token?: string; name?: string; error?: string }> {
  try {
    const r = await fetch(`${API}/auth/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return await r.json()
  } catch {
    return { error: 'Нет соединения с сервером' }
  }
}

// ============================================================
// ТЕОРИЯ — статические данные для вкладки "Теория"
// Раздел 1: основные понятия тренировочного процесса
// Раздел 2: tier-лист спортивных добавок (Evolution Yeti, 2025–2026)
// ============================================================

// Карточки с основными тренировочными понятиями
const THEORY_CONCEPTS = [
  {
    title: '1ПМ — одно повторение с максимальным весом',
    body: 'Максимальный вес, который ты можешь поднять один раз. Используется как основа для расчёта рабочих весов: берём % от 1ПМ на каждую неделю. Реальный максимум делать не нужно — формула Эпли восстанавливает 1ПМ из отказного подхода на 4–8 повторений.',
  },
  {
    title: 'Прогрессивная перегрузка',
    body: 'Основной принцип роста мышц: нагрузка должна постепенно расти. Это может быть рост веса, объёма (кол-во подходов × повторений) или плотности тренировки. Без прогрессии нет адаптации — мышцы просто поддерживают текущую форму.',
  },
  {
    title: 'Волновая периодизация',
    body: 'Интенсивность и объём меняются волнами. Нед 1–4: вес растёт, объём падает. Нед 5 — волновой откат: вес снижается, объём восстанавливается (восстановление). Нед 6–8: второй заход с более высоким пиком. Позволяет дольше прогрессировать без перетренированности.',
  },
  {
    title: '3-дневный сплит',
    body: '3 тренировки в неделю, каждая прорабатывает разные группы. День 1: Толчок + Ноги. День 2: Ноги + Тяга. День 3: Плечи + Ноги. Каждая мышца получает стимул 2–3 раза за цикл — оптимально для роста при достаточном восстановлении.',
  },
  {
    title: 'Рабочий вес vs. тестовый вес',
    body: 'Тестовый вес — вес отказного подхода (4–8 повт), из него считается 1ПМ. Рабочий вес — % от 1ПМ для каждой тренировочной недели. На 1-й неделе ~68–70% от 1ПМ, к концу цикла — 85–90%. Округляется вверх до ближайшего шага снаряда (кроме гантелей — вниз).',
  },
  {
    title: 'Подтягивания — специальный режим',
    body: 'Рабочий вес = вес тела + дополнительный вес. 1ПМ рассчитывается из суммы. В таблице прогрессии отображается только прибавка к весу тела (+X кг на пояс). Отрицательное значение — ассистированные повторения (бандаж/тренажёр).',
  },
  {
    title: 'Объём и цветовая индикация',
    body: 'Повт итого = подходы × повторения за тренировку. Жёлтый (≥28) — высокий объём, хорошо для гипертрофии. Серый (17–27) — средний объём. Красный (≤16) — низкий объём, ориентация на максимальную силу. Волновой мини-график визуализирует распределение объёма по неделям.',
  },
  {
    title: 'Формула Эпли — расчёт 1ПМ',
    body: 'В приложении используется модифицированная формула Эпли с консервативными коэффициентами (1.3/1.2/1.1). При малых повторах (< 5) точность ниже. Идеальный диапазон для теста — 5–8 повторений до отказа. Результат округляется до 0.1 кг.',
  },
  {
    title: 'RPE — шкала воспринимаемой нагрузки',
    body: 'RPE (Rate of Perceived Exertion) оценивает тяжесть подхода от 1 до 10. RPE 10 = отказ, 9 = мог сделать ещё 1 повтор, 8 = ещё 2 в запасе. В силовом цикле лёгкие недели идут на RPE 4–5, средние на 6–7, тяжёлые на 8–9. Никогда не нужно выходить на RPE 10 в рабочих подходах — это угнетает ЦНС и ухудшает восстановление.',
  },
  {
    title: 'Три зоны тренинга',
    body: 'Силовая зона (80–100% ПМ, 1–6 повт) — развитие максимальной силы, рекрутирование быстрых волокон. Зона гипертрофии (67–80% ПМ, 8–12 повт) — рост мышц, лучшее соотношение объём/восстановление. Зона выносливости (<65% ПМ, 15+ повт) — локальная мышечная выносливость. Для натурального атлета приоритетна силовая зона: высокая интенсивность при умеренном объёме.',
  },
  {
    title: 'Нейромышечная адаптация',
    body: 'Первые недели прогресса — это не рост мышц, а обучение нервной системы рекрутировать больше двигательных единиц одновременно. Сила растёт быстрее объёма. Синглы и дабли (1–2 повтора с большим весом) перед основной работой «активируют» ЦНС и повышают качество последующих подходов. Поэтому даже на лёгкой неделе полезно сделать 1 сингл на 80% ПМ.',
  },
  {
    title: 'Отдых между подходами',
    body: 'При работе с тяжёлыми весами (80–90%+ ПМ) отдых должен быть не менее 5 минут. Если отдыхать 2–3 минуты, утомление наложится, RPE сдвинется вверх на 1–2 пункта, и запланированная средняя нагрузка превратится в тяжёлую. Это приведёт к перетренированности. При многоповторке (8–12 повт) допустимо 2–3 минуты.',
  },
  {
    title: 'Сухожилия — адаптация через большие веса',
    body: 'Сухожилия адаптируются только при деформации 4,5–6,5%, что соответствует нагрузкам >70% ПМ. Многоповторка наращивает мышцы, но не укрепляет сухожилия — возникает дисбаланс «сила > жёсткость», повышающий травматизм. Протокол укрепления: 5×4 на 85–90% ПМ, 3 раза/нед, удержание ~3 сек в пике момента силы. Ориентир — время под нагрузкой (TUT), а не отказ.',
  },
  {
    title: 'Деформация сухожилия — зоны риска',
    body: 'При максимальном усилии сухожилие растягивается: <4,5% — слабые мышцы (нормально, просто тренируйся), 4,5–9% — норма, >9% — зона травматизма. Если сухожилие податливое (10–12% деформации), начинай с ~60% ПМ и постепенно увеличивай до 85–90%. Растяжка снижает жёсткость — в силовом тренинге это минус. Изометрия (удержания) тоже улучшает жёсткость.',
  },
  {
    title: 'Прогрессия — единственное условие результата',
    body: 'Без увеличения рабочих весов или объёма не работает ни объёмный, ни интенсивный подход. Прогрессия — обязательное условие любого результата. Натуральный атлет должен прогрессировать каждый цикл (8 недель), даже если прирост составляет всего 2,5 кг к рабочему весу.',
  },
]

// Tier-лист добавок по материалам Evolution Yeti
// Источники: Boosty «TIER LIST СПОРТИВНЫХ ДОБАВОК» (08.01.2026) + YouTube (14.02.2025)
const SUPPLEMENT_TIERS = [
  {
    tier: 'S',
    color: '#e8ff3a',
    textColor: '#000',
    label: 'Максимальный эффект',
    items: ['Кофеин', 'Креатин', 'Протеин'],
    note: 'Самые доказанные и универсальные добавки. Реальный прирост силы и мышечной массы у натуральных атлетов. Рекомендуются большинству тренирующихся.',
  },
  {
    tier: 'A',
    color: '#ff9f40',
    textColor: '#000',
    label: 'Значительное улучшение производительности',
    items: ['Изотоники', 'L-Цитруллин', 'Нитраты', 'Углеводы (мальтодекстрин, амилопектин)', 'Бета-аланин'],
    note: 'Очень сильная поддержка исследований. Значительно улучшают выносливость, памп и энергию во время тренировки.',
  },
  {
    tier: 'B',
    color: '#5ba4ff',
    textColor: '#000',
    label: 'Хороший заметный эффект',
    items: ['Таурин', 'HMB', 'EAA (незаменимые аминокислоты)', 'Бетаин', 'Омега-3'],
    note: 'Полезны для роста, восстановления или нишевых задач. Хорошая доказательная база, но эффект уже.',
  },
  {
    tier: 'C',
    color: '#3affb8',
    textColor: '#000',
    label: 'Нишевые добавки',
    items: ['Тонгкат али', 'BCAA', 'L-Аргинин', 'Лейцин', 'L-Карнитин', 'Ашваганда', 'Родиола розовая'],
    note: 'Могут помочь в конкретных ситуациях: стресс, низкий тестостерон, слабое восстановление. Эффект умеренный и не у всех.',
  },
  {
    tier: 'D',
    color: '#bb86fc',
    textColor: '#000',
    label: 'Слабые или косвенные эффекты',
    items: ['CoQ10', 'Хондроитин + глюкозамин', 'Пептиды коллагена', 'SAMe', 'MSM', 'Кверцетин'],
    note: 'Чаще для суставов, сердца, антиоксидантной защиты. Доказательства неоднозначные, спортивный эффект минимален.',
  },
  {
    tier: 'E',
    color: '#9e9e9e',
    textColor: '#fff',
    label: 'Базовое здоровье (только при дефиците)',
    items: ['Йод', 'Витамин D3', 'Железо', 'Цинк', 'Магний (бисглицинат)', 'Селен', 'Витамин E', 'Витамины группы B', 'Калий', 'Кальций'],
    note: 'Полезны только при подтверждённом дефиците по результатам анализов. У здоровых с нормальным питанием — минимальный или нулевой спортивный эффект. Магний — особо важен при высокой активности (потребность на 20% выше нормы).',
  },
  {
    tier: 'F',
    color: '#ff4d4d',
    textColor: '#fff',
    label: 'Минимальный или отсутствующий эффект',
    items: ['CLA', 'Туркестерон', 'Аспарагиновая кислота', 'Экдистерон', 'Трибулус'],
    note: 'Часто маркетинг. Доказательства слабые или отрицательные. Для большинства тренирующихся деньги, выброшенные на ветер.',
  },
]

// ============================================================
// КОМПОНЕНТ ТЕОРИЯ — весь контент вкладки в одном месте
// Разбит на 3 секции: понятия, tier-лист, топ-3 рекомендации
// ============================================================
function TheoryTab() {
  return (
    <>
      {/* ── Секция 1: базовые понятия ─────────────────────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">01</span>
          <span className="section-title">Основы тренировки</span>
        </div>
        <div className="note-box" style={{ marginBottom: 24 }}>
          Ключевые понятия, которые лежат в основе программы. Разберись с ними — и любая схема прогрессии станет понятна.
        </div>
        {/* Сетка карточек — каждая объясняет одно понятие */}
        <div className="theory-grid">
          {THEORY_CONCEPTS.map((c, i) => (
            <div key={i} className="theory-card">
              <div className="theory-card-title">{c.title}</div>
              <div className="theory-card-body">{c.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Секция 2: tier-лист добавок ───────────────────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">02</span>
          <span className="section-title">Tier List добавок</span>
        </div>
        <div className="note-box" style={{ marginBottom: 24 }}>
          По материалам <strong>Evolution Yeti</strong>: пост «TIER LIST СПОРТИВНЫХ ДОБАВОК» (08.01.2026) +
          видео «БИОХАКИНГ / НЕЗАМЕНИМЫЕ ДОБАВКИ» (YouTube, 14.02.2025).
          Рейтинг: рост мышц → сила → выносливость → восстановление → здоровье.
        </div>
        {/* Каждая строка = один тир. Бейдж слева, контент справа */}
        <div className="tier-list">
          {SUPPLEMENT_TIERS.map(t => (
            <div key={t.tier} className="tier-row">
              {/* Цветной бейдж с буквой тира */}
              <div className="tier-badge" style={{ background: t.color, color: t.textColor }}>
                {t.tier}
              </div>
              <div className="tier-content">
                {/* Заголовок тира в цвет бейджа */}
                <div className="tier-label" style={{ color: t.color }}>{t.label}</div>
                {/* Пилюли — названия конкретных добавок */}
                <div className="tier-items">
                  {t.items.map(item => (
                    <span key={item} className="tier-item">{item}</span>
                  ))}
                </div>
                {/* Краткое пояснение про тир */}
                <div className="tier-note">{t.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Секция 3: топ-3 рекомендации ─────────────────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">03</span>
          <span className="section-title">Топ-3 если выбирать</span>
        </div>
        <div className="note-box" style={{ marginBottom: 24 }}>
          Если можешь позволить себе только 2–3 добавки — вот список от автора. Всё остальное даёт либо незаметный эффект, либо требует анализов.
        </div>
        {/* Три карточки с детальным описанием каждой добавки */}
        <div className="theory-top3">
          {/* Карточка 1 — Креатин */}
          <div className="theory-top3-card">
            <div className="theory-top3-num" style={{ color: '#e8ff3a' }}>01</div>
            <div className="theory-top3-name">Креатин моногидрат</div>
            <div className="theory-top3-dose">3–5 г/сут (60–70 кг) · до 10 г (100+ кг)</div>
            <div className="theory-top3-desc">
              Единственная добавка с реальным доказанным приростом силы у натуральных атлетов.
              По систематическому обзору: +4 кг к жиму, +11 кг к упражнениям на ноги.
              Хорошо работает у ~40% людей. При отсутствии эффекта — попробуй гидрохлорид или цитрат.
              Загрузочная доза: до 20 г/сут в первую неделю (необязательно).
            </div>
          </div>
          {/* Карточка 2 — Кофеин */}
          <div className="theory-top3-card">
            <div className="theory-top3-num" style={{ color: '#ff9f40' }}>02</div>
            <div className="theory-top3-name">Кофеин</div>
            <div className="theory-top3-dose">~200 мг до тренировки</div>
            <div className="theory-top3-desc">
              Самая изученная добавка: 8 из 9 исследований подтвердили рост силовых показателей.
              Улучшает выносливость, концентрацию и обучение новым движениям.
              Через кофе или предтрен. <strong>Противопоказан при хронических нарушениях сна</strong> — в таком случае сон важнее.
            </div>
          </div>
          {/* Карточка 3 — Магний */}
          <div className="theory-top3-card">
            <div className="theory-top3-num" style={{ color: '#9e9e9e' }}>03</div>
            <div className="theory-top3-name">Магний бисглицинат</div>
            <div className="theory-top3-dose">4 капс / ~400 мг элемент. магния</div>
            <div className="theory-top3-desc">
              При интенсивных тренировках потребность в магнии на 20% выше нормы.
              Участвует в углеводном обмене, важен для восстановления мышц.
              <strong>Принимать только при подтверждённом дефиците</strong> по результатам анализов крови.
            </div>
          </div>
        </div>
      </div>

      {/* ── Секция 4: таблица %ПМ → повторения + RPE ──────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">04</span>
          <span className="section-title">Таблица %ПМ и RPE</span>
        </div>
        <div className="note-box" style={{ marginBottom: 24 }}>
          Взаимосвязь процента от повторного максимума, количества повторений и уровня RPE.
          Используй для планирования нагрузки и оценки тяжести подхода.
        </div>
        <div className="theory-tables-wrap">
          {/* Таблица %ПМ → повторения */}
          <div className="theory-table-card">
            <div className="theory-table-title">% от 1ПМ → Повторения</div>
            <table className="pt theory-ref-table">
              <thead>
                <tr><th style={{ textAlign: 'left' }}>% ПМ</th><th>Повт</th><th>Зона</th></tr>
              </thead>
              <tbody>
                {([
                  ['100%', '1', 'Сила'],
                  ['95%', '~2', 'Сила'],
                  ['90%', '~4', 'Сила'],
                  ['85%', '~6', 'Сила'],
                  ['80%', '~8', 'Сила / Гипертрофия'],
                  ['75%', '~10', 'Гипертрофия'],
                  ['70%', '~12', 'Гипертрофия'],
                  ['67%', '~15', 'Выносливость'],
                  ['65%', '15+', 'Выносливость'],
                ] as const).map(([pct, reps, zone], i) => (
                  <tr key={i}>
                    <td className="w-kg" style={{ textAlign: 'left' }}>{pct}</td>
                    <td className="w-sr">{reps}</td>
                    <td style={{ color: zone === 'Сила' ? '#e8ff3a' : zone === 'Гипертрофия' ? '#ff9f40' : zone.includes('Сила') ? '#cce000' : '#5ba4ff', fontSize: 11 }}>
                      {zone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Таблица RPE */}
          <div className="theory-table-card">
            <div className="theory-table-title">Шкала RPE</div>
            <table className="pt theory-ref-table">
              <thead>
                <tr><th style={{ textAlign: 'left' }}>RPE</th><th>Повторы в запасе</th><th>Описание</th></tr>
              </thead>
              <tbody>
                {([
                  ['10', '0', 'Полный отказ — больше ни одного повт'],
                  ['9.5', '0–1', 'Возможно ещё 1, но не уверен'],
                  ['9', '1', 'Мог бы сделать ещё 1 повт'],
                  ['8', '2', 'Ещё 2 повторения в запасе'],
                  ['7', '3', 'Ещё 3 повторения, средне'],
                  ['6', '4', 'Ещё 4 в запасе, ощутимо легко'],
                  ['5', '5+', 'Разминочная нагрузка'],
                  ['4', '6+', 'Очень лёгкая работа'],
                ] as const).map(([rpe, rir, desc], i) => (
                  <tr key={i}>
                    <td className="w-kg" style={{ textAlign: 'left', color: Number(rpe) >= 9 ? '#ff4d4d' : Number(rpe) >= 7 ? '#ff9f40' : '#3affb8' }}>{rpe}</td>
                    <td className="w-sr">{rir}</td>
                    <td style={{ color: 'var(--muted)', fontSize: 11, textAlign: 'left' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Секция 5: протокол укрепления сухожилий ─────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">05</span>
          <span className="section-title">Протокол укрепления сухожилий</span>
        </div>
        <div className="note-box" style={{ marginBottom: 24 }}>
          По материалам <strong>Evolution Yeti</strong> и систематических обзоров.
          Сухожилия адаптируются только при нагрузке &gt;70% ПМ (деформация 4,5–6,5%).
          Многоповторка закачивает мышцы, но <strong>не сухожилия</strong> — создаёт дисбаланс и повышает травматизм.
        </div>
        <div className="theory-grid">
          <div className="theory-card" style={{ borderLeft: '3px solid #e8ff3a' }}>
            <div className="theory-card-title">Рабочий протокол</div>
            <div className="theory-card-body">
              Частота: ~3 раза/нед. Интенсивность: 85–90% ПМ. Схема: 5 подходов × 4 повторения.
              Время под нагрузкой (TUT): ~3 сек в целевой части амплитуды или ~6 сек в полной амплитуде.
              Ориентир — TUT на нужной деформации, а не отказ. Используй изолированные упражнения для точного попадания в целевое сухожилие.
            </div>
          </div>
          <div className="theory-card" style={{ borderLeft: '3px solid #ff9f40' }}>
            <div className="theory-card-title">Если сухожилие «податливое»</div>
            <div className="theory-card-body">
              Если на тесте деформация &gt;10% — начинай с ~60% ПМ и постепенно наращивай к 70–90%.
              Здоровым для прогресса нередко нужны до 90% ПМ. Прогрессируй вес постепенно, следи за болевыми ощущениями.
              При стихании боли — переходи к базовым движениям, сохраняя принцип дозировки.
            </div>
          </div>
          <div className="theory-card" style={{ borderLeft: '3px solid #ff4d4d' }}>
            <div className="theory-card-title">Что НЕ работает</div>
            <div className="theory-card-body">
              Растяжка снижает жёсткость сухожилий — в силовом тренинге это минус.
              НПВС (ибупрофен, мелоксикам, МСМ, куркумин) убирают боль, но не улучшают ремоделирование.
              Пептиды коллагена теоретически могут помочь (более устойчивы к разрушению в ЖКТ), но доказательства неоднозначные.
            </div>
          </div>
          <div className="theory-card" style={{ borderLeft: '3px solid #5ba4ff' }}>
            <div className="theory-card-title">Почему фармакология ≠ крепкие сухожилия</div>
            <div className="theory-card-body">
              Анаболические стероиды резко повышают силу мышц, но сухожилия не успевают адаптироваться.
              Натуральный атлет набирает силу за 1–2 года — сухожилия укрепляются параллельно.
              Химик достигает тех же показателей за пару месяцев — деформация уходит за 9%, копятся микротравмы и отрывы.
            </div>
          </div>
        </div>
      </div>

      {/* ── Секция 6: источники ────────────────────────────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">06</span>
          <span className="section-title">Источники</span>
        </div>
        <div className="note-box">
          <strong>Evolution Yeti</strong> — видеоролики и посты на Boosty:<br />
          · «СИЛОВОЙ ТРЕНИНГ НАТУРАЛЬНО: Мануал по RPE» (аудио-мануал, 2 части)<br />
          · «Черновик-конспект: Сухожилия» (сводка систематического обзора)<br />
          · «TIER LIST СПОРТИВНЫХ ДОБАВОК» (Boosty, 08.01.2026)<br />
          · «БИОХАКИНГ / НЕЗАМЕНИМЫЕ ДОБАВКИ ДЛЯ ТРЕНИРОВОК» (YouTube, 14.02.2025)<br />
          · «Силовой Цикл 6-недельный» (черновик программы)<br />
          · «Приседания (Squat)» (техника и принципы)
        </div>
      </div>
    </>
  )
}

// ==================== VOLUME DONUT ====================

// ============================================================
// ВКЛАД МЫШЦ — используется для расчёта доната объёма
// Число = доля от среднего кол-ва подходов упражнения
// (1.0 = основная мышца, 0.3 = синергист)
// ============================================================
const MUSCLE_CONTRIB: Record<string, Record<string, number>> = {
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

interface MuscleMeta { label: string; color: string; catKey: string }
const MUSCLE_META: Record<string, MuscleMeta> = {
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
const MUSCLE_ORDER = [
  'chest','front_delt','mid_delt','triceps',
  'lats','biceps','traps','rear_delt',
  'quads','glutes','hamstrings',
]
const CAT_ORDER = ['push','pull','legs'] as const
const CAT_META: Record<string, { label: string; color: string }> = {
  push: { label: 'Жим',  color: '#e8ff3a' },
  pull: { label: 'Тяга', color: '#5ba4ff' },
  legs: { label: 'Ноги', color: '#3affb8' },
}

function computeMuscleVol(): Record<string, number> {
  const r: Record<string, number> = {}
  for (const [key, cfg] of Object.entries(EXERCISES)) {
    const contrib = MUSCLE_CONTRIB[key]; if (!contrib) continue
    const avgSets = cfg.weekSchemes.reduce((s, w) => s + w.sets, 0) / cfg.weekSchemes.length
    for (const [m, share] of Object.entries(contrib))
      r[m] = (r[m] || 0) + avgSets * share
  }
  return r
}

function pol(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = (deg - 90) * Math.PI / 180
  return [+(cx + r * Math.cos(rad)).toFixed(2), +(cy + r * Math.sin(rad)).toFixed(2)]
}
function donutArc(cx: number, cy: number, ro: number, ri: number, s: number, e: number): string {
  const [ax, ay] = pol(cx, cy, ro, s), [bx, by] = pol(cx, cy, ro, e)
  const [cx2, cy2] = pol(cx, cy, ri, e), [dx, dy] = pol(cx, cy, ri, s)
  const lg = e - s > 180 ? 1 : 0
  return `M${ax},${ay} A${ro},${ro} 0 ${lg} 1 ${bx},${by} L${cx2},${cy2} A${ri},${ri} 0 ${lg} 0 ${dx},${dy}Z`
}

function VolumeDonut() {
  const [hov, setHov] = useState<string | null>(null)
  const vol = computeMuscleVol()
  const total = MUSCLE_ORDER.reduce((s, m) => s + (vol[m] || 0), 0)

  const SEG_GAP = 1.5, CAT_GAP = 5
  const usable = 360 - CAT_GAP * 3

  interface DonutSeg {
    muscle: string; value: number; pct: number
    startDeg: number; endDeg: number; catKey: string
  }
  const segs: DonutSeg[] = []
  let deg = -90

  for (const catKey of CAT_ORDER) {
    const muscles = MUSCLE_ORDER.filter(m => MUSCLE_META[m].catKey === catKey)
    const catVol = muscles.reduce((s, m) => s + (vol[m] || 0), 0)
    const catDegTotal = (catVol / total) * usable
    const mUsable = catDegTotal - SEG_GAP * (muscles.length - 1)
    for (let i = 0; i < muscles.length; i++) {
      const m = muscles[i], mVol = vol[m] || 0
      const mDeg = catVol > 0 ? (mVol / catVol) * mUsable : 0
      segs.push({ muscle: m, value: mVol, pct: (mVol / total) * 100, startDeg: deg, endDeg: deg + mDeg, catKey })
      deg += mDeg + (i < muscles.length - 1 ? SEG_GAP : 0)
    }
    deg += CAT_GAP
  }

  const cx = 120, cy = 120
  const RO_OUT = 108, RO_IN = 96 // outer ring = category
  const RI_OUT = 92,  RI_IN = 56 // inner ring = muscles

  const catArcs = CAT_ORDER.map(catKey => {
    const cs = segs.filter(s => s.catKey === catKey)
    if (!cs.length) return null
    return { catKey, startDeg: cs[0].startDeg, endDeg: cs[cs.length - 1].endDeg, color: CAT_META[catKey].color }
  })

  const catVols = CAT_ORDER.map(c => MUSCLE_ORDER.filter(m => MUSCLE_META[m].catKey === c).reduce((s, m) => s + (vol[m] || 0), 0))
  const hovSeg = segs.find(s => s.muscle === hov)

  return (
    <div className="donut-wrap">
      <svg width="240" height="240" viewBox="0 0 240 240">
        {/* Outer ring: categories */}
        {catArcs.map(ca => ca && (
          <path key={ca.catKey}
            d={donutArc(cx, cy, RO_OUT, RO_IN, ca.startDeg, ca.endDeg)}
            fill={ca.color}
            opacity={hov && MUSCLE_META[hov]?.catKey !== ca.catKey ? 0.18 : 0.65}
            style={{ transition: 'opacity 0.15s' }}
          />
        ))}
        {/* Inner ring: muscles */}
        {segs.map(seg => {
          const isHov = seg.muscle === hov
          const ro = isHov ? RI_OUT + 5 : RI_OUT
          return (
            <path key={seg.muscle}
              d={donutArc(cx, cy, ro, RI_IN, seg.startDeg, seg.endDeg)}
              fill={MUSCLE_META[seg.muscle].color}
              opacity={hov && !isHov ? 0.2 : 0.88}
              style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
              onMouseEnter={() => setHov(seg.muscle)}
              onMouseLeave={() => setHov(null)}
              onTouchStart={() => setHov(hov === seg.muscle ? null : seg.muscle)}
            />
          )
        })}
        {/* Center text */}
        {hovSeg ? (<>
          <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontFamily="Inter,sans-serif" fontSize="12" fontWeight="600">{MUSCLE_META[hovSeg.muscle].label}</text>
          <text x={cx} y={cy + 6}  textAnchor="middle" fill={MUSCLE_META[hovSeg.muscle].color} fontFamily="'Courier New',monospace" fontSize="15" fontWeight="700">{hovSeg.value.toFixed(1)}</text>
          <text x={cx} y={cy + 20} textAnchor="middle" fill="#666" fontFamily="Inter,sans-serif" fontSize="10">сет / цикл</text>
          <text x={cx} y={cy + 33} textAnchor="middle" fill="#555" fontFamily="Inter,sans-serif" fontSize="10">{hovSeg.pct.toFixed(0)}% объёма</text>
        </>) : (<>
          <text x={cx} y={cy - 6}  textAnchor="middle" fill="#555" fontFamily="Inter,sans-serif" fontSize="9" letterSpacing="2">ОБЪЁМ</text>
          <text x={cx} y={cy + 10} textAnchor="middle" fill="#888" fontFamily="'Courier New',monospace" fontSize="12">{total.toFixed(0)} сет</text>
          <text x={cx} y={cy + 24} textAnchor="middle" fill="#555" fontFamily="Inter,sans-serif" fontSize="9">за цикл</text>
        </>)}
      </svg>

      {/* Legend */}
      <div className="donut-legend">
        {CAT_ORDER.map((catKey, ci) => {
          const muscles = MUSCLE_ORDER.filter(m => MUSCLE_META[m].catKey === catKey)
          const catVol = catVols[ci]
          return (
            <div key={catKey} className="donut-cat">
              <div className="donut-cat-hd" style={{ color: CAT_META[catKey].color }}>
                {CAT_META[catKey].label}
                <span className="donut-cat-pct">{((catVol / total) * 100).toFixed(0)}%</span>
              </div>
              {muscles.map(m => (
                <div key={m}
                  className={`donut-row${hov === m ? ' donut-row-hov' : ''}`}
                  onMouseEnter={() => setHov(m)}
                  onMouseLeave={() => setHov(null)}
                  onTouchStart={() => setHov(hov === m ? null : m)}
                >
                  <span className="donut-dot" style={{ background: MUSCLE_META[m].color }} />
                  <span className="donut-name">{MUSCLE_META[m].label}</span>
                  <span className="donut-val" style={{ color: MUSCLE_META[m].color }}>{(vol[m] || 0).toFixed(1)}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ==================== WAVE CHART ====================
function WaveChart({ schemes, activeIndex }: { schemes: WeekScheme[]; activeIndex?: number | null }) {
  const totals = schemes.map(s => s.sets * s.reps)
  const max = Math.max(...totals)
  const anyHov = activeIndex !== null && activeIndex !== undefined

  return (
    <div style={{ padding: '10px 12px' }}>
      <div className="wave-wrap">
        {totals.map((t, i) => {
          const pct = max > 0 ? (t / max) * 100 : 0
          const isActive = activeIndex === i
          return (
            <div key={i}
              className={`wave-bar${isActive ? ' wave-active' : ''}`}
              style={{
                height: `${pct}%`,
                background: barColor(t),
                opacity: anyHov ? (isActive ? 1 : 0.18) : 0.85,
              }}
            />
          )
        })}
      </div>
      <div className="wave-labs">
        {schemes.map((_, i) => (
          <div key={i} className="wave-lab" style={{
            color: activeIndex === i ? '#fff' : undefined,
            fontWeight: activeIndex === i ? '600' : undefined,
          }}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// БЛОК ПРОГРЕССИИ — таблица рабочих весов на 8 недель
// При наведении на строку — подсвечивается соответствующий столбец волн-графика
// Для подтягиваний (isPullup) — показывает "+X кг к телу" вместо абсолютного веса
// ============================================================
function ProgressionBlock({ config, result }: { config: ExerciseConfig; result: SavedExercise }) {
  // hovRow — индекс строки под курсором, передаётся в WaveChart для подсветки
  const [hovRow, setHovRow] = useState<number | null>(null)

  // Вычисляем строки таблицы: рабочий вес, схема, суммарные повторения
  const weekRows = config.percentages.map((pct, i) => {
    const totalWeight = calcWorkingWeight(result.oneRM, pct, config)
    const scheme = config.weekSchemes[i]
    const totalReps = scheme.sets * scheme.reps
    // Для подтягиваний показываем прибавку к весу тела
    const displayWeight = config.isPullup && result.bodyWeight != null
      ? totalWeight - result.bodyWeight  // может быть отрицательным — ассистированные повторения
      : totalWeight
    return { week: i + 1, pct, weight: displayWeight, rawWeight: totalWeight, scheme, totalReps }
  })

  // Заголовок колонки "Вес" меняется для подтягиваний
  const weightColLabel = config.isPullup ? '+кг к телу' : 'Вес, кг'

  return (
    <div className="pb">
      <div className="pb-head">
        <span className="pb-head-name">{config.name}</span>
        <span className="pb-head-1rm">
          1ПМ = {result.oneRM} кг
          {config.isPullup && result.bodyWeight != null && (
            <span style={{ color: 'var(--muted)', fontSize: 12, marginLeft: 8 }}>
              (тело {result.bodyWeight} кг)
            </span>
          )}
        </span>
      </div>
      <table className="pt">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Нед</th>
            <th>{weightColLabel}</th>
            <th>Схема</th>
            <th>Повт итого</th>
          </tr>
        </thead>
        <tbody>
          {weekRows.map((row, i) => (
            // onMouseEnter/Leave синхронизирует подсветку строки и столбца WaveChart
            <tr key={row.week}
              onMouseEnter={() => setHovRow(i)}
              onMouseLeave={() => setHovRow(null)}
            >
              <td className="w-label" style={{ textAlign: 'left' }}>{row.week}</td>
              <td className="w-kg">
                {config.isPullup
                  ? (row.weight >= 0 ? `+${row.weight.toFixed(1)}` : row.weight.toFixed(1))
                  : row.weight.toFixed(1)}
              </td>
              <td className="w-sr">
                {/* Жирным — недели с отклонением от 4 подходов */}
                {row.scheme.sets !== 4
                  ? <><b>{row.scheme.sets}</b> × {row.scheme.reps}</>
                  : <>{row.scheme.sets} × {row.scheme.reps}</>}
              </td>
              <td className={volumeClass(row.totalReps)}>{row.totalReps}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Волновой мини-бар-чарт: activeIndex подсвечивает столбец при наведении на строку */}
      <WaveChart schemes={config.weekSchemes} activeIndex={hovRow} />
    </div>
  )
}

// ============================================================
// КАРТОЧКА ДНЯ ТРЕНИРОВКИ — используется во вкладке "Тренировка"
// Показывает упражнения текущего или следующего дня с рабочими весами
// isPreview=true → затемнённая карточка "следующего дня"
// ============================================================
function TrainingDayCard({ dayDef, weekIndex, exercises, isPreview }: {
  dayDef: TrainingDayDef; weekIndex: number
  exercises: {
    key: string; name: string; weight: number; scheme: WeekScheme; totalReps: number
    isPullup?: boolean; extraWeight?: number // для подтягиваний — отдельно прибавка
  }[]
  isPreview?: boolean
}) {
  return (
    <div className={`training-card${isPreview ? ' training-card-preview' : ''}`}>
      <div className="training-card-head">
        <span className="training-card-day">День {dayDef.dayNumber}</span>
        <span className="training-card-name">{dayDef.name}</span>
        <span className="training-card-week">Нед {weekIndex + 1}</span>
      </div>
      <table className="pt">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Упражнение</th>
            <th>Вес, кг</th><th>Схема</th><th>Повт</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map(ex => (
            <tr key={ex.key}>
              <td style={{ textAlign: 'left', color: '#fff', fontSize: 13, fontWeight: 500 }}>{ex.name}</td>
              <td className="w-kg">
                {/* Для подтягиваний: "+X кг" к телу; для остальных — абсолютный вес */}
                {ex.isPullup && ex.extraWeight != null
                  ? (ex.extraWeight >= 0 ? `+${ex.extraWeight.toFixed(1)}` : ex.extraWeight.toFixed(1))
                  : ex.weight.toFixed(1)}
              </td>
              <td className="w-sr">
                {ex.scheme.sets !== 4
                  ? <><b>{ex.scheme.sets}</b> × {ex.scheme.reps}</>
                  : <>{ex.scheme.sets} × {ex.scheme.reps}</>}
              </td>
              <td className={volumeClass(ex.totalReps)}>{ex.totalReps}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ============================================================
// КОЛЕСО ВЫБОРА УПРАЖНЕНИЙ — модальное окно с SVG-диаграммой
// Клик по сегменту устанавливает selectedExercise в App
// Цвет сегмента = тип снаряда (A=жёлтый, B=оранжевый, C=синий, D=зелёный)
// ============================================================
function ExerciseWheel({ value, onChange, savedExercises = [] }: { value: string; onChange: (key: string) => void; savedExercises?: SavedExercise[] }) {
  const [open, setOpen] = useState(false)
  const [hov, setHov] = useState<string | null>(null)

  // Закрываем колесо по Escape
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open])

  function pick(key: string) { onChange(key); setOpen(false) }

  const N = WHEEL_ORDER.length
  const GAP = 1.5           // зазор между сегментами в градусах
  const USABLE = 360 - GAP * N
  const SD = USABLE / N     // угол одного сегмента

  // Размеры SVG увеличены для лучшей читаемости подписей
  const cx = 190, cy = 190  // центр круга
  const RO = 165            // внешний радиус сегмента
  const RI = 78             // внутренний радиус (дырка в центре)
  const RL = 122            // радиус для подписей

  return (
    <>
      {/* Кнопка-триггер — показывает выбранное упражнение */}
      <button className="ew-trigger" onClick={() => setOpen(true)} type="button">
        <span className="ew-trigger-name">{EXERCISES[value].name}</span>
        <span className="ew-trigger-icon">◈</span>
      </button>

      {open && (
        <div className="ew-overlay" onClick={() => setOpen(false)}>
          <div className="ew-modal" onClick={e => e.stopPropagation()}>
            <div className="ew-modal-title">Выбери упражнение</div>
            {/* viewBox увеличен до 380×380 — больше пространства для подписей */}
            <svg className="ew-svg" viewBox="0 0 380 380">
              {WHEEL_ORDER.map((key, i) => {
                const ex = EXERCISES[key]
                const s = i * (SD + GAP)
                const e = s + SD
                const isHov = hov === key
                const isSel = value === key
                const ro = isHov ? RO + 5 : RO
                const color = TYPE_COLORS[ex.type]
                const midDeg = (s + e) / 2
                const [tx, ty] = pol(cx, cy, RL, midDeg)
                const flip = midDeg > 90 && midDeg < 270
                const rot = flip ? midDeg + 180 : midDeg
                return (
                  <g key={key}>
                    <path
                      d={donutArc(cx, cy, ro, RI, s, e)}
                      fill={color}
                      opacity={hov && !isHov ? 0.2 : isSel ? 0.95 : 0.7}
                      stroke={isSel ? '#e8ff3a' : 'none'}
                      strokeWidth={isSel ? 2 : 0}
                      style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
                      onMouseEnter={() => setHov(key)}
                      onMouseLeave={() => setHov(null)}
                      onTouchStart={() => setHov(hov === key ? null : key)}
                      onClick={() => pick(key)}
                    />
                    {/* Подпись на сегменте — повёрнута вдоль радиуса */}
                    <text
                      x={tx} y={ty}
                      textAnchor="middle" dominantBaseline="central"
                      transform={`rotate(${rot},${tx},${ty})`}
                      fill={isHov ? '#fff' : isSel ? '#fff' : '#bbb'}
                      fontFamily="Inter,sans-serif"
                      fontSize={isHov ? '12' : '11'}
                      fontWeight={isHov || isSel ? '600' : '400'}
                      style={{ pointerEvents: 'none', transition: 'fill 0.15s' }}
                    >{SHORT_NAMES[key]}</text>
                    {/* Метка 1ПМ снаружи кольца — показывается если упражнение уже рассчитано */}
                    {(() => {
                      const saved = savedExercises.find(s => s.exerciseKey === key)
                      if (!saved) return null
                      // Радиус чуть больше RO — метка ложится прямо за цветным сектором
                      const RLO = RO + 14
                      const [lx, ly] = pol(cx, cy, RLO, midDeg)
                      const lrot = flip ? midDeg + 180 : midDeg
                      return (
                        <text
                          x={lx} y={ly}
                          textAnchor="middle" dominantBaseline="central"
                          transform={`rotate(${lrot},${lx},${ly})`}
                          fill={color}
                          fontFamily="'Courier New',monospace"
                          fontSize="9"
                          fontWeight="700"
                          opacity="0.85"
                          style={{ pointerEvents: 'none' }}
                        >{saved.oneRM}</text>
                      )
                    })()}
                  </g>
                )
              })}
              {/* Центральный текст: название упражнения при наведении, "ВЫБЕРИ" по умолчанию */}
              {hov ? (<>
                <text x={cx} y={cy - 12} textAnchor="middle" fill="#fff" fontFamily="Inter,sans-serif" fontSize="13" fontWeight="600">{EXERCISES[hov].name}</text>
                <text x={cx} y={cy + 6}  textAnchor="middle" fill={TYPE_COLORS[EXERCISES[hov].type]} fontFamily="'Courier New',monospace" fontSize="11">{TYPE_LABELS[EXERCISES[hov].type]}</text>
                {EXERCISES[hov].isPullup && (
                  <text x={cx} y={cy + 22} textAnchor="middle" fill="#666" fontFamily="Inter,sans-serif" fontSize="10">тело + доп. вес</text>
                )}
              </>) : (<>
                <text x={cx} y={cy - 8} textAnchor="middle" fill="#555" fontFamily="Inter,sans-serif" fontSize="11" letterSpacing="2">ВЫБЕРИ</text>
                <text x={cx} y={cy + 8} textAnchor="middle" fill="#555" fontFamily="Inter,sans-serif" fontSize="11" letterSpacing="2">УПРАЖНЕНИЕ</text>
              </>)}
            </svg>
            <div className="ew-legend">
              {Object.entries(TYPE_COLORS).map(([t, c]) => (
                <div key={t} className="ew-legend-item">
                  <span className="ew-legend-dot" style={{ background: c }} />
                  <span>{TYPE_LABELS[t]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ============================================================
// APP — главный компонент, управляет всем состоянием приложения
// Поток данных: Auth → loadUser → [Calculator tab / Training tab]
//   → handleCalculate / handleComplete → saveUser
// ============================================================

// ============================================================
// AuthScreen Component
// ============================================================
function AuthScreen({ onLogin }: { onLogin: (name: string, token: string) => void }) {
  const [authMode, setAuthMode]     = useState<'login' | 'register'>('login')
  const [nameInput, setNameInput]   = useState('')
  const [passInput, setPassInput]   = useState('')
  const [pass2Input, setPass2Input] = useState('')
  const [authError, setAuthError]   = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  async function handleAuth() {
    const name = nameInput.trim()
    const pass = passInput
    if (!name || !pass) { setAuthError('Заполни все поля'); return }
    if (authMode === 'register' && pass !== pass2Input) { setAuthError('Пароли не совпадают'); return }
    setAuthLoading(true); setAuthError('')
    const res = await apiAuth(authMode === 'login' ? 'login' : 'register', { name, password: pass })
    setAuthLoading(false)
    if (res.error) { setAuthError(res.error); return }
    const tok = res.token!
    localStorage.setItem('gym_token', tok)
    onLogin(res.name!, tok)
    setNameInput(''); setPassInput(''); setPass2Input('')
  }

  return (
    <>
      <div className="hero">
        <div className="hero-label">Тренировочный калькулятор</div>
        <h1>УМНАЯ ПРОГА 1.1</h1>
        <p>Рассчитай рабочие веса на 8 недель по своему 1ПМ. Реальные схемы с волновой периодизацией.</p>
      </div>
      <div className="auth-card">
        <div className="auth-tabs">
          <button className={`auth-tab${authMode === 'login' ? ' auth-tab-active' : ''}`}
            onClick={() => { setAuthMode('login'); setAuthError('') }}>Войти</button>
          <button className={`auth-tab${authMode === 'register' ? ' auth-tab-active' : ''}`}
            onClick={() => { setAuthMode('register'); setAuthError('') }}>Регистрация</button>
        </div>
        <div className="auth-form">
          <div className="input-group">
            <label className="input-label">Имя пользователя</label>
            <input className="input-field" placeholder="Стив" autoComplete="username"
              value={nameInput} onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAuth()} />
          </div>
          <div className="input-group">
            <label className="input-label">Пароль</label>
            <input className="input-field" type="password" placeholder="••••••" autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
              value={passInput} onChange={e => setPassInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAuth()} />
          </div>
          {authMode === 'register' && (
            <div className="input-group">
              <label className="input-label">Повторить пароль</label>
              <input className="input-field" type="password" placeholder="••••••" autoComplete="new-password"
                value={pass2Input} onChange={e => setPass2Input(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAuth()} />
            </div>
          )}
          {authError && <div className="auth-error">{authError}</div>}
          <button className="btn" style={{ width: '100%', marginTop: 8 }}
            onClick={handleAuth} disabled={authLoading}>
            {authLoading ? '...' : authMode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </button>
        </div>
      </div>
    </>
  )
}


// ============================================================
// CalculatorTab Component
// ============================================================
interface CalculatorTabProps {
  userData: UserData;
  userName: string;
  token: string;
  setUserData: (data: UserData) => void;
  activeResult: SavedExercise | null;
  setActiveResult: (res: SavedExercise | null) => void;
}

function CalculatorTab({ userData, userName, token, setUserData, activeResult, setActiveResult }: CalculatorTabProps) {
  const [selectedExercise, setSelectedExercise] = useState('bench')
  const [testWeight, setTestWeight]     = useState('')
  const [testBodyWeight, setTestBodyWeight] = useState('')
  const [testExtraWeight, setTestExtraWeight] = useState('')
  const [testReps, setTestReps]         = useState('')

  function handleCalculate() {
    const cfg = EXERCISES[selectedExercise]
    let totalWeight: number
    let bodyWeightVal: number | undefined

    if (cfg.isPullup) {
      const bw = parseFloat(testBodyWeight)
      const ew = parseFloat(testExtraWeight) || 0
      if (!bw || bw < 1) return
      totalWeight = bw + ew
      bodyWeightVal = bw
    } else {
      totalWeight = parseFloat(testWeight)
      if (!totalWeight || totalWeight < 1) return
    }

    const r = parseInt(testReps)
    if (!r || r < 1) return

    const oneRM = Math.round(calc1RM(totalWeight, r) * 10) / 10
    const saved: SavedExercise = {
      exerciseKey: selectedExercise, testWeight: totalWeight, testReps: r, oneRM,
      date: new Date().toLocaleDateString('ru-RU'),
      bodyWeight: bodyWeightVal,
    }
    const updated: UserData = {
      ...userData, name: userName,
      exercises: [...(userData.exercises.filter(e => e.exerciseKey !== selectedExercise) || []), saved],
    }
    setUserData(updated); setActiveResult(saved)
    setTestWeight(''); setTestReps(''); setTestBodyWeight(''); setTestExtraWeight('')
    saveUser(updated, token)
  }

  function handleDelete(key: string) {
    const updated: UserData = { ...userData, exercises: userData.exercises.filter(e => e.exerciseKey !== key) }
    setUserData(updated)
    if (activeResult?.exerciseKey === key) setActiveResult(null)
    saveUser(updated, token)
  }

  function handleSelectSaved(saved: SavedExercise) {
    setActiveResult(saved); setSelectedExercise(saved.exerciseKey)
  }

  const config = EXERCISES[activeResult?.exerciseKey || selectedExercise]

  const weekRows = activeResult
    ? config.percentages.map((pct, i) => {
        const weight = calcWorkingWeight(activeResult.oneRM, pct, config)
        const scheme = config.weekSchemes[i]
        return { weight, scheme, totalReps: scheme.sets * scheme.reps }
      })
    : []
  const w1 = weekRows[0], w8 = weekRows[weekRows.length - 1]

  return (
    <>
      <div className="section">
        <div className="section-header">
          <span className="section-num">01</span>
          <span className="section-title">Тестовый подход</span>
        </div>
        <div className="input-grid">
          <div className="input-group">
            <label className="input-label">Упражнение</label>
            <ExerciseWheel value={selectedExercise} onChange={key => {
              setSelectedExercise(key)
              setTestWeight(''); setTestBodyWeight(''); setTestExtraWeight(''); setTestReps('')
            }} savedExercises={userData.exercises} />
          </div>

          {EXERCISES[selectedExercise].isPullup ? (<>
            <div className="input-group">
              <label className="input-label">Вес тела (кг)</label>
              <input className="input-field" type="number" placeholder="80"
                value={testBodyWeight} onChange={e => setTestBodyWeight(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCalculate()} />
            </div>
            <div className="input-group">
              <label className="input-label">Доп. вес (кг)</label>
              <input className="input-field" type="number" placeholder="0"
                value={testExtraWeight} onChange={e => setTestExtraWeight(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCalculate()} />
            </div>
          </>) : (
            <div className="input-group">
              <label className="input-label">Вес (кг)</label>
              <input className="input-field" type="number" placeholder="80"
                value={testWeight} onChange={e => setTestWeight(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCalculate()} />
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Повторений</label>
            <input className="input-field" type="number" placeholder="6" min="1" max="20"
              value={testReps} onChange={e => setTestReps(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCalculate()} />
          </div>
          <button className="btn" onClick={handleCalculate}>Рассчитать</button>
        </div>

        <div className="note-box" style={{ marginTop: 16 }}>
          {EXERCISES[selectedExercise].isPullup ? (<>
            <strong>Подтягивания:</strong> введи вес тела + доп. вес (если есть). Итоговый 1ПМ = тело + доп.
            В прогрессии показана только прибавка к весу тела (+X кг к поясу). Если результат отрицательный — ассистированные подтягивания.
          </>) : (<>
            <strong>Инструкция:</strong> Отказной подход в диапазоне 4–8 повторений → калькулятор пересчитает 1ПМ
            и покажет рабочие веса на 8 недель с реальными схемами. Наведи на строку — бар подсветится.
          </>)}
        </div>
      </div>

      {activeResult && (
        <div className="section">
          <div className="section-header">
            <span className="section-num">02</span>
            <span className="section-title">Прогрессия — {config.name}</span>
          </div>

          <div className="insight">
            <strong>Объём снижается по мере роста весов</strong> — линейная волна с откатом на неделе 5.
            {w1 && w8 && (<>
              <br /><br />
              Нед 1: <code>{w1.weight} кг · {w1.scheme.sets}×{w1.scheme.reps} = {w1.totalReps} повт</code>
              {' → '}
              Нед 8: <code>{w8.weight} кг · {w8.scheme.sets}×{w8.scheme.reps} = {w8.totalReps} повт</code>
              {'. Вес +'}
              <strong>{Math.round((w8.weight / w1.weight - 1) * 100)}%</strong>
              {', объём '}
              {w1.totalReps > w8.totalReps
                ? <>упал в <strong>{(w1.totalReps / w8.totalReps).toFixed(1)}×</strong></>
                : <>стабилен</>
              }.
            </>)}
          </div>

          <ProgressionBlock config={config} result={activeResult} />

          <div className="result-card" style={{ marginTop: 16 }}>
            <div className="result-label">Расчётный 1ПМ</div>
            <div className="result-value">{activeResult.oneRM}<span>кг</span></div>
            <div className="result-meta">
              Тест: {activeResult.testWeight} кг × {activeResult.testReps} повт &nbsp;|&nbsp;
              {TYPE_LABELS[config.type]} &nbsp;|&nbsp; Шаг: {config.step} кг &nbsp;|&nbsp; {activeResult.date}
            </div>
          </div>

          <div className="note-box">
            <strong>↺ Нед 5 — волновой откат:</strong> вес снижается, объём восстанавливается.
            &nbsp;·&nbsp; <strong>Жирный</strong> в «Схема» = отклонение от 4 подходов.
            <br /><br />
            <strong>Цвет объёма:</strong>{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>жёлтый ≥28</span>&nbsp;·&nbsp;
            <span style={{ color: '#aaa' }}>серый 17–27</span>&nbsp;·&nbsp;
            <span style={{ color: '#ff4d4d', fontWeight: 600 }}>красный ≤16</span>
          </div>
        </div>
      )}

      {userData && userData.exercises.length > 0 && (
        <div className="section">
          <div className="section-header">
            <span className="section-num">03</span>
            <span className="section-title">
              Сохранённые
              <span style={{ fontFamily: 'Courier New', fontSize: 14, color: 'var(--muted)', marginLeft: 12 }}>
                {userData.exercises.length}/{EX_COUNT}
              </span>
            </span>
          </div>
          <div className="saved-list">
            {userData.exercises.map(saved => {
              const ex = EXERCISES[saved.exerciseKey]; if (!ex) return null
              const isActive = activeResult?.exerciseKey === saved.exerciseKey
              return (
                <div key={saved.exerciseKey}
                  className={`saved-item${isActive ? ' saved-item-active' : ''}`}
                  onClick={() => handleSelectSaved(saved)}
                >
                  <div>
                    <div className="saved-item-name">{ex.name}</div>
                    <div className="saved-item-info">{saved.testWeight}кг × {saved.testReps} повт &nbsp;|&nbsp; {saved.date}</div>
                  </div>
                  <div className="saved-item-actions">
                    <span className="saved-item-1rm">{saved.oneRM} кг</span>
                    <button className="btn-sm btn-danger"
                      onClick={e => { e.stopPropagation(); handleDelete(saved.exerciseKey) }}>×</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="section">
        <div className="section-header">
          <span className="section-num">04</span>
          <span className="section-title">Распределение объёма</span>
        </div>
        <div className="note-box" style={{ marginBottom: 20 }}>
          Средние рабочие подходы за цикл (3 дня), распределённые по мышечным группам.
          Наведи на сектор чтобы увидеть детали.
        </div>
        <VolumeDonut />
      </div>
    </>
  )
}


// ============================================================
// TrainingTab Component
// ============================================================
interface TrainingTabProps {
  userData: UserData;
  token: string;
  setUserData: (data: UserData) => void;
  allSaved: boolean;
  missingExercises: string[];
  setActiveTab: (tab: 'calculator' | 'training' | 'theory') => void;
}

function TrainingTab({ userData, token, setUserData, allSaved, missingExercises, setActiveTab }: TrainingTabProps) {
  const completedSessions = userData.trainingProgress?.completedSessions ?? 0
  const currentDayIdx  = completedSessions % 3
  const currentWeekIdx = Math.floor(completedSessions / 3)
  const programDone    = completedSessions >= 24
  const nextSessions   = completedSessions + 1
  const nextDayIdx     = nextSessions % 3
  const nextWeekIdx    = Math.floor(nextSessions / 3)

  function getTrainingExercises(dayIdx: number, weekIdx: number) {
    return TRAINING_DAYS[dayIdx].exerciseKeys.map(key => {
      const cfg = EXERCISES[key]
      const saved = userData.exercises.find(e => e.exerciseKey === key)
      if (!saved) return null
      const totalWeight = calcWorkingWeight(saved.oneRM, cfg.percentages[weekIdx], cfg)
      const scheme = cfg.weekSchemes[weekIdx]
      const isPullup = !!cfg.isPullup
      const extraWeight = isPullup && saved.bodyWeight != null
        ? totalWeight - saved.bodyWeight
        : undefined
      return { key, name: cfg.name, weight: totalWeight, scheme, totalReps: scheme.sets * scheme.reps, isPullup, extraWeight }
    }).filter((x): x is NonNullable<typeof x> => x !== null)
  }

  function handleComplete() {
    if (programDone) return
    const updated: UserData = { ...userData, trainingProgress: { completedSessions: completedSessions + 1 } }
    setUserData(updated); saveUser(updated, token)
  }

  function handleReset() {
    const updated: UserData = { ...userData, trainingProgress: { completedSessions: 0 } }
    setUserData(updated); saveUser(updated, token)
  }

  return (
    <>
      {!allSaved ? (
        <div className="locked-view">
          <div className="locked-icon">&#128274;</div>
          <div className="locked-title">Введи 1ПМ для всех упражнений</div>
          <div className="locked-desc">
            Вкладка «Тренировка» станет доступна когда рассчитаны 1ПМ для всех {EX_COUNT} упражнений.
          </div>
          <div className="locked-missing">
            {missingExercises.map(n => <span key={n} className="locked-missing-item">— {n}</span>)}
          </div>
          <button className="btn" style={{ marginTop: 24 }} onClick={() => setActiveTab('calculator')}>
            Перейти в калькулятор
          </button>
        </div>
      ) : programDone ? (
        <div className="section">
          <div className="section-header">
            <span className="section-num">01</span>
            <span className="section-title">Программа завершена</span>
          </div>
          <div className="program-complete">
            <div className="program-complete-icon">&#127942;</div>
            <div className="program-complete-title">8 недель пройдено!</div>
            <div className="program-complete-stat">{completedSessions} тренировок · 8 недель · 3 дня</div>
            <p className="program-complete-desc">
              Пересчитай 1ПМ по контрольным подходам и начни новый цикл.
            </p>
            <button className="btn" style={{ marginTop: 20 }} onClick={handleReset}>Начать новый цикл</button>
          </div>
        </div>
      ) : (
        <>
          <div className="training-progress">
            <div className="training-progress-label">
              <span>Прогресс программы</span>
              <span>{completedSessions} / 24 тренировок</span>
            </div>
            <div className="training-progress-bar">
              <div className="training-progress-fill" style={{ width: `${(completedSessions / 24) * 100}%` }} />
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <span className="section-num">01</span>
              <span className="section-title">Текущая тренировка</span>
            </div>
            <TrainingDayCard
              dayDef={TRAINING_DAYS[currentDayIdx]}
              weekIndex={currentWeekIdx}
              exercises={getTrainingExercises(currentDayIdx, currentWeekIdx)}
            />
            <button className="btn-complete" onClick={handleComplete}>Завершить тренировку</button>
          </div>

          {nextSessions < 24 && (
            <div className="section">
              <div className="section-header">
                <span className="section-num">02</span>
                <span className="section-title">Следующая тренировка</span>
              </div>
              <div className="next-day-label">Предпросмотр</div>
              <TrainingDayCard
                dayDef={TRAINING_DAYS[nextDayIdx]}
                weekIndex={nextWeekIdx}
                exercises={getTrainingExercises(nextDayIdx, nextWeekIdx)}
                isPreview
              />
            </div>
          )}
        </>
      )}
    </>
  )
}

function App() {
  const [token, setToken]       = useState(() => localStorage.getItem('gym_token') || '')
  const [userName, setUserName] = useState(() => {
    const t = localStorage.getItem('gym_token') || ''
    return t ? (jwtName(t) || '') : ''
  })

  const [userData, setUserData]         = useState<UserData | null>(null)
  const [activeTab, setActiveTab]       = useState<'calculator' | 'training' | 'theory'>('calculator')
  const [activeResult, setActiveResult] = useState<SavedExercise | null>(null)

  useEffect(() => {
    if (userName && token) {
      loadUser(userName, token).then(d => {
        if (d) setUserData(d)
        else { setToken(''); setUserName(''); localStorage.removeItem('gym_token') }
      })
    }
  }, [userName, token])

  // ⚡ Bolt: Using useMemo and a Set to cache the saved exercise keys for O(1) lookup
  // This reduces the time complexity of checking all saved/missing exercises from O(N*M) to O(N).
  const { allSaved, missingExercises } = useMemo(() => {
    if (!userData) {
      return {
        allSaved: false,
        missingExercises: Object.values(EXERCISES).map(ex => ex.name)
      }
    }
    const savedKeys = new Set(userData.exercises.map(e => e.exerciseKey))
    const allExEntries = Object.entries(EXERCISES)
    return {
      allSaved: allExEntries.every(([k]) => savedKeys.has(k)),
      missingExercises: allExEntries.filter(([k]) => !savedKeys.has(k)).map(([, ex]) => ex.name)
    }
  }, [userData])

  function handleLogout() {
    localStorage.removeItem('gym_token')
    setToken(''); setUserName(''); setUserData(null)
    setActiveResult(null); setActiveTab('calculator')
  }

  if (!userName || !token) return (
    <AuthScreen onLogin={(name, tok) => { setUserName(name); setToken(tok) }} />
  )

  if (!userData) return (
    <>
      <div className="hero">
        <div className="hero-label">Тренировочный калькулятор</div>
        <h1>УМНАЯ ПРОГА 1.1</h1>
      </div>
      <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '48px 0' }}>Загрузка данных...</div>
    </>
  )

  return (
    <>
      <div className="hero">
        <div className="hero-label">Тренировочный калькулятор</div>
        <h1>УМНАЯ ПРОГА 1.1</h1>
        <p>Введи тестовый вес и повторения — получи расклад рабочих весов с реальными схемами на 8 недель</p>
      </div>

      <div className="user-bar">
        <span className="user-bar-label">Атлет</span>
        <span className="user-bar-name">{userName}</span>
        <div style={{ flex: 1 }} />
        <button className="btn-sm btn-ghost" onClick={handleLogout}>Выйти</button>
      </div>

      <div className="tab-bar">
        <button className={`tab-btn${activeTab === 'calculator' ? ' tab-active' : ''}`}
          onClick={() => setActiveTab('calculator')}>
          Калькулятор
        </button>
        <button
          className={`tab-btn${activeTab === 'training' ? ' tab-active' : ''}${!allSaved ? ' tab-locked' : ''}`}
          onClick={() => allSaved && setActiveTab('training')}
          title={!allSaved ? `Сохрани 1ПМ для всех ${EX_COUNT} упражнений` : undefined}
        >
          Тренировка {!allSaved && (
            <span style={{ fontSize: 11, marginLeft: 6, opacity: 0.55 }}>
              ({userData?.exercises.length || 0}/{EX_COUNT})
            </span>
          )}
        </button>
        <button className={`tab-btn${activeTab === 'theory' ? ' tab-active' : ''}`}
          onClick={() => setActiveTab('theory')}>
          Теория
        </button>
      </div>

      {activeTab === 'calculator' && (
        <CalculatorTab
          userData={userData}
          userName={userName}
          token={token}
          setUserData={setUserData}
          activeResult={activeResult}
          setActiveResult={setActiveResult}
        />
      )}

      {activeTab === 'theory' && <TheoryTab />}

      {activeTab === 'training' && (
        <TrainingTab
          userData={userData}
          token={token}
          setUserData={setUserData}
          allSaved={allSaved}
          missingExercises={missingExercises}
          setActiveTab={setActiveTab}
        />
      )}
    </>
  )
}

export default App
