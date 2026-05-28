import assert from 'node:assert/strict';
import {test} from 'node:test';
import {DAYS_PER_WEEK_V3, TOTAL_SESSIONS_V3} from '@training/shared/program/v3';

test('v3 session math: 16 sessions → week 5 day 1', () => {
  const completedSessions = 16;
  const currentDayIdx = completedSessions % DAYS_PER_WEEK_V3;
  const currentWeekIdx = Math.floor(completedSessions / DAYS_PER_WEEK_V3);
  assert.equal(currentDayIdx, 0);
  assert.equal(currentWeekIdx, 4);
  assert.equal(currentWeekIdx + 1, 5);
});

test('program done at 64 sessions', () => {
  assert.ok(64 >= TOTAL_SESSIONS_V3);
});
