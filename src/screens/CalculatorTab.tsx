import { useEffect, useRef } from 'react'
import type { SavedExercise, UserData } from '../types'
import { EXERCISES, EX_COUNT, TYPE_LABELS } from '../data/exercises'
import { calcWorkingWeight } from '../utils/calc'
import ProgressionBlock from '../components/ProgressionBlock'
import VolumeDonut from '../components/VolumeDonutLazy'
import ExerciseWheel from '../components/ExerciseWheel'
import { SectionBlock, NoteBox } from '../components/SectionBlock'
import { HeroSection } from '../components/ui/HeroSection'
import { Button } from '../components/ui/Button'
import { PremiumInput } from '../components/ui/PremiumInput'

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

  const resultRef = useRef<HTMLDivElement>(null)
  const activeKey = activeResult?.exerciseKey
  const shouldReduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!activeKey || !resultRef.current) return
    resultRef.current.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [activeKey, shouldReduceMotion])

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
    <div className="theory-shell">
      <HeroSection
        label="Calculator"
        title="1ПМ и прогрессия"
        subtitle="Отказной подход → расчёт 1ПМ → рабочие веса на 8 недель с реальными схемами."
      />

      <div className="theory-stack">
        <SectionBlock num="01" title="Тестовый подход">
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
                  <PremiumInput
                    id="calc-body-weight"
                    label="Вес тела"
                    type="number"
                    inputMode="decimal"
                    placeholder="80"
                    unit="кг"
                    value={testBodyWeight}
                    onChange={(e) => setTestBodyWeight(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                  />
                  <PremiumInput
                    id="calc-extra-weight"
                    label="Доп. вес"
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    unit="кг"
                    value={testExtraWeight}
                    onChange={(e) => setTestExtraWeight(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                  />
                </>
              )
              : (
                <PremiumInput
                  id="calc-weight"
                  label="Вес"
                  type="number"
                  inputMode="decimal"
                  placeholder="80"
                  unit="кг"
                  value={testWeight}
                  onChange={(e) => setTestWeight(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                />
              )}

            <PremiumInput
              id="calc-reps"
              label="Повторений"
              type="number"
              inputMode="numeric"
              placeholder="6"
              min="1"
              max="20"
              unit="повт"
              value={testReps}
              onChange={(e) => setTestReps(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
            />
            <Button onClick={handleCalculate}>Рассчитать</Button>
          </div>

          <NoteBox>
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
          </NoteBox>
        </SectionBlock>

        {activeResult && (
          <div ref={resultRef}>
          <SectionBlock num="02" title={`Прогрессия — ${config.name}`}>
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

            <div
              className="result-card"
              role="status"
              aria-live="polite"
              aria-label={`Расчётный 1ПМ: ${activeResult.oneRM} килограмм`}
            >
              <div className="result-label">Расчётный 1ПМ</div>
              <div className="result-value">{activeResult.oneRM}<span>кг</span></div>
              <div className="result-meta">
                Тест: {activeResult.testWeight} кг × {activeResult.testReps} повт &nbsp;|&nbsp;
                {TYPE_LABELS[config.type]} &nbsp;|&nbsp; Шаг: {config.step} кг &nbsp;|&nbsp; {activeResult.date}
              </div>
            </div>

            <NoteBox>
              <strong>↺ Нед 5 — волновой откат:</strong> вес снижается, объём восстанавливается.
              &nbsp;·&nbsp; <strong>Жирный</strong> в «Схема» = отклонение от 4 подходов.
              <br /><br />
              <strong>Цвет объёма:</strong>{' '}
              <span className="vol-legend--high">оранжевый ≥28</span>&nbsp;·&nbsp;
              <span className="vol-legend--mid">серый 17–27</span>&nbsp;·&nbsp;
              <span className="vol-legend--low">красный ≤16</span>
            </NoteBox>
          </SectionBlock>
          </div>
        )}

        {userData.exercises.length > 0 && (
          <SectionBlock
            num="03"
            title={`Сохранённые (${userData.exercises.length}/${EX_COUNT})`}
          >
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
                        aria-label={`Удалить ${ex.name}`}
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
          </SectionBlock>
        )}

        <SectionBlock num="04" title="Распределение объёма">
          <NoteBox>
            Средние рабочие подходы за цикл (3 дня), распределённые по мышечным группам.
            Наведи на сектор чтобы увидеть детали.
          </NoteBox>
          <VolumeDonut />
        </SectionBlock>
      </div>
    </div>
  )
}
