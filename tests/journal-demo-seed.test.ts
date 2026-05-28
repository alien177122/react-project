import test from 'node:test';
import assert from 'node:assert/strict';
import {JOURNAL_DEMO_NAME, buildJournalDemoUserData} from '../server/journalDemoSeed.js';

test('JournalDemo seed has exercises with oneRM and journal sets with weight', () => {
  const data = buildJournalDemoUserData();

  assert.equal(data.name, JOURNAL_DEMO_NAME);
  assert.equal(data.exercises.length, 12);
  assert.ok(data.exercises.every(exercise => exercise.oneRM > 0));

  assert.ok((data.journal?.length ?? 0) >= 40);
  for (const session of data.journal ?? []) {
    assert.ok(session.sets.length > 0);
    assert.ok(session.sets.every(set => set.weight > 0 && set.reps >= 1));
  }
});
