import { useMemo } from 'react'
import type { ExerciseConfig, SavedExercise } from '../types'
import { calcWorkingWeight } from '../utils/calc'

export interface PeriodWeek {
  week: number
  pct: number
  weight: number
  rawWeight: number
  sets: number
  reps: number
  totalReps: number
  phase: 'Accumulation' | 'Deload' | 'Intensification' | 'Peak'
  x: number
  y: number
  barX: number
  barY: number
  barHeight: number
}

export interface PeriodPhase {
  label: string
  weeks: number
  colorVar: string
  tintVar: string
}

const VIEW = { left: 56, right: 56, top: 28, bottom: 238, width: 800, barWidth: 40 }

function phaseFor(index: number): PeriodWeek['phase'] {
  if (index < 4) return 'Accumulation'
  if (index === 4) return 'Deload'
  if (index < 7) return 'Intensification'
  return 'Peak'
}

function linePath(points: { x: number; y: number }[]): string {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ')
}

function areaPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return ''
  const base = VIEW.bottom
  return `${linePath(points)} L ${points[points.length - 1].x.toFixed(1)} ${base} L ${points[0].x.toFixed(1)} ${base} Z`
}

function displayWeight(config: ExerciseConfig, result: SavedExercise, rawWeight: number): number {
  if (config.isPullup && result.bodyWeight != null) return rawWeight - result.bodyWeight
  return rawWeight
}

export function usePeriodization(config: ExerciseConfig, result: SavedExercise) {
  return useMemo(() => {
    const maxVolume = Math.max(...config.weekSchemes.map(scheme => scheme.sets * scheme.reps), 1)
    const minPct = Math.min(...config.percentages) - 5
    const maxPct = Math.max(...config.percentages) + 5
    const chartWidth = VIEW.width - VIEW.left - VIEW.right
    const stepX = chartWidth / Math.max(1, config.percentages.length - 1)
    const chartHeight = VIEW.bottom - VIEW.top

    const weeks: PeriodWeek[] = config.percentages.map((pct, index) => {
      const scheme = config.weekSchemes[index]
      const totalReps = scheme.sets * scheme.reps
      const rawWeight = calcWorkingWeight(result.oneRM, pct, config)
      const x = VIEW.left + stepX * index
      const y = VIEW.bottom - ((pct - minPct) / (maxPct - minPct)) * chartHeight
      const barHeight = (totalReps / maxVolume) * chartHeight
      return {
        week: index + 1,
        pct,
        rawWeight,
        weight: displayWeight(config, result, rawWeight),
        sets: scheme.sets,
        reps: scheme.reps,
        totalReps,
        phase: phaseFor(index),
        x,
        y,
        barX: x - VIEW.barWidth / 2,
        barY: VIEW.bottom - barHeight,
        barHeight,
      }
    })

    const points = weeks.map(({ x, y }) => ({ x, y }))
    const phases: PeriodPhase[] = [
      { label: 'Accumulation', weeks: 4, colorVar: '--ta-sec-02', tintVar: '--ta-sec-02-tint' },
      { label: 'Deload', weeks: 1, colorVar: '--ta-sec-03', tintVar: '--ta-sec-03-tint' },
      { label: 'Intensification', weeks: 2, colorVar: '--ta-sec-06', tintVar: '--ta-sec-06-tint' },
      { label: 'Peak', weeks: 1, colorVar: '--ta-sec-01', tintVar: '--ta-sec-01-tint' },
    ]

    return {
      weeks,
      phases,
      linePath: linePath(points),
      areaPath: areaPath(points),
      viewBox: `0 0 ${VIEW.width} 280`,
      grid: [0, 1, 2, 3].map(i => VIEW.top + i * ((VIEW.bottom - VIEW.top) / 3)),
    }
  }, [config, result])
}
