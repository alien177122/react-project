import test from 'node:test';
import assert from 'node:assert/strict';
import { calc1RM } from '../src/utils/calculations.ts';

test('calc1RM', async (t) => {
  await t.test('calculates 1RM correctly for < 5 reps', () => {
    // 100 kg, 3 reps -> 100 / (1.0278 - 0.0278 * 3 * 1.3)
    const res = calc1RM(100, 3);
    assert.ok(Math.abs(res - 108.769) < 0.01, `Expected ~108.769, got ${res}`);
  });

  await t.test('calculates 1RM correctly for 5-8 reps', () => {
    // 100 kg, 6 reps -> 100 / (1.0278 - 0.0278 * 6 * 1.2)
    const res = calc1RM(100, 6);
    assert.ok(Math.abs(res - 120.825) < 0.01, `Expected ~120.825, got ${res}`);
  });

  await t.test('calculates 1RM correctly for > 8 reps', () => {
    // 100 kg, 10 reps -> 100 * (1 + 0.0333 * 10 * 1.1)
    const res = calc1RM(100, 10);
    assert.ok(Math.abs(res - 136.63) < 0.01, `Expected ~136.63, got ${res}`);
  });

  await t.test('handles boundary cases (1 rep)', () => {
    // 100 kg, 1 rep -> 100 / (1.0278 - 0.0278 * 1 * 1.3)
    const res = calc1RM(100, 1);
    assert.ok(Math.abs(res - 100.84) < 0.01, `Expected ~100.84, got ${res}`);
  });

  await t.test('handles boundary cases (5 reps)', () => {
    // 100 kg, 5 reps -> 100 / (1.0278 - 0.0278 * 5 * 1.2)
    const res = calc1RM(100, 5);
    assert.ok(Math.abs(res - 116.14) < 0.01, `Expected ~116.14, got ${res}`);
  });

  await t.test('handles boundary cases (8 reps)', () => {
    // 100 kg, 8 reps -> 100 / (1.0278 - 0.0278 * 8 * 1.2)
    const res = calc1RM(100, 8);
    assert.ok(Math.abs(res - 131.42) < 0.01, `Expected ~131.42, got ${res}`);
  });

  await t.test('handles zero weight', () => {
    assert.equal(calc1RM(0, 5), 0);
  });
});
