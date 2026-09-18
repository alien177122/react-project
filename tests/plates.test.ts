import test from 'node:test'
import assert from 'node:assert/strict'
import { decomposePlates } from '@training/shared/utils/plates'

test('decomposePlates returns an empty bar for bar weight only', () => {
  assert.deepEqual(decomposePlates(20), {
    ok: true,
    barWeight: 20,
    totalWeight: 20,
    perSide: 0,
    plates: [],
  })
})

test('decomposePlates handles minimum Olympic increment', () => {
  const result = decomposePlates(22.5)
  assert.equal(result.ok, true)
  if (result.ok) assert.deepEqual(result.plates, [1.25])
})

test('decomposePlates uses greedy standard gym loading with 20 kg plates', () => {
  const result = decomposePlates(100)
  assert.equal(result.ok, true)
  if (result.ok) assert.deepEqual(result.plates, [20, 20])
})

test('decomposePlates supports repeated 20 kg plates for heavy loads', () => {
  const result = decomposePlates(180)
  assert.equal(result.ok, true)
  if (result.ok) assert.deepEqual(result.plates, [20, 20, 20, 20])
})

test('decomposePlates supports non-20kg bars', () => {
  const result = decomposePlates(55, 15)
  assert.equal(result.ok, true)
  if (result.ok) assert.deepEqual(result.plates, [20])
})

test('decomposePlates reports below-bar and non-decomposable weights', () => {
  assert.deepEqual(decomposePlates(19), {
    ok: false,
    reason: 'below-bar',
    suggestion: 20,
  })
  assert.deepEqual(decomposePlates(21), {
    ok: false,
    reason: 'not-decomposable',
    suggestion: 22.5,
  })
})
