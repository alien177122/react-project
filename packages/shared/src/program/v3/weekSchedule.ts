export type WeekLoadKind = 'rm12' | 'rm10' | 'test' | 'percent';

export interface WeekScheduleRow {
  week: number;
  loadKind: WeekLoadKind;
  sets: number;
  reps: number;
  percent?: number;
  phase: string;
  repsPlusOne?: boolean;
}

export const WEEK_SCHEDULE_V3: WeekScheduleRow[] = [
  {week: 1, loadKind: 'rm12', sets: 1, reps: 8, phase: 'Подготовка'},
  {week: 2, loadKind: 'rm10', sets: 2, reps: 8, phase: 'Подготовка'},
  {week: 3, loadKind: 'rm10', sets: 3, reps: 8, phase: 'Подготовка'},
  {week: 4, loadKind: 'test', sets: 1, reps: 8, phase: 'Тест'},
  {week: 5, loadKind: 'percent', sets: 3, reps: 8, percent: 0.7, phase: 'Мезоцикл 1'},
  {week: 6, loadKind: 'percent', sets: 4, reps: 6, percent: 0.75, phase: 'Мезоцикл 1'},
  {week: 7, loadKind: 'percent', sets: 4, reps: 8, percent: 0.65, phase: 'Мезоцикл 1'},
  {week: 8, loadKind: 'test', sets: 1, reps: 1, percent: 0.825, phase: 'Тест'},
  {
    week: 9,
    loadKind: 'percent',
    sets: 4,
    reps: 8,
    percent: 0.725,
    phase: 'Мезоцикл 2',
    repsPlusOne: true,
  },
  {
    week: 10,
    loadKind: 'percent',
    sets: 4,
    reps: 6,
    percent: 0.775,
    phase: 'Мезоцикл 2',
    repsPlusOne: true,
  },
  {week: 11, loadKind: 'percent', sets: 3, reps: 10, percent: 0.65, phase: 'Мезоцикл 2'},
  {week: 12, loadKind: 'test', sets: 1, reps: 1, percent: 0.85, phase: 'Тест'},
  {week: 13, loadKind: 'percent', sets: 4, reps: 8, percent: 0.7, phase: 'Мезоцикл 3'},
  {week: 14, loadKind: 'percent', sets: 5, reps: 5, percent: 0.75, phase: 'Мезоцикл 3'},
  {week: 15, loadKind: 'percent', sets: 4, reps: 8, percent: 0.675, phase: 'Мезоцикл 3'},
  {week: 16, loadKind: 'test', sets: 1, reps: 1, percent: 0.9, phase: 'Тест'},
];

export function getWeekScheduleRow(programWeek: number): WeekScheduleRow | undefined {
  return WEEK_SCHEDULE_V3.find(row => row.week === programWeek);
}

export function getWeekScheduleV3(): WeekScheduleRow[] {
  return WEEK_SCHEDULE_V3;
}

/** Human-readable sets×reps; test weeks after W4 are one set to failure (1×?). */
export function formatWeekScheme(
  row: Pick<WeekScheduleRow, 'loadKind' | 'week' | 'sets' | 'reps'>,
): string {
  if (row.loadKind !== 'test') {
    return `${row.sets}×${row.reps}`;
  }
  if (row.week === 4) {
    return `1×${row.reps}`;
  }
  return '1×?';
}
