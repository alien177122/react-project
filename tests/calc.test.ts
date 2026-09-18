import test from 'node:test';
import assert from 'node:assert/strict';
import {EXERCISES, CATALOG_EXERCISES} from '../src/data/exercises.ts';
import {
  barColor,
  calc1RM,
  calcWarmupSets,
  calcWorkingWeight,
  roundWeight,
  volumeClass,
} from '../src/utils/calc.ts';

test('calc1RM returns a conservative estimate for mid rep ranges', () => {
  assert.equal(calc1RM(100, 6).toFixed(1), '120.8');
  assert.equal(calc1RM(80, 10).toFixed(1), '109.3');
});

test('calc1RM Brzycki uses classic formula constants', () => {
  assert.equal(calc1RM(100, 5, 'brzycki').toFixed(1), '113.7');
  assert.equal(calc1RM(80, 8, 'brzycki').toFixed(1), '100.1');
});

test('calc1RM rejects non-positive weight or zero reps', () => {
  assert.equal(calc1RM(0, 5), 0);
  assert.equal(calc1RM(100, 0), 0);
  assert.equal(calc1RM(-10, 5), 0);
});

test('roundWeight respects equipment rounding rules', () => {
  assert.equal(roundWeight(81.1, 2.5, 'A'), 82.5);
  assert.equal(roundWeight(23.9, 2, 'C'), 22);
});

test('calcWorkingWeight uses exercise config step and type', () => {
  assert.equal(calcWorkingWeight(137, 73, EXERCISES.bench), 102.5);
  assert.equal(calcWorkingWeight(37, 80, EXERCISES.lateralRaise), 29);
});

test('volume classes and colors stay aligned', () => {
  assert.equal(volumeClass(28), 'v-hi');
  assert.equal(volumeClass(20), 'v-md');
  assert.equal(volumeClass(16), 'v-lo');
  assert.equal(barColor(28), '#ffb020');
  assert.equal(barColor(16), '#ff4d4d');
});

test('calcWarmupSets for deadlift returns finite plate weights', () => {
  const sets = calcWarmupSets(150, CATALOG_EXERCISES.deadlift);
  assert.ok(sets.length > 0);
  assert.ok(sets.every(s => Number.isFinite(s.weight) && s.weight > 0));
});

test('calcWarmupSets rejects NaN working weight and zero warmup step without NaN', () => {
  assert.deepEqual(calcWarmupSets(Number.NaN, CATALOG_EXERCISES.deadlift), []);
  const sets = calcWarmupSets(150, {...CATALOG_EXERCISES.deadlift, warmupStep: 0});
  assert.ok(sets.every(s => Number.isFinite(s.weight)));
});
