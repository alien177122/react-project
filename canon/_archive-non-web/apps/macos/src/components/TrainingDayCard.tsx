import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {TrainingDayDef, WeekScheme} from '@training/shared/types';
import {volumeClass} from '@training/shared/utils/calc';
import {colors, radius, spacing} from '../theme';

interface TrainingExerciseRow {
  key: string;
  name: string;
  weight: number;
  scheme: WeekScheme;
  totalReps: number;
  isPullup?: boolean;
  extraWeight?: number;
}

interface TrainingDayCardProps {
  dayDef: TrainingDayDef;
  weekIndex: number;
  exercises: TrainingExerciseRow[];
  isPreview?: boolean;
}

function volumeColor(totalReps: number) {
  const cls = volumeClass(totalReps);
  if (cls === 'v-hi') return colors.orange;
  if (cls === 'v-lo') return colors.red;
  return colors.text;
}

export default function TrainingDayCard({
  dayDef,
  weekIndex,
  exercises,
  isPreview = false,
}: TrainingDayCardProps): React.JSX.Element {
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

        {exercises.map(ex => (
          <View key={ex.key} style={styles.row}>
            <Text
              style={[styles.rowText, styles.exerciseCell, styles.exerciseName]}>
              {ex.name}
            </Text>
            <Text style={[styles.rowText, styles.numericCell]}>
              {ex.isPullup && ex.extraWeight != null
                ? ex.extraWeight >= 0
                  ? `+${ex.extraWeight.toFixed(1)}`
                  : ex.extraWeight.toFixed(1)
                : ex.weight.toFixed(1)}
            </Text>
            <Text style={[styles.rowText, styles.numericCell]}>
              {ex.scheme.sets} × {ex.scheme.reps}
            </Text>
            <Text
              style={[
                styles.rowText,
                styles.numericCell,
                {color: volumeColor(ex.totalReps)},
              ]}>
              {ex.totalReps}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardPreview: {opacity: 0.72},
  head: {
    alignItems: 'center',
    backgroundColor: colors.card,
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  day: {color: colors.accent, fontSize: 13, fontWeight: '700', width: 58},
  name: {color: colors.text, flex: 1, fontSize: 18, fontWeight: '800'},
  week: {color: colors.muted, fontSize: 12, fontWeight: '700'},
  table: {paddingBottom: 6},
  tableHead: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
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
  exerciseCell: {flex: 2.1, textAlign: 'left'},
  row: {
    alignItems: 'center',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  rowText: {color: colors.text, flex: 1, fontSize: 13},
  exerciseName: {fontWeight: '600'},
  numericCell: {fontFamily: 'Courier', textAlign: 'center'},
});
