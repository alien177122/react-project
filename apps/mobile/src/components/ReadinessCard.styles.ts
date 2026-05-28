import { StyleSheet } from 'react-native';

import { theme } from '@/theme/Theme';

export const styles = StyleSheet.create({
  card: {
    ...theme.shadows.card,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    minHeight: theme.spacing.xxl * 2,
    padding: theme.spacing.md,
  },
  content: { gap: theme.spacing.sm },
  disabled: { backgroundColor: theme.colors.bgSecondary },
  focused: { borderColor: theme.colors.accent, borderWidth: 2 },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hovered: { backgroundColor: theme.colors.surfaceRaised },
  label: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.family.body,
    fontSize: theme.fonts.size.sm,
    fontWeight: theme.fonts.weight.medium,
    letterSpacing: theme.fonts.letterSpacing.none,
    lineHeight: theme.fonts.lineHeight.sm,
  },
  meta: {
    color: theme.colors.textMuted,
    fontSize: theme.fonts.size.xs,
    fontWeight: theme.fonts.weight.regular,
    lineHeight: theme.fonts.lineHeight.xs,
  },
  pressed: { opacity: 0.86, transform: [{ scale: 0.98 }] },
  selected: { borderColor: theme.colors.accent },
  skeletonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonLabel: {
    backgroundColor: theme.colors.overlay,
    borderRadius: theme.radii.sm,
    height: theme.spacing.md,
    width: theme.spacing.xxl,
  },
  skeletonMeta: {
    backgroundColor: theme.colors.overlay,
    borderRadius: theme.radii.sm,
    height: theme.spacing.md,
    width: theme.spacing.xxl * 3,
  },
  skeletonPill: {
    backgroundColor: theme.colors.overlay,
    borderRadius: theme.radii.sm,
    height: theme.spacing.md,
    width: theme.spacing.xl,
  },
  skeletonValue: {
    backgroundColor: theme.colors.overlay,
    borderRadius: theme.radii.sm,
    height: theme.spacing.xl,
    width: theme.spacing.xxl * 2,
  },
  statusPill: {
    backgroundColor: theme.colors.overlay,
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xxs,
  },
  statusText: {
    color: theme.colors.textAccent,
    fontSize: theme.fonts.size.xs,
    fontWeight: theme.fonts.weight.semibold,
    lineHeight: theme.fonts.lineHeight.xs,
  },
  value: {
    color: theme.colors.textPrimary,
    fontSize: theme.fonts.size.xl,
    fontWeight: theme.fonts.weight.semibold,
    lineHeight: theme.fonts.lineHeight.xl,
  },
});
