import { StyleSheet, Text } from 'react-native'
import { ActionButton } from '../ui/ActionButton'
import { GlossyCard } from '../ui/GlossyCard'
import { SectionBlock } from '../ui/SectionBlock'
import { theme } from '../../theme'

interface TrainingProgramDoneStateProps {
  completedSessions: number
  onReset: () => void
}

export function TrainingProgramDoneState({
  completedSessions,
  onReset,
}: TrainingProgramDoneStateProps) {
  return (
    <SectionBlock num="01" title="Программа завершена">
      <GlossyCard contentStyle={styles.completeCard}>
        <Text style={styles.completeIcon}>🏆</Text>
        <Text style={styles.completeTitle}>8 недель пройдено</Text>
        <Text style={styles.completeStat}>{completedSessions} тренировок · 8 недель · 3 дня</Text>
        <Text style={styles.completeDesc}>
          Пересчитай 1ПМ по контрольным подходам и начни новый цикл.
        </Text>
        <ActionButton label="Начать новый цикл" onPress={onReset} />
      </GlossyCard>
    </SectionBlock>
  )
}

const styles = StyleSheet.create({
  completeCard: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    rowGap: 12,
  },
  completeIcon: {
    fontSize: 44,
  },
  completeTitle: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  completeStat: {
    color: theme.colors.orange,
    fontFamily: 'Courier',
    fontSize: 15,
    fontWeight: '700',
  },
  completeDesc: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
})
