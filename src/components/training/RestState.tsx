import { TRAINING_DAYS } from '../../data/exercises'
import { SectionBlock } from '../SectionBlock'
import { Button } from '../ui/Button'

interface RestStateProps {
  completedSessions: number
  completedMicrocycle: number
  onDismiss: () => void
}

export default function RestState({
  completedSessions,
  completedMicrocycle,
  onDismiss,
}: RestStateProps) {
  return (
    <SectionBlock num="01" title={`Завершён ${completedMicrocycle}-й микроцикл`}>
      <div className="rest-card">
        <div className="rest-card-icon" aria-hidden="true">&#127881;</div>
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
          Следующий микроцикл: <strong>{completedMicrocycle + 1}-й</strong>
          {' · День 1 · '}{TRAINING_DAYS[0].name}
        </div>
      </div>
      <Button variant="complete" onClick={onDismiss}>
        Начать следующий микроцикл
      </Button>
    </SectionBlock>
  )
}
