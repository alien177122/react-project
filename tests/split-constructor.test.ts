import test from 'node:test';
import assert from 'node:assert/strict';
import {EXERCISES} from '@training/shared/data/exercises';
import {LEG_EXERCISE_KEYS} from '@training/shared/data/split-exercises';
import {
  allMusclesAssigned,
  buildDayPreview,
  createDefaultSplit,
  distributeSets,
  exerciseKeysForDay,
  getBaselineSetsPerMuscle,
} from '@training/shared/utils/split-constructor';

test('distributeSets(6, 2) → [3, 3]', () => {
  assert.deepEqual(distributeSets(6, 2), [3, 3]);
});

test('distributeSets(5, 2) → [3, 2]', () => {
  assert.deepEqual(distributeSets(5, 2), [3, 2]);
});

test('distributeSets(4, 2) → [2, 2]', () => {
  assert.deepEqual(distributeSets(4, 2), [2, 2]);
});

test('distributeSets(3, 2) best-effort min 2', () => {
  const result = distributeSets(3, 2);
  assert.equal(
    result.reduce((sum, value) => sum + value, 0),
    3,
  );
  assert.ok(result.every(value => value >= 1));
});

test('getBaselineSetsPerMuscle returns positive totals for main groups', () => {
  const baseline = getBaselineSetsPerMuscle(0);
  assert.ok(baseline.chest > 0);
  assert.ok(baseline.legs > 0);
  assert.ok(baseline.back > 0);
  assert.ok(baseline.triceps > 0);
});

test('default split assigns all muscles once', () => {
  const split = createDefaultSplit();
  assert.equal(allMusclesAssigned(split), true);
});

test('buildDayPreview scheme_only omits meaningful weight', () => {
  const split = createDefaultSplit();
  split.weightMode = 'scheme_only';
  const rows = buildDayPreview({
    split,
    dayNumber: 1,
    weekIndex: 0,
    savedExercises: [],
  });
  assert.ok(rows.length > 0);
  assert.ok(rows.every(row => row.weight === 0));
  assert.ok(rows.every(row => row.scheme.sets >= 1));
});

test('buildDayPreview puts chest exercises on each chest day', () => {
  const split = createDefaultSplit();
  split.daysPerWeek = 3;
  split.days = [
    {dayNumber: 1, muscles: ['chest', 'biceps', 'legs', 'shoulders', 'back', 'triceps']},
    {dayNumber: 2, muscles: ['chest']},
    {dayNumber: 3, muscles: []},
  ];

  const day1Bench = buildDayPreview({split, dayNumber: 1, weekIndex: 0, savedExercises: []}).find(
    row => row.key === 'bench',
  );
  const day2Bench = buildDayPreview({split, dayNumber: 2, weekIndex: 0, savedExercises: []}).find(
    row => row.key === 'bench',
  );

  assert.ok(day1Bench);
  assert.ok(day2Bench);
  assert.equal(
    day1Bench!.scheme.sets + day2Bench!.scheme.sets,
    EXERCISES.bench.weekSchemes[0].sets,
  );
});

test('default leg day uses exactly two selected leg exercises', () => {
  const split = createDefaultSplit();
  const keys = exerciseKeysForDay(split, 2);
  const legKeys = keys.filter(key => LEG_EXERCISE_KEYS.includes(key as never));
  assert.equal(legKeys.length, 2);
  assert.deepEqual(legKeys, ['squat', 'legPress']);
});

test('custom legExercises limits leg pool', () => {
  const split = createDefaultSplit();
  split.legExercises = ['legExt', 'legCurl'];
  const keys = exerciseKeysForDay(split, 2);
  const legKeys = keys.filter(key => LEG_EXERCISE_KEYS.includes(key as never));
  assert.deepEqual(legKeys, ['legExt', 'legCurl']);
});

test('exerciseKeysForDay caps at four exercises', () => {
  const split = createDefaultSplit();
  split.days = [
    {dayNumber: 1, muscles: ['chest', 'biceps', 'legs', 'shoulders']},
    {dayNumber: 2, muscles: []},
    {dayNumber: 3, muscles: []},
  ];
  const keys = exerciseKeysForDay(split, 1);
  assert.equal(keys.length, 4);
});

test('buildDayPreview never returns more than four rows per day', () => {
  const split = createDefaultSplit();
  split.days = [
    {dayNumber: 1, muscles: ['chest', 'biceps', 'legs', 'shoulders']},
    {dayNumber: 2, muscles: []},
    {dayNumber: 3, muscles: []},
  ];
  const rows = buildDayPreview({split, dayNumber: 1, weekIndex: 0, savedExercises: []});
  assert.ok(rows.length <= 4);
});
