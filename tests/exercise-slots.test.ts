import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {
  buildExerciseSlots,
  allExerciseSlotsSaved,
  countSavedExerciseSlots,
  getMissingExerciseSlotLabels,
  resolveProgramExerciseKey,
} from '../packages/shared/src/data/exercise-slots.ts';
import {EXERCISES, EX_COUNT} from '../packages/shared/src/data/exercises.ts';

const SLOTS = buildExerciseSlots(Object.keys(EXERCISES), key => EXERCISES[key]?.name ?? key);

describe('exercise slots', () => {
  it('counts 12 slots with deadlift/gluteBridge merged', () => {
    assert.equal(SLOTS.length, 12);
    assert.equal(EX_COUNT, 12);
    assert.equal(Object.keys(EXERCISES).length, 12);
  });

  it('fills alt slot when either deadlift or gluteBridge is saved', () => {
    assert.equal(countSavedExerciseSlots(['deadlift'], SLOTS), 1);
    assert.equal(countSavedExerciseSlots(['gluteBridge'], SLOTS), 1);
    assert.equal(countSavedExerciseSlots(['deadlift', 'gluteBridge'], SLOTS), 1);
  });

  it('reports missing slot label with slash', () => {
    const missing = getMissingExerciseSlotLabels(new Set(), SLOTS);
    assert.ok(missing.includes('Становая тяга / Ягодичный мост'));
  });

  it('unlocks when all 12 slots filled without both alts', () => {
    const keys = Object.keys(EXERCISES);
    assert.equal(keys.length, 12);
    assert.equal(allExerciseSlotsSaved(keys, SLOTS), true);
  });

  it('resolves program gluteBridge to saved deadlift', () => {
    const saved = new Map([['deadlift', {oneRM: 100}]]);
    assert.equal(resolveProgramExerciseKey('gluteBridge', saved), 'deadlift');
  });

  it('resolves program gluteBridge to saved gluteBridge', () => {
    const saved = new Map([['gluteBridge', {oneRM: 80}]]);
    assert.equal(resolveProgramExerciseKey('gluteBridge', saved), 'gluteBridge');
  });
});
