import TrainingDayCard from '../TrainingDayCard.tsx';
import {EXERCISES} from '../../data/exercises.ts';
import type {CustomSplit, SplitDayConfig, TrainingDayDef} from '../../types';
import type {TrainingExerciseRow} from '../../utils/training';

interface DayPreview {
  day: SplitDayConfig;
  dayDef: TrainingDayDef;
  exercises: TrainingExerciseRow[];
}

interface SplitPreviewProps {
  split: CustomSplit;
  previewWeek: number;
  dayPreviews: DayPreview[];
  onWeekChange: (week: number) => void;
  onFixedWeightChange?: (exerciseKey: string, weekIndex: number, weight: number) => void;
}

export function SplitPreview({
  split,
  previewWeek,
  dayPreviews,
  onWeekChange,
  onFixedWeightChange,
}: SplitPreviewProps) {
  const hideWeights = split.weightMode === 'scheme_only';

  return (
    <section className="app-tab-section split-preview" aria-labelledby="split-preview-title">
      <div className="app-tab-section__head">
        <h2 id="split-preview-title" className="app-tab-section__title">
          Превью
        </h2>
        <span className="app-tab-section__meta">Неделя {previewWeek + 1}</span>
      </div>

      <div className="split-week-stepper" role="tablist" aria-label="Неделя">
        {Array.from({length: 8}, (_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            className={`split-week-btn${previewWeek === index ? ' is-active' : ''}`}
            aria-selected={previewWeek === index}
            onClick={() => onWeekChange(index)}>
            {index + 1}
          </button>
        ))}
      </div>

      {dayPreviews.map(({dayDef, exercises}) => (
        <TrainingDayCard
          key={dayDef.dayNumber}
          dayDef={dayDef}
          weekIndex={previewWeek}
          exercises={exercises}
          hideWeights={hideWeights}
          variant="split-preview"
        />
      ))}

      {split.weightMode === 'fixed' && onFixedWeightChange ? (
        <FixedWeightsEditor
          weekIndex={previewWeek}
          dayPreviews={dayPreviews}
          fixedWeights={split.fixedWeights ?? {}}
          onChange={onFixedWeightChange}
        />
      ) : null}
    </section>
  );
}

function FixedWeightsEditor({
  weekIndex,
  dayPreviews,
  fixedWeights,
  onChange,
}: {
  weekIndex: number;
  dayPreviews: DayPreview[];
  fixedWeights: Record<string, number[]>;
  onChange: (exerciseKey: string, weekIndex: number, weight: number) => void;
}) {
  const keys = [...new Set(dayPreviews.flatMap(day => day.exercises.map(row => row.key)))];

  return (
    <div className="split-fixed-weights">
      <p className="split-section-label">Фиксированные веса (неделя {weekIndex + 1})</p>
      {keys.map(key => (
        <div key={key} className="split-fixed-row">
          <span>{EXERCISES[key]?.name ?? key}</span>
          <input
            className="split-input"
            type="number"
            min="0"
            step="0.5"
            value={fixedWeights[key]?.[weekIndex] ?? ''}
            onChange={event => onChange(key, weekIndex, parseFloat(event.target.value) || 0)}
          />
        </div>
      ))}
    </div>
  );
}
