/**
 * Style mixins — reusable ViewStyle/TextStyle fragments.
 *
 * Usage:
 *   import { mx } from '../theme'
 *
 *   const styles = StyleSheet.create({
 *     card: { ...mx.card, padding: theme.spacing.md },
 *     row:  { ...mx.row, justifyContent: 'space-between' },
 *   })
 *
 * Rule: mixins are plain objects, NOT StyleSheet.create() results.
 * They are spread at call-site — the surrounding StyleSheet.create()
 * handles the platform optimisation pass.
 */

import type { TextStyle, ViewStyle } from 'react-native'
import { theme } from './tokens'

// ─── Layout ──────────────────────────────────────────────────────────────────

export const row: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
}

export const rowBetween: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
}

export const rowStart: ViewStyle = {
  alignItems: 'flex-start',
  flexDirection: 'row',
}

export const rowEnd: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'flex-end',
}

export const col: ViewStyle = {
  flexDirection: 'column',
}

export const fill: ViewStyle = {
  flex: 1,
}

export const center: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
}

// ─── Surfaces ─────────────────────────────────────────────────────────────────

/** Slightly elevated surface — default for interactive cards */
export const card: ViewStyle = {
  backgroundColor: theme.colors.card,
  borderColor: theme.colors.border,
  borderRadius: theme.radius.lg,
  borderWidth: 1,
}

/** Deeper surface — for data panels, progression blocks */
export const surface: ViewStyle = {
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.border,
  borderRadius: theme.radius.lg,
  borderWidth: 1,
}

/** Surface with overflow:hidden — for tables inside cards */
export const surfaceClipped: ViewStyle = {
  backgroundColor: theme.colors.surface,
  borderColor: theme.colors.border,
  borderRadius: theme.radius.lg,
  borderWidth: 1,
  overflow: 'hidden',
}

/** Inner table container (nested inside a card) */
export const tableContainer: ViewStyle = {
  borderColor: theme.colors.border,
  borderRadius: theme.radius.md,
  borderWidth: 1,
  overflow: 'hidden',
}

/** Left accent stripe — used on hero blocks and info cards */
export const accentBorderLeft: ViewStyle = {
  borderLeftColor: theme.colors.accent,
  borderLeftWidth: 3,
}

export const accentDimBg: ViewStyle = {
  backgroundColor: theme.colors.accentDim,
}

// ─── Table rows ───────────────────────────────────────────────────────────────

export const tableHeadRow: ViewStyle = {
  alignItems: 'center',
  backgroundColor: theme.colors.card,
  columnGap: 8,
  flexDirection: 'row',
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.sm,
}

export const tableDataRow: ViewStyle = {
  alignItems: 'center',
  borderTopColor: theme.colors.border,
  borderTopWidth: 1,
  columnGap: 8,
  flexDirection: 'row',
  paddingHorizontal: theme.spacing.md,
  paddingVertical: 12,
}

// ─── Text scale ───────────────────────────────────────────────────────────────

/** 11px — column headers, table labels */
export const textCaption: TextStyle = {
  color: theme.colors.muted,
  fontSize: 11,
  fontWeight: '700',
  letterSpacing: 1,
  textTransform: 'uppercase',
}

/** 12px — eyebrow / screen labels */
export const textEyebrow: TextStyle = {
  color: theme.colors.muted,
  fontSize: theme.typography.eyebrow,
  fontWeight: '700',
  letterSpacing: 2,
  textTransform: 'uppercase',
}

/** 13px — secondary body, table rows */
export const textSmall: TextStyle = {
  color: theme.colors.text,
  fontSize: 13,
}

/** 14px — data values, medium body */
export const textData: TextStyle = {
  color: theme.colors.text,
  fontSize: 14,
  fontWeight: '700',
}

/** 16px — standard body copy */
export const textBody: TextStyle = {
  color: theme.colors.text,
  fontSize: theme.typography.body,
  lineHeight: 22,
}

export const textBodyMuted: TextStyle = {
  color: theme.colors.muted,
  fontSize: theme.typography.body,
  lineHeight: 22,
}

/** 18px — card title */
export const textSubhead: TextStyle = {
  color: theme.colors.text,
  fontSize: 18,
  fontWeight: '700',
}

/** 20px — larger card title */
export const textSubheadLg: TextStyle = {
  color: theme.colors.text,
  fontSize: 20,
  fontWeight: '800',
}

/** 24px — section title */
export const textTitle: TextStyle = {
  color: theme.colors.text,
  fontSize: theme.typography.title,
  fontWeight: '800',
  lineHeight: 28,
}

/** 28px — hero secondary */
export const textTitleLg: TextStyle = {
  color: theme.colors.text,
  fontSize: 28,
  fontWeight: '800',
  lineHeight: 32,
}

/** 34px — hero primary */
export const textHero: TextStyle = {
  color: theme.colors.text,
  fontSize: theme.typography.hero,
  fontWeight: '800',
  lineHeight: 38,
}

// ─── Specialised text ─────────────────────────────────────────────────────────

/** Table column header cell */
export const tableHeadCell: TextStyle = {
  color: theme.colors.muted,
  flex: 1,
  fontSize: 11,
  fontWeight: '700',
  letterSpacing: 1,
  textAlign: 'center',
  textTransform: 'uppercase',
}

/** Numeric data cell — monospace, centred */
export const numericCell: TextStyle = {
  color: theme.colors.text,
  flex: 1,
  fontFamily: 'Courier',
  fontSize: 13,
  textAlign: 'center',
}

export const numericCellMd: TextStyle = {
  color: theme.colors.text,
  flex: 1,
  fontFamily: 'Courier',
  fontSize: 14,
  fontWeight: '700',
  textAlign: 'center',
}

// ─── Interactive states ───────────────────────────────────────────────────────

export const pressedOpacity: ViewStyle = { opacity: 0.84 }
export const disabledOpacity: ViewStyle = { opacity: 0.55 }

// ─── Named namespace export ───────────────────────────────────────────────────
// Import as: import { mx } from '../theme'

export const mx = {
  // layout
  row,
  rowBetween,
  rowStart,
  rowEnd,
  col,
  fill,
  center,
  // surfaces
  card,
  surface,
  surfaceClipped,
  tableContainer,
  accentBorderLeft,
  accentDimBg,
  // table rows
  tableHeadRow,
  tableDataRow,
  // text scale
  textCaption,
  textEyebrow,
  textSmall,
  textData,
  textBody,
  textBodyMuted,
  textSubhead,
  textSubheadLg,
  textTitle,
  textTitleLg,
  textHero,
  // specialised text
  tableHeadCell,
  numericCell,
  numericCellMd,
  // interactive
  pressedOpacity,
  disabledOpacity,
}
