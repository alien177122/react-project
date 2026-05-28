import {EXERCISES} from '@training/shared/data/exercises';
import {LEG_EXERCISE_KEYS} from '@training/shared/data/split-exercises';
import type {LegExerciseKey} from '@training/shared/data/split-exercises';

interface LegExercisePickerProps {
  selected: [string, string];
  onToggle: (key: LegExerciseKey) => void;
}

export function LegExercisePicker({selected, onToggle}: LegExercisePickerProps) {
  const selectedSet = new Set(selected);

  return (
    <section className="app-tab-section split-leg-picker" aria-labelledby="split-leg-picker-title">
      <div className="app-tab-section__head">
        <h2 id="split-leg-picker-title" className="app-tab-section__title">
          Упражнения на ноги
        </h2>
        <span className="app-tab-section__meta">Выберите 2</span>
      </div>
      <div
        className="split-leg-picker__grid"
        role="group"
        aria-label="Упражнения на ноги, максимум 2">
        {LEG_EXERCISE_KEYS.map(key => {
          const isSelected = selectedSet.has(key);
          return (
            <button
              key={key}
              type="button"
              className={`split-chip split-chip--leg${isSelected ? ' is-active' : ''}`}
              aria-pressed={isSelected}
              onClick={() => onToggle(key)}>
              {EXERCISES[key]?.name ?? key}
            </button>
          );
        })}
      </div>
    </section>
  );
}
