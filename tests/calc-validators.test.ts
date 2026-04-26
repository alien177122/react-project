import test from 'node:test'
import assert from 'node:assert/strict'
import {
  parseWeight,
  parseReps,
  parseExerciseKey,
  WEIGHT_MAX,
  REPS_MIN,
  REPS_MAX,
} from '@training/shared/utils/calcValidators'

test('parseWeight accepts plain positive numbers', () => {
  assert.equal(parseWeight('80'), 80)
  assert.equal(parseWeight('22.5'), 22.5)
  assert.equal(parseWeight('0.5'), 0.5)
})

test('parseWeight rejects zero, negatives, NaN, and out-of-range', () => {
  assert.equal(parseWeight('0'), null)
  assert.equal(parseWeight('-5'), null)
  assert.equal(parseWeight('abc'), null)
  assert.equal(parseWeight(String(WEIGHT_MAX + 1)), null)
  assert.equal(parseWeight('0.1'), null, 'below WEIGHT_MIN')
})

test('parseWeight handles null/empty/whitespace as null', () => {
  assert.equal(parseWeight(null), null)
  assert.equal(parseWeight(undefined), null)
  assert.equal(parseWeight(''), null)
})

test('parseReps accepts positive integers in range', () => {
  assert.equal(parseReps('1'), 1)
  assert.equal(parseReps('6'), 6)
  assert.equal(parseReps(String(REPS_MAX)), REPS_MAX)
})

test('parseReps rejects fractions, zero, negatives, out-of-range', () => {
  assert.equal(parseReps('0'), null)
  assert.equal(parseReps('4.5'), null, 'fractions rejected')
  assert.equal(parseReps('-1'), null)
  assert.equal(parseReps(String(REPS_MAX + 1)), null)
  assert.equal(parseReps('abc'), null)
  assert.equal(parseReps(String(REPS_MIN - 1)), null)
})

test('parseExerciseKey whitelists known keys only', () => {
  assert.equal(parseExerciseKey('bench'), 'bench')
  assert.equal(parseExerciseKey('pullUp'), 'pullUp')
  assert.equal(parseExerciseKey('squat'), 'squat')
})

test('parseExerciseKey rejects unknown and injection attempts', () => {
  assert.equal(parseExerciseKey('unknown'), null)
  assert.equal(parseExerciseKey('<script>'), null)
  assert.equal(parseExerciseKey('__proto__'), null, 'no prototype pollution')
  assert.equal(parseExerciseKey('constructor'), null)
  assert.equal(parseExerciseKey(''), null)
  assert.equal(parseExerciseKey(null), null)
})
