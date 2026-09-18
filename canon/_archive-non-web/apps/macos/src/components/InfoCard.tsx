import type {PropsWithChildren} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, radius, spacing} from '../theme';

interface InfoCardProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  accentColor?: string;
}

export function InfoCard({
  title,
  subtitle,
  accentColor,
  children,
}: InfoCardProps): React.JSX.Element {
  return (
    <View
      style={[
        styles.card,
        accentColor ? {borderLeftColor: accentColor} : null,
      ]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderLeftColor: 'transparent',
    borderLeftWidth: 3,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
  },
  title: {color: colors.text, fontSize: 18, fontWeight: '700'},
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
  body: {marginTop: spacing.md},
});
