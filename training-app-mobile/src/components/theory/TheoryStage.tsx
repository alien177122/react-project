import type { ReactNode } from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import type { TheoryStageKeyDownHandler } from '../../hooks/useTheoryNavigation'
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg'
import { GlossyCard } from '../ui/GlossyCard'
import { theoryPalette } from '../../theme/theory'
import { theme } from '../../theme'

export type TheoryStageIcon =
  | 'target'
  | 'arrow-up'
  | 'wave'
  | 'split'
  | 'weight'
  | 'pullup'
  | 'volume'
  | 'formula'
  | 'rpe'

interface TheoryStageProps {
  active: boolean
  children?: ReactNode
  compact?: boolean
  focused?: boolean
  icon: TheoryStageIcon
  index: number
  isLast: boolean
  onFocus: () => void
  onKeyDown?: TheoryStageKeyDownHandler
  onPress: () => void
  passed: boolean
  preview: string
  summary: string
  title: string
}

function TheoryGlyph({ color, name }: { color: string; name: TheoryStageIcon }) {
  if (name === 'target') {
    return (
      <Svg height={18} viewBox="0 0 18 18" width={18}>
        <Circle cx={9} cy={9} fill="none" r={6.25} stroke={color} strokeWidth={1.5} />
        <Circle cx={9} cy={9} fill="none" r={2.5} stroke={color} strokeWidth={1.5} />
        <Path d="M13.5 4.5L9 9" fill="none" stroke={color} strokeLinecap="round" strokeWidth={1.5} />
      </Svg>
    )
  }

  if (name === 'arrow-up') {
    return (
      <Svg height={18} viewBox="0 0 18 18" width={18}>
        <Path d="M4.5 12.5L8 9L10.5 11.5L14 6.5" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        <Path d="M11.5 6.5H14V9" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      </Svg>
    )
  }

  if (name === 'wave') {
    return (
      <Svg height={18} viewBox="0 0 18 18" width={18}>
        <Path d="M2.5 10.5C4 10.5 4.75 6.5 6.25 6.5S8.5 12.5 10 12.5S11.5 5.5 13 5.5S14.5 10.5 15.5 10.5" fill="none" stroke={color} strokeLinecap="round" strokeWidth={1.5} />
      </Svg>
    )
  }

  if (name === 'split') {
    return (
      <Svg height={18} viewBox="0 0 18 18" width={18}>
        <Rect fill="none" height={4} rx={1} stroke={color} strokeWidth={1.5} width={4.5} x={2.5} y={3} />
        <Rect fill="none" height={4} rx={1} stroke={color} strokeWidth={1.5} width={4.5} x={11} y={3} />
        <Rect fill="none" height={4} rx={1} stroke={color} strokeWidth={1.5} width={13} x={2.5} y={11} />
      </Svg>
    )
  }

  if (name === 'weight') {
    return (
      <Svg height={18} viewBox="0 0 18 18" width={18}>
        <Line stroke={color} strokeLinecap="round" strokeWidth={1.5} x1={4} x2={14} y1={9} y2={9} />
        <Line stroke={color} strokeLinecap="round" strokeWidth={1.5} x1={5.5} x2={5.5} y1={6} y2={12} />
        <Line stroke={color} strokeLinecap="round" strokeWidth={1.5} x1={7.5} x2={7.5} y1={5} y2={13} />
        <Line stroke={color} strokeLinecap="round" strokeWidth={1.5} x1={10.5} x2={10.5} y1={5} y2={13} />
        <Line stroke={color} strokeLinecap="round" strokeWidth={1.5} x1={12.5} x2={12.5} y1={6} y2={12} />
      </Svg>
    )
  }

  if (name === 'pullup') {
    return (
      <Svg height={18} viewBox="0 0 18 18" width={18}>
        <Line stroke={color} strokeLinecap="round" strokeWidth={1.5} x1={3} x2={15} y1={4.5} y2={4.5} />
        <Path d="M6 4.5V8.5C6 10 7.2 11.2 8.7 11.2H9.3C10.8 11.2 12 10 12 8.5V4.5" fill="none" stroke={color} strokeLinecap="round" strokeWidth={1.5} />
        <Line stroke={color} strokeLinecap="round" strokeWidth={1.5} x1={7.25} x2={7.25} y1={11.2} y2={14.5} />
        <Line stroke={color} strokeLinecap="round" strokeWidth={1.5} x1={10.75} x2={10.75} y1={11.2} y2={14.5} />
      </Svg>
    )
  }

  if (name === 'volume') {
    return (
      <Svg height={18} viewBox="0 0 18 18" width={18}>
        <Rect fill="none" height={9} rx={1} stroke={color} strokeWidth={1.5} width={2.75} x={3} y={6} />
        <Rect fill="none" height={6} rx={1} stroke={color} strokeWidth={1.5} width={2.75} x={7.6} y={9} />
        <Rect fill="none" height={12} rx={1} stroke={color} strokeWidth={1.5} width={2.75} x={12.2} y={3} />
      </Svg>
    )
  }

  if (name === 'formula') {
    return (
      <Svg height={18} viewBox="0 0 18 18" width={18}>
        <Path d="M4 5H14" fill="none" stroke={color} strokeLinecap="round" strokeWidth={1.5} />
        <Path d="M4 9H10.5" fill="none" stroke={color} strokeLinecap="round" strokeWidth={1.5} />
        <Path d="M4 13H14" fill="none" stroke={color} strokeLinecap="round" strokeWidth={1.5} />
        <Path d="M12 7L14 9L12 11" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      </Svg>
    )
  }

  return (
    <Svg height={18} viewBox="0 0 18 18" width={18}>
      <Path d="M4.5 10.5C4.5 7.6 6.8 5.3 9.7 5.3C11.6 5.3 13.3 6.3 14.2 7.8" fill="none" stroke={color} strokeLinecap="round" strokeWidth={1.5} />
      <Path d="M9 9L11.8 7.2" fill="none" stroke={color} strokeLinecap="round" strokeWidth={1.5} />
      <Circle cx={9} cy={9} fill="none" r={5.75} stroke={color} strokeWidth={1.5} />
    </Svg>
  )
}

export function TheoryStage({
  active,
  children,
  compact = false,
  focused = false,
  icon,
  index,
  isLast,
  onFocus,
  onKeyDown,
  onPress,
  passed,
  preview,
  summary,
  title,
}: TheoryStageProps) {
  const keyboardProps: Record<string, unknown> = Platform.OS === 'web' && onKeyDown
    ? { onKeyDown }
    : {}
  const lineColor = passed
    ? theoryPalette.linePassed
    : active
      ? theoryPalette.lineActive
      : theoryPalette.lineDefault
  const markerBorderColor = passed
    ? theoryPalette.connectorDotPassed
    : active
      ? theoryPalette.connectorDot
      : theoryPalette.border
  const markerBackgroundColor = passed
    ? theoryPalette.successTint
    : active
      ? theoryPalette.accentGlow
      : 'rgba(11, 15, 26, 0.9)'
  const iconColor = passed
    ? theoryPalette.connectorDotPassed
    : active
      ? theoryPalette.accent
      : theoryPalette.icon

  return (
    <View style={[styles.row, compact && styles.rowCompact]}>
      <View style={[styles.rail, compact && styles.railCompact]}>
        <View
          style={[
            styles.marker,
            {
              backgroundColor: markerBackgroundColor,
              borderColor: markerBorderColor,
            },
          ]}
        >
          {passed ? (
            <Svg height={16} viewBox="0 0 16 16" width={16}>
              <Path d="M3.5 8.2L6.6 11.3L12.5 5.4" fill="none" stroke={theoryPalette.connectorDotPassed} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} />
            </Svg>
          ) : (
            <Text style={[styles.markerText, active && styles.markerTextActive]}>{index + 1}</Text>
          )}
        </View>
        {!isLast ? <View style={[styles.line, { backgroundColor: lineColor }]} /> : null}
      </View>

      <View style={styles.content}>
        <View style={[styles.cardShell, focused && styles.cardShellFocused]}>
          <GlossyCard
            style={[
              active ? styles.cardActive : null,
              passed ? styles.cardPassed : null,
            ]}
            variant={passed ? 'success' : 'default'}
            contentStyle={styles.card}
          >
            <Pressable
              accessibilityHint="Разворачивает подробности этапа"
              accessibilityLabel={`${index + 1}. ${title}`}
              accessibilityRole="button"
              accessibilityState={{ expanded: active, selected: active }}
              onFocus={onFocus}
              onPress={onPress}
              style={({ pressed }) => [styles.headerPressable, pressed ? styles.headerPressed : null]}
              {...keyboardProps}
            >
              <View style={styles.header}>
                <View style={[styles.iconBadge, active && styles.iconBadgeActive]}>
                  <TheoryGlyph color={iconColor} name={icon} />
                </View>

                <View style={styles.copy}>
                  <Text style={styles.kicker}>Этап {String(index + 1).padStart(2, '0')}</Text>
                  <Text style={styles.title}>{title}</Text>
                  <Text numberOfLines={active ? undefined : 2} style={styles.preview}>
                    {preview}
                  </Text>
                </View>

                <Text style={[styles.chevron, active && styles.chevronActive]}>
                  {active ? '−' : '+'}
                </Text>
              </View>
            </Pressable>

            {active ? (
              <View style={styles.body}>
                <Text style={styles.summary}>{summary}</Text>
                {children}
              </View>
            ) : null}
          </GlossyCard>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'stretch',
    columnGap: theme.spacing.md,
    flexDirection: 'row',
  },
  rowCompact: {
    columnGap: theme.spacing.sm,
  },
  rail: {
    alignItems: 'center',
    width: 52,
  },
  railCompact: {
    width: 36,
  },
  marker: {
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1.5,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  markerText: {
    color: theoryPalette.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  markerTextActive: {
    color: theoryPalette.textPrimary,
  },
  line: {
    borderRadius: 999,
    flex: 1,
    marginTop: 8,
    opacity: 0.9,
    width: 2,
  },
  content: {
    flex: 1,
  },
  cardShell: {
    borderRadius: theme.radius.lg,
    padding: 2,
  },
  cardShellFocused: {
    borderColor: theoryPalette.focusRing,
    borderWidth: 2,
    padding: 0,
  },
  card: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    rowGap: theme.spacing.md,
  },
  cardActive: {
    borderColor: theoryPalette.focusRing,
    shadowColor: theoryPalette.focusRing,
  },
  cardPassed: {
    shadowColor: theoryPalette.connectorDotPassed,
  },
  headerPressable: {
    borderRadius: theme.radius.md,
  },
  headerPressed: {
    opacity: 0.88,
  },
  header: {
    alignItems: 'center',
    columnGap: theme.spacing.md,
    flexDirection: 'row',
  },
  iconBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(148, 163, 184, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  iconBadgeActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.32)',
  },
  copy: {
    flex: 1,
    rowGap: 6,
  },
  kicker: {
    color: theoryPalette.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  title: {
    color: theoryPalette.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 22,
  },
  preview: {
    color: theoryPalette.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },
  chevron: {
    color: theoryPalette.textMuted,
    fontSize: 24,
    fontWeight: '300',
    marginLeft: 4,
  },
  chevronActive: {
    color: theoryPalette.accent,
  },
  body: {
    borderTopColor: theoryPalette.border,
    borderTopWidth: 1,
    rowGap: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  summary: {
    color: theoryPalette.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
})
