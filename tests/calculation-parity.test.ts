import test from 'node:test';
import assert from 'node:assert/strict';
import {calc1RM, roundOneRm} from '../server/calc.js';
import {calc1RM as sharedCalc1RM} from '../packages/shared/src/utils/calc.ts';
import {computeOneRm} from '../server/calculations.js';

test('server calc1RM matches shared calc1RM for representative inputs', () => {
  const cases = [
    {weight: 100, reps: 5},
    {weight: 80, reps: 8},
    {weight: 60, reps: 3},
    {weight: 120, reps: 10},
  ];

  for (const sample of cases) {
    const server = roundOneRm(calc1RM(sample.weight, sample.reps));
    const shared = Math.round(sharedCalc1RM(sample.weight, sample.reps) * 10) / 10;
    assert.equal(server, shared, `${sample.weight}×${sample.reps}`);
  }
});

test('computeOneRm matches hook rounding for bodyweight totals', () => {
  const {oneRM} = computeOneRm({testWeight: 90, testReps: 6});
  const expected = Math.round(sharedCalc1RM(90, 6) * 10) / 10;
  assert.equal(oneRM, expected);
});
