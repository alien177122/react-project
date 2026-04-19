import type { TrainingState } from './trainingState'
import LockedState from './LockedState'
import ActiveDayView from './ActiveDayView'
import RestState from './RestState'
import DoneState from './DoneState'

interface Handlers {
  onGoCalculator: () => void
  onComplete: () => void
  onDismissBreak: () => void
  onReset: () => void
}

interface TrainingStateRouterProps {
  state: TrainingState
  handlers: Handlers
}

function ProgressHeader({ completedSessions }: { completedSessions: number }) {
  return (
    <div className="training-progress">
      <div className="training-progress-label">
        <span>Прогресс программы</span>
        <span>{completedSessions} / 24 тренировок</span>
      </div>
      <div
        className="training-progress-bar"
        role="progressbar"
        aria-valuenow={completedSessions}
        aria-valuemin={0}
        aria-valuemax={24}
        aria-label={`Прогресс программы: ${completedSessions} из 24 тренировок`}
      >
        <div
          className="training-progress-fill"
          style={{ width: `${(completedSessions / 24) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default function TrainingStateRouter({ state, handlers }: TrainingStateRouterProps) {
  switch (state.kind) {
    case 'locked':
      return (
        <LockedState
          missingExercises={state.missingExercises}
          onGoCalculator={handlers.onGoCalculator}
        />
      )
    case 'active':
      return (
        <>
          <ProgressHeader completedSessions={state.completedSessions} />
          <ActiveDayView
            currentDayIdx={state.currentDayIdx}
            currentWeekIdx={state.currentWeekIdx}
            currentExercises={state.currentExercises}
            nextSessions={state.nextSessions}
            nextDayIdx={state.nextDayIdx}
            nextWeekIdx={state.nextWeekIdx}
            nextExercises={state.nextExercises}
            onComplete={handlers.onComplete}
          />
        </>
      )
    case 'break':
      return (
        <>
          <ProgressHeader completedSessions={state.completedSessions} />
          <RestState
            completedSessions={state.completedSessions}
            completedMicrocycle={state.completedMicrocycle}
            onDismiss={handlers.onDismissBreak}
          />
        </>
      )
    case 'done':
      return (
        <DoneState completedSessions={state.completedSessions} onReset={handlers.onReset} />
      )
    default: {
      const _exhaustive: never = state
      return _exhaustive
    }
  }
}
