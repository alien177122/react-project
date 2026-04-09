import { ScreenLayout } from '../../src/components/ScreenLayout'
import {
  TrainingActiveState,
  TrainingLockedState,
  TrainingMicrocycleBreakState,
  TrainingProgramDoneState,
} from '../../src/components/training'
import { EX_COUNT, TRAINING_DAYS } from '../../src/data/exercises'
import { useTrainingProgram } from '../../src/hooks/useTrainingProgram'
import { useAuthSessionContext } from '../../src/providers/AuthSessionProvider'

export default function TrainingScreen() {
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

  let content: JSX.Element

  if (!allSaved) {
    content = (
      <TrainingLockedState
        missingExercises={missingExercises}
        totalExercises={EX_COUNT}
      />
    )
  } else if (programDone) {
    content = (
      <TrainingProgramDoneState
        completedSessions={completedSessions}
        onReset={handleReset}
      />
    )
  } else if (isMicrocycleBreak) {
    content = (
      <TrainingMicrocycleBreakState
        completedMicrocycle={completedMicrocycle}
        completedSessions={completedSessions}
        nextDayName={TRAINING_DAYS[0].name}
        onStartNextMicrocycle={() => setRestDismissed(true)}
      />
    )
  } else {
    content = (
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

  return (
    <ScreenLayout
      label="Training"
      title="Тренировочный цикл"
      subtitle="Текущая тренировка, прогресс программы и окно отдыха между микроциклами теперь повторяют веб-логику."
    >
      {content}
    </ScreenLayout>
  )
}
