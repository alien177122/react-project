import test from 'node:test'
import assert from 'node:assert/strict'
import { EXERCISES } from '../src/data/exercises.ts'
import type { SavedExercise } from '../src/types/index.ts'
import { getTrainingExercises } from '../src/utils/training.ts'

test('getTrainingExercises builds the current day rows from saved 1RM data', () => {
  const savedExercises: SavedExercise[] = [
    { exerciseKey: 'squat', testWeight: 100, testReps: 5, oneRM: 140, date: '17.03.2026' },
    { exerciseKey: 'dbPress', testWeight: 28, testReps: 8, oneRM: 36, date: '17.03.2026' },
    { exerciseKey: 'pullUp', testWeight: 92, testReps: 5, oneRM: 110, date: '17.03.2026', bodyWeight: 82 },
    { exerciseKey: 'legExt', testWeight: 60, testReps: 8, oneRM: 90, date: '17.03.2026' },
  ]

  const rows = getTrainingExercises(1, 0, savedExercises)

  assert.equal(rows.length, 4)
  assert.deepEqual(rows.map(row => row.key), ['squat', 'dbPress', 'pullUp', 'legExt'])
  assert.equal(rows[0].weight, 97.5)
  assert.equal(rows[0].totalReps, 32)
  assert.equal(rows[2].isPullup, true)
  assert.equal(rows[2].weight, 72.5)
  assert.equal(rows[2].extraWeight, -9.5)
})

test('getTrainingExercises skips exercises without saved results', () => {
  const rows = getTrainingExercises(0, 2, [
    { exerciseKey: 'bench', testWeight: 100, testReps: 4, oneRM: 120, date: '17.03.2026' },
  ])

  assert.equal(rows.length, 1)
  assert.equal(rows[0].name, EXERCISES.bench.name)
  assert.equal(rows[0].scheme.reps, EXERCISES.bench.weekSchemes[2].reps)
})
