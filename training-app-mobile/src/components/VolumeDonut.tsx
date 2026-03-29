import { useMemo, useState } from 'react'
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import Svg, { Path, Text as SvgText } from 'react-native-svg'
import { CAT_META, CAT_ORDER, MUSCLE_META, MUSCLE_ORDER } from '../data/muscles'
import { theme } from '../theme'
import { donutArc } from '../utils/geometry'
import { computeMuscleVol } from '../utils/muscles'

interface DonutSeg {
  muscle: string
  value: number
  pct: number
  startDeg: number
  endDeg: number
  catKey: string
}

export default function VolumeDonut() {
  const [activeMuscle, setActiveMuscle] = useState<string | null>(null)
  const { width } = useWindowDimensions()

  const volume = useMemo(() => computeMuscleVol(), [])
  const total = useMemo(
    () => MUSCLE_ORDER.reduce((sum, muscle) => sum + (volume[muscle] || 0), 0),
    [volume],
  )

  const { segs, catArcs, catVols } = useMemo(() => {
    const nextSegs: DonutSeg[] = []
    const nextCatVols = CAT_ORDER.map((catKey) => MUSCLE_ORDER
      .filter((muscle) => MUSCLE_META[muscle].catKey === catKey)
      .reduce((sum, muscle) => sum + (volume[muscle] || 0), 0))

    const SEG_GAP = 1.5
    const CAT_GAP = 5
    const usable = 360 - CAT_GAP * 3

    let deg = -90

    for (const catKey of CAT_ORDER) {
      const muscles = MUSCLE_ORDER.filter((muscle) => MUSCLE_META[muscle].catKey === catKey)
      const catVol = muscles.reduce((sum, muscle) => sum + (volume[muscle] || 0), 0)
      const catDegTotal = total > 0 ? (catVol / total) * usable : 0
      const muscleUsable = catDegTotal - SEG_GAP * (muscles.length - 1)

      for (let index = 0; index < muscles.length; index += 1) {
        const muscle = muscles[index]
        const muscleVol = volume[muscle] || 0
        const muscleDeg = catVol > 0 ? (muscleVol / catVol) * muscleUsable : 0

        nextSegs.push({
          muscle,
          value: muscleVol,
          pct: total > 0 ? (muscleVol / total) * 100 : 0,
          startDeg: deg,
          endDeg: deg + muscleDeg,
          catKey,
        })

        deg += muscleDeg + (index < muscles.length - 1 ? SEG_GAP : 0)
      }

      deg += CAT_GAP
    }

    const nextCatArcs = CAT_ORDER.map((catKey) => {
      const catSegs = nextSegs.filter((seg) => seg.catKey === catKey)
      if (!catSegs.length) return null

      return {
        catKey,
        startDeg: catSegs[0].startDeg,
        endDeg: catSegs[catSegs.length - 1].endDeg,
        color: CAT_META[catKey].color,
      }
    })

    return { segs: nextSegs, catArcs: nextCatArcs, catVols: nextCatVols }
  }, [total, volume])

  const activeSeg = segs.find((seg) => seg.muscle === activeMuscle)
  const size = Math.min(width - 64, 260)

  return (
    <View style={styles.wrap}>
      <Svg width={size} height={size} viewBox="0 0 240 240">
        {catArcs.map((catArc) => (
          catArc ? (
            <Path
              key={catArc.catKey}
              d={donutArc(120, 120, 108, 96, catArc.startDeg, catArc.endDeg)}
              fill={catArc.color}
              opacity={activeMuscle && MUSCLE_META[activeMuscle]?.catKey !== catArc.catKey ? 0.18 : 0.65}
            />
          ) : null
        ))}

        {segs.map((seg) => {
          const isActive = seg.muscle === activeMuscle
          return (
            <Path
              key={seg.muscle}
              d={donutArc(120, 120, isActive ? 97 : 92, 56, seg.startDeg, seg.endDeg)}
              fill={MUSCLE_META[seg.muscle].color}
              opacity={activeMuscle && !isActive ? 0.2 : 0.88}
              onPress={() => setActiveMuscle(isActive ? null : seg.muscle)}
            />
          )
        })}

        {activeSeg ? (
          <>
            <SvgText alignmentBaseline="middle" fill="#ffffff" fontSize={12} fontWeight="700" textAnchor="middle" x={120} y={108}>
              {MUSCLE_META[activeSeg.muscle].label}
            </SvgText>
            <SvgText alignmentBaseline="middle" fill={MUSCLE_META[activeSeg.muscle].color} fontSize={15} fontWeight="700" textAnchor="middle" x={120} y={124}>
              {activeSeg.value.toFixed(1)}
            </SvgText>
            <SvgText alignmentBaseline="middle" fill="#666666" fontSize={10} textAnchor="middle" x={120} y={139}>
              сет / цикл
            </SvgText>
            <SvgText alignmentBaseline="middle" fill="#555555" fontSize={10} textAnchor="middle" x={120} y={152}>
              {activeSeg.pct.toFixed(0)}% объёма
            </SvgText>
          </>
        ) : (
          <>
            <SvgText alignmentBaseline="middle" fill="#555555" fontSize={9} textAnchor="middle" x={120} y={112}>
              ОБЪЁМ
            </SvgText>
            <SvgText alignmentBaseline="middle" fill="#888888" fontSize={13} fontWeight="700" textAnchor="middle" x={120} y={128}>
              {total.toFixed(0)} сет
            </SvgText>
            <SvgText alignmentBaseline="middle" fill="#555555" fontSize={9} textAnchor="middle" x={120} y={142}>
              за цикл
            </SvgText>
          </>
        )}
      </Svg>

      <View style={styles.legend}>
        {CAT_ORDER.map((catKey, index) => {
          const muscles = MUSCLE_ORDER.filter((muscle) => MUSCLE_META[muscle].catKey === catKey)
          const catVol = catVols[index]

          return (
            <View key={catKey} style={styles.catBlock}>
              <View style={styles.catHead}>
                <Text style={[styles.catLabel, { color: CAT_META[catKey].color }]}>
                  {CAT_META[catKey].label}
                </Text>
                <Text style={styles.catPct}>
                  {(total > 0 ? (catVol / total) * 100 : 0).toFixed(0)}%
                </Text>
              </View>

              {muscles.map((muscle) => (
                <Pressable
                  key={muscle}
                  onPress={() => setActiveMuscle(activeMuscle === muscle ? null : muscle)}
                  style={({ pressed }) => [
                    styles.legendRow,
                    activeMuscle === muscle ? styles.legendRowActive : null,
                    pressed ? styles.legendRowPressed : null,
                  ]}
                >
                  <View style={[styles.legendDot, { backgroundColor: MUSCLE_META[muscle].color }]} />
                  <Text style={styles.legendName}>{MUSCLE_META[muscle].label}</Text>
                  <Text style={[styles.legendVal, { color: MUSCLE_META[muscle].color }]}>
                    {(volume[muscle] || 0).toFixed(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    rowGap: theme.spacing.lg,
  },
  legend: {
    rowGap: theme.spacing.md,
    width: '100%',
  },
  catBlock: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    rowGap: 8,
  },
  catHead: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  catLabel: {
    fontSize: 16,
    fontWeight: '800',
  },
  catPct: {
    color: theme.colors.muted,
    fontFamily: 'Courier',
    fontSize: 13,
    fontWeight: '700',
  },
  legendRow: {
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    columnGap: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  legendRowActive: {
    backgroundColor: theme.colors.accentDim,
  },
  legendRowPressed: {
    opacity: 0.85,
  },
  legendDot: {
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  legendName: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 14,
  },
  legendVal: {
    fontFamily: 'Courier',
    fontSize: 13,
    fontWeight: '700',
  },
})
