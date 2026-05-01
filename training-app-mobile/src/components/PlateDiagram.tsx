import { memo, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Rect, Text as SvgText } from 'react-native-svg'
import { decomposePlates } from '@training/shared/utils/plates'
import { theme } from '../theme'
import type { PlateColorKey } from '../theme/tokens'

interface PlateDiagramProps {
  weight: number
  barWeight?: number
}

interface PlatePiece {
  weight: number
  x: number
  y: number
  width: number
  height: number
  side: 'left' | 'right'
}

function formatWeight(value: number): string {
  return Number.isInteger(value)
    ? String(value)
    : value
        .toFixed(2)
        .replace(/0+$/, '')
        .replace(/\.$/, '')
}

function plateKey(weight: number): PlateColorKey {
  return String(weight).replace('.', '_') as PlateColorKey
}

function plateColor(weight: number): string {
  const fallback = theme.colors.muted
  const key = plateKey(weight)
  return theme.plates[key] ?? fallback
}

function plateHeight(weight: number): number {
  return Math.max(20, Math.min(48, 20 + (weight / 25) * 28))
}

function plateWidth(weight: number): number {
  return Math.max(7, Math.min(16, 7 + (weight / 25) * 9))
}

function buildPieces(plates: number[], side: 'left' | 'right'): PlatePiece[] {
  let offset = 0
  const collarX = side === 'left' ? 126 : 274
  return plates.map((weight) => {
    const w = plateWidth(weight)
    const h = plateHeight(weight)
    const x = side === 'left' ? collarX - offset - w : collarX + offset
    offset += w + 2
    return { weight, x, y: 60 - h / 2, width: w, height: h, side }
  })
}

/**
 * Bar diagram showing plate decomposition for a working weight.
 *
 * - Geometry mirrors the web component (`src/components/PlateDiagram.tsx`):
 *   400×120 viewBox, bar 296×6, sleeves at x=112 and x=278, plates stack
 *   outward from each collar.
 * - Logic delegates to `@training/shared/utils/plates#decomposePlates` so
 *   web and mobile stay byte-for-byte consistent on what gets loaded.
 * - Legend lists only plate weights actually used in this decomposition,
 *   heaviest first, with `pairs × 2` count.
 */
export const PlateDiagram = memo(function PlateDiagram({
  weight,
  barWeight = 20,
}: PlateDiagramProps) {
  const result = useMemo(
    () => decomposePlates(weight, barWeight),
    [barWeight, weight],
  )

  const pieces = useMemo(() => {
    if (!result.ok) return []
    return [
      ...buildPieces(result.plates, 'left'),
      ...buildPieces(result.plates, 'right'),
    ]
  }, [result])

  const usedPlates = useMemo(() => {
    if (!result.ok) return []
    const counts = new Map<number, number>()
    for (const w of result.plates) counts.set(w, (counts.get(w) ?? 0) + 1)
    return [...counts.entries()]
      .map(([w, pairs]) => ({ weight: w, pairs }))
      .sort((a, b) => b.weight - a.weight)
  }, [result])

  const formula = result.ok
    ? result.plates.length
      ? `${formatWeight(result.barWeight)} + 2 × (${result.plates.map(formatWeight).join(' + ')}) = ${formatWeight(result.totalWeight)} кг`
      : `Только гриф · ${formatWeight(result.barWeight)} кг`
    : `Вес ${formatWeight(weight)} кг не раскладывается. Ближайший доступный: ${formatWeight(result.suggestion)} кг`

  return (
    <View style={styles.container} accessible accessibilityRole="image" accessibilityLabel={formula}>
      <Svg width="100%" height={120} viewBox="0 0 400 120">
        {/* Bar */}
        <Rect x={52} y={57} width={296} height={6} rx={3} fill={theme.colors.dim} opacity={0.8} />
        {/* Collars / sleeves */}
        <Rect x={112} y={52} width={10} height={16} rx={3} fill={theme.colors.borderStrong} />
        <Rect x={278} y={52} width={10} height={16} rx={3} fill={theme.colors.borderStrong} />
        {/* Plates */}
        {pieces.map((piece, index) => (
          <Rect
            key={`${piece.side}-${index}-${piece.weight}`}
            x={piece.x}
            y={piece.y}
            width={piece.width}
            height={piece.height}
            rx={3}
            fill={plateColor(piece.weight)}
            stroke="rgba(10,12,16,0.5)"
            strokeWidth={1}
          />
        ))}
        <SvgText
          x={200}
          y={82}
          textAnchor="middle"
          fill={theme.colors.dim}
          fontSize={10}
          fontWeight="700"
        >
          {`${formatWeight(barWeight)} кг`}
        </SvgText>
      </Svg>

      {usedPlates.length > 0 && (
        <View style={styles.legend} accessibilityLabel="Цвета блинов">
          {usedPlates.map(({ weight: w, pairs }) => (
            <View key={w} style={styles.legendItem}>
              <View
                style={[styles.swatch, { backgroundColor: plateColor(w) }]}
                accessibilityIgnoresInvertColors
              />
              <Text style={styles.legendWeight}>{formatWeight(w)} кг</Text>
              <Text style={styles.legendPairs}>{pairs}×2</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.formula}>{formula}</Text>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    rowGap: theme.spacing.sm,
  },
  legend: {
    columnGap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 6,
  },
  legendItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    columnGap: 6,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  swatch: {
    borderColor: 'rgba(10,12,16,0.5)',
    borderRadius: 3,
    borderWidth: 1,
    height: 14,
    width: 6,
  },
  legendWeight: {
    color: theme.colors.text,
    fontSize: theme.typography.small,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
  },
  legendPairs: {
    color: theme.colors.dim,
    fontSize: theme.typography.caption,
    fontVariant: ['tabular-nums'],
  },
  formula: {
    color: theme.colors.muted,
    fontSize: theme.typography.small,
    fontVariant: ['tabular-nums'],
  },
})
