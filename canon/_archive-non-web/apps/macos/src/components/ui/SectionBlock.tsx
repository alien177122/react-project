import type {PropsWithChildren} from 'react';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, spacing} from '../../theme';

interface SectionBlockProps extends PropsWithChildren {
  num: string;
  title: string;
}

export function SectionBlock({
  num,
  title,
  children,
}: SectionBlockProps): React.JSX.Element {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.num}>{num}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {gap: spacing.md},
  header: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },
  num: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
  },
  title: {
    color: colors.text,
    flex: 1,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32,
  },
  body: {gap: spacing.md},
});
