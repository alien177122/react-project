import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {colors, radius, spacing, typography} from '../theme';

export type ScreenKey = 'calculator' | 'training' | 'theory' | 'files';

export interface SidebarItem {
  key: ScreenKey;
  icon: string;
  label: string;
  note: string;
}

interface SidebarProps {
  activeKey: ScreenKey;
  items: SidebarItem[];
  onSelect: (key: ScreenKey) => void;
}

export function Sidebar({
  activeKey,
  items,
  onSelect,
}: SidebarProps): React.JSX.Element {
  return (
    <View style={styles.sidebar}>
      <View style={styles.brand}>
        <Text style={styles.eyebrow}>Training Calculator</Text>
        <Text style={styles.title}>Навигация</Text>
        <Text style={styles.copy}>
          Быстрый доступ к расчётам, тренировочному циклу, теории и файловому
          анализу.
        </Text>
      </View>

      <View style={styles.nav}>
        {items.map(item => {
          const isActive = item.key === activeKey;

          return (
            <Pressable
              key={item.key}
              onPress={() => onSelect(item.key)}
              style={({pressed}) => [
                styles.item,
                isActive && styles.itemActive,
                pressed && styles.itemPressed,
              ]}>
              <Text style={styles.icon}>{item.icon}</Text>
              <View style={styles.meta}>
                <Text style={[styles.label, isActive && styles.labelActive]}>
                  {item.label}
                </Text>
                <Text style={styles.note}>{item.note}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 280,
    backgroundColor: colors.panelAlt,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
    gap: spacing.lg,
  },
  brand: {
    gap: spacing.sm,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: typography.eyebrow,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
  },
  copy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
  },
  nav: {
    gap: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
  },
  itemActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  itemPressed: {
    opacity: 0.9,
  },
  icon: {
    color: colors.text,
    fontSize: 24,
    width: 30,
    textAlign: 'center',
  },
  meta: {
    flex: 1,
    gap: 2,
  },
  label: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '700',
  },
  labelActive: {
    color: colors.accent,
  },
  note: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
});
