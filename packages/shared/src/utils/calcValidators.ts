/**
 * Strict parsers for calculator inputs that may come from untrusted
 * sources (URL query, localStorage, shared links). All three helpers
 * return `null` on invalid input — the caller decides whether to fall
 * back to a default or surface an error, keeping this module pure.
 */

import { EXERCISES } from '../data/exercises.ts'

/** Inclusive weight bounds (kg). Anything outside is treated as garbage
 *  — typical world-record totals do not exceed ~500 kg for a single
 *  movement, so 1000 is a generous upper bound. */
export const WEIGHT_MIN = 0.5
export const WEIGHT_MAX = 1000

/** Inclusive rep bounds. Below 1 is nonsensical; above 30 falls
 *  outside the validated range of Epley/Lander formulas used by
 *  calc1RM. */
export const REPS_MIN = 1
export const REPS_MAX = 30

export function parseWeight(raw: string | null | undefined): number | null {
  if (raw == null || raw === '') return null
  const n = Number(raw)
  if (!Number.isFinite(n)) return null
  if (n < WEIGHT_MIN || n > WEIGHT_MAX) return null
  return n
}

export function parseReps(raw: string | null | undefined): number | null {
  if (raw == null || raw === '') return null
  const n = Number(raw)
  if (!Number.isFinite(n)) return null
  if (!Number.isInteger(n)) return null
  if (n < REPS_MIN || n > REPS_MAX) return null
  return n
}

/**
 * Accepts an exercise key only if it exists in EXERCISES. This is a
 * whitelist check — `?ex=<script>` or an unknown legacy key returns
 * null so the caller can fall back to the default without trusting
 * the input.
 */
export function parseExerciseKey(raw: string | null | undefined): string | null {
  if (raw == null || raw === '') return null
  if (!Object.prototype.hasOwnProperty.call(EXERCISES, raw)) return null
  return raw
}
