import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GlossyCard } from './ui/GlossyCard'
import { theme } from '../theme'
import type { TrainingDayDef } from '../types'
import type { TrainingExerciseRow } from '../utils/training'
import { calcWarmupSets, volumeClass } from '../utils/calc'

interface TrainingDayCardProps {
  dayDef: TrainingDayDef
  weekIndex: number
  exercises: TrainingExerciseRow[]
  isPreview?: boolean
}

function volumeColor(totalReps: number) {
  const cls = volumeClass(totalReps)
  if (cls === 'v-hi') return theme.colors.orange
  if (cls === 'v-lo') return theme.colors.red
  return theme.colors.text
}

export default function TrainingDayCard({
  dayDef,
  weekIndex,
  exercises,
  isPreview = false,
}: TrainingDayCardProps) {
  const [showWarmup, setShowWarmup] = useState(false)

  const warmupExercises = isPreview
    ? []
    : exercises.filter((ex) => {
        if (ex.isPullup) return false
        return calcWarmupSets(ex.weight, {
          type: ex.exerciseType,
          warmupStep: ex.warmupStep,
        } as Parameters<typeof calcWarmupSets>[1]).length > 0
      })

  return (
    <GlossyCard
      contentStyle={styles.cardContent}
      style={isPreview ? styles.cardPreview : null}
      variant={isPreview ? 'default' : 'accent'}
    >
      <View style={styles.head}>
        <Text style={styles.day}>День {dayDef.dayNumber}</Text>
        <Text style={styles.name}>{dayDef.name}</Text>
        <Text style={styles.week}>Нед {weekIndex + 1}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHead}>
          <Text style={[styles.headCell, styles.exerciseCell]}>Упражнение</Text>
          <Text style={styles.headCell}>Вес</Text>
          <Text style={styles.headCell}>Схема</Text>
          <Text style={styles.headCell}>Повт</Text>
        </View>

        {exercises.map((exercise) => (
          <View key={exercise.key} style={styles.row}>
            <Text style={[styles.rowText, styles.exerciseCell, styles.exerciseName]}>{exercise.name}</Text>
            <Text style={[styles.rowText, styles.numericCell]}>
              {exercise.isPullup && exercise.extraWeight != null
                ? (exercise.extraWeight >= 0 ? `+${exercise.extraWeight.toFixed(1)}` : exercise.extraWeight.toFixed(1))
                : exercise.weight.toFixed(1)}
            </Text>
            <Text style={[styles.rowText, styles.numericCell]}>
              {exercise.scheme.sets} × {exercise.scheme.reps}
            </Text>
            <Text style={[styles.rowText, styles.numericCell, { color: volumeColor(exercise.totalReps) }]}>
              {exercise.totalReps}
            </Text>
          </View>
        ))}
      </View>

      {warmupExercises.length > 0 ? (
        <>
          <Pressable
            onPress={() => setShowWarmup((v) => !v)}
            style={({ pressed }) => [styles.warmupToggle, pressed ? styles.warmupTogglePressed : null]}
          >
            <Text style={styles.warmupToggleLabel}>РАЗМИНКА</Text>
            <Text style={styles.warmupToggleChevron}>{showWarmup ? '▲' : '▼'}</Text>
          </Pressable>

          {showWarmup ? (
            <View style={styles.warmupSection}>
              {warmupExercises.map((exercise) => {
                const warmupSets = calcWarmupSets(exercise.weight, {
                  type: exercise.exerciseType,
                  warmupStep: exercise.warmupStep,
                } as Parameters<typeof calcWarmupSets>[1])

                return (
                  <View key={exercise.key} style={styles.warmupGroup}>
                    <Text style={styles.warmupGroupName}>{exercise.name}</Text>

                    <View style={styles.warmupTableHead}>
                      <Text style={[styles.warmupHeadCell, styles.warmupColLabel]}>Подход</Text>
                      <Text style={[styles.warmupHeadCell, styles.warmupColWeight]}>Вес</Text>
                      <Text style={styles.warmupHeadCell}>Повт</Text>
                      <Text style={styles.warmupHeadCell}>Отдых</Text>
                    </View>

                    {warmupSets.map((set) => (
                      <View key={set.label} style={styles.warmupRow}>
                        <Text style={[styles.warmupCell, styles.warmupColLabel]}>{set.label}</Text>
                        <Text style={[styles.warmupCell, styles.warmupColWeight, styles.warmupWeightText]}>
                          {set.weight.toFixed(1)}
                        </Text>
                        <Text style={styles.warmupCell}>{set.reps}</Text>
                        <Text style={[styles.warmupCell, styles.warmupRestText]}>{set.rest}</Text>
                      </View>
                    ))}

                    <View style={[styles.warmupRow, styles.warmupWorkingRow]}>
                      <Text style={[styles.warmupCell, styles.warmupColLabel, styles.warmupAccentText]}>
                        Рабоч. ×{exercise.scheme.sets}
                      </Text>
                      <Text style={[styles.warmupCell, styles.warmupColWeight, styles.warmupWeightText, styles.warmupAccentText]}>
                        {exercise.weight.toFixed(1)}
                      </Text>
                      <Text style={[styles.warmupCell, styles.warmupAccentText]}>{exercise.scheme.reps}</Text>
                      <Text style={[styles.warmupCell, styles.warmupRestText, styles.warmupAccentText]}>3–4 мин</Text>
                    </View>
                  </View>
                )
              })}
            </View>
          ) : null}
        </>
      ) : null}
    </GlossyCard>
  )
}

const styles = StyleSheet.create({
  cardContent: {
    overflow: 'hidden',
    padding: 0,
  },
  cardPreview: {
    opacity: 0.82,
  },
  head: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderBottomColor: theme.colors.glassBorder,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  day: {
    color: theme.colors.accent,
    fontSize: 13,
    fontWeight: '700',
    width: 58,
  },
  name: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
  },
  week: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  table: {
    paddingBottom: 6,
  },
  tableHead: {
    columnGap: 8,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  headCell: {
    color: theme.colors.muted,
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  exerciseCell: {
    flex: 2.1,
    textAlign: 'left',
  },
  row: {
    alignItems: 'center',
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    columnGap: 8,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
  },
  rowText: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 13,
  },
  exerciseName: {
    fontWeight: '600',
  },
  numericCell: {
    fontFamily: 'Courier',
    textAlign: 'center',
  },

  // Warmup toggle
  warmupToggle: {
    alignItems: 'center',
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
  },
  warmupTogglePressed: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  warmupToggleLabel: {
    color: theme.colors.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  warmupToggleChevron: {
    color: theme.colors.muted,
    fontSize: 10,
  },

  // Warmup expanded
  warmupSection: {
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
  },
  warmupGroup: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    paddingBottom: 4,
    paddingTop: theme.spacing.sm,
  },
  warmupGroupName: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    paddingBottom: 6,
    paddingHorizontal: theme.spacing.md,
    textTransform: 'uppercase',
  },
  warmupTableHead: {
    columnGap: 6,
    flexDirection: 'row',
    paddingBottom: 4,
    paddingHorizontal: theme.spacing.md,
  },
  warmupHeadCell: {
    color: '#444',
    flex: 1,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  warmupColLabel: {
    flex: 1.4,
    textAlign: 'left',
  },
  warmupColWeight: {
    flex: 1.2,
  },
  warmupRow: {
    alignItems: 'center',
    columnGap: 6,
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 7,
  },
  warmupWorkingRow: {
    backgroundColor: 'rgba(255,107,53,0.07)',
    borderTopColor: 'rgba(255,107,53,0.18)',
    borderTopWidth: 1,
  },
  warmupCell: {
    color: '#666',
    flex: 1,
    fontFamily: 'Courier',
    fontSize: 12,
    textAlign: 'center',
  },
  warmupWeightText: {
    color: theme.colors.text,
    fontWeight: '600',
  },
  warmupRestText: {
    fontFamily: 'System',
    fontSize: 11,
  },
  warmupAccentText: {
    color: theme.colors.accent,
    fontWeight: '700',
  },
})
