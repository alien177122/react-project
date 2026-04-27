import test from 'node:test'
import assert from 'node:assert/strict'
import { CAT_ORDER, MUSCLE_META } from '@training/shared/data/muscles'
import { computeMuscleVolumeBreakdown } from '@training/shared/utils/volume-breakdown'

function roundTo(value: number, digits = 1): number {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

test('totalSets equals sum of muscle values', () => {
  const result = computeMuscleVolumeBreakdown()
  const sum = result.muscles.reduce((acc, muscle) => acc + muscle.value, 0)
  assert.equal(result.totalSets, roundTo(sum))
})

test('category percents sum to roughly 100', () => {
  const result = computeMuscleVolumeBreakdown()
  const totalPercent = Object.values(result.categories).reduce((acc, category) => acc + category.percent, 0)
  assert.ok(totalPercent >= 99.9)
  assert.ok(totalPercent <= 100.1)
})

test('each muscle has valid category metadata', () => {
  const result = computeMuscleVolumeBreakdown()
  const validCategories = new Set<string>(CAT_ORDER)

  result.muscles.forEach((muscle) => {
    assert.ok(validCategories.has(muscle.catKey))
    assert.equal(MUSCLE_META[muscle.id]?.label, muscle.label)
  })
})

test('source contributions sum to muscle volume', () => {
  const result = computeMuscleVolumeBreakdown()

  result.muscles.forEach((muscle) => {
    const sourceSum = (result.sources[muscle.id] ?? []).reduce((acc, source) => acc + source.sets, 0)
    assert.equal(roundTo(sourceSum), muscle.value)
  })
})
