import type { SavedExercise, UserData } from '../types'
import { EXERCISES, EX_COUNT, TYPE_LABELS } from '../data/exercises'
import { calcWorkingWeight } from '../utils/calc'
import ProgressionBlock from '../components/ProgressionBlock'
import VolumeDonut from '../components/VolumeDonut'
import ExerciseWheel from '../components/ExerciseWheel'
import { CLASSES } from '@/styles/classes'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export interface CalculatorTabProps {
  userData: UserData
  selectedExercise: string
  selectExercise: (key: string) => void
  testWeight: string
  setTestWeight: (value: string) => void
  testBodyWeight: string
  setTestBodyWeight: (value: string) => void
  testExtraWeight: string
  setTestExtraWeight: (value: string) => void
  testReps: string
  setTestReps: (value: string) => void
  activeResult: SavedExercise | null
  handleCalculate: () => void
  handleDelete: (key: string) => void
  handleSelectSaved: (saved: SavedExercise) => void
}

export default function CalculatorTab({
  userData,
  selectedExercise,
  selectExercise,
  testWeight,
  setTestWeight,
  testBodyWeight,
  setTestBodyWeight,
  testExtraWeight,
  setTestExtraWeight,
  testReps,
  setTestReps,
  activeResult,
  handleCalculate,
  handleDelete,
  handleSelectSaved,
}: CalculatorTabProps) {
  const config = EXERCISES[activeResult?.exerciseKey || selectedExercise]

  const weekRows = activeResult
    ? config.percentages.map((pct, i) => {
        const weight = calcWorkingWeight(activeResult.oneRM, pct, config)
        const scheme = config.weekSchemes[i]
        return { weight, scheme, totalReps: scheme.sets * scheme.reps }
      })
    : []
  const w1 = weekRows[0]
  const w8 = weekRows[weekRows.length - 1]

  return (
    <>
      <div className={CLASSES.SECTION}>
        <div className={CLASSES.SECTION_HEADER}>
          <span className={CLASSES.SECTION_NUM}>01</span>
          <span className={CLASSES.SECTION_TITLE}>Тестовый подход</span>
        </div>

        <div className="input-grid">
          <div className="input-group">
            <label className="input-label">Упражнение</label>
            <ExerciseWheel
              value={selectedExercise}
              onChange={selectExercise}
              savedExercises={userData.exercises}
            />
          </div>

          {EXERCISES[selectedExercise].isPullup
            ? (
              <>
                <div className="input-group">
                  <label className="input-label">Вес тела (кг)</label>
                  <Input
                    type="number"
                    placeholder="80"
                    value={testBodyWeight}
                    onChange={(e) => setTestBodyWeight(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Доп. вес (кг)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={testExtraWeight}
                    onChange={(e) => setTestExtraWeight(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                  />
                </div>
              </>
            )
            : (
              <div className="input-group">
                <label className="input-label">Вес (кг)</label>
                <Input
                  type="number"
                  placeholder="80"
                  value={testWeight}
                  onChange={(e) => setTestWeight(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                />
              </div>
            )}

          <div className="input-group">
            <label className="input-label">Повторений</label>
            <Input
              type="number"
              placeholder="6"
              min="1"
              max="20"
              value={testReps}
              onChange={(e) => setTestReps(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
            />
          </div>
          <Button onClick={handleCalculate}>Рассчитать</Button>
        </div>

        <div className="note-box" style={{ marginTop: 16 }}>
          {EXERCISES[selectedExercise].isPullup
            ? (
              <>
                <strong>Подтягивания:</strong> введи вес тела + доп. вес (если есть). Итоговый 1ПМ = тело + доп.
                В прогрессии показана только прибавка к весу тела (+X кг к поясу). Если результат отрицательный — ассистированные подтягивания.
              </>
            )
            : (
              <>
                <strong>Инструкция:</strong> Отказной подход в диапазоне 4–8 повторений → калькулятор пересчитает 1ПМ
                и покажет рабочие веса на 8 недель с реальными схемами. Наведи на строку — бар подсветится.
              </>
            )}
        </div>
      </div>

      {activeResult && (
        <div className={CLASSES.SECTION}>
          <div className={CLASSES.SECTION_HEADER}>
            <span className={CLASSES.SECTION_NUM}>02</span>
            <span className={CLASSES.SECTION_TITLE}>Прогрессия — {config.name}</span>
          </div>

          <div className="insight">
            <strong>Объём снижается по мере роста весов</strong> — линейная волна с откатом на неделе 5.
            {w1 && w8 && (
              <>
                <br /><br />
                Нед 1: <code>{w1.weight} кг · {w1.scheme.sets}×{w1.scheme.reps} = {w1.totalReps} повт</code>
                {' → '}
                Нед 8: <code>{w8.weight} кг · {w8.scheme.sets}×{w8.scheme.reps} = {w8.totalReps} повт</code>
                {'. Вес +'}
                <strong>{Math.round((w8.weight / w1.weight - 1) * 100)}%</strong>
                {', объём '}
                {w1.totalReps > w8.totalReps
                  ? <>упал в <strong>{(w1.totalReps / w8.totalReps).toFixed(1)}×</strong></>
                  : <>стабилен</>
                }.
              </>
            )}
          </div>

          <ProgressionBlock config={config} result={activeResult} />

          <div className="result-card" style={{ marginTop: 16 }}>
            <div className="result-label">Расчётный 1ПМ</div>
            <div className="result-value">{activeResult.oneRM}<span>кг</span></div>
            <div className="result-meta">
              Тест: {activeResult.testWeight} кг × {activeResult.testReps} повт &nbsp;|&nbsp;
              {TYPE_LABELS[config.type]} &nbsp;|&nbsp; Шаг: {config.step} кг &nbsp;|&nbsp; {activeResult.date}
            </div>
          </div>

          <div className="note-box">
            <strong>↺ Нед 5 — волновой откат:</strong> вес снижается, объём восстанавливается.
            &nbsp;·&nbsp; <strong>Жирный</strong> в «Схема» = отклонение от 4 подходов.
            <br /><br />
            <strong>Цвет объёма:</strong>{' '}
            <span style={{ color: '#ffb347', fontWeight: 600 }}>оранжевый ≥28</span>&nbsp;·&nbsp;
            <span style={{ color: '#aaa' }}>серый 17–27</span>&nbsp;·&nbsp;
            <span style={{ color: '#ff4d4d', fontWeight: 600 }}>красный ≤16</span>
          </div>
        </div>
      )}

      {userData.exercises.length > 0 && (
        <div className={CLASSES.SECTION}>
          <div className={CLASSES.SECTION_HEADER}>
            <span className={CLASSES.SECTION_NUM}>03</span>
            <span className={CLASSES.SECTION_TITLE}>
              Сохранённые
              <span style={{ fontFamily: 'Courier New', fontSize: 14, color: 'var(--muted)', marginLeft: 12 }}>
                {userData.exercises.length}/{EX_COUNT}
              </span>
            </span>
          </div>
          <div className="saved-list">
            {userData.exercises.map(saved => {
              const ex = EXERCISES[saved.exerciseKey]
              if (!ex) return null
              const isActive = activeResult?.exerciseKey === saved.exerciseKey
              return (
                <div
                  key={saved.exerciseKey}
                  className={`saved-item${isActive ? ' saved-item-active' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectSaved(saved)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSelectSaved(saved)
                    }
                  }}
                >
                  <div>
                    <div className="saved-item-name">{ex.name}</div>
                    <div className="saved-item-info">{saved.testWeight}кг × {saved.testReps} повт &nbsp;|&nbsp; {saved.date}</div>
                  </div>
                  <div className="saved-item-actions">
                    <span className="saved-item-1rm">{saved.oneRM} кг</span>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={e => {
                        e.stopPropagation()
                        handleDelete(saved.exerciseKey)
                      }}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className={CLASSES.SECTION}>
        <div className={CLASSES.SECTION_HEADER}>
          <span className={CLASSES.SECTION_NUM}>04</span>
          <span className={CLASSES.SECTION_TITLE}>Распределение объёма</span>
        </div>
        <div className="note-box" style={{ marginBottom: 20 }}>
          Средние рабочие подходы за цикл (3 дня), распределённые по мышечным группам.
          Наведи на сектор чтобы увидеть детали.
        </div>
        <VolumeDonut />
      </div>
    </>
  )
}
