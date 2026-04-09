import { StyleSheet, Text, View } from 'react-native'
import type { TrainingExerciseRow } from '../../utils/training'
import type { TrainingDayDef } from '../../types'
import { theme } from '../../theme'
import TrainingDayCard from '../TrainingDayCard'
import { ActionButton } from '../ui/ActionButton'
import { GlossyCard } from '../ui/GlossyCard'
import { SectionBlock } from '../ui/SectionBlock'

interface TrainingPreviewProps {
  dayDef: TrainingDayDef
  weekIndex: number
  exercises: TrainingExerciseRow[]
}

interface TrainingActiveStateProps {
  completedSessions: number
  current: TrainingPreviewProps
  onComplete: () => void
  preview?: TrainingPreviewProps
}

export function TrainingActiveState({
  completedSessions,
  current,
  onComplete,
  preview,
}: TrainingActiveStateProps) {
  return (
    <>
      <GlossyCard contentStyle={styles.progressCard}>
        <View style={styles.progressWrap}>
          <View style={styles.progressLabel}>
            <Text style={styles.progressText}>Прогресс программы</Text>
            <Text style={styles.progressText}>{completedSessions} / 24 тренировок</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(completedSessions / 24) * 100}%` }]} />
          </View>
        </View>
      </GlossyCard>

      <SectionBlock num="01" title="Текущая тренировка">
        <TrainingDayCard
          dayDef={current.dayDef}
          weekIndex={current.weekIndex}
          exercises={current.exercises}
        />
        <ActionButton label="Завершить тренировку" onPress={onComplete} />
      </SectionBlock>

      {preview ? (
        <SectionBlock num="02" title="Следующая тренировка">
          <Text style={styles.previewLabel}>Предпросмотр</Text>
          <TrainingDayCard
            dayDef={preview.dayDef}
            weekIndex={preview.weekIndex}
            exercises={preview.exercises}
            isPreview
          />
        </SectionBlock>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  progressCard: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  progressWrap: {
    rowGap: 10,
  },
  progressLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  progressBar: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: theme.colors.glassBorder,
    borderRadius: 999,
    borderWidth: 1,
    height: 10,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: theme.colors.accent,
    height: '100%',
  },
  previewLabel: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
})
