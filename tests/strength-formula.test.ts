import assert from 'node:assert/strict'
import test from 'node:test'

import {
  PRIORITY_ORDER,
  STRENGTH_AUTOREG_CHECKLIST,
  STRENGTH_FACTOR_TIERS,
  STRENGTH_FORMULA_OVERVIEW,
  STRENGTH_PROTOCOL_STEPS,
  STRENGTH_SCIENCE_CARDS,
  StrengthFormulaDataSchema,
  strengthFormulaData,
} from '@training/shared/data/strength-formula'

test('strength formula data matches schema', () => {
  const parsed = StrengthFormulaDataSchema.parse(strengthFormulaData)

  assert.equal(parsed.overview.formulaParts.length, 5)
  assert.equal(parsed.scienceCards.length, 13)
  assert.equal(parsed.protocolSteps.length, 4)
})

test('formula parts have unique visual order slots', () => {
  const orders = STRENGTH_FORMULA_OVERVIEW.formulaParts
    .map(part => part.visualOrder)
    .sort((a, b) => a - b)

  assert.deepEqual(orders, [1, 2, 3, 4, 5])
  assert.equal(new Set(orders).size, STRENGTH_FORMULA_OVERVIEW.formulaParts.length)
})

test('priority levels are complete and valid', () => {
  const expectedLevels = ['advanced', 'foundation', 'optimization', 'remove', 'tuning']

  assert.deepEqual(Object.keys(PRIORITY_ORDER).sort(), expectedLevels)
  assert.ok(STRENGTH_FACTOR_TIERS.every(tier => tier.level in PRIORITY_ORDER))
})

test('autoreg checklist has required non-empty stages', () => {
  assert.ok(STRENGTH_AUTOREG_CHECKLIST.before.length > 0)
  assert.ok(STRENGTH_AUTOREG_CHECKLIST.during.length > 0)
  assert.ok(STRENGTH_AUTOREG_CHECKLIST.after.length > 0)
})

test('science cards have unique ids and bounded difficulty', () => {
  const ids = new Set(STRENGTH_SCIENCE_CARDS.map(card => card.id))

  assert.equal(ids.size, STRENGTH_SCIENCE_CARDS.length)
  assert.ok(
    STRENGTH_SCIENCE_CARDS.every(card => card.difficulty >= 1 && card.difficulty <= 3),
  )
})

test('protocol flow starts with testing and ends with tracking', () => {
  assert.equal(STRENGTH_PROTOCOL_STEPS[0]?.step, '01')
  assert.equal(STRENGTH_PROTOCOL_STEPS.at(-1)?.title, 'Трекинг')
})
