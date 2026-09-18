import {EXERCISES} from '../data/exercises.ts';
import type {ProgressionPreset, ProgramSettings} from '../types/index.ts';
import {PROGRAM_DAYS_PER_WEEK} from '../types/index.ts';
import {calcWorkingWeight} from '../utils/calc.ts';

export const DEMO_SQUAT_ONE_RM = 100;
export const DEMO_SQUAT_EXERCISE_KEY = 'squat';

export interface ProgressionPreviewWeek {
  week: number;
  weight: number | null;
  pct: number | null;
  sets: number;
  reps: number;
  totalReps: number;
  phase: string;
  loadLabel?: string;
  isDeload?: boolean;
  isTestWeek?: boolean;
  isPrepWeek?: boolean;
  weightDisplay?: string;
  repsDisplay?: string;
  schemeDisplay?: string;
}

export function buildGeneralPreviewWeeks(oneRM = DEMO_SQUAT_ONE_RM): ProgressionPreviewWeek[] {
  const config = EXERCISES[DEMO_SQUAT_EXERCISE_KEY];
  if (!config) return [];

  return config.percentages.map((pct, index) => {
    const scheme = config.weekSchemes[index];
    return {
      week: index + 1,
      weight: calcWorkingWeight(oneRM, pct, config),
      pct,
      sets: scheme.sets,
      reps: scheme.reps,
      totalReps: scheme.sets * scheme.reps,
      phase:
        index < 4 ? 'Накопление' : index === 4 ? 'Разгрузка' : index < 7 ? 'Интенсификация' : 'Пик',
      isDeload: index === 4,
    };
  });
}

/** @deprecated Use buildGeneralPreviewWeeks — strength track removed. */
export const buildStrengthPreviewWeeks = buildGeneralPreviewWeeks;

export function filterChartPreviewWeeks(
  weeks: ProgressionPreviewWeek[],
  _preset: ProgressionPreset = 'general',
): ProgressionPreviewWeek[] {
  void _preset;
  return weeks.filter(week => !week.isTestWeek && !week.isPrepWeek);
}

export function getTestWeekExplanation(_preset: ProgressionPreset = 'general'): string {
  void _preset;
  return 'Веса считаются от исходного 1ПМ по фиксированным %. На 5-й неделе — разгрузка (ниже объём и интенсивность). Тестовых недель нет.';
}

export function buildProgressionPreviewWeeks(
  _preset: ProgressionPreset = 'general',
  oneRM = DEMO_SQUAT_ONE_RM,
): ProgressionPreviewWeek[] {
  void _preset;
  return buildGeneralPreviewWeeks(oneRM);
}

const GENERAL_PHASE_DISPLAY: Record<string, string> = {
  Накопление: 'Объем',
  Разгрузка: 'Разгрузка',
  Интенсификация: 'Сила',
  Пик: 'Пик',
};

/** Meso working-week slots (Program 3.0 internal chart). */
const V3_MESO_PHASES = ['Объем', 'Сила', 'Гипертрофия'] as const;
const V3_MESO_WEEKS: readonly (readonly number[])[] = [
  [5, 6, 7],
  [9, 10, 11],
  [13, 14, 15],
];

export function getPhaseDisplayLabel(
  week: Pick<ProgressionPreviewWeek, 'week' | 'phase' | 'sets' | 'reps'>,
  _preset: ProgressionPreset = 'general',
): string {
  void _preset;
  if (GENERAL_PHASE_DISPLAY[week.phase]) {
    return GENERAL_PHASE_DISPLAY[week.phase] ?? week.phase;
  }

  if (week.phase === 'Тест') {
    return 'Тест';
  }

  for (const meso of V3_MESO_WEEKS) {
    const index = meso.indexOf(week.week);
    if (index >= 0) {
      return V3_MESO_PHASES[index] ?? 'Объем';
    }
  }

  return week.phase.startsWith('Мезоцикл') ? 'Объем' : week.phase;
}

export function getProgressionPreviewMeta(_settings: ProgramSettings): {
  title: string;
  subtitle: string;
  weekCount: number;
} {
  void _settings;
  const weeks = buildProgressionPreviewWeeks('general');
  return {
    title: `Присед · 1ПМ ${DEMO_SQUAT_ONE_RM} кг`,
    subtitle: `Оптимальная · 8 нед · ${PROGRAM_DAYS_PER_WEEK} дня/нед`,
    weekCount: weeks.length,
  };
}
