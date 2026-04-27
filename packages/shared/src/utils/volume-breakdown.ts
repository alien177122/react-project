import { EXERCISES } from '../data/exercises.ts'
import { CAT_ORDER, MUSCLE_CONTRIB, MUSCLE_META } from '../data/muscles.ts'
import type { ExerciseConfig } from '../types/index.ts'

export type VolumeCategory = (typeof CAT_ORDER)[number]

export type MuscleBreakdown = {
  id: string
  label: string
  catKey: VolumeCategory
  value: number
  percent: number
  /** 1-based rank for display. */
  rank: number
}

export type VolumeSource = {
  exerciseId: string
  label: string
  sets: number
}

export type VolumeBreakdown = {
  totalSets: number
  categories: Record<VolumeCategory, { total: number; percent: number }>
  muscles: MuscleBreakdown[]
  sources: Record<string, VolumeSource[]>
}

type ExerciseMap = Record<string, ExerciseConfig>
type ContributionMap = Record<string, Record<string, number>>

type SourceDraft = {
  exerciseId: string
  label: string
  rawSets: number
}

function roundTo(value: number, digits = 1): number {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

function emptyCategories(): Record<VolumeCategory, { total: number; percent: number }> {
  return {
    push: { total: 0, percent: 0 },
    pull: { total: 0, percent: 0 },
    legs: { total: 0, percent: 0 },
  }
}

function isVolumeCategory(value: string): value is VolumeCategory {
  return (CAT_ORDER as readonly string[]).includes(value)
}

function compensatePercents(
  categories: Record<VolumeCategory, { total: number; percent: number }>,
  totalSets: number,
) {
  if (totalSets <= 0) return

  let used = 0
  CAT_ORDER.forEach((catKey, index) => {
    const isLast = index === CAT_ORDER.length - 1
    const percent = isLast
      ? roundTo(100 - used)
      : roundTo((categories[catKey].total / totalSets) * 100)

    categories[catKey].percent = percent
    used = roundTo(used + percent)
  })
}

function roundedSources(drafts: SourceDraft[], targetTotal: number): VolumeSource[] {
  const sorted = [...drafts].sort((a, b) => b.rawSets - a.rawSets)
  let used = 0

  return sorted
    .map((source, index) => {
      const isLast = index === sorted.length - 1
      const sets = isLast
        ? roundTo(Math.max(0, targetTotal - used))
        : roundTo(source.rawSets)
      used = roundTo(used + sets)
      return {
        exerciseId: source.exerciseId,
        label: source.label,
        sets,
      }
    })
    .filter(source => source.sets > 0)
}

export function computeMuscleVolumeBreakdown(
  exercises: ExerciseMap = EXERCISES,
  contributions: ContributionMap = MUSCLE_CONTRIB,
): VolumeBreakdown {
  const sourceDrafts: Record<string, SourceDraft[]> = {}

  for (const [exerciseId, config] of Object.entries(exercises)) {
    const contribution = contributions[exerciseId]
    if (!contribution) continue

    const avgSets = config.weekSchemes.reduce((sum, week) => sum + week.sets, 0) / config.weekSchemes.length

    for (const [muscleId, share] of Object.entries(contribution)) {
      if (!MUSCLE_META[muscleId] || share <= 0) continue
      sourceDrafts[muscleId] ??= []
      sourceDrafts[muscleId].push({
        exerciseId,
        label: config.name,
        rawSets: avgSets * share,
      })
    }
  }

  const categories = emptyCategories()
  const sources: Record<string, VolumeSource[]> = {}

  const muscles = Object.entries(MUSCLE_META)
    .flatMap(([muscleId, meta]) => {
      if (!isVolumeCategory(meta.catKey)) return []

      const drafts = sourceDrafts[muscleId] ?? []
      const value = roundTo(drafts.reduce((sum, source) => sum + source.rawSets, 0))
      if (value <= 0) return []

      sources[muscleId] = roundedSources(drafts, value)
      categories[meta.catKey].total = roundTo(categories[meta.catKey].total + value)

      return [{
        id: muscleId,
        label: meta.label,
        catKey: meta.catKey,
        value,
        percent: 0,
        rank: 0,
      }]
    })
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, 'ru'))

  const totalSets = roundTo(muscles.reduce((sum, muscle) => sum + muscle.value, 0))
  compensatePercents(categories, totalSets)

  return {
    totalSets,
    categories,
    muscles: muscles.map((muscle, index) => ({
      ...muscle,
      percent: totalSets > 0 ? roundTo((muscle.value / totalSets) * 100) : 0,
      rank: index + 1,
    })),
    sources,
  }
}
