import type {DraftSet} from '@training/shared/hooks/useJournal';

interface JournalSetFormProps {
  index: number;
  set: DraftSet;
  onChange: (patch: Partial<DraftSet>) => void;
  onRemove: () => void;
}

export function JournalSetForm({index, set, onChange, onRemove}: JournalSetFormProps) {
  return (
    <div className="journal-set-row">
      <div className="journal-set-row__metrics">
        <div className="journal-field">
          <label htmlFor={`journal-weight-${index}`}>Вес, кг</label>
          <input
            id={`journal-weight-${index}`}
            aria-label={`Вес в килограммах для подхода ${index + 1}`}
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
            aria-label={`Количество повторений для подхода ${index + 1}`}
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
            aria-label={`RPE интенсивность для подхода ${index + 1}`}
            className="journal-input"
            type="number"
            inputMode="decimal"
            min="6"
            max="10"
            step="0.5"
            placeholder="6–10"
            value={set.rpe}
            onChange={event => onChange({rpe: event.target.value})}
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
      <div className="journal-field journal-field--set-note">
        <label htmlFor={`journal-note-${index}`}>Заметка к подходу</label>
        <input
          id={`journal-note-${index}`}
          aria-label={`Заметка к подходу ${index + 1}`}
          className="journal-input journal-input--note"
          type="text"
          placeholder="Техника, темп, ощущения…"
          value={set.note}
          onChange={event => onChange({note: event.target.value})}
        />
      </div>
    </div>
  );
}
