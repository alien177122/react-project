import type { ExerciseConfig } from '../types/index.ts'

export function calc1RM(weight: number, reps: number): number {
  if (reps < 5) return weight / (1.0278 - 0.0278 * reps * 1.3)
  if (reps <= 8) return weight / (1.0278 - 0.0278 * reps * 1.2)
  return weight * (1 + 0.0333 * reps * 1.1)
}

export function roundWeight(value: number, step: number, type: 'A' | 'B' | 'C' | 'D'): number {
  if (type === 'C') return Math.floor(value / step) * step
  return Math.ceil(value / step) * step
}

export function calcWorkingWeight(oneRM: number, pct: number, cfg: ExerciseConfig): number {
  return roundWeight(oneRM * (pct / 100), cfg.step, cfg.type)
}

export function volumeClass(t: number): string {
  if (t >= 28) return 'v-hi'
  if (t <= 16) return 'v-lo'
  return 'v-md'
}

export function barColor(t: number): string {
  if (t >= 28) return '#ff6b35'
  if (t <= 16) return '#ff4d4d'
  return '#ff9f40'
}
