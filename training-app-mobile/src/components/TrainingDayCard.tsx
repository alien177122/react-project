import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../theme'
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
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardPreview: {
    opacity: 0.72,
  },
  head: {
    alignItems: 'center',
    backgroundColor: theme.colors.card,
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
})
