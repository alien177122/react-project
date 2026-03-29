import { EXERCISES } from '../data/exercises.ts'
import { MUSCLE_CONTRIB } from '../data/muscles.ts'

export function computeMuscleVol(): Record<string, number> {
  const result: Record<string, number> = {}

  for (const [key, cfg] of Object.entries(EXERCISES)) {
    const contrib = MUSCLE_CONTRIB[key]
    if (!contrib) continue

    const avgSets = cfg.weekSchemes.reduce((sum, week) => sum + week.sets, 0) / cfg.weekSchemes.length

    for (const [muscle, share] of Object.entries(contrib)) {
      result[muscle] = (result[muscle] || 0) + avgSets * share
    }
  }

  return result
}
