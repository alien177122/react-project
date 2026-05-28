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
}

function TestApproachFootnote({isPullup}: {isPullup: boolean}) {
  if (isPullup) {
    return (
      <p className="calc-test__footnote">
        <span className="calc-test__footnote-lead">Подтягивания.</span> Вес тела и доп. вес на
        поясе. В таблице — только прибавка; минус — ассист.
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
}: TestApproachSectionProps) {
  const config = EXERCISES[selectedExercise];
  const isPullup = Boolean(config?.isPullup);
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
        className={`calc-test${isPullup ? ' calc-test--pullup' : ''}`}
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
          isPullup={isPullup}
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
          <div className="calc-test__action-inner">
            <Button type="submit" className="calc-test__submit">
              Рассчитать
            </Button>
            <span className="calc-test__action-hint" aria-hidden="true">
              <kbd>↵</kbd>
            </span>
          </div>
        </div>
      </form>

      <NoteBox variant="apple">
        <TestApproachFootnote isPullup={isPullup} />
      </NoteBox>
    </SectionBlock>
  );
}
