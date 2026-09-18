/** Mirrors packages/shared/src/utils/calc.ts (epley default) — keep in sync. */
export function calc1RM(weight, reps) {
  if (weight <= 0 || reps < 1) return 0;
  if (reps < 5) return weight / (1.0278 - 0.0278 * reps * 1.3);
  if (reps <= 8) return weight / (1.0278 - 0.0278 * reps * 1.2);
  return weight * (1 + 0.0333 * reps * 1.1);
}

export function roundOneRm(value) {
  return Math.round(value * 10) / 10;
}
