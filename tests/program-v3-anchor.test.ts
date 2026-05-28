import assert from 'node:assert/strict';
import {test} from 'node:test';
import {getPrescription, getTestAnchorWeek} from '@training/shared/program/v3';

test('getTestAnchorWeek: week 5 → 4, week 9 → 8', () => {
  assert.equal(getTestAnchorWeek(5), 4);
  assert.equal(getTestAnchorWeek(9), 8);
  assert.equal(getTestAnchorWeek(13), 12);
});

test('getPrescription week 5 without test → missing_test', () => {
  const rx = getPrescription('bench', 5, {testResults: []});
  assert.equal(rx.status, 'missing_test');
  assert.equal(rx.anchorWeek, 4);
});

test('getPrescription week 5 with test → ok weight', () => {
  const rx = getPrescription('bench', 5, {
    testResults: [
      {
        exerciseKey: 'bench',
        testWeek: 4,
        weight: 50,
        reps: 8,
        date: '2026-05-01',
      },
    ],
  });
  assert.equal(rx.status, 'ok');
  assert.equal(rx.weight, 45);
});
