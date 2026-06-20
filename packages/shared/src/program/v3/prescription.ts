import type {TestResult, ProgressionPreset} from '../../types/index.ts';
import {calc1RM, ceilToStep} from '../../utils/calc.ts';
import {getWeekScheduleV3} from './weekSchedule.ts';
import {EXERCISES_V3} from './exercises.ts';
import {getTestAnchorWeek, getTestResultForExercise} from './testWeeks.ts';
import {type WeekLoadKind, formatWeekScheme} from './weekSchedule.ts';

export type PrescriptionStatus = 'ok' | 'manual' | 'test_week' | 'missing_test';

export interface Prescription {
  weight: number | null;
  sets: number;
  reps: number;
  status: PrescriptionStatus;
  loadLabel?: string;
  message?: string;
  anchorWeek?: number;
  schemeDisplay?: string;
}

export interface PrescriptionContext {
  testResults?: TestResult[];
  bodyWeight?: number;
  progressionPreset?: ProgressionPreset;
}

export function calcWorkingWeightV3(options: {
  testWeight: number;
  testReps: number;
  targetPercent: number;
  step: number;
  repsPlusOne?: boolean;
}): number {
  const reps = options.repsPlusOne ? options.testReps + 1 : options.testReps;
  const oneRM = calc1RM(options.testWeight, reps, 'brzycki');
  const raw = oneRM * options.targetPercent;
  if (options.step <= 0) return Math.round(raw * 10) / 10;
  return ceilToStep(raw, options.step);
}

function loadLabelForKind(loadKind: WeekLoadKind): string | undefined {
  if (loadKind === 'rm12') return '12ПМ';
  if (loadKind === 'rm10') return '10ПМ';
  if (loadKind === 'test') return 'Тест';
  return undefined;
}

export function getPrescription(
  exerciseKey: string,
  programWeek: number,
  ctx: PrescriptionContext = {},
): Prescription {
  const config = EXERCISES_V3[exerciseKey];
  const weekRow = getWeekScheduleV3().find(row => row.week === programWeek);

  if (!config || !weekRow) {
    return {weight: null, sets: 0, reps: 0, status: 'manual'};
  }

  const base = {
    sets: weekRow.sets,
    reps: weekRow.reps,
    loadLabel: loadLabelForKind(weekRow.loadKind),
    schemeDisplay: formatWeekScheme(weekRow),
  };

  if (weekRow.loadKind === 'rm12' || weekRow.loadKind === 'rm10') {
    return {
      ...base,
      weight: null,
      status: 'manual',
      message: `Тренируйтесь по ${base.loadLabel}`,
    };
  }

  if (weekRow.loadKind === 'test') {
    return {
      ...base,
      weight: null,
      status: 'test_week',
      message: 'Тестовая неделя — введите результат после подхода',
    };
  }

  const anchorWeek = getTestAnchorWeek(programWeek);
  if (!anchorWeek) {
    return {...base, weight: null, status: 'manual'};
  }

  const test = getTestResultForExercise(exerciseKey, anchorWeek, ctx.testResults);
  if (!test) {
    return {
      ...base,
      weight: null,
      status: 'missing_test',
      anchorWeek,
      message: `Сначала пройдите тест в неделю ${anchorWeek}`,
    };
  }

  const percent = weekRow.percent ?? 0;
  const weight = calcWorkingWeightV3({
    testWeight: test.weight,
    testReps: test.reps,
    targetPercent: percent,
    step: config.step,
    repsPlusOne: weekRow.repsPlusOne,
  });

  return {
    ...base,
    weight,
    status: 'ok',
    anchorWeek,
  };
}
