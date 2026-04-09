import { StyleSheet, Text, View } from 'react-native'
import { GlossyCard } from '../ui/GlossyCard'
import { theme } from '../../theme'

interface TrainingLockedStateProps {
  missingExercises: string[]
  totalExercises: number
}

export function TrainingLockedState({
  missingExercises,
  totalExercises,
}: TrainingLockedStateProps) {
  return (
    <GlossyCard contentStyle={styles.lockedView}>
      <Text style={styles.lockedIcon}>🔒</Text>
      <Text style={styles.lockedTitle}>Введи 1ПМ для всех упражнений</Text>
      <Text style={styles.lockedDesc}>
        Вкладка тренировки станет доступна, когда рассчитаны 1ПМ для всех {totalExercises} упражнений.
      </Text>
      <View style={styles.lockedMissing}>
        {missingExercises.map((name) => (
          <Text key={name} style={styles.lockedItem}>— {name}</Text>
        ))}
      </View>
    </GlossyCard>
  )
}

const styles = StyleSheet.create({
  lockedView: {
    alignItems: 'center',
    padding: theme.spacing.xl,
    rowGap: 14,
  },
  lockedIcon: {
    fontSize: 40,
  },
  lockedTitle: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  lockedDesc: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  lockedMissing: {
    rowGap: 8,
    width: '100%',
  },
  lockedItem: {
    color: theme.colors.text,
    fontSize: 15,
  },
})
