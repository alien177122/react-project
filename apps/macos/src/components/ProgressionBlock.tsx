import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {ExerciseConfig, SavedExercise} from '@training/shared/types';
import {calcWorkingWeight, volumeClass} from '@training/shared/utils/calc';
import {colors, radius, spacing} from '../theme';
import WaveChart from './WaveChart';

interface ProgressionBlockProps {
  config: ExerciseConfig;
  result: SavedExercise;
}

function signedWeight(w: number) {
  return w >= 0 ? `+${w.toFixed(1)}` : w.toFixed(1);
}

function volumeColor(totalReps: number) {
  const cls = volumeClass(totalReps);
  if (cls === 'v-hi') return colors.orange;
  if (cls === 'v-lo') return colors.red;
  return colors.text;
}

export default function ProgressionBlock({
  config,
  result,
}: ProgressionBlockProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const weekRows = config.percentages.map((pct, i) => {
    const totalWeight = calcWorkingWeight(result.oneRM, pct, config);
    const scheme = config.weekSchemes[i];
    const totalReps = scheme.sets * scheme.reps;
    const displayWeight =
      config.isPullup && result.bodyWeight != null
        ? totalWeight - result.bodyWeight
        : totalWeight;
    return {week: i + 1, weight: displayWeight, scheme, totalReps};
  });

  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <Text style={styles.headName}>{config.name}</Text>
        <Text style={styles.headValue}>
          1ПМ = {result.oneRM} кг
          {config.isPullup && result.bodyWeight != null ? (
            <Text style={styles.headMuted}>
              {' '}
              · тело {result.bodyWeight} кг
            </Text>
          ) : null}
        </Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHead}>
          <Text style={[styles.headCell, styles.weekCell]}>Нед</Text>
          <Text style={styles.headCell}>
            {config.isPullup ? '+кг к телу' : 'Вес'}
          </Text>
          <Text style={styles.headCell}>Схема</Text>
          <Text style={styles.headCell}>Повт</Text>
        </View>

        {weekRows.map((row, i) => {
          const isActive = activeIndex === i;
          return (
            <Pressable
              key={row.week}
              onPress={() => setActiveIndex(isActive ? null : i)}
              style={({pressed}) => [
                styles.row,
                isActive ? styles.rowActive : null,
                pressed ? styles.rowPressed : null,
              ]}>
              <Text style={[styles.weekCell, styles.rowWeek]}>{row.week}</Text>
              <Text style={styles.rowWeight}>
                {config.isPullup
                  ? signedWeight(row.weight)
                  : row.weight.toFixed(1)}
              </Text>
              <Text style={styles.rowScheme}>
                {row.scheme.sets} × {row.scheme.reps}
              </Text>
              <Text
                style={[styles.rowTotal, {color: volumeColor(row.totalReps)}]}>
                {row.totalReps}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <WaveChart schemes={config.weekSchemes} activeIndex={activeIndex} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  head: {gap: 6},
  headName: {color: colors.text, fontSize: 20, fontWeight: '800'},
  headValue: {color: colors.text, fontSize: 14, fontWeight: '700'},
  headMuted: {color: colors.muted, fontWeight: '400'},
  table: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  tableHead: {
    backgroundColor: colors.card,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  headCell: {
    color: colors.muted,
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  weekCell: {flex: 0.7, textAlign: 'left'},
  row: {
    alignItems: 'center',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  rowActive: {backgroundColor: colors.accentDim},
  rowPressed: {opacity: 0.85},
  rowWeek: {color: colors.text, fontSize: 14, fontWeight: '700'},
  rowWeight: {
    color: colors.text,
    flex: 1,
    fontFamily: 'Courier',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  rowScheme: {
    color: colors.text,
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
});
