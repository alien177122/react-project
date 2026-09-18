import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Svg, {G, Path, Text as SvgText} from 'react-native-svg';
import {
  EXERCISES,
  SHORT_NAMES,
  TYPE_COLORS,
  TYPE_LABELS,
  WHEEL_ORDER,
} from '@training/shared/data/exercises';
import type {SavedExercise} from '@training/shared/types';
import {donutArc, pol} from '@training/shared/utils/geometry';
import {colors, radius, spacing} from '../theme';

interface ExerciseWheelProps {
  value: string;
  onChange: (key: string) => void;
  savedExercises?: SavedExercise[];
}

export default function ExerciseWheel({
  value,
  onChange,
  savedExercises = [],
}: ExerciseWheelProps): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const savedByKey = useMemo(
    () => new Map(savedExercises.map(s => [s.exerciseKey, s])),
    [savedExercises],
  );

  function pick(key: string) {
    onChange(key);
    setExpanded(false);
    setActiveKey(null);
  }

  const selectedKey = activeKey ?? value;

  const N = WHEEL_ORDER.length;
  const GAP = 1.5;
  const USABLE = 360 - GAP * N;
  const SD = USABLE / N;
  const cx = 190;
  const cy = 190;
  const RO = 165;
  const RI = 78;
  const RL = 122;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setExpanded(!expanded)}
        style={({pressed}) => [
          styles.trigger,
          pressed ? styles.pressed : null,
        ]}>
        <Text style={styles.triggerName}>{EXERCISES[value].name}</Text>
        <Text style={styles.triggerIcon}>{expanded ? '▲' : '◈'}</Text>
      </Pressable>

      {expanded ? (
        <View style={styles.wheelPanel}>
          <Text style={styles.wheelTitle}>Выбери упражнение</Text>
          <View style={styles.wheelRow}>
            <Svg width={380} height={380} viewBox="0 0 380 380">
              {WHEEL_ORDER.map((key, index) => {
                const exercise = EXERCISES[key];
                const start = index * (SD + GAP);
                const end = start + SD;
                const isActive = activeKey === key;
                const isSelected = value === key;
                const outerRadius = isActive ? RO + 5 : RO;
                const color = TYPE_COLORS[exercise.type];
                const midDeg = (start + end) / 2;
                const [tx, ty] = pol(cx, cy, RL, midDeg);
                const flip = midDeg > 90 && midDeg < 270;
                const rotation = flip ? midDeg + 180 : midDeg;
                const saved = savedByKey.get(key);

                return (
                  <G key={key}>
                    <Path
                      d={donutArc(cx, cy, outerRadius, RI, start, end)}
                      fill={color}
                      opacity={
                        activeKey && !isActive
                          ? 0.2
                          : isSelected
                            ? 0.95
                            : 0.72
                      }
                      onPress={() => pick(key)}
                      onPressIn={() => setActiveKey(key)}
                    />
                    <SvgText
                      alignmentBaseline="middle"
                      fill={isActive || isSelected ? '#ffffff' : '#d0d0cc'}
                      fontSize={isActive ? 12 : 11}
                      fontWeight={isActive || isSelected ? '700' : '500'}
                      textAnchor="middle"
                      transform={`rotate(${rotation} ${tx} ${ty})`}
                      x={tx}
                      y={ty}>
                      {SHORT_NAMES[key]}
                    </SvgText>
                    {saved ? (
                      <SvgText
                        alignmentBaseline="middle"
                        fill={color}
                        fontSize={9}
                        fontWeight="700"
                        opacity={0.9}
                        textAnchor="middle"
                        transform={`rotate(${rotation} ${pol(cx, cy, RO + 14, midDeg)[0]} ${pol(cx, cy, RO + 14, midDeg)[1]})`}
                        x={pol(cx, cy, RO + 14, midDeg)[0]}
                        y={pol(cx, cy, RO + 14, midDeg)[1]}>
                        {saved.oneRM}
                      </SvgText>
                    ) : null}
                  </G>
                );
              })}

              {selectedKey ? (
                <>
                  <SvgText
                    alignmentBaseline="middle"
                    fill="#ffffff"
                    fontSize={14}
                    fontWeight="700"
                    textAnchor="middle"
                    x={cx}
                    y={cy - 10}>
                    {EXERCISES[selectedKey].name}
                  </SvgText>
                  <SvgText
                    alignmentBaseline="middle"
                    fill={TYPE_COLORS[EXERCISES[selectedKey].type]}
                    fontSize={11}
                    textAnchor="middle"
                    x={cx}
                    y={cy + 10}>
                    {TYPE_LABELS[EXERCISES[selectedKey].type]}
                  </SvgText>
                </>
              ) : null}
            </Svg>

            <View style={styles.legendCol}>
              {Object.entries(TYPE_COLORS).map(([type, color]) => (
                <View key={type} style={styles.legendItem}>
                  <View style={[styles.legendDot, {backgroundColor: color}]} />
                  <Text style={styles.legendText}>{TYPE_LABELS[type]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {gap: spacing.sm},
  trigger: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 50,
    paddingHorizontal: 16,
  },
  pressed: {opacity: 0.85},
  triggerName: {color: colors.text, flex: 1, fontSize: 16, fontWeight: '700'},
  triggerIcon: {color: colors.accent, fontSize: 18},
  wheelPanel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  wheelTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  wheelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  legendCol: {gap: spacing.sm, minWidth: 180},
  legendItem: {flexDirection: 'row', alignItems: 'center', gap: 8},
  legendDot: {width: 10, height: 10, borderRadius: 5},
  legendText: {color: colors.muted, fontSize: 13},
});
