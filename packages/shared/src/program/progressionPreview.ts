import {EXERCISES} from '../data/exercises.ts';
import type {ProgressionPreset, ProgramSettings} from '../types/index.ts';
import {calcWorkingWeight, ceilToStep} from '../utils/calc.ts';
import {getWeekScheduleV3} from './progressionPresets.ts';
import {calcWorkingWeightV3} from './v3/prescription.ts';
import {EXERCISES_V3} from './v3/exercises.ts';
import {getTestAnchorWeek} from './v3/testWeeks.ts';
import {formatWeekScheme} from './v3/weekSchedule.ts';

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
  /** Program 3.0 test anchor weeks — weight unknown until user logs failure set */
  isTestWeek?: boolean;
  /** Program 3.0 prep weeks (12ПМ/10ПМ) — excluded from chart visualization */
  isPrepWeek?: boolean;
  /** Display weight when unknown (test weeks) */
  weightDisplay?: string;
  /** Reps unknown until failure set (test weeks) */
  repsDisplay?: string;
  /** Display scheme override (test weeks: 1×8 or 1×?) */
  schemeDisplay?: string;
}

/** Demo test results for strength-track preview (squat, Brzycki anchors). */
const STRENGTH_DEMO_TESTS: Record<number, {weight: number; reps: number}> = {
  4: {weight: 80, reps: 8},
  8: {weight: 82.5, reps: 2},
  12: {weight: 90, reps: 1},
};

function loadLabelForKind(loadKind: string): string | undefined {
  if (loadKind === 'rm12') return '12ПМ';
  if (loadKind === 'rm10') return '10ПМ';
  if (loadKind === 'test') return 'Тест';
  return undefined;
}

/** Prescribed test load for preview: demo 1ПМ × program % (rounded to bar step). */
function calcTestWeekPreviewWeight(oneRM: number, percent: number, step: number): number {
  return ceilToStep(oneRM * percent, step);
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

export function buildStrengthPreviewWeeks(oneRM = DEMO_SQUAT_ONE_RM): ProgressionPreviewWeek[] {
  const config = EXERCISES_V3[DEMO_SQUAT_EXERCISE_KEY];
  if (!config) return [];

  return getWeekScheduleV3('strength').map(row => {
    const loadLabel = loadLabelForKind(row.loadKind);
    let weight: number | null = null;
    let pct: number | null = null;
    let weightDisplay: string | undefined;
    let repsDisplay: string | undefined;
    let schemeDisplay: string | undefined;

    if (row.loadKind === 'percent' && row.percent != null) {
      const anchorWeek = getTestAnchorWeek(row.week);
      const test = anchorWeek ? STRENGTH_DEMO_TESTS[anchorWeek] : undefined;
      if (test) {
        weight = calcWorkingWeightV3({
          testWeight: test.weight,
          testReps: test.reps,
          targetPercent: row.percent,
          step: config.step,
          repsPlusOne: row.repsPlusOne,
        });
        pct = Math.round(row.percent * 1000) / 10;
      }
    }

    const isPrepWeek = isPrepLoadKind(row.loadKind) || row.phase === 'Подготовка';

    const isTestWeek = row.loadKind === 'test';

    if (isTestWeek) {
      repsDisplay = '?';
      schemeDisplay = formatWeekScheme(row);
      if (row.percent != null) {
        weight = calcTestWeekPreviewWeight(oneRM, row.percent, config.step);
        pct = Math.round(row.percent * 1000) / 10;
      } else {
        weightDisplay = '?';
      }
    }

    return {
      week: row.week,
      weight,
      pct,
      sets: row.sets,
      reps: row.reps,
      totalReps: row.sets * row.reps,
      phase: row.phase,
      loadLabel,
      isTestWeek,
      isPrepWeek,
      weightDisplay,
      repsDisplay,
      schemeDisplay,
    };
  });
}

const PREP_LOAD_KINDS = new Set(['rm12', 'rm10', 'rm15']);

function isPrepLoadKind(loadKind: string): boolean {
  return PREP_LOAD_KINDS.has(loadKind);
}

/** Strength: prep hidden, test weeks kept with unknown weight. General: all weeks. */
export function filterChartPreviewWeeks(
  weeks: ProgressionPreviewWeek[],
  preset: ProgressionPreset = 'general',
): ProgressionPreviewWeek[] {
  if (preset === 'strength') {
    return weeks.filter(week => !week.isPrepWeek);
  }
  return weeks.filter(week => !week.isTestWeek && !week.isPrepWeek);
}

export function getTestWeekExplanation(preset: ProgressionPreset): string {
  if (preset === 'strength') {
    return 'Подготовка (1–3) скрыта. Неделя 4 — первый тест: 1×8 до отказа (вес «?»). Недели 8, 12, 16 — 1 подход до отказа, вес по % от демо 1ПМ (100 кг), повторы «?». Рабочие недели — демо от якорных тестов Brzycki.';
  }
  return 'Веса считаются от исходного 1ПМ по фиксированным %. На 5-й неделе — разгрузка (ниже объём и интенсивность). Тестовых недель нет.';
}

export function buildProgressionPreviewWeeks(
  preset: ProgressionPreset,
  oneRM = DEMO_SQUAT_ONE_RM,
): ProgressionPreviewWeek[] {
  return preset === 'strength' ? buildStrengthPreviewWeeks(oneRM) : buildGeneralPreviewWeeks(oneRM);
}

const GENERAL_PHASE_DISPLAY: Record<string, string> = {
  Накопление: 'Объем',
  Разгрузка: 'Разгрузка',
  Интенсификация: 'Сила',
  Пик: 'Пик',
};

/** Meso working-week slots (prep/test weeks excluded upstream). */
const STRENGTH_MESO_PHASES = ['Объем', 'Сила', 'Гипертрофия'] as const;

const STRENGTH_MESO_WEEKS: readonly (readonly number[])[] = [
  [5, 6, 7],
  [9, 10, 11],
  [13, 14, 15],
];

export function getPhaseDisplayLabel(
  week: Pick<ProgressionPreviewWeek, 'week' | 'phase' | 'sets' | 'reps'>,
  preset: ProgressionPreset,
): string {
  if (preset === 'general') {
    return GENERAL_PHASE_DISPLAY[week.phase] ?? week.phase;
  }

  if (week.phase === 'Тест') {
    return 'Тест';
  }

  for (const meso of STRENGTH_MESO_WEEKS) {
    const index = meso.indexOf(week.week);
    if (index >= 0) {
      return STRENGTH_MESO_PHASES[index] ?? 'Объем';
    }
  }

  return week.phase.startsWith('Мезоцикл') ? 'Объем' : week.phase;
}

export function getProgressionPreviewMeta(settings: ProgramSettings): {
  title: string;
  subtitle: string;
  weekCount: number;
} {
  const weeks = buildProgressionPreviewWeeks(settings.progressionPreset);
  const track =
    settings.progressionPreset === 'strength' ? 'На силу · 16 нед' : 'Оптимальная · 8 нед';
  return {
    title: `Присед · 1ПМ ${DEMO_SQUAT_ONE_RM} кг`,
    subtitle: `${track} · ${settings.daysPerWeek} дня/нед`,
    weekCount: weeks.length,
  };
}
