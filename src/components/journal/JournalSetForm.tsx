import type {DraftSet} from '../../../packages/shared/src/hooks/useJournal.ts';

interface JournalSetFormProps {
  index: number;
  set: DraftSet;
  onChange: (patch: Partial<DraftSet>) => void;
  onRemove: () => void;
}

export function JournalSetForm({index, set, onChange, onRemove}: JournalSetFormProps) {
  return (
    <div className="journal-set-row">
      <div className="journal-field">
        <label htmlFor={`journal-weight-${index}`}>Вес, кг</label>
        <input
          id={`journal-weight-${index}`}
          className="journal-input"
          type="number"
          inputMode="decimal"
          min="0"
          step="0.5"
          value={set.weight}
          onChange={event => onChange({weight: event.target.value})}
        />
      </div>
      <div className="journal-field">
        <label htmlFor={`journal-reps-${index}`}>Повт</label>
        <input
          id={`journal-reps-${index}`}
          className="journal-input"
          type="number"
          inputMode="numeric"
          min="1"
          value={set.reps}
          onChange={event => onChange({reps: event.target.value})}
        />
      </div>
      <div className="journal-field">
        <label htmlFor={`journal-rpe-${index}`}>RPE</label>
        <input
          id={`journal-rpe-${index}`}
          className="journal-input"
          type="number"
          inputMode="decimal"
          min="6"
          max="10"
          step="0.5"
          value={set.rpe}
          onChange={event => onChange({rpe: event.target.value})}
        />
      </div>
      <div className="journal-field">
        <label htmlFor={`journal-note-${index}`}>Заметка</label>
        <input
          id={`journal-note-${index}`}
          className="journal-input"
          type="text"
          value={set.note}
          onChange={event => onChange({note: event.target.value})}
        />
      </div>
      <button
        type="button"
        className="journal-remove-set"
        onClick={onRemove}
        aria-label={`Удалить подход ${index + 1}`}>
        ×
      </button>
    </div>
  );
}
