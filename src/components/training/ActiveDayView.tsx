import { TRAINING_DAYS } from '../../data/exercises'
import type { TrainingExerciseRow } from '../../utils/training'
import TrainingDayCard from '../TrainingDayCard'
import { SectionBlock } from '../SectionBlock'
import { Button } from '../ui/Button'

interface ActiveDayViewProps {
  currentDayIdx: number
  currentWeekIdx: number
  currentExercises: TrainingExerciseRow[]
  nextSessions: number
  nextDayIdx: number
  nextWeekIdx: number
  nextExercises: TrainingExerciseRow[]
  onComplete: () => void
}

export default function ActiveDayView({
  currentDayIdx,
  currentWeekIdx,
  currentExercises,
  nextSessions,
  nextDayIdx,
  nextWeekIdx,
  nextExercises,
  onComplete,
}: ActiveDayViewProps) {
  const showPreview = nextSessions < 24

  return (
    <>
      <SectionBlock num="01" title="Текущая тренировка">
        <TrainingDayCard
          dayDef={TRAINING_DAYS[currentDayIdx]}
          weekIndex={currentWeekIdx}
          exercises={currentExercises}
        />
        <Button variant="complete" onClick={onComplete}>
          Завершить тренировку
        </Button>
      </SectionBlock>

      {showPreview && (
        <SectionBlock num="02" title="Следующая тренировка">
          <div className="next-day-label">Предпросмотр</div>
          <TrainingDayCard
            dayDef={TRAINING_DAYS[nextDayIdx]}
            weekIndex={nextWeekIdx}
            exercises={nextExercises}
            isPreview
          />
        </SectionBlock>
      )}
    </>
  )
}
