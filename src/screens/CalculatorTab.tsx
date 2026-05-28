import {useEffect, useMemo, useRef} from 'react';
import type {ProgramSettings, SavedExercise, UserData} from '../types';
import {EXERCISES, EX_COUNT, TYPE_LABELS} from '../data/exercises';
import {calcWorkingWeight} from '../utils/calc';
import {
  applyProgressionPresetToPercent,
  applyProgressionPresetToScheme,
} from '@shared/program/progressionPresets';
import PeriodizationChart from '../components/PeriodizationChart';
import VolumeDonut from '../components/VolumeDonutLazy';
import {TestApproachSection} from '../components/calculator/TestApproachSection';
import {PlateDiagram} from '../components/PlateDiagram';
import {SectionBlock, NoteBox} from '../components/SectionBlock';
import {SceneHero} from '../components/ui/SceneHero';
import {Button} from '../components/ui/Button';
import {ResultCard} from '../components/ui/ResultCard';
import {useKeyboardAvoid} from '../hooks/useKeyboardAvoid';

export interface CalculatorTabProps {
  userData: UserData;
  programSettings: ProgramSettings;
  selectedExercise: string;
  selectExercise: (key: string) => void;
  testWeight: string;
  setTestWeight: (value: string) => void;
  testBodyWeight: string;
  setTestBodyWeight: (value: string) => void;
  testExtraWeight: string;
  setTestExtraWeight: (value: string) => void;
  testReps: string;
  setTestReps: (value: string) => void;
  activeResult: SavedExercise | null;
  handleCalculate: () => void;
  handleDelete: (key: string) => void;
  handleSelectSaved: (saved: SavedExercise) => void;
}

export default function CalculatorTab({
  userData,
  programSettings,
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
  const config = EXERCISES[activeResult?.exerciseKey || selectedExercise];
  const {keyboardHeight} = useKeyboardAvoid();

  const resultRef = useRef<HTMLDivElement>(null);
  const activeKey = activeResult?.exerciseKey;
  const shouldReduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!activeKey || !resultRef.current) return;
    resultRef.current.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [activeKey, shouldReduceMotion]);

  const weekRows = useMemo(
    () =>
      activeResult
        ? config.percentages.map((pct, i) => {
            const schemeBase = config.weekSchemes[i];
            const pctAdj = applyProgressionPresetToPercent(pct, programSettings.progressionPreset);
            const scheme = applyProgressionPresetToScheme(
              schemeBase.sets,
              schemeBase.reps,
              programSettings.progressionPreset,
            );
            const weight = calcWorkingWeight(activeResult.oneRM, pctAdj, config);
            return {weight, scheme, totalReps: scheme.sets * scheme.reps};
          })
        : [],
    [activeResult, config, programSettings.progressionPreset],
  );
  const w1 = weekRows[0];
  const w8 = weekRows[weekRows.length - 1];

  return (
    <div className="ta-shell">
      <SceneHero
        eyebrow="Calculator"
        title="1ПМ и прогрессия"
        subtitle="Отказной подход → расчёт 1ПМ → рабочие веса на 8 недель с реальными схемами."
        accentWord="1ПМ"
      />

      <div className="ta-stack ta-stack--calc">
        <TestApproachSection
          userData={userData}
          selectedExercise={selectedExercise}
          selectExercise={selectExercise}
          testWeight={testWeight}
          setTestWeight={setTestWeight}
          testBodyWeight={testBodyWeight}
          setTestBodyWeight={setTestBodyWeight}
          testExtraWeight={testExtraWeight}
          setTestExtraWeight={setTestExtraWeight}
          testReps={testReps}
          setTestReps={setTestReps}
          keyboardInsetPx={keyboardHeight}
          onCalculate={handleCalculate}
        />

        {activeResult && (
          <div ref={resultRef}>
            <SectionBlock num="02" title={`Прогрессия — ${config.name}`} variant="apple">
              <div className="insight">
                <strong>Объём снижается по мере роста весов</strong> — линейная волна с откатом на
                неделе 5.
                {w1 && w8 && (
                  <>
                    <br />
                    <br />
                    Нед 1:{' '}
                    <code>
                      {w1.weight} кг · {w1.scheme.sets}×{w1.scheme.reps} = {w1.totalReps} повт
                    </code>
                    {' → '}
                    Нед 8:{' '}
                    <code>
                      {w8.weight} кг · {w8.scheme.sets}×{w8.scheme.reps} = {w8.totalReps} повт
                    </code>
                    {'. Вес +'}
                    <strong>{Math.round((w8.weight / w1.weight - 1) * 100)}%</strong>
                    {', объём '}
                    {w1.totalReps > w8.totalReps ? (
                      <>
                        упал в <strong>{(w1.totalReps / w8.totalReps).toFixed(1)}×</strong>
                      </>
                    ) : (
                      <>стабилен</>
                    )}
                    .
                  </>
                )}
              </div>

              <ResultCard
                oneRM={activeResult.oneRM}
                ariaLabel={`Расчётный максимум ${activeResult.oneRM} кг. Тест ${activeResult.testWeight} кг на ${activeResult.testReps} повторений. ${TYPE_LABELS[config.type]}. Шаг ${config.step} кг. ${activeResult.date}.`}
                chips={[
                  `Тест: ${activeResult.testWeight} кг × ${activeResult.testReps} повт`,
                  TYPE_LABELS[config.type],
                  `Шаг: ${config.step} кг`,
                  activeResult.date,
                ]}
              />

              {!config.isPullup && (config.type === 'A' || config.type === 'B') && (
                <PlateDiagram
                  weight={activeResult.testWeight}
                  barWeight={config.type === 'B' ? 10 : 20}
                />
              )}

              <PeriodizationChart config={config} result={activeResult} />

              <NoteBox variant="apple">
                <strong>↺ Нед 5 — волновой откат:</strong> вес снижается, объём восстанавливается.
                &nbsp;·&nbsp; <strong>Жирный</strong> в «Схема» = отклонение от 4 подходов.
                <br />
                <br />
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
            variant="apple">
            <div className="ta-calc-saved-list">
              {userData.exercises.map(saved => {
                const ex = EXERCISES[saved.exerciseKey];
                if (!ex) return null;
                const isActive = activeResult?.exerciseKey === saved.exerciseKey;
                return (
                  <div
                    key={saved.exerciseKey}
                    className={`ta-calc-saved-card${isActive ? ' is-active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => handleSelectSaved(saved)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectSaved(saved);
                      }
                    }}>
                    <div>
                      <div className="ta-calc-saved-card__name">{ex.name}</div>
                      <div className="ta-calc-saved-card__meta">
                        {saved.testWeight} кг × {saved.testReps} повт · {saved.date}
                      </div>
                    </div>
                    <div className="ta-calc-saved-card__actions">
                      <span className="ta-calc-saved-card__one-rm">{saved.oneRM} кг</span>
                      <Button
                        size="sm"
                        variant="danger"
                        aria-label={`Удалить ${ex.name}`}
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(saved.exerciseKey);
                        }}>
                        <span aria-hidden="true">×</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionBlock>
        )}

        <SectionBlock num="04" title="Распределение объёма" variant="apple">
          <VolumeDonut />
        </SectionBlock>
      </div>
    </div>
  );
}
