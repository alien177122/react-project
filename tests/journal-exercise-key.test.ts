import {describe, it} from 'node:test';
import assert from 'node:assert/strict';
import {EXERCISES, isCatalogExerciseKey} from '../packages/shared/src/data/exercises.ts';

/** Mirrors JournalTab exerciseKey resolution — picker uses CATALOG, not Program 2.0 only. */
function resolveJournalExerciseKey(urlValue: string | null): string {
  return urlValue && isCatalogExerciseKey(urlValue) ? urlValue : 'bench';
}

describe('journal exercise key (catalog vs Program 2.0)', () => {
  it('accepts split-only catalog keys such as dips', () => {
    assert.ok(!Object.hasOwn(EXERCISES, 'dips'));
    assert.ok(isCatalogExerciseKey('dips'));
    assert.equal(resolveJournalExerciseKey('dips'), 'dips');
  });

  it('falls back to bench for unknown keys', () => {
    assert.equal(resolveJournalExerciseKey('not-an-exercise'), 'bench');
    assert.equal(resolveJournalExerciseKey(null), 'bench');
  });
});
