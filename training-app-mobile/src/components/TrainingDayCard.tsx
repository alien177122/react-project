import { StyleSheet, Text, View } from 'react-native'
import { mx, theme } from '../theme'
import type { TrainingDayDef, WeekScheme } from '../types'
import { volumeClass } from '../utils/calc'

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
  return (
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

        {exercises.map((exercise) => (
          <View key={exercise.key} style={styles.row}>
            <Text style={[styles.rowText, styles.exerciseCell, styles.exerciseName]}>
              {exercise.name}
            </Text>
            <Text style={[styles.numericCell, styles.rowText]}>
              {exercise.isPullup && exercise.extraWeight != null
                ? exercise.extraWeight >= 0
                  ? `+${exercise.extraWeight.toFixed(1)}`
                  : exercise.extraWeight.toFixed(1)
                : exercise.weight.toFixed(1)}
            </Text>
            <Text style={[styles.numericCell, styles.rowText]}>
              {exercise.scheme.sets} × {exercise.scheme.reps}
            </Text>
            <Text
              style={[styles.numericCell, styles.rowText, { color: volumeColor(exercise.totalReps) }]}
            >
              {exercise.totalReps}
            </Text>
          </View>
        ))}
      </View>
    </View>
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
})
