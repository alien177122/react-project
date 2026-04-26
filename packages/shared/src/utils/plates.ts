export const DEFAULT_BAR_WEIGHT = 20
export const DEFAULT_PLATES = [25, 20, 15, 10, 5, 2.5, 1.25] as const

export type PlateResult =
  | {
      ok: true
      barWeight: number
      totalWeight: number
      perSide: number
      plates: number[]
    }
  | {
      ok: false
      reason: 'below-bar' | 'not-decomposable'
      suggestion: number
    }

const EPS = 0.001

function roundLoad(value: number): number {
  return Number(value.toFixed(3))
}

function nextLoadableWeight(weight: number, barWeight: number, available: readonly number[]): number {
  const increment = Math.min(...available) * 2
  const steps = Math.max(0, Math.ceil((weight - barWeight - EPS) / increment))
  return roundLoad(barWeight + steps * increment)
}

export function decomposePlates(
  weight: number,
  barWeight = DEFAULT_BAR_WEIGHT,
  available: readonly number[] = DEFAULT_PLATES,
): PlateResult {
  if (!Number.isFinite(weight) || !Number.isFinite(barWeight) || weight < barWeight - EPS) {
    return { ok: false, reason: 'below-bar', suggestion: barWeight }
  }

  const load = roundLoad(weight - barWeight)
  if (Math.abs(load) < EPS) {
    return { ok: true, barWeight, totalWeight: weight, perSide: 0, plates: [] }
  }

  const perSide = roundLoad(load / 2)
  const plates: number[] = []
  let remaining = perSide

  for (const plate of [...available].sort((a, b) => b - a)) {
    while (remaining + EPS >= plate) {
      plates.push(plate)
      remaining = roundLoad(remaining - plate)
    }
  }

  if (remaining > EPS) {
    return {
      ok: false,
      reason: 'not-decomposable',
      suggestion: nextLoadableWeight(weight, barWeight, available),
    }
  }

  return { ok: true, barWeight, totalWeight: weight, perSide, plates }
}
