import { EXERCISES } from '../data/exercises'
import { MUSCLE_CONTRIB } from '../data/muscles'

// Вычисляет средний объём (подходов за цикл) на каждую мышцу
export function computeMuscleVol(): Record<string, number> {
  const r: Record<string, number> = {}
  for (const [key, cfg] of Object.entries(EXERCISES)) {
    const contrib = MUSCLE_CONTRIB[key]; if (!contrib) continue
    const avgSets = cfg.weekSchemes.reduce((s, w) => s + w.sets, 0) / cfg.weekSchemes.length
    for (const [m, share] of Object.entries(contrib))
      r[m] = (r[m] || 0) + avgSets * share
  }
  return r
}
