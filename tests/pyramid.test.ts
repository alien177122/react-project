import test from 'node:test';
import assert from 'node:assert/strict';
import {adjustWeightForReps, buildPyramid} from '@training/shared/utils/pyramid';
import {DEFAULT_TRAINING_PREFERENCES, getTrainingExercises} from '@training/shared/utils/training';

test('adjustWeightForReps lowers weight when reps increase', () => {
  assert.equal(adjustWeightForReps(100, 4, 5), 97);
  assert.equal(adjustWeightForReps(100, 4, 6), 94);
});

test('buildPyramid descending matches classic 100×4×4 within ±1 relative step', () => {
  const plan = buildPyramid(
    {
      targetWeight: 100,
      targetSets: 4,
      targetReps: 4,
      type: 'descending',
      rpeBase: 8,
    },
    {step: 2.5, type: 'A'},
  );

  // 100×±3% → nearest 2.5 kg plates: 102.5 / 100 / 100 / 97.5
  assert.deepEqual(
    plan.workingSets.map(s => ({weight: s.weight, reps: s.reps})),
    [
      {weight: 102.5, reps: 3},
      {weight: 100, reps: 4},
      {weight: 100, reps: 4},
      {weight: 97.5, reps: 5},
    ],
  );
});

test('buildPyramid descending keeps ~±3% band (87.5×5 → 90/87.5/87.5/85)', () => {
  const plan = buildPyramid(
    {
      targetWeight: 87.5,
      targetSets: 4,
      targetReps: 5,
      type: 'descending',
      rpeBase: 8,
    },
    {step: 2.5, type: 'A'},
  );

  assert.deepEqual(
    plan.workingSets.map(s => ({weight: s.weight, reps: s.reps})),
    [
      {weight: 90, reps: 4},
      {weight: 87.5, reps: 5},
      {weight: 87.5, reps: 5},
      {weight: 85, reps: 6},
    ],
  );
});

test('buildPyramid descending deadlift stays proportional (150 → 155/150/150/145)', () => {
  const plan = buildPyramid(
    {
      targetWeight: 150,
      targetSets: 4,
      targetReps: 4,
      type: 'descending',
      rpeBase: 8,
    },
    {step: 2.5, type: 'A'},
  );

  assert.deepEqual(
    plan.workingSets.map(s => ({weight: s.weight, reps: s.reps})),
    [
      {weight: 155, reps: 3},
      {weight: 150, reps: 4},
      {weight: 150, reps: 4},
      {weight: 145, reps: 5},
    ],
  );

  const pct = plan.workingSets.map(s => (s.weight / 150 - 1) * 100);
  assert.ok(Math.abs(pct[0]!) < 4 && pct[0]! > 0);
  assert.equal(pct[1], 0);
  assert.equal(pct[2], 0);
  assert.ok(Math.abs(pct[3]!) < 4 && pct[3]! < 0);
});

test('buildPyramid at 0 kg still emits ±step column (dips +0 extra)', () => {
  const plan = buildPyramid(
    {
      targetWeight: 0,
      targetSets: 4,
      targetReps: 8,
      type: 'descending',
      rpeBase: 8,
    },
    {step: 2.5, type: 'A'},
  );

  assert.deepEqual(
    plan.workingSets.map(s => ({weight: s.weight, reps: s.reps})),
    [
      {weight: 2.5, reps: 7},
      {weight: 0, reps: 8},
      {weight: 0, reps: 8},
      {weight: -2.5, reps: 9},
    ],
  );
  assert.ok(plan.workingSets.every(s => Number.isFinite(s.weight)));
});

test('buildPyramid never yields NaN when step is missing', () => {
  const plan = buildPyramid(
    {
      targetWeight: 150,
      targetSets: 4,
      targetReps: 4,
      type: 'descending',
      rpeBase: 8,
    },
    {step: Number.NaN, type: 'A'},
  );
  assert.ok(plan.workingSets.every(s => Number.isFinite(s.weight)));
  assert.ok(Number.isFinite(plan.topWorkingWeight));
});

test('buildPyramid descending monolithic middle stays inside ±1 step band', () => {
  const plan = buildPyramid(
    {
      targetWeight: 70,
      targetSets: 4,
      targetReps: 8,
      type: 'descending',
      rpeBase: 8,
    },
    {step: 2.5, type: 'A'},
  );

  assert.deepEqual(
    plan.workingSets.map(s => ({weight: s.weight, reps: s.reps})),
    [
      {weight: 72.5, reps: 7},
      {weight: 70, reps: 8},
      {weight: 70, reps: 8},
      {weight: 67.5, reps: 9},
    ],
  );
});

test('buildPyramid ascending ramps reps down and weight up', () => {
  const plan = buildPyramid(
    {
      targetWeight: 100,
      targetSets: 4,
      targetReps: 4,
      type: 'ascending',
      rpeBase: 8,
    },
    {step: 2.5, type: 'A'},
  );

  assert.equal(plan.workingSets[0].reps, 6);
  assert.equal(plan.workingSets[3].reps, 3);
  assert.ok(plan.workingSets[3].weight > plan.workingSets[0].weight);
});

test('getTrainingExercises uses pyramid preferences', () => {
  const saved = [
    {
      exerciseKey: 'bench',
      testWeight: 100,
      testReps: 4,
      oneRM: 120,
      date: '2026-05-23',
    },
  ];

  const linear = getTrainingExercises(0, 0, saved, DEFAULT_TRAINING_PREFERENCES);
  assert.equal(linear[0]?.progressionMode, 'linear');
  assert.equal(linear[0]?.workingSets.length, linear[0]?.scheme.sets);
  assert.ok(linear[0]?.workingSets.every(s => s.weight === linear[0]?.weight));

  const pyramid = getTrainingExercises(0, 0, saved, {
    progressionMode: 'pyramid',
    pyramidType: 'descending',
    rpeBase: 8,
  });
  assert.equal(pyramid[0]?.progressionMode, 'pyramid');
  assert.ok(pyramid[0]!.workingSets[0]!.weight >= pyramid[0]!.workingSets.at(-1)!.weight);
});
