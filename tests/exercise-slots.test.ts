import assert from 'node:assert/strict';
import {describe, it} from 'node:test';
import {
  buildExerciseSlots,
  allExerciseSlotsSaved,
  countSavedExerciseSlots,
  getMissingExerciseSlotLabels,
  resolveProgramExerciseKey,
} from '../packages/shared/src/data/exercise-slots.ts';
import {
  CATALOG_EXERCISES,
  EXERCISES,
  EX_COUNT,
  SPLIT_EXTRA_EXERCISES,
} from '../packages/shared/src/data/exercises.ts';

const SLOTS = buildExerciseSlots(Object.keys(EXERCISES), key => EXERCISES[key]?.name ?? key);
/** Program 2.0: 12 keys; deadlift/gluteBridge share one unlock slot when both present in input. */
const EXPECTED_SLOT_COUNT = EX_COUNT;

describe('exercise slots', () => {
  it('keeps Program 2.0 training catalog at 12; split extras live outside EXERCISES', () => {
    assert.equal(EX_COUNT, 12);
    assert.equal(Object.keys(EXERCISES).length, 12);
    assert.equal(Object.keys(SPLIT_EXTRA_EXERCISES).length, 4);
    assert.equal(Object.keys(CATALOG_EXERCISES).length, 16);
    assert.equal(SLOTS.length, EXPECTED_SLOT_COUNT);
  });

  it('fills alt slot when either deadlift or gluteBridge is saved', () => {
    const slotsWithDeadlift = buildExerciseSlots(
      [...Object.keys(EXERCISES), 'deadlift'],
      key => CATALOG_EXERCISES[key]?.name ?? key,
    );
    assert.equal(countSavedExerciseSlots(['deadlift'], slotsWithDeadlift), 1);
    assert.equal(countSavedExerciseSlots(['gluteBridge'], slotsWithDeadlift), 1);
    assert.equal(countSavedExerciseSlots(['deadlift', 'gluteBridge'], slotsWithDeadlift), 1);
  });

  it('reports missing slot label with slash when deadlift is in the key set', () => {
    const slotsWithDeadlift = buildExerciseSlots(
      [...Object.keys(EXERCISES), 'deadlift'],
      key => CATALOG_EXERCISES[key]?.name ?? key,
    );
    const missing = getMissingExerciseSlotLabels(new Set(), slotsWithDeadlift);
    assert.ok(missing.includes('Становая тяга / Ягодичный мост'));
  });

  it('unlocks when all Program 2.0 slots are filled', () => {
    const keys = Object.keys(EXERCISES);
    assert.equal(keys.length, EX_COUNT);
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
