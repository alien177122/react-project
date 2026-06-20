import assert from 'node:assert/strict';
import test from 'node:test';
import {todayLocalDate} from '@training/shared/utils/journalLimits';

test('journal history includes today sessions after save', () => {
  const today = todayLocalDate();
  const sessions = [
    {
      id: 'past',
      exerciseKey: 'bench',
      date: '2026-05-23',
      sets: [],
      createdAt: '2026-05-23T10:00:00.000Z',
    },
    {
      id: 'today',
      exerciseKey: 'bench',
      date: today,
      sets: [],
      createdAt: '2026-05-30T10:00:00.000Z',
    },
  ];

  const history = [...sessions]
    .filter(session => session.exerciseKey === 'bench')
    .sort((a, b) => b.date.localeCompare(a.date));

  assert.equal(history.length, 2);
  assert.equal(history[0]?.id, 'today');
  assert.equal(history[0]?.date, today);
});

test('draft set validation rejects empty weight or reps', () => {
  const draftSets = [
    {weight: '', reps: '5', rpe: '', note: ''},
    {weight: '80', reps: '', rpe: '', note: ''},
    {weight: '80', reps: '5', rpe: '', note: ''},
  ];

  const normalized = draftSets
    .map((set, index) => {
      const weight = parseFloat(set.weight);
      const reps = parseInt(set.reps, 10);
      if (!weight || weight <= 0 || !reps || reps < 1) return null;
      return {setIndex: index + 1, weight, reps};
    })
    .filter((set): set is {setIndex: number; weight: number; reps: number} => set !== null);

  assert.equal(normalized.length, 1);
  assert.deepEqual(normalized[0], {setIndex: 3, weight: 80, reps: 5});
});
