import type { ChapterId, TheoryChapterMeta } from '../types/theory'

/**
 * Static metadata for the 10 chapters of the Theory tab.
 * Kept data-only so component modules can stay single-purpose.
 */
export const THEORY_CHAPTERS = [
  {
    id: 'basics',
    num: '01',
    title: 'Основы',
    cardTitle: 'Основы тренировки',
    panelTitle: 'Основы тренировки',
    summary: '1ПМ, прогрессия и понятия, на которых держится 8-недельный план.',
    accentVar: '--ta-sec-01',
    tintVar: '--ta-sec-01-tint',
  },
  {
    id: 'mtor',
    num: '02',
    title: 'mTOR',
    cardTitle: 'mTOR и рост',
    panelTitle: 'mTOR и анаболический отклик',
    summary: 'Как механический стимул, аминокислоты и энергия складываются в сигнал роста.',
    accentVar: '--ta-sec-02',
    tintVar: '--ta-sec-02-tint',
  },
  {
    id: 'tiers',
    num: '03',
    title: 'Tier List',
    cardTitle: 'Tier List добавок',
    panelTitle: 'Tier List добавок',
    summary: 'Приоритизация добавок: что работает часто, что ситуативно, а что можно не трогать.',
    accentVar: '--ta-sec-03',
    tintVar: '--ta-sec-03-tint',
  },
  {
    id: 'top3',
    num: '04',
    title: 'Топ-3',
    cardTitle: 'Топ-3 добавки',
    panelTitle: 'Топ-3, если выбирать',
    summary: 'Минимальный набор для силы, концентрации и восстановления без лишнего шума.',
    accentVar: '--ta-sec-04',
    tintVar: '--ta-sec-04-tint',
  },
  {
    id: 'specs',
    num: '05',
    title: '%ПМ + RPE',
    cardTitle: 'Интенсивность и RPE',
    panelTitle: 'Интенсивность и RPE',
    summary: 'Две шкалы, которые удерживают тренировку в рабочей зоне и контролируют цену усилия.',
    accentVar: '--ta-sec-05',
    tintVar: '--ta-sec-05-tint',
  },
  {
    id: 'tendons',
    num: '06',
    title: 'Сухожилия',
    cardTitle: 'Сухожилия',
    panelTitle: 'Протокол укрепления сухожилий',
    summary: 'Зона деформации, тяжёлые удержания и дозировка нагрузки для адаптации сухожилий.',
    accentVar: '--ta-sec-06',
    tintVar: '--ta-sec-06-tint',
  },
  {
    id: 'cardio',
    num: '07',
    title: 'Кардио',
    cardTitle: 'Кардио и сосуды',
    panelTitle: 'Кардио и сосудистое здоровье',
    summary: 'Ходьба, бег, плавание и интервалы как инструменты сосудистой адаптации.',
    accentVar: '--ta-sec-07',
    tintVar: '--ta-sec-07-tint',
  },
  {
    id: 'mechanics',
    num: '08',
    title: 'Механика',
    cardTitle: 'Механика нагрузки',
    panelTitle: 'Механика важнее мотивации',
    summary: 'Почему один и тот же вес ощущается по-разному из-за рычагов и позиции.',
    accentVar: '--ta-sec-08',
    tintVar: '--ta-sec-08-tint',
  },
  {
    id: 'strength',
    num: '09',
    title: 'Формула силы',
    cardTitle: 'Формула силы',
    panelTitle: 'Формула силы',
    summary: 'Порядок факторов: что поднимать первым, как вести волну и где остановить усталость.',
    accentVar: '--ta-sec-09',
    tintVar: '--ta-sec-09-tint',
  },
  {
    id: 'progression',
    num: '10',
    title: 'Прогрессия 2.0',
    cardTitle: 'Прогрессия 2.0',
    panelTitle: 'Прогрессия 2.0',
    summary: 'Карта управления нагрузкой: циклы, модели, научная база и специальные методы.',
    accentVar: '--ta-sec-10',
    tintVar: '--ta-sec-10-tint',
  },
] as const satisfies readonly TheoryChapterMeta[]

export const THEORY_CHAPTER_ALIASES: Readonly<Record<string, ChapterId>> = {
  tables: 'specs',
  tendon: 'tendons',
  formula: 'strength',
  progression2: 'progression',
}

export const THEORY_CHAPTER_IDS = THEORY_CHAPTERS.map((chapter) => chapter.id)

export function isChapterId(value: string | null): value is ChapterId {
  return Boolean(value && THEORY_CHAPTER_IDS.includes(value as ChapterId))
}

export function normalizeChapterId(value: string | null): ChapterId | null {
  if (isChapterId(value)) return value
  return value ? THEORY_CHAPTER_ALIASES[value] ?? null : null
}

export function getTheoryChapter(id: ChapterId): TheoryChapterMeta {
  return THEORY_CHAPTERS.find((chapter) => chapter.id === id) ?? THEORY_CHAPTERS[0]
}

export type { ChapterId, TheoryChapterMeta }
