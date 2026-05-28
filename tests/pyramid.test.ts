import test from 'node:test';
import assert from 'node:assert/strict';
import {adjustWeightForReps, buildPyramid} from '@training/shared/utils/pyramid';
import {DEFAULT_TRAINING_PREFERENCES, getTrainingExercises} from '@training/shared/utils/training';

test('adjustWeightForReps lowers weight when reps increase', () => {
  assert.equal(adjustWeightForReps(100, 4, 5), 97);
  assert.equal(adjustWeightForReps(100, 4, 6), 94);
});

test('buildPyramid descending matches classic 100×4×4 example', () => {
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

  assert.deepEqual(
    plan.workingSets.map(s => ({weight: s.weight, reps: s.reps})),
    [
      {weight: 100, reps: 4},
      {weight: 97.5, reps: 5},
      {weight: 95, reps: 6},
      {weight: 95, reps: 6},
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
