import { memo } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

import { useReadinessCardLogic } from '@/hooks/useReadinessCardLogic';
import { theme } from '@/theme/Theme';
import type { ReadinessFocus, ReadinessMetric } from '@/types/readiness';

import { styles } from './ReadinessCard.styles';

type LoadingCardProps = {
  label: string;
  state: 'loading';
};

type ReadyCardProps = {
  disabled?: boolean;
  loading?: boolean;
  metric: ReadinessMetric;
  onPress: (id: ReadinessFocus) => void;
  selected: boolean;
  state: 'ready';
};

export type ReadinessCardProps = LoadingCardProps | ReadyCardProps;

function formatMetricValue(metric: ReadinessMetric): string {
  switch (metric.kind) {
    case 'sleep':
      return `${Math.floor(metric.minutes / 60)}ч ${metric.minutes % 60}м`;
    case 'load':
      return `${metric.value} ${metric.unit}`;
    case 'mobility':
      return `${metric.value}${metric.unit}`;
  }
}

function formatMetricMeta(metric: ReadinessMetric): string {
  switch (metric.kind) {
    case 'sleep':
      return `${metric.qualityLabel} · цель ${Math.floor(metric.targetMinutes / 60)}ч`;
    case 'load':
      return `${metric.deltaPercent > 0 ? '+' : ''}${metric.deltaPercent}% к неделе`;
    case 'mobility':
      return `${metric.value} из ${metric.max}`;
  }
}

export const ReadinessCard = memo(function ReadinessCard(props: ReadinessCardProps) {
  const isReady = props.state === 'ready';
  const loading = props.state === 'loading' || (isReady && props.loading === true);
  const disabled = props.state === 'loading' || (isReady && props.disabled === true);
  const selected = isReady ? props.selected : false;
  const logic = useReadinessCardLogic({ disabled, loading, selected });

  return (
    <Animated.View style={logic.animatedStyle}>
      <Pressable
        accessibilityLabel={
          isReady
            ? `${props.metric.label}: ${formatMetricValue(props.metric)}. ${props.metric.helper}`
            : `${props.label}: данные загружаются`
        }
        accessibilityRole="button"
        accessibilityState={{ busy: loading, disabled, selected }}
        disabled={disabled}
        hitSlop={theme.hitSlop.control}
        onPress={isReady ? () => props.onPress(props.metric.id) : undefined}
        {...logic.handlers}
        style={({ pressed }) => [
          styles.card,
          selected && styles.selected,
          logic.hovered && !disabled && styles.hovered,
          logic.focused && !disabled && styles.focused,
          pressed && !disabled && styles.pressed,
          disabled && styles.disabled,
        ]}
      >
        {isReady ? (
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.label}>{props.metric.label}</Text>
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>{props.metric.status}</Text>
              </View>
            </View>
            <Text style={styles.value}>{formatMetricValue(props.metric)}</Text>
            <Text style={styles.meta}>{formatMetricMeta(props.metric)}</Text>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.skeletonHeader}>
              <View style={styles.skeletonLabel} />
              <View style={styles.skeletonPill} />
            </View>
            <View style={styles.skeletonValue} />
            <View style={styles.skeletonMeta} />
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
});
