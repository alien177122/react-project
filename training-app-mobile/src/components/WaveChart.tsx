import { StyleSheet, Text, View } from 'react-native'
import type { WeekScheme } from '../types'
import { barColor } from '../utils/calc'
import { theme } from '../theme'

interface WaveChartProps {
  schemes: WeekScheme[]
  activeIndex?: number | null
}

export default function WaveChart({ schemes, activeIndex }: WaveChartProps) {
  const totals = schemes.map((scheme) => scheme.sets * scheme.reps)
  const max = Math.max(...totals, 1)
  const hasActive = activeIndex !== null && activeIndex !== undefined

  return (
    <View style={styles.wrap}>
      <View style={styles.bars}>
        {totals.map((total, index) => {
          const isActive = activeIndex === index
          return (
            <View key={index} style={styles.barSlot}>
              <View
                style={[
                  styles.bar,
                  {
                    backgroundColor: barColor(total),
                    height: `${(total / max) * 100}%`,
                    opacity: hasActive ? (isActive ? 1 : 0.18) : 0.85,
                  },
                ]}
              />
            </View>
          )
        })}
      </View>
      <View style={styles.labels}>
        {schemes.map((_, index) => (
          <Text
            key={index}
            style={[
              styles.label,
              activeIndex === index ? styles.labelActive : null,
            ]}
          >
            {index + 1}
          </Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    rowGap: 8,
  },
  bars: {
    alignItems: 'flex-end',
    columnGap: 8,
    flexDirection: 'row',
    height: 112,
  },
  barSlot: {
    backgroundColor: 'rgba(255,255,255,0.035)',
    borderRadius: 6,
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bar: {
    borderRadius: 6,
    minHeight: 10,
    width: '100%',
  },
  labels: {
    columnGap: 8,
    flexDirection: 'row',
  },
  label: {
    color: theme.colors.muted,
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  labelActive: {
    color: theme.colors.text,
    fontWeight: '700',
  },
})
