import type {ProgressionPreset, TestResult, TestWeekNumber} from '../../types/index.ts';
import {calc1RM, ceilToStep} from '../../utils/calc.ts';
import {getPhaseDisplayLabel} from '../progressionPreview.ts';
import {getWeekScheduleV3} from '../progressionPresets.ts';
import {EXERCISES_V3} from './exercises.ts';
import {calcWorkingWeightV3, getPrescription, type PrescriptionStatus} from './prescription.ts';
import {getTestAnchorWeek, getTestResultForExercise} from './testWeeks.ts';
import {type WeekLoadKind} from './weekSchedule.ts';

export interface ProgramV3DraftInput {
  weight: number;
  reps: number;
}

export interface ProgramV3ChartRow {
  week: number;
  phase: string;
  scheme: string;
  loadLabel?: string;
  weight: number | null;
  status: PrescriptionStatus;
  sets: number;
  reps: number;
  totalReps: number;
  isPrepWeek: boolean;
  isTestWeek: boolean;
  /** Shown in list when kg is unknown (test weeks) */
  weightDisplay?: string;
  /** True when weight is estimated from draft 1RM / simulated anchors */
  isPreviewWeight: boolean;
  phaseLabel: string;
}

const PREP_LOAD_KINDS = new Set<WeekLoadKind>(['rm12', 'rm10']);

function isPrepLoadKind(loadKind: WeekLoadKind): boolean {
  return PREP_LOAD_KINDS.has(loadKind);
}

function loadLabelForKind(loadKind: WeekLoadKind): string | undefined {
  if (loadKind === 'rm12') return '12ПМ';
  if (loadKind === 'rm10') return '10ПМ';
  if (loadKind === 'test') return 'Тест';
  return undefined;
}

function calcTestWeekPreviewWeight(oneRM: number, percent: number, step: number): number {
  return ceilToStep(oneRM * percent, step);
}

/** Simulated anchor test when user has not logged a real result yet. */
function getSimulatedAnchorTest(
  anchorWeek: number,
  draft: ProgramV3DraftInput | null,
  draftOneRM: number | null,
  step: number,
): {weight: number; reps: number} | null {
  if (anchorWeek === 4 && draft) {
    return {weight: draft.weight, reps: draft.reps};
  }

  const row = getWeekScheduleV3('strength').find(r => r.week === anchorWeek);
  if (row?.loadKind === 'test' && row.percent != null && draftOneRM != null) {
    return {
      weight: calcTestWeekPreviewWeight(draftOneRM, row.percent, step),
      reps: row.reps,
    };
  }

  return null;
}

function resolveAnchorTest(
  exerciseKey: string,
  anchorWeek: TestWeekNumber,
  testResults: TestResult[] | undefined,
  draft: ProgramV3DraftInput | null,
  draftOneRM: number | null,
  step: number,
): {weight: number; reps: number; isPreview: boolean} | null {
  const real = getTestResultForExercise(exerciseKey, anchorWeek, testResults);
  if (real) {
    return {weight: real.weight, reps: real.reps, isPreview: false};
  }

  const simulated = getSimulatedAnchorTest(anchorWeek, draft, draftOneRM, step);
  if (simulated) {
    return {...simulated, isPreview: true};
  }

  return null;
}

export interface BuildProgramV3ChartRowsOptions {
  exerciseKey: string;
  testResults?: TestResult[];
  draft?: ProgramV3DraftInput | null;
  progressionPreset?: ProgressionPreset;
}

/** All 16 program weeks with display fields for list + chart (chart filters prep upstream). */
export function buildProgramV3ChartRows(
  options: BuildProgramV3ChartRowsOptions,
): ProgramV3ChartRow[] {
  const {exerciseKey, testResults, draft, progressionPreset = 'strength'} = options;
  const config = EXERCISES_V3[exerciseKey];
  const schedule = getWeekScheduleV3(progressionPreset);

  const draftOneRM =
    draft && draft.weight > 0 && draft.reps >= 1
      ? Math.round(calc1RM(draft.weight, draft.reps, 'brzycki') * 10) / 10
      : null;

  return schedule.map(row => {
    const prescription = getPrescription(exerciseKey, row.week, {
      testResults,
      progressionPreset,
    });
    const loadLabel = loadLabelForKind(row.loadKind);
    const isPrepWeek = isPrepLoadKind(row.loadKind) || row.phase === 'Подготовка';
    const isTestWeek = row.loadKind === 'test';
    const scheme = prescription.schemeDisplay ?? `${prescription.sets}×${prescription.reps}`;
    const sets = row.sets;
    const reps = row.reps;
    const totalReps = sets * reps;

    let weight: number | null = prescription.weight;
    let status: PrescriptionStatus = prescription.status;
    let weightDisplay: string | undefined;
    let isPreviewWeight = false;

    if (isPrepWeek) {
      return {
        week: row.week,
        phase: row.phase,
        scheme,
        loadLabel,
        weight: null,
        status: 'manual',
        sets,
        reps,
        totalReps,
        isPrepWeek: true,
        isTestWeek: false,
        isPreviewWeight: false,
        phaseLabel: row.phase,
      };
    }

    if (isTestWeek) {
      weightDisplay = '?';
      weight = null;
      if (row.week === 4) {
        status = 'test_week';
      } else if (row.percent != null && draftOneRM != null && config) {
        weight = calcTestWeekPreviewWeight(draftOneRM, row.percent, config.step);
        isPreviewWeight = true;
        status = 'test_week';
      } else {
        status = 'test_week';
      }

      return {
        week: row.week,
        phase: row.phase,
        scheme,
        loadLabel,
        weight,
        status,
        sets,
        reps,
        totalReps,
        isPrepWeek: false,
        isTestWeek: true,
        weightDisplay,
        isPreviewWeight,
        phaseLabel: 'Тест',
      };
    }

    const anchorWeek = getTestAnchorWeek(row.week);
    if (anchorWeek && row.percent != null && config) {
      const anchor = resolveAnchorTest(
        exerciseKey,
        anchorWeek,
        testResults,
        draft ?? null,
        draftOneRM,
        config.step,
      );

      if (anchor) {
        weight = calcWorkingWeightV3({
          testWeight: anchor.weight,
          testReps: anchor.reps,
          targetPercent: row.percent,
          step: config.step,
          repsPlusOne: row.repsPlusOne,
        });
        status = 'ok';
        isPreviewWeight = anchor.isPreview;
      } else {
        weight = null;
        status = 'missing_test';
      }
    }

    const previewWeek = {
      week: row.week,
      phase: row.phase,
      sets,
      reps,
    };

    return {
      week: row.week,
      phase: row.phase,
      scheme,
      loadLabel,
      weight,
      status,
      sets,
      reps,
      totalReps,
      isPrepWeek: false,
      isTestWeek: false,
      weightDisplay,
      isPreviewWeight,
      phaseLabel: getPhaseDisplayLabel(previewWeek, 'strength'),
    };
  });
}

/** Strength track: hide prep weeks from chart geometry (same as ProgressionPreviewChart). */
export function filterProgramV3ChartWeeks(rows: ProgramV3ChartRow[]): ProgramV3ChartRow[] {
  return rows.filter(row => !row.isPrepWeek);
}
