import { useMemo, useState } from 'react'
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import Svg, { G, Path, Text as SvgText } from 'react-native-svg'
import { EXERCISES, SHORT_NAMES, TYPE_COLORS, TYPE_LABELS, WHEEL_ORDER } from '../data/exercises'
import { theme } from '../theme'
import type { SavedExercise } from '../types'
import { donutArc, pol } from '../utils/geometry'

interface ExerciseWheelProps {
  value: string
  onChange: (key: string) => void
  savedExercises?: SavedExercise[]
}

export default function ExerciseWheel({ value, onChange, savedExercises = [] }: ExerciseWheelProps) {
  const [open, setOpen] = useState(false)
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const { width } = useWindowDimensions()

  const savedByKey = useMemo(
    () => new Map(savedExercises.map((saved) => [saved.exerciseKey, saved])),
    [savedExercises],
  )

  function pick(key: string) {
    onChange(key)
    setOpen(false)
    setActiveKey(null)
  }

  const selectedKey = activeKey ?? value
  const modalSize = Math.min(width - 32, 340)

  const N = WHEEL_ORDER.length
  const GAP = 1.5
  const USABLE = 360 - GAP * N
  const SD = USABLE / N
  const cx = 190
  const cy = 190
  const RO = 165
  const RI = 78
  const RL = 122

  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={({ pressed }) => [styles.trigger, pressed ? styles.pressed : null]}>
        <Text style={styles.triggerName}>{EXERCISES[value].name}</Text>
        <Text style={styles.triggerIcon}>◈</Text>
      </Pressable>

      <Modal visible={open} animationType="fade" transparent onRequestClose={() => setOpen(false)}>
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
          <View style={[styles.modal, { width: modalSize }]}>
            <Text style={styles.modalTitle}>Выбери упражнение</Text>
            <Svg width="100%" height={modalSize} viewBox="0 0 380 380">
              {WHEEL_ORDER.map((key, index) => {
                const exercise = EXERCISES[key]
                const start = index * (SD + GAP)
                const end = start + SD
                const isActive = activeKey === key
                const isSelected = value === key
                const outerRadius = isActive ? RO + 5 : RO
                const color = TYPE_COLORS[exercise.type]
                const midDeg = (start + end) / 2
                const [tx, ty] = pol(cx, cy, RL, midDeg)
                const flip = midDeg > 90 && midDeg < 270
                const rotation = flip ? midDeg + 180 : midDeg
                const saved = savedByKey.get(key)

                return (
                  <G key={key}>
                    <Path
                      d={donutArc(cx, cy, outerRadius, RI, start, end)}
                      fill={color}
                      opacity={activeKey && !isActive ? 0.2 : isSelected ? 0.95 : 0.72}
                      onPress={() => pick(key)}
                      onPressIn={() => setActiveKey(key)}
                    />
                    <SvgText
                      alignmentBaseline="middle"
                      fill={isActive || isSelected ? '#ffffff' : '#d0d0cc'}
                      fontSize={isActive ? 12 : 11}
                      fontWeight={isActive || isSelected ? '700' : '500'}
                      textAnchor="middle"
                      transform={`rotate(${rotation} ${tx} ${ty})`}
                      x={tx}
                      y={ty}
                    >
                      {SHORT_NAMES[key]}
                    </SvgText>
                    {saved ? (
                      <SvgText
                        alignmentBaseline="middle"
                        fill={color}
                        fontSize={9}
                        fontWeight="700"
                        opacity={0.9}
                        textAnchor="middle"
                        transform={`rotate(${rotation} ${pol(cx, cy, RO + 14, midDeg)[0]} ${pol(cx, cy, RO + 14, midDeg)[1]})`}
                        x={pol(cx, cy, RO + 14, midDeg)[0]}
                        y={pol(cx, cy, RO + 14, midDeg)[1]}
                      >
                        {saved.oneRM}
                      </SvgText>
                    ) : null}
                  </G>
                )
              })}

              {selectedKey ? (
                <>
                  <SvgText
                    alignmentBaseline="middle"
                    fill="#ffffff"
                    fontSize={14}
                    fontWeight="700"
                    textAnchor="middle"
                    x={cx}
                    y={cy - 10}
                  >
                    {EXERCISES[selectedKey].name}
                  </SvgText>
                  <SvgText
                    alignmentBaseline="middle"
                    fill={TYPE_COLORS[EXERCISES[selectedKey].type]}
                    fontSize={11}
                    textAnchor="middle"
                    x={cx}
                    y={cy + 10}
                  >
                    {TYPE_LABELS[EXERCISES[selectedKey].type]}
                  </SvgText>
                </>
              ) : null}
            </Svg>

            <View style={styles.legend}>
              {Object.entries(TYPE_COLORS).map(([type, color]) => (
                <View key={type} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: color }]} />
                  <Text style={styles.legendText}>{TYPE_LABELS[type]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  trigger: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 58,
    paddingHorizontal: 16,
  },
  pressed: {
    opacity: 0.85,
  },
  triggerName: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  triggerIcon: {
    color: theme.colors.accent,
    fontSize: 18,
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.72)',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modal: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    padding: 16,
    rowGap: 12,
  },
  modalTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  legend: {
    columnGap: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    rowGap: 10,
  },
  legendItem: {
    alignItems: 'center',
    columnGap: 8,
    flexDirection: 'row',
  },
  legendDot: {
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  legendText: {
    color: theme.colors.muted,
    fontSize: 12,
  },
})
