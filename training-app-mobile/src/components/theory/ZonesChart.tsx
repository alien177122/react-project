import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { theme } from '../../theme'

const ZONES = [
  {
    id: 'power',
    label: 'Силовая',
    pctLabel: '80–100%',
    reps: '1–6 повт',
    rpe: 'RPE 8–10',
    color: theme.colors.accent,
    fill: 1.0,
    desc: 'Рекрутирование быстрых мышечных волокон, развитие максимальной силы. Для натурального атлета — приоритетная зона. Требует длительного отдыха 4–5 мин между подходами.',
  },
  {
    id: 'hypertrophy',
    label: 'Гипертрофия',
    pctLabel: '67–80%',
    reps: '8–12 повт',
    rpe: 'RPE 7–8',
    color: theme.colors.orange,
    fill: 0.68,
    desc: 'Лучшее соотношение объём/восстановление. Умеренное утомление, хорошая активация mTOR. Достаточно 2–3 мин отдыха.',
  },
  {
    id: 'endurance',
    label: 'Выносливость',
    pctLabel: '<65%',
    reps: '15+ повт',
    rpe: 'RPE 6–7',
    color: theme.colors.blue,
    fill: 0.44,
    desc: 'Локальная мышечная выносливость. Высокое метаболическое утомление. Для силы и гипертрофии натурального атлета — низкий приоритет.',
  },
] as const

type ZoneId = (typeof ZONES)[number]['id']

export function ZonesChart() {
  const [activeId, setActiveId] = useState<ZoneId | null>(null)

  const active = ZONES.find(z => z.id === activeId) ?? null

  const handlePress = (id: ZoneId) => {
    setActiveId(prev => (prev === id ? null : id))
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>ЗОНЫ ИНТЕНСИВНОСТИ</Text>

      <View style={styles.bars}>
        {ZONES.map(zone => {
          const dimmed = activeId !== null && activeId !== zone.id
          return (
            <Pressable key={zone.id} style={styles.zoneRow} onPress={() => handlePress(zone.id)}>
              <View style={styles.zoneLeft}>
                <Text style={[styles.zoneLabel, { color: zone.color, opacity: dimmed ? 0.3 : 1 }]}>
                  {zone.label}
                </Text>
                <Text style={[styles.zoneReps, { opacity: dimmed ? 0.3 : 1 }]}>{zone.reps}</Text>
              </View>
              <View style={styles.track}>
                <View
                  style={[
                    styles.fill,
                    {
                      width: `${zone.fill * 100}%`,
                      backgroundColor: zone.color,
                      opacity: dimmed ? 0.12 : 0.9,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.zonePct, { color: zone.color, opacity: dimmed ? 0.3 : 1 }]}>
                {zone.pctLabel}
              </Text>
            </Pressable>
          )
        })}
      </View>

      {active ? (
        <View style={[styles.detail, { borderTopColor: active.color + '55' }]}>
          <View style={styles.detailHeader}>
            <Text style={[styles.detailTitle, { color: active.color }]}>{active.label}</Text>
            <View style={[styles.badge, { backgroundColor: active.color + '22', borderColor: active.color }]}>
              <Text style={[styles.badgeText, { color: active.color }]}>{active.rpe}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: active.color + '22', borderColor: active.color }]}>
              <Text style={[styles.badgeText, { color: active.color }]}>{active.reps}</Text>
            </View>
          </View>
          <Text style={styles.detailDesc}>{active.desc}</Text>
        </View>
      ) : (
        <Text style={styles.hint}>Нажми на зону</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: theme.colors.glass,
    borderColor: theme.colors.glassBorder,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  heading: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  bars: {
    paddingBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    rowGap: 12,
  },
  zoneRow: {
    alignItems: 'center',
    columnGap: 10,
    flexDirection: 'row',
  },
  zoneLeft: {
    width: 90,
  },
  zoneLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  zoneReps: {
    color: theme.colors.muted,
    fontSize: 11,
    marginTop: 2,
  },
  track: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    flex: 1,
    height: 8,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 4,
    height: '100%',
  },
  zonePct: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'right',
    width: 54,
  },
  detail: {
    borderTopWidth: 1,
    padding: theme.spacing.md,
    rowGap: 8,
  },
  detailHeader: {
    alignItems: 'center',
    columnGap: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginRight: 2,
  },
  badge: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  detailDesc: {
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  hint: {
    color: theme.colors.muted,
    fontSize: 12,
    paddingBottom: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    textAlign: 'center',
  },
})
