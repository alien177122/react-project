import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { ExerciseConfig, SavedExercise } from '../types'
import { calcWorkingWeight, volumeClass } from '../utils/calc'
import { mx, theme } from '../theme'
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
    const displayWeight =
      config.isPullup && result.bodyWeight != null
        ? totalWeight - result.bodyWeight
        : totalWeight

    return { week: index + 1, weight: displayWeight, scheme, totalReps }
  })

  return (
    <View style={styles.card}>
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
                isActive ? mx.accentDimBg : null,
                pressed ? mx.pressedOpacity : null,
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
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    ...mx.surface,
    padding: theme.spacing.md,
    rowGap: theme.spacing.md,
  },
  head: {
    rowGap: 6,
  },
  headName: {
    ...mx.textSubheadLg,
  },
  headValue: {
    ...mx.textData,
  },
  headMuted: {
    color: theme.colors.muted,
    fontWeight: '400',
  },
  table: {
    ...mx.tableContainer,
  },
  tableHead: {
    ...mx.tableHeadRow,
    paddingVertical: 10,
  },
  headCell: {
    ...mx.tableHeadCell,
  },
  weekCell: {
    flex: 0.7,
    textAlign: 'left',
  },
  row: {
    ...mx.tableDataRow,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  rowWeek: {
    ...mx.textData,
    flex: 0.7,
  },
  rowWeight: {
    ...mx.numericCellMd,
  },
  rowScheme: {
    ...mx.textData,
    flex: 1,
    fontWeight: '400',
    textAlign: 'center',
  },
  rowTotal: {
    ...mx.numericCellMd,
  },
})
