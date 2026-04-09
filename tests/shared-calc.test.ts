import test from 'node:test'
import assert from 'node:assert/strict'
import { calc1RM } from '@training/shared/utils/calc'

test('calc1RM increases with reps (same weight)', () => {
  const w = 100
  const r5 = calc1RM(w, 5)
  const r8 = calc1RM(w, 8)
  const r12 = calc1RM(w, 12)

  assert.ok(r8 > r5)
  assert.ok(r12 > r8)
})

test('calc1RM is close to weight at 1 rep', () => {
  const w = 120
  const r1 = calc1RM(w, 1)
  assert.ok(Math.abs(r1 - w) < 10)
})

