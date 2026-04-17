import type { UserData } from '../types'
import { TRAINING_DAYS, EX_COUNT } from '../data/exercises'
import TrainingDayCard from '../components/TrainingDayCard'
import { SectionBlock } from '../components/TheoryTab'
import { HeroSection } from '../components/ui/HeroSection'
import type { TrainingExerciseRow } from '../utils/training'
import { Button } from '../components/ui/Button'

export interface TrainingTabProps {
  userData: UserData
  allSaved: boolean
  missingExercises: string[]
  completedSessions: number
  currentDayIdx: number
  currentWeekIdx: number
  programDone: boolean
  nextSessions: number
  nextDayIdx: number
  nextWeekIdx: number
  isMicrocycleBreak: boolean
  completedMicrocycle: number
  currentTrainingExercises: TrainingExerciseRow[]
  nextTrainingExercises: TrainingExerciseRow[]
  handleComplete: () => void
  handleReset: () => void
  setRestDismissed: (value: boolean) => void
  onGoCalculator: () => void
}

export default function TrainingTab({
  allSaved,
  missingExercises,
  completedSessions,
  currentDayIdx,
  currentWeekIdx,
  programDone,
  nextSessions,
  nextDayIdx,
  nextWeekIdx,
  isMicrocycleBreak,
  completedMicrocycle,
  currentTrainingExercises,
  nextTrainingExercises,
  handleComplete,
  handleReset,
  setRestDismissed,
  onGoCalculator,
}: TrainingTabProps) {
  return (
    <div className="theory-shell">
      <HeroSection
        label="Training"
        title="Программа тренировок"
        subtitle="8 недель · 3 дня в неделю · волновая прогрессия"
      />

      <div className="theory-stack">
        {!allSaved ? (
          <div className="locked-view">
            <div className="locked-icon">&#128274;</div>
            <div className="locked-title">Введи 1ПМ для всех упражнений</div>
            <div className="locked-desc">
              Вкладка «Тренировка» станет доступна когда рассчитаны 1ПМ для всех {EX_COUNT} упражнений.
            </div>
            <div className="locked-missing">
              {missingExercises.map(n => <span key={n} className="locked-missing-item">— {n}</span>)}
            </div>
            <Button style={{ marginTop: 24 }} onClick={onGoCalculator}>
              Перейти в калькулятор
            </Button>
          </div>
        ) : programDone ? (
          <SectionBlock num="01" title="Программа завершена">
            <div className="program-complete">
              <div className="program-complete-icon">&#127942;</div>
              <div className="program-complete-title">8 недель пройдено!</div>
              <div className="program-complete-stat">{completedSessions} тренировок · 8 недель · 3 дня</div>
              <p className="program-complete-desc">
                Пересчитай 1ПМ по контрольным подходам и начни новый цикл.
              </p>
              <Button style={{ marginTop: 20 }} onClick={handleReset}>Начать новый цикл</Button>
            </div>
          </SectionBlock>
        ) : (
          <>
            <div className="training-progress">
              <div className="training-progress-label">
                <span>Прогресс программы</span>
                <span>{completedSessions} / 24 тренировок</span>
              </div>
              <div className="training-progress-bar">
                <div className="training-progress-fill" style={{ width: `${(completedSessions / 24) * 100}%` }} />
              </div>
            </div>

            {isMicrocycleBreak ? (
              <SectionBlock num="01" title={`Завершён ${completedMicrocycle}-й микроцикл`}>
                <div className="rest-card">
                  <div className="rest-card-icon">&#127881;</div>
                  <div className="rest-card-title">Праздник! Время отдохнуть</div>
                  <div className="rest-card-subtitle">
                    {completedMicrocycle}-й микроцикл из 8 пройден — {completedSessions} тренировок позади
                  </div>
                  <div className="rest-card-body">
                    <div className="rest-card-rec">
                      <div className="rest-card-rec-title">Рекомендации на 4–8 дней</div>
                      <ul className="rest-card-list">
                        <li>Полный отдых от силовых тренировок — дай ЦНС восстановиться</li>
                        <li>Поддерживай аэробные нагрузки: бег, плавание, велосипед, ходьба</li>
                        <li>Следи за сном (7–9 часов) и питанием (достаточно белка)</li>
                        <li>Растяжка и мобильность — без фанатизма, лёгко</li>
                      </ul>
                    </div>
                    <div className="rest-card-question">
                      <div className="rest-card-q-title">Как ты себя чувствуешь?</div>
                      <div className="rest-card-q-options">
                        <span className="rest-card-q-opt rest-card-q-green">Отлично, готов продолжать</span>
                        <span className="rest-card-q-opt rest-card-q-yellow">Нормально, но устал</span>
                        <span className="rest-card-q-opt rest-card-q-red">Нужно ещё отдохнуть</span>
                      </div>
                      <div className="rest-card-q-hint">
                        Если чувствуешь усталость или боль в суставах — отдохни полные 8 дней.
                        Если всё хорошо — 4 дня достаточно. Пауза сейчас = прогресс потом.
                      </div>
                    </div>
                  </div>
                  <div className="rest-card-next">
                    Следующий микроцикл: <strong>{completedMicrocycle + 1}-й</strong> · День 1 · {TRAINING_DAYS[0].name}
                  </div>
                </div>
                <Button variant="complete" onClick={() => setRestDismissed(true)}>Начать следующий микроцикл</Button>
              </SectionBlock>
            ) : (
              <>
                <SectionBlock num="01" title="Текущая тренировка">
                  <TrainingDayCard
                    dayDef={TRAINING_DAYS[currentDayIdx]}
                    weekIndex={currentWeekIdx}
                    exercises={currentTrainingExercises}
                  />
                  <Button variant="complete" onClick={handleComplete}>Завершить тренировку</Button>
                </SectionBlock>

                {nextSessions < 24 && (
                  <SectionBlock num="02" title="Следующая тренировка">
                    <div className="next-day-label">Предпросмотр</div>
                    <TrainingDayCard
                      dayDef={TRAINING_DAYS[nextDayIdx]}
                      weekIndex={nextWeekIdx}
                      exercises={nextTrainingExercises}
                      isPreview
                    />
                  </SectionBlock>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
