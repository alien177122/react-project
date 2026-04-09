import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { ExerciseConfig, SavedExercise } from '../types'
import { calcWorkingWeight, volumeClass } from '../utils/calc'
import { theme } from '../theme'
import { GlossyCard } from './ui/GlossyCard'
import WaveChart from './WaveChart'

interface ProgressionBlockProps {
  config: ExerciseConfig
  result: SavedExercise
}

function signedWeight(weight: number) {
  return weight >= 0 ? `+${weight.toFixed(1)}` : weight.toFixed(1)
}

function volumeColor(totalReps: number) {
  const cls = volumeClass(totalReps)
  if (cls === 'v-hi') return theme.colors.orange
  if (cls === 'v-lo') return theme.colors.red
  return theme.colors.text
}

export default function ProgressionBlock({ config, result }: ProgressionBlockProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const weekRows = config.percentages.map((pct, index) => {
    const totalWeight = calcWorkingWeight(result.oneRM, pct, config)
    const scheme = config.weekSchemes[index]
    const totalReps = scheme.sets * scheme.reps
    const displayWeight = config.isPullup && result.bodyWeight != null
      ? totalWeight - result.bodyWeight
      : totalWeight

    return {
      week: index + 1,
      weight: displayWeight,
      scheme,
      totalReps,
    }
  })

  return (
    <GlossyCard contentStyle={styles.card}>
      <View style={styles.head}>
        <Text style={styles.headName}>{config.name}</Text>
        <Text style={styles.headValue}>
          1ПМ = {result.oneRM} кг
          {config.isPullup && result.bodyWeight != null ? (
            <Text style={styles.headMuted}> · тело {result.bodyWeight} кг</Text>
          ) : null}
        </Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHead}>
          <Text style={[styles.headCell, styles.weekCell]}>Нед</Text>
          <Text style={styles.headCell}>{config.isPullup ? '+кг к телу' : 'Вес'}</Text>
          <Text style={styles.headCell}>Схема</Text>
          <Text style={styles.headCell}>Повт</Text>
        </View>

        {weekRows.map((row, index) => {
          const isActive = activeIndex === index
          return (
            <Pressable
              key={row.week}
              onPress={() => setActiveIndex(isActive ? null : index)}
              style={({ pressed }) => [
                styles.row,
                isActive ? styles.rowActive : null,
                pressed ? styles.rowPressed : null,
              ]}
            >
              <Text style={[styles.weekCell, styles.rowWeek]}>{row.week}</Text>
              <Text style={styles.rowWeight}>
                {config.isPullup ? signedWeight(row.weight) : row.weight.toFixed(1)}
              </Text>
              <Text style={styles.rowScheme}>
                {row.scheme.sets} × {row.scheme.reps}
              </Text>
              <Text style={[styles.rowTotal, { color: volumeColor(row.totalReps) }]}>
                {row.totalReps}
              </Text>
            </Pressable>
          )
        })}
      </View>

      <WaveChart schemes={config.weekSchemes} activeIndex={activeIndex} />
    </GlossyCard>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.md,
    rowGap: theme.spacing.md,
  },
  head: {
    rowGap: 6,
  },
  headName: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  headValue: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  headMuted: {
    color: theme.colors.muted,
    fontWeight: '400',
  },
  table: {
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tableHead: {
    backgroundColor: theme.colors.card,
    columnGap: 10,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
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
  weekCell: {
    flex: 0.7,
    textAlign: 'left',
  },
  row: {
    alignItems: 'center',
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    columnGap: 10,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  rowActive: {
    backgroundColor: theme.colors.accentDim,
  },
  rowPressed: {
    opacity: 0.85,
  },
  rowWeek: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  rowWeight: {
    color: theme.colors.text,
    flex: 1,
    fontFamily: 'Courier',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  rowScheme: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  rowTotal: {
    flex: 1,
    fontFamily: 'Courier',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
})
