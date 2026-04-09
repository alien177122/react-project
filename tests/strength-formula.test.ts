import assert from 'node:assert/strict'
import test from 'node:test'

import {
  STRENGTH_PROTOCOL_STEPS,
  STRENGTH_SCIENCE_CARDS,
  StrengthFormulaDataSchema,
  strengthFormulaData,
} from '@training/shared/data/strength-formula'

test('strength formula data matches schema', () => {
  const parsed = StrengthFormulaDataSchema.parse(strengthFormulaData)

  assert.equal(parsed.scienceCards.length, 13)
  assert.equal(parsed.protocolSteps.length, 4)
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
