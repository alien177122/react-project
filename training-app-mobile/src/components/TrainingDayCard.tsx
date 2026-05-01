import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { mx, theme } from '../theme'
import type { TrainingDayDef, WeekScheme } from '../types'
import { volumeClass } from '../utils/calc'
import { PlateBreakdownSheet } from './PlateBreakdownSheet'

interface TrainingExerciseRow {
  key: string
  name: string
  weight: number
  scheme: WeekScheme
  totalReps: number
  isPullup?: boolean
  extraWeight?: number
}

interface TrainingDayCardProps {
  dayDef: TrainingDayDef
  weekIndex: number
  exercises: TrainingExerciseRow[]
  isPreview?: boolean
}

interface BreakdownTarget {
  weight: number
  name: string
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
  const [breakdown, setBreakdown] = useState<BreakdownTarget | null>(null)

  return (
    <>
      <View style={[styles.card, isPreview ? styles.cardPreview : null]}>
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

          {exercises.map((exercise) => {
            const isPullupRow = Boolean(exercise.isPullup && exercise.extraWeight != null)
            const weightLabel = isPullupRow
              ? exercise.extraWeight! >= 0
                ? `+${exercise.extraWeight!.toFixed(1)}`
                : exercise.extraWeight!.toFixed(1)
              : exercise.weight.toFixed(1)
            // Bodyweight pulls aren't a barbell — plate breakdown is meaningless.
            const isInteractive = !isPreview && !isPullupRow && exercise.weight > 0

            return (
              <View key={exercise.key} style={styles.row}>
                <Text style={[styles.rowText, styles.exerciseCell, styles.exerciseName]}>
                  {exercise.name}
                </Text>
                <View style={styles.cellWrap}>
                  {isInteractive ? (
                    <Pressable
                      accessibilityHint="Открыть разбор штанги по блинам"
                      accessibilityLabel={`Разбор ${exercise.name}: ${weightLabel} килограмм`}
                      accessibilityRole="button"
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      onPress={() => setBreakdown({ weight: exercise.weight, name: exercise.name })}
                      style={({ pressed }) => [styles.weightBtn, pressed ? styles.weightBtnPressed : null]}
                    >
                      <Text style={styles.weightValue}>{weightLabel}</Text>
                      <Text style={styles.weightHint}>РАЗБОР</Text>
                    </Pressable>
                  ) : (
                    <Text style={styles.weightValue}>{weightLabel}</Text>
                  )}
                </View>
                <Text style={[styles.numericCell, styles.rowText]}>
                  {exercise.scheme.sets} × {exercise.scheme.reps}
                </Text>
                <Text
                  style={[
                    styles.numericCell,
                    styles.rowText,
                    { color: volumeColor(exercise.totalReps) },
                  ]}
                >
                  {exercise.totalReps}
                </Text>
              </View>
            )
          })}
        </View>
      </View>

      <PlateBreakdownSheet
        exerciseName={breakdown?.name ?? ''}
        onClose={() => setBreakdown(null)}
        visible={breakdown !== null}
        weight={breakdown?.weight ?? 0}
      />
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    ...mx.surfaceClipped,
  },
  cardPreview: {
    opacity: 0.72,
  },
  head: {
    ...mx.tableHeadRow,
    paddingVertical: theme.spacing.md,
  },
  day: {
    ...mx.textSmall,
    color: theme.colors.accent,
    fontWeight: '700',
    width: 58,
  },
  name: {
    ...mx.textSubhead,
    flex: 1,
    fontWeight: '800',
  },
  week: {
    ...mx.textCaption,
    color: theme.colors.muted,
    textTransform: 'none',
    letterSpacing: 0,
  },
  table: {
    paddingBottom: 6,
  },
  tableHead: {
    ...mx.tableHeadRow,
    paddingTop: theme.spacing.md,
  },
  headCell: {
    ...mx.tableHeadCell,
  },
  exerciseCell: {
    flex: 2.1,
    textAlign: 'left',
  },
  row: {
    ...mx.tableDataRow,
  },
  rowText: {
    ...mx.textSmall,
    flex: 1,
  },
  exerciseName: {
    fontWeight: '600',
  },
  numericCell: {
    ...mx.numericCell,
  },
  cellWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  weightBtn: {
    alignItems: 'center',
    rowGap: 2,
  },
  weightBtnPressed: {
    opacity: 0.55,
  },
  weightValue: {
    color: theme.colors.text,
    fontVariant: ['tabular-nums'],
    fontWeight: '700',
    textAlign: 'center',
  },
  weightHint: {
    color: theme.colors.accent,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
})
