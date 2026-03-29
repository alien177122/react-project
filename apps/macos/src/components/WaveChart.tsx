import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {WeekScheme} from '@training/shared/types';
import {barColor} from '@training/shared/utils/calc';
import {colors, radius} from '../theme';

interface WaveChartProps {
  schemes: WeekScheme[];
  activeIndex?: number | null;
}

export default function WaveChart({
  schemes,
  activeIndex,
}: WaveChartProps): React.JSX.Element {
  const totals = schemes.map(s => s.sets * s.reps);
  const max = Math.max(...totals, 1);
  const hasActive = activeIndex !== null && activeIndex !== undefined;

  return (
    <View style={styles.wrap}>
      <View style={styles.bars}>
        {totals.map((total, index) => {
          const isActive = activeIndex === index;
          return (
            <View key={index} style={styles.barSlot}>
              <View
                style={[
                  styles.bar,
                  {
                    backgroundColor: barColor(total),
                    height: `${(total / max) * 100}%`,
                    opacity: hasActive ? (isActive ? 1 : 0.18) : 0.85,
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.labels}>
        {schemes.map((_, index) => (
          <Text
            key={index}
            style={[
              styles.label,
              activeIndex === index ? styles.labelActive : null,
            ]}>
            {index + 1}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  bars: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    height: 112,
    gap: 8,
  },
  barSlot: {flex: 1, height: '100%', justifyContent: 'flex-end'},
  bar: {borderRadius: 6, minHeight: 10, width: '100%'},
  labels: {flexDirection: 'row', gap: 8},
  label: {color: colors.muted, flex: 1, fontSize: 12, textAlign: 'center'},
  labelActive: {color: colors.text, fontWeight: '700'},
});
