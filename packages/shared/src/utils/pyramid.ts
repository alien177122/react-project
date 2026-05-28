import type {ExerciseConfig, PyramidType} from '../types/index.ts';
import {roundWeight} from './calc.ts';

/** Weight drop per +1 rep (~3% of estimated 1RM load). */
export const REP_WEIGHT_FACTOR = 0.03;

export interface PyramidConfig {
  targetWeight: number;
  targetSets: number;
  targetReps: number;
  type: PyramidType;
  rpeBase: number;
}

export interface PyramidWorkingSet {
  set: number;
  weight: number;
  reps: number;
}

export interface PyramidPlan {
  workingSets: PyramidWorkingSet[];
  topWorkingWeight: number;
  totalVolume: number;
  restBetween: string;
  notes: string;
}

export function adjustWeightForReps(baseWeight: number, baseReps: number, newReps: number): number {
  const repDiff = newReps - baseReps;
  return Math.round(baseWeight * (1 - repDiff * REP_WEIGHT_FACTOR));
}

export function roundPyramidWeight(
  weight: number,
  cfg: Pick<ExerciseConfig, 'step' | 'type'>,
): number {
  return roundWeight(weight, cfg.step, cfg.type);
}

function buildDescendingReps(targetReps: number, targetSets: number): number[] {
  const reps = [targetReps];
  let extra = 0;
  const rampSteps = Math.max(1, Math.floor(targetSets / 2));

  for (let i = 1; i < targetSets; i++) {
    if (i <= rampSteps) extra += 1;
    reps.push(targetReps + extra);
  }

  return reps;
}

function buildRepScheme(targetReps: number, targetSets: number, type: PyramidType): number[] {
  const descending = buildDescendingReps(targetReps, targetSets);

  if (type === 'descending') return descending;

  const maxExtra = descending[descending.length - 1] - targetReps;
  return Array.from({length: targetSets}, (_, i) => {
    const reps = targetReps + maxExtra - i;
    return Math.max(reps, targetReps - 1);
  });
}

export function buildPyramid(
  cfg: PyramidConfig,
  exerciseCfg: Pick<ExerciseConfig, 'step' | 'type'>,
): PyramidPlan {
  const {targetWeight, targetSets, targetReps, type, rpeBase} = cfg;
  const repScheme = buildRepScheme(targetReps, targetSets, type);

  const workingSets = repScheme.map((reps, i) => ({
    set: i + 1,
    weight: roundPyramidWeight(adjustWeightForReps(targetWeight, targetReps, reps), exerciseCfg),
    reps,
  }));

  const topWorkingWeight = Math.max(...workingSets.map(s => s.weight));
  const totalVolume = workingSets.reduce((sum, s) => sum + s.weight * s.reps, 0);

  const typeLabel = type === 'descending' ? 'нисходящая' : 'восходящая';

  return {
    workingSets,
    topWorkingWeight,
    totalVolume,
    restBetween: '3–5 мин',
    notes: `Все рабочие подходы @ RPE ${rpeBase}. Пирамида ${typeLabel}: техника важнее веса.`,
  };
}

export function buildLinearWorkingSets(
  weight: number,
  sets: number,
  reps: number,
): PyramidWorkingSet[] {
  return Array.from({length: sets}, (_, i) => ({
    set: i + 1,
    weight,
    reps,
  }));
}
