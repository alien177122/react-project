import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveJournalSessionIdentity} from '@training/shared/utils/journalSession';
import type {JournalSession} from '@training/shared/types';

const today = '2026-06-17';
const past = '2026-06-10';

function session(id: string, date: string): JournalSession {
  return {
    id,
    exerciseKey: 'bench',
    date,
    sets: [{setIndex: 1, weight: 80, reps: 5}],
    createdAt: '2026-06-10T10:00:00.000Z',
    updatedAt: '2026-06-10T10:00:00.000Z',
  };
}

test('resolveJournalSessionIdentity reuses today session when saving for today', () => {
  const todaySession = session('today-id', today);
  const result = resolveJournalSessionIdentity(null, todaySession, today, today, () => 'new-id');
  assert.equal(result.id, 'today-id');
  assert.equal(result.createdAt, todaySession.createdAt);
});

test('resolveJournalSessionIdentity creates new id when date is not today', () => {
  const todaySession = session('today-id', today);
  const result = resolveJournalSessionIdentity(null, todaySession, past, today, () => 'new-id');
  assert.equal(result.id, 'new-id');
  assert.equal(result.createdAt, undefined);
});

test('resolveJournalSessionIdentity keeps editing session id regardless of date', () => {
  const editing = session('edit-id', past);
  const todaySession = session('today-id', today);
  const result = resolveJournalSessionIdentity(editing, todaySession, today, today, () => 'new-id');
  assert.equal(result.id, 'edit-id');
});
