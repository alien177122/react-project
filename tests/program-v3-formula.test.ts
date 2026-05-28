import assert from 'node:assert/strict';
import {test} from 'node:test';
import {calc1RM, ceilToStep} from '@training/shared/utils/calc';
import {calcWorkingWeightV3} from '@training/shared/program/v3';

test('Brzycki: 50kg × 8 reps → 1RM ≈ 62.5', () => {
  assert.ok(Math.abs(calc1RM(50, 8, 'brzycki') - 62.55) < 0.1);
});

test('ceilToStep: 44.7 with step 2.5 → 45', () => {
  assert.equal(ceilToStep(44.7, 2.5), 45);
});

test('week 5 bench @70% after test 50×8 → 45 kg', () => {
  const weight = calcWorkingWeightV3({
    testWeight: 50,
    testReps: 8,
    targetPercent: 0.7,
    step: 2.5,
  });
  assert.equal(weight, 45);
});

test('legacy calc1RM without method matches previous behavior', () => {
  assert.equal(calc1RM(100, 6).toFixed(1), '120.8');
});
