import {useMemo, useState} from 'react';
import {
  EXERCISES_V3,
  EXERCISE_ORDER_V3,
  CATEGORY_COLORS_V3,
  CATEGORY_LABELS_V3,
  buildProgramV3ChartRows,
} from '@training/shared/program/v3';
import {ExercisePicker} from '../components/calculator/ExercisePicker';
import {PROGRESSION_PRESET_META} from '@training/shared/program/progressionPresets';
import type {ProgramSettings, UserData} from '../types';
import {calc1RM} from '../utils/calc';
import ProgramV3ProgressChart from '../components/calculator/ProgramV3ProgressChart';
import {SceneHero} from '../components/ui/SceneHero';
import {SectionBlock, NoteBox} from '../components/SectionBlock';
import {PremiumInput} from '../components/ui/PremiumInput';

interface CalculatorTabV3Props {
  userData: UserData;
  programSettings: ProgramSettings;
}

export default function CalculatorTabV3({userData, programSettings}: CalculatorTabV3Props) {
  const [selectedKey, setSelectedKey] = useState('');
  const [draftWeight, setDraftWeight] = useState('');
  const [draftReps, setDraftReps] = useState('');

  const presetMeta = PROGRESSION_PRESET_META[programSettings.progressionPreset];
  const config = selectedKey ? EXERCISES_V3[selectedKey] : undefined;
  const draftOneRM = useMemo(() => {
    const w = parseFloat(draftWeight);
    const r = parseInt(draftReps, 10);
    if (!w || !r || r < 1) return null;
    return Math.round(calc1RM(w, r, 'brzycki') * 10) / 10;
  }, [draftWeight, draftReps]);

  const draftInput = useMemo(() => {
    const w = parseFloat(draftWeight);
    const r = parseInt(draftReps, 10);
    if (!w || !r || r < 1) return null;
    return {weight: w, reps: r};
  }, [draftWeight, draftReps]);

  const weekRows = useMemo(() => {
    if (!selectedKey) return [];
    return buildProgramV3ChartRows({
      exerciseKey: selectedKey,
      testResults: userData.testResults,
      draft: draftInput,
      progressionPreset: programSettings.progressionPreset,
    });
  }, [selectedKey, userData.testResults, draftInput, programSettings.progressionPreset]);

  const chartKey = useMemo(
    () =>
      weekRows
        .map(row => `${row.week}:${row.status}:${row.weight ?? ''}:${row.isPreviewWeight}`)
        .join(';'),
    [weekRows],
  );

  const exercisePickerItems = useMemo(
    () =>
      EXERCISE_ORDER_V3.map(key => {
        const exercise = EXERCISES_V3[key];
        return {
          key,
          name: exercise.name,
          typeLabel: CATEGORY_LABELS_V3[exercise.category],
          typeColor: CATEGORY_COLORS_V3[exercise.category],
        };
      }),
    [],
  );

  return (
    <div className="ta-shell program-v3-calculator">
      <SceneHero
        eyebrow="Калькулятор"
        title={presetMeta.programLabel}
        subtitle="График прогрессии по неделям. Веса после тестов — из ваших результатов."
        accent="var(--ta-calc-accent)"
      />

      <div className="ta-stack ta-stack--calc">
        <SectionBlock
          num="01"
          title="Упражнение"
          variant="apple"
          className="calc-test-section"
          titleId="calc-v3-exercise-heading">
          <div className="calc-test">
            <div className="calc-test__exercise">
              <label className="calc-test__label" htmlFor="v3-exercise-trigger">
                Упражнение
              </label>
              <div id="v3-exercise-select">
                <ExercisePicker
                  value={selectedKey}
                  onChange={setSelectedKey}
                  items={exercisePickerItems}
                  savedExercises={userData.exercises}
                  placeholder="Выберите упражнение"
                  triggerId="v3-exercise-trigger"
                  ariaLabelledBy="calc-v3-exercise-heading"
                />
              </div>
            </div>
            {config?.alternativeName ? (
              <p className="calc-test__alt">Альтернатива: {config.alternativeName}</p>
            ) : null}
          </div>
        </SectionBlock>

        <SectionBlock
          num="02"
          title="Черновой 1ПМ"
          variant="apple"
          className="calc-test-section"
          titleId="calc-v3-draft-heading">
          <div className="calc-test">
            <div className="calc-test__metrics">
              <PremiumInput
                variant="stepper"
                label="Вес"
                unit="кг"
                placeholder="80"
                step={config?.step ?? 2.5}
                value={draftWeight}
                onValueChange={setDraftWeight}
                inputMode="decimal"
              />
              <PremiumInput
                variant="stepper"
                label="Повторений"
                placeholder="6"
                step={1}
                value={draftReps}
                onValueChange={setDraftReps}
                inputMode="numeric"
              />
            </div>
            {draftOneRM !== null ? (
              <p className="calc-test__one-rm">
                Оценка 1ПМ: <strong>{draftOneRM} кг</strong>
              </p>
            ) : null}
          </div>
          <NoteBox variant="apple">
            <p className="calc-test__footnote">
              <span className="calc-test__footnote-lead">Справочно.</span> Brzycki по весу и
              повторам — не сохраняется; на графике кг появляются после тестовых недель или по
              оценке из черновика.
            </p>
          </NoteBox>
        </SectionBlock>

        {selectedKey ? (
          <SectionBlock
            num="03"
            title="Прогрессия"
            variant="apple"
            className="calc-test-section"
            titleId="calc-v3-chart-heading">
            <ProgramV3ProgressChart
              key={chartKey}
              exerciseName={config?.name ?? selectedKey}
              rows={weekRows}
            />
            <NoteBox variant="apple">
              <p className="calc-test__footnote">
                <span className="calc-test__footnote-lead">Тестовые недели.</span> «?» — введите
                результат после подхода (PR2: ввод в тренировке). Подготовка (1–3) только в списке;
                график — с недели 4. Без тестов кривая строится по черновому 1ПМ.
              </p>
            </NoteBox>
          </SectionBlock>
        ) : null}
      </div>
    </div>
  );
}
