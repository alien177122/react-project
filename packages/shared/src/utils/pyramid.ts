import type {ExerciseConfig, PyramidType} from '../types/index.ts';

/** Weight change per ±1 rep (~3% load equivalence). */
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

/**
 * Scales working weight by rep delta using ~3% per rep (Epley-style load equivalence).
 * Positive repDiff → lighter weight for more reps. Plate rounding happens in
 * `roundPyramidWeight` so half-kilogram targets (87.5) are not lost to Math.round.
 */
export function adjustWeightForReps(baseWeight: number, baseReps: number, newReps: number): number {
  const repDiff = newReps - baseReps;
  if (repDiff === 0) return baseWeight;
  return baseWeight * (1 - repDiff * REP_WEIGHT_FACTOR);
}

/**
 * Nearest plate step — keeps ±3% symmetry (150 → 155/145, 87.5 → 90/85).
 * Ceil/floor bias on program loads would distort relative pyramid steps.
 */
export function roundPyramidWeight(
  weight: number,
  cfg: Pick<ExerciseConfig, 'step' | 'type'>,
  _targetWeight?: number,
): number {
  void _targetWeight;
  if (!Number.isFinite(weight)) return 0;
  if (!(cfg.step > 0)) return weight;
  return Math.round(weight / cfg.step) * cfg.step;
}

/**
 * When absolute load is 0 (e.g. dips at +0 extra), still emit a ±step pyramid
 * so the UI column is never blank — weights are extras around zero.
 */
function buildStepCenteredPyramid(
  repScheme: number[],
  step: number,
  type: PyramidType,
): PyramidWorkingSet[] {
  if (repScheme.length === 0) return [];
  if (repScheme.length === 1) {
    return [{set: 1, weight: 0, reps: repScheme[0]!}];
  }

  const last = repScheme.length - 1;
  const naiveWeights = repScheme.map((_, i) => {
    if (type === 'descending') {
      if (i === 0) return step;
      if (i === last) return -step;
      return 0;
    }
    if (i === 0) return -step;
    if (i === last) return step;
    return 0;
  });

  const numWeightSteps = distinctWeightTiers(naiveWeights).length - 1;
  const extraCollapses = repScheme.length - numWeightSteps - 1;
  if (extraCollapses > 0) {
    return type === 'descending'
      ? buildDescendingWithMonolithicMiddle(repScheme, naiveWeights, extraCollapses)
      : buildAscendingWithMonolithicMiddle(repScheme, naiveWeights, extraCollapses);
  }
  return repScheme.map((reps, i) => ({
    set: i + 1,
    weight: naiveWeights[i]!,
    reps,
  }));
}

function buildRepScheme(targetReps: number, targetSets: number, type: PyramidType): number[] {
  const offset = Math.floor((targetSets - 1) / 2);
  const reps: number[] = [];

  for (let i = 0; i < targetSets; i++) {
    const r = targetReps - offset + i;
    reps.push(Math.max(1, r));
  }

  if (type === 'descending') {
    return reps;
  }
  return [...reps].reverse();
}

/** Ordered unique plate weights (consecutive duplicates collapsed). */
function distinctWeightTiers(weights: number[]): number[] {
  const tiers: number[] = [];
  for (const weight of weights) {
    if (tiers.length === 0 || weight !== tiers[tiers.length - 1]) {
      tiers.push(weight);
    }
  }
  return tiers;
}

/**
 * When extra sets exceed distinct weight tiers, duplicate the first middle rep
 * and compress the tail so the last set only gains +1 rep vs the held middle.
 */
function collapseMiddleReps(idealMiddleReps: number[], extraCollapses: number): number[] {
  if (extraCollapses <= 0) return idealMiddleReps;

  const result: number[] = [];
  for (let i = 0; i < idealMiddleReps.length; i++) {
    if (i <= extraCollapses) {
      result.push(idealMiddleReps[0]!);
    } else {
      result.push(idealMiddleReps[i - extraCollapses]!);
    }
  }
  return result;
}

/**
 * ±1 relative step from target (~3%): e.g. 150 → 155 top / 145 bottom.
 * Keeps the pyramid proportional across light and heavy lifts instead of
 * walking an extra plate step on the last set (150→140 would be ~−7%).
 */
function relativeStepBounds(
  targetWeight: number,
  targetReps: number,
  exerciseCfg: Pick<ExerciseConfig, 'step' | 'type'>,
): {up: number; down: number; target: number} {
  const target = roundPyramidWeight(targetWeight, exerciseCfg, targetWeight);
  const up = roundPyramidWeight(
    adjustWeightForReps(targetWeight, targetReps, Math.max(1, targetReps - 1)),
    exerciseCfg,
    targetWeight,
  );
  const down = roundPyramidWeight(
    adjustWeightForReps(targetWeight, targetReps, targetReps + 1),
    exerciseCfg,
    targetWeight,
  );
  return {
    target,
    up: Math.max(up, target),
    down: Math.min(down, target),
  };
}

function clampToRelativeBand(weight: number, up: number, down: number): number {
  return Math.min(up, Math.max(down, weight));
}

/**
 * Descending: top → hold first drop (target band) across middle → finish one
 * relative step down. Example @150: 155×3 → 150×4 → 150×4 → 145×5.
 */
function buildDescendingWithMonolithicMiddle(
  repScheme: number[],
  naiveWeights: number[],
  extraCollapses: number,
): PyramidWorkingSet[] {
  const tiers = distinctWeightTiers(naiveWeights);
  const middleWeight = tiers[1] ?? tiers[0]!;
  const bottomWeight = tiers[Math.min(2, tiers.length - 1)] ?? middleWeight;
  const afterTop = collapseMiddleReps(repScheme.slice(1), extraCollapses);
  const lastReps = afterTop[afterTop.length - 1]!;
  const middleReps = afterTop.slice(0, -1);

  return [
    {set: 1, weight: naiveWeights[0]!, reps: repScheme[0]!},
    ...middleReps.map((reps, i) => ({
      set: i + 2,
      weight: middleWeight,
      reps,
    })),
    {
      set: repScheme.length,
      weight: bottomWeight,
      reps: lastReps,
    },
  ];
}

/**
 * Ascending mirror: start one step down, hold middle, finish on top.
 */
function buildAscendingWithMonolithicMiddle(
  repScheme: number[],
  naiveWeights: number[],
  extraCollapses: number,
): PyramidWorkingSet[] {
  const tiers = distinctWeightTiers(naiveWeights);
  const middleWeight = tiers[Math.max(0, tiers.length - 2)] ?? tiers[0]!;
  const bottomWeight = tiers[0]!;
  const beforeTop = collapseMiddleReps(repScheme.slice(0, -1), extraCollapses);
  const firstReps = beforeTop[0]!;
  const middleReps = beforeTop.slice(1);

  return [
    {set: 1, weight: bottomWeight, reps: firstReps},
    ...middleReps.map((reps, i) => ({
      set: i + 2,
      weight: middleWeight,
      reps,
    })),
    {
      set: repScheme.length,
      weight: naiveWeights[naiveWeights.length - 1]!,
      reps: repScheme[repScheme.length - 1]!,
    },
  ];
}

/**
 * Builds a centered rep pyramid with per-set weights from ~3% load equivalence.
 *
 * Weights stay inside a ±1 relative step band around the program target so a
 * 150 kg deadlift becomes 155 / 150 / 150 / 145 — not 155 / 150 / 145 / 140.
 * Extra sets duplicate the middle (target) tier rather than adding deeper drops.
 */
export function buildPyramid(
  cfg: PyramidConfig,
  exerciseCfg: Pick<ExerciseConfig, 'step' | 'type'>,
): PyramidPlan {
  const {targetSets, targetReps, type, rpeBase} = cfg;
  const targetWeight = Number.isFinite(cfg.targetWeight) ? cfg.targetWeight : 0;
  const step = exerciseCfg.step > 0 ? exerciseCfg.step : 0;
  const repScheme = buildRepScheme(targetReps, targetSets, type);

  // Bodyweight +0 (or missing load): keep ±step column instead of a blank 0/0/0/0 list.
  const workingSets =
    !(targetWeight > 0) && step > 0
      ? buildStepCenteredPyramid(repScheme, step, type)
      : (() => {
          const bounds = relativeStepBounds(targetWeight, targetReps, exerciseCfg);
          const naiveWeights = repScheme.map(reps => {
            const adjusted = roundPyramidWeight(
              adjustWeightForReps(targetWeight, targetReps, reps),
              exerciseCfg,
              targetWeight,
            );
            return clampToRelativeBand(adjusted, bounds.up, bounds.down);
          });
          const numWeightSteps = distinctWeightTiers(naiveWeights).length - 1;
          const extraCollapses = targetSets - numWeightSteps - 1;
          if (extraCollapses > 0) {
            return type === 'descending'
              ? buildDescendingWithMonolithicMiddle(repScheme, naiveWeights, extraCollapses)
              : buildAscendingWithMonolithicMiddle(repScheme, naiveWeights, extraCollapses);
          }
          return repScheme.map((reps, i) => ({
            set: i + 1,
            weight: naiveWeights[i]!,
            reps,
          }));
        })();

  const finiteWeights = workingSets.map(s => (Number.isFinite(s.weight) ? s.weight : 0));
  const topWorkingWeight = finiteWeights.length > 0 ? Math.max(...finiteWeights) : 0;
  const totalVolume = workingSets.reduce((sum, s, i) => sum + (finiteWeights[i] ?? 0) * s.reps, 0);

  const typeLabel = type === 'descending' ? 'нисходящая' : 'восходящая';

  return {
    workingSets: workingSets.map((s, i) => ({...s, weight: finiteWeights[i] ?? 0})),
    topWorkingWeight,
    totalVolume,
    restBetween: '3–5 мин',
    notes: `Все рабочие подходы @ RPE ${rpeBase}. Пирамида ${typeLabel}: ~±${Math.round(REP_WEIGHT_FACTOR * 100)}% от целевого веса, техника важнее нагрузки.`,
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
