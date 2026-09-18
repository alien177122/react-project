import type {PropsWithChildren} from 'react';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {colors, spacing, typography} from '../theme';

interface ScreenLayoutProps extends PropsWithChildren {
  label?: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  description?: string;
}

export function ScreenLayout({
  label,
  title,
  subtitle,
  eyebrow,
  description,
  children,
}: ScreenLayoutProps): React.JSX.Element {
  const heroLabel = label ?? eyebrow ?? '';
  const heroSubtitle = subtitle ?? description ?? '';

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.label}>{heroLabel}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{heroSubtitle}</Text>
      </View>
      <View style={styles.body}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  hero: {
    borderLeftColor: colors.accent,
    borderLeftWidth: 3,
    maxWidth: 900,
    paddingLeft: spacing.md,
  },
  label: {
    color: colors.orange,
    fontSize: typography.eyebrow,
    letterSpacing: 2,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: typography.hero,
    fontWeight: '800',
    lineHeight: 38,
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 22,
    marginTop: spacing.md,
    maxWidth: 760,
  },
  body: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
});
