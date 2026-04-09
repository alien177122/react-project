import test from 'node:test'
import assert from 'node:assert/strict'
import { getTrainingExercises } from '@training/shared/utils/training'

test('getTrainingExercises returns empty for missing saved exercises', () => {
  const rows = getTrainingExercises(0, 0, [])
  assert.deepEqual(rows, [])
})

