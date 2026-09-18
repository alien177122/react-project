import type {CSSProperties} from 'react';
import type {UserData} from '../../types';
import {EXERCISES} from '../../data/exercises';
import ExerciseWheel from '../ExerciseWheel';
import {SectionBlock, NoteBox} from '../SectionBlock';
import {Button} from '../ui/Button';
import {TestApproachMetrics} from './TestApproachMetrics';

export interface TestApproachSectionProps {
  userData: UserData;
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
  keyboardInsetPx: number;
  onCalculate: () => void;
  isCalculating?: boolean;
  calculateError?: string | null;
  freeRemaining?: number | null;
  billingPremium?: boolean;
}

function TestApproachFootnote({isBodyWeightLift}: {isBodyWeightLift: boolean}) {
  if (isBodyWeightLift) {
    return (
      <p className="calc-test__footnote">
        <span className="calc-test__footnote-lead">Упражнение с весом тела.</span> Вес тела и доп.
        вес. В таблице — только прибавка; минус — ассист.
      </p>
    );
  }
  return (
    <p className="calc-test__footnote">
      <span className="calc-test__footnote-lead">Как считать.</span> Отказ на 4–8 повторений → 1ПМ и
      веса на 8 недель. Наведи на строку — подсветка блинов.
    </p>
  );
}

export function TestApproachSection({
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
  keyboardInsetPx,
  onCalculate,
  isCalculating = false,
  calculateError = null,
  freeRemaining = null,
  billingPremium = false,
}: TestApproachSectionProps) {
  const config = EXERCISES[selectedExercise];
  const isBodyWeightLift = Boolean(config?.usesBodyWeight || config?.isPullup);
  const shellStyle =
    keyboardInsetPx > 0
      ? ({'--calc-test-keyboard-inset': `${keyboardInsetPx}px`} as CSSProperties)
      : undefined;

  return (
    <SectionBlock
      num="01"
      title="Тестовый подход"
      variant="apple"
      className="calc-test-section"
      titleId="calc-test-heading">
      <form
        className={`calc-test${isBodyWeightLift ? ' calc-test--pullup' : ''}`}
        style={shellStyle}
        noValidate
        onSubmit={event => {
          event.preventDefault();
          onCalculate();
        }}>
        <div className="calc-test__exercise">
          <label className="calc-test__label" htmlFor="calc-exercise-trigger">
            Упражнение
          </label>
          <div id="calc-exercise-trigger">
            <ExerciseWheel
              value={selectedExercise}
              onChange={selectExercise}
              savedExercises={userData.exercises}
            />
          </div>
        </div>

        <TestApproachMetrics
          isBodyWeightLift={isBodyWeightLift}
          config={config}
          testWeight={testWeight}
          setTestWeight={setTestWeight}
          testBodyWeight={testBodyWeight}
          setTestBodyWeight={setTestBodyWeight}
          testExtraWeight={testExtraWeight}
          setTestExtraWeight={setTestExtraWeight}
          testReps={testReps}
          setTestReps={setTestReps}
        />

        <div className="calc-test__action" role="group" aria-label="Расчёт результата">
          {!billingPremium && freeRemaining !== null ? (
            <p className="calc-test__limit" role="status">
              Осталось бесплатных расчётов: {freeRemaining}
            </p>
          ) : null}
          {calculateError ? (
            <p className="calc-test__error" role="alert">
              {calculateError}
            </p>
          ) : null}
          <div className="calc-test__action-inner">
            <Button
              type="submit"
              className="calc-test__submit"
              disabled={isCalculating}
              aria-busy={isCalculating}>
              {isCalculating ? 'Считаем…' : 'Рассчитать'}
            </Button>
            <span className="calc-test__action-hint" aria-hidden="true">
              <kbd>↵</kbd>
            </span>
          </div>
        </div>
      </form>

      <NoteBox variant="apple">
        <TestApproachFootnote isBodyWeightLift={isBodyWeightLift} />
      </NoteBox>
    </SectionBlock>
  );
}
