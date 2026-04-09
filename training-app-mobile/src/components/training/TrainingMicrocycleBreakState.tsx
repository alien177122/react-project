import { StyleSheet, Text, View } from 'react-native'
import { ActionButton } from '../ui/ActionButton'
import { GlossyCard } from '../ui/GlossyCard'
import { SectionBlock } from '../ui/SectionBlock'
import { theme } from '../../theme'

interface TrainingMicrocycleBreakStateProps {
  completedMicrocycle: number
  completedSessions: number
  nextDayName: string
  onStartNextMicrocycle: () => void
}

export function TrainingMicrocycleBreakState({
  completedMicrocycle,
  completedSessions,
  nextDayName,
  onStartNextMicrocycle,
}: TrainingMicrocycleBreakStateProps) {
  return (
    <SectionBlock num="01" title={`Завершён ${completedMicrocycle}-й микроцикл`}>
      <GlossyCard contentStyle={styles.restCard}>
        <Text style={styles.restIcon}>🎉</Text>
        <Text style={styles.restTitle}>Праздник! Время отдохнуть</Text>
        <Text style={styles.restSubtitle}>
          {completedMicrocycle}-й микроцикл из 8 пройден — {completedSessions} тренировок позади
        </Text>
        <View style={styles.restRec}>
          <Text style={styles.restRecTitle}>Рекомендации на 4–8 дней</Text>
          <Text style={styles.restList}>• Полный отдых от силовых тренировок</Text>
          <Text style={styles.restList}>• Поддерживай лёгкое кардио: ходьба, бег, велосипед</Text>
          <Text style={styles.restList}>• Следи за сном и питанием</Text>
          <Text style={styles.restList}>• Мобилизация и растяжка — без фанатизма</Text>
        </View>
        <Text style={styles.restNext}>
          Следующий микроцикл: <Text style={styles.restNextStrong}>{completedMicrocycle + 1}-й</Text> · День 1 · {nextDayName}
        </Text>
      </GlossyCard>
      <ActionButton label="Начать следующий микроцикл" onPress={onStartNextMicrocycle} />
    </SectionBlock>
  )
}

const styles = StyleSheet.create({
  restCard: {
    alignItems: 'center',
    padding: theme.spacing.lg,
    rowGap: theme.spacing.md,
  },
  restIcon: {
    fontSize: 36,
  },
  restTitle: {
    color: theme.colors.text,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  restSubtitle: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  restRec: {
    backgroundColor: 'rgba(58,255,184,0.08)',
    borderColor: 'rgba(58,255,184,0.18)',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    padding: theme.spacing.md,
    rowGap: 8,
    width: '100%',
  },
  restRecTitle: {
    color: theme.colors.green,
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  restList: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  restNext: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  restNextStrong: {
    color: theme.colors.text,
    fontWeight: '800',
  },
})
