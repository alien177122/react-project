import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { theme } from '../../theme'

const RPE_DATA = [
  {
    rpe: 10,
    label: 'Отказ',
    color: '#ff4d4d',
    rirs: 0,
    rirsLabel: 'Отказ',
    desc: 'Максимальное усилие. В рабочих подходах — не нужно. Угнетает ЦНС и ухудшает восстановление.',
  },
  {
    rpe: 9,
    label: '+1',
    color: '#ff6b35',
    rirs: 1,
    rirsLabel: '+1 повтор',
    desc: 'Очень тяжело. Мог сделать ещё 1 повтор. Допустимо в пиковые тяжёлые недели цикла.',
  },
  {
    rpe: 8,
    label: '+2',
    color: '#ff9f40',
    rirs: 2,
    rirsLabel: '+2 повтора',
    desc: 'Тяжело. В запасе 2 повтора. Рабочая зона тяжёлых недель — хороший тренировочный стимул.',
  },
  {
    rpe: 7,
    label: '+3',
    color: '#ffcc5c',
    rirs: 3,
    rirsLabel: '+3 повтора',
    desc: 'Умеренно. Середина цикла. Хороший стимул без чрезмерной усталости ЦНС.',
  },
  {
    rpe: 6,
    label: '+4',
    color: '#3affb8',
    rirs: 4,
    rirsLabel: '+4 повтора',
    desc: 'Лёгкая нагрузка. Восстановительные и вводные недели. Первые 1–2 недели цикла.',
  },
] as const

type RPEValue = (typeof RPE_DATA)[number]['rpe']

export function RPEScale() {
  const [activeRpe, setActiveRpe] = useState<RPEValue | null>(null)

  const active = RPE_DATA.find(r => r.rpe === activeRpe) ?? null

  const handlePress = (rpe: RPEValue) => {
    setActiveRpe(prev => (prev === rpe ? null : rpe))
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>RPE — НАГРУЗКА ПО ОЩУЩЕНИЯМ</Text>

      <View style={styles.tiles}>
        {RPE_DATA.map(item => {
          const isActive = activeRpe === item.rpe
          return (
            <Pressable
              key={item.rpe}
              style={[styles.tile, { borderColor: item.color }, isActive && { backgroundColor: item.color + '28' }]}
              onPress={() => handlePress(item.rpe)}
            >
              <Text style={[styles.tileNum, { color: item.color }]}>{item.rpe}</Text>
              <Text style={[styles.tileLabel, isActive ? { color: item.color } : null]}>{item.label}</Text>
            </Pressable>
          )
        })}
      </View>

      {active ? (
        <View style={[styles.detail, { borderTopColor: active.color + '55' }]}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailRpe, { color: active.color }]}>RPE {active.rpe}</Text>
            <Text style={styles.detailRirs}>{active.rirsLabel}</Text>
          </View>
          <Text style={styles.detailDesc}>{active.desc}</Text>
        </View>
      ) : (
        <Text style={styles.hint}>Нажми RPE — увидишь когда применять</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
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
  tiles: {
    columnGap: 6,
    flexDirection: 'row',
    paddingBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  tile: {
    alignItems: 'center',
    borderRadius: theme.radius.sm,
    borderWidth: 1.5,
    flex: 1,
    paddingVertical: 10,
    rowGap: 4,
  },
  tileNum: {
    fontSize: 18,
    fontWeight: '900',
  },
  tileLabel: {
    color: theme.colors.muted,
    fontSize: 10,
    fontWeight: '600',
  },
  detail: {
    borderTopWidth: 1,
    padding: theme.spacing.md,
    rowGap: 6,
  },
  detailRow: {
    alignItems: 'center',
    columnGap: 10,
    flexDirection: 'row',
  },
  detailRpe: {
    fontSize: 16,
    fontWeight: '800',
  },
  detailRirs: {
    color: theme.colors.muted,
    fontSize: 13,
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
