import test from 'node:test'
import assert from 'node:assert/strict'
import { EXERCISES } from '../src/data/exercises.ts'
import { barColor, calc1RM, calcWorkingWeight, roundWeight, volumeClass } from '../src/utils/calc.ts'

test('calc1RM returns a conservative estimate for mid rep ranges', () => {
  assert.equal(calc1RM(100, 6).toFixed(1), '120.8')
  assert.equal(calc1RM(80, 10).toFixed(1), '109.3')
})

test('roundWeight respects equipment rounding rules', () => {
  assert.equal(roundWeight(81.1, 2.5, 'A'), 82.5)
  assert.equal(roundWeight(23.9, 2, 'C'), 22)
})

test('calcWorkingWeight uses exercise config step and type', () => {
  assert.equal(calcWorkingWeight(137, 73, EXERCISES.bench), 102.5)
  assert.equal(calcWorkingWeight(37, 80, EXERCISES.lateralRaise), 29)
})

test('volume classes and colors stay aligned', () => {
  assert.equal(volumeClass(28), 'v-hi')
  assert.equal(volumeClass(20), 'v-md')
  assert.equal(volumeClass(16), 'v-lo')
  assert.equal(barColor(28), 'var(--accent,#ff6b35)')
  assert.equal(barColor(16), '#ff4d4d')
})
