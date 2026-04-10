import { ScreenLayout } from '../../src/components/ScreenLayout'
import {
  TrainingActiveState,
  TrainingLockedState,
  TrainingMicrocycleBreakState,
  TrainingProgramDoneState,
} from '../../src/components/training'
import { TrainingErrorBoundary } from '../../src/components/ui/TrainingErrorBoundary'
import { EX_COUNT, TRAINING_DAYS } from '../../src/data/exercises'
import { useTrainingProgram } from '../../src/hooks/useTrainingProgram'
import { useAuthSessionContext } from '../../src/providers/AuthSessionProvider'

export default function TrainingScreen() {
  return (
    <ScreenLayout
      label="Training"
      title="Тренировочный цикл"
      subtitle="Текущая тренировка, прогресс программы и окно отдыха между микроциклами теперь повторяют веб-логику."
    >
      <TrainingErrorBoundary>
        <TrainingDispatcher />
      </TrainingErrorBoundary>
    </ScreenLayout>
  )
}

function TrainingDispatcher() {
  const { token, userData, setUserData } = useAuthSessionContext()
  const {
    allSaved,
    missingExercises,
    completedSessions,
    currentDayIdx,
    currentWeekIdx,
    programDone,
    nextSessions,
    nextDayIdx,
    nextWeekIdx,
    completedMicrocycle,
    isMicrocycleBreak,
    currentTrainingExercises,
    nextTrainingExercises,
    handleComplete,
    handleReset,
    setRestDismissed,
  } = useTrainingProgram({ token, userData, setUserData })

  if (!allSaved) {
    return (
      <TrainingLockedState
        missingExercises={missingExercises}
        totalExercises={EX_COUNT}
      />
    )
  }

  if (programDone) {
    return (
      <TrainingProgramDoneState
        completedSessions={completedSessions}
        onReset={handleReset}
      />
    )
  }

  if (isMicrocycleBreak) {
    return (
      <TrainingMicrocycleBreakState
        completedMicrocycle={completedMicrocycle}
        completedSessions={completedSessions}
        nextDayName={TRAINING_DAYS[0].name}
        onStartNextMicrocycle={() => setRestDismissed(true)}
      />
    )
  }

  return (
    <TrainingActiveState
      completedSessions={completedSessions}
      current={{
        dayDef: TRAINING_DAYS[currentDayIdx],
        exercises: currentTrainingExercises,
        weekIndex: currentWeekIdx,
      }}
      onComplete={handleComplete}
      preview={nextSessions < 24 ? {
        dayDef: TRAINING_DAYS[nextDayIdx],
        exercises: nextTrainingExercises,
        weekIndex: nextWeekIdx,
      } : undefined}
    />
  )
}
