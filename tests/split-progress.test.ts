import assert from 'node:assert/strict';
import test from 'node:test';
import type {CustomSplit} from '../packages/shared/src/types/index.ts';
import {
  applyToggleCompletedDay,
  applyToggleCompletedWeek,
  getWeekProgressVisual,
  isWeekEffectivelyDone,
} from '../packages/shared/src/utils/split-progress.ts';

function baseSplit(daysPerWeek: 2 | 3 = 2): CustomSplit {
  return {
    id: 'split-1',
    name: 'Test',
    daysPerWeek,
    varyIntensity: true,
    weightMode: 'progression',
    days: Array.from({length: daysPerWeek}, (_, index) => ({
      dayNumber: (index + 1) as 1 | 2 | 3,
      muscles: [],
    })),
    createdAt: '2026-08-05T10:00:00.000Z',
    updatedAt: '2026-08-05T10:00:00.000Z',
  };
}

test('marking all days of a week auto-completes the week square', () => {
  let split = baseSplit(2);
  split = applyToggleCompletedDay(split, 0, 1);
  assert.equal(getWeekProgressVisual(split, 0), 'partial');
  assert.equal(isWeekEffectivelyDone(split, 0), false);
  assert.deepEqual(split.completedDays, [{week: 0, day: 1}]);
  assert.equal(split.completedWeeks, undefined);

  split = applyToggleCompletedDay(split, 0, 2);
  assert.equal(getWeekProgressVisual(split, 0), 'done');
  assert.equal(isWeekEffectivelyDone(split, 0), true);
  assert.deepEqual(split.completedWeeks, [0]);
  assert.deepEqual(split.completedDays, [
    {week: 0, day: 1},
    {week: 0, day: 2},
  ]);
});

test('unmarking one day clears the week completion', () => {
  let split = applyToggleCompletedWeek(baseSplit(2), 0);
  assert.equal(isWeekEffectivelyDone(split, 0), true);
  assert.deepEqual(split.completedDays, [
    {week: 0, day: 1},
    {week: 0, day: 2},
  ]);

  split = applyToggleCompletedDay(split, 0, 1);
  assert.equal(isWeekEffectivelyDone(split, 0), false);
  assert.equal(getWeekProgressVisual(split, 0), 'partial');
  assert.equal(split.completedWeeks, undefined);
  assert.deepEqual(split.completedDays, [{week: 0, day: 2}]);
});

test('marking a week done also marks every day of that week', () => {
  const split = applyToggleCompletedWeek(baseSplit(3), 2);
  assert.deepEqual(split.completedWeeks, [2]);
  assert.deepEqual(split.completedDays, [
    {week: 2, day: 1},
    {week: 2, day: 2},
    {week: 2, day: 3},
  ]);
  assert.equal(getWeekProgressVisual(split, 2), 'done');
});

test('clearing a week removes its day marks', () => {
  let split = applyToggleCompletedWeek(baseSplit(2), 1);
  split = applyToggleCompletedWeek(split, 1);
  assert.equal(split.completedWeeks, undefined);
  assert.equal(split.completedDays, undefined);
  assert.equal(getWeekProgressVisual(split, 1), 'empty');
});

test('days-only completion still counts week as effectively done', () => {
  const split: CustomSplit = {
    ...baseSplit(2),
    completedDays: [
      {week: 1, day: 1},
      {week: 1, day: 2},
    ],
  };
  assert.equal(isWeekEffectivelyDone(split, 1), true);
  assert.equal(getWeekProgressVisual(split, 1), 'done');
});
