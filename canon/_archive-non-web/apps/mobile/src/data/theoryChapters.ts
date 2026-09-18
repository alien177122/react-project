export interface TheoryChapter {
  id: string;
  num: string;
  title: string;
  summary: string;
  kind?: 'chapter' | 'reading';
}

/** Flat chapter index for mobile Theory — content summaries without web chrome. */
export const THEORY_CHAPTERS: TheoryChapter[] = [
  {
    id: 'basics',
    num: '01',
    title: 'Основы',
    summary: 'Fractional-сеты, 1ПМ, прогрессия и понятия 8-недельного плана.',
  },
  {
    id: 'mtor',
    num: '02',
    title: 'mTOR',
    summary: 'Механический стимул, аминокислоты и энергия → сигнал роста.',
  },
  {
    id: 'tiers',
    num: '03',
    title: 'Tier List',
    summary: 'Добавки: что работает часто, что ситуативно, что можно не трогать.',
  },
  {
    id: 'top3',
    num: '04',
    title: 'Топ-3',
    summary: 'Минимальный набор для силы, концентрации и восстановления.',
  },
  {
    id: 'specs',
    num: '05',
    title: '%ПМ + RPE',
    summary: 'Две шкалы интенсивности для рабочей зоны и контроля усилия.',
  },
  {
    id: 'tendons',
    num: '06',
    title: 'Сухожилия',
    summary: 'Зона деформации 4,5–6,5%, изометрия 3–6 с, дозировка протокола.',
  },
  {
    id: 'cardio',
    num: '07',
    title: 'Кардио',
    summary: 'Ходьба, бег, плавание и интервалы для сосудистой адаптации.',
  },
  {
    id: 'mechanics',
    num: '08',
    title: 'Механика',
    summary: 'Рычаги и позиция: почему один вес ощущается по-разному.',
  },
  {
    id: 'strength',
    num: '09',
    title: 'Формула силы',
    summary: 'Порядок факторов: что поднимать первым и где остановить усталость.',
  },
  {
    id: 'progression',
    num: '10',
    title: 'Прогрессия 2.0',
    summary: 'Циклы, модели нагрузки и специальные методы.',
  },
];

export const THEORY_READING_ARTICLES: TheoryChapter[] = [
  {
    id: 'diabetes-habits',
    kind: 'reading',
    num: 'Статья',
    title: 'Пять привычек к диабету',
    summary: 'GLUT4, жидкие калории, недосып — конспект клинического разбора.',
  },
  {
    id: 'late-dinner',
    kind: 'reading',
    num: 'Статья',
    title: 'Почему вредно есть на ночь',
    summary: 'Мелатонин и инсулин, хронотипы и правило 3–4 часов до сна.',
  },
  {
    id: 'anabolic-vessels',
    kind: 'reading',
    num: 'Статья',
    title: 'Что анаболики делают с сосудами',
    summary: 'Курсы AAS, оксидативный стресс, эстрадиол и рост стенки артерии.',
  },
];
