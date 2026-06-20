import {useId, useState} from 'react';

interface SplitReferenceWeightInputProps {
  exerciseKey: string;
  exerciseName: string;
  referenceWeight?: number;
  workingWeightLabel?: string;
  onChange: (exerciseKey: string, weight: number | null) => void;
}

function parseWeight(raw: string): number | null {
  const trimmed = raw.trim().replace(',', '.');
  if (!trimmed) return null;
  const value = Number(trimmed);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

function SplitReferenceWeightFields({
  exerciseKey,
  exerciseName,
  referenceWeight,
  workingWeightLabel,
  onChange,
}: SplitReferenceWeightInputProps) {
  const id = useId();
  const [draft, setDraft] = useState(() =>
    referenceWeight != null && referenceWeight > 0 ? String(referenceWeight) : '',
  );

  const commit = () => {
    onChange(exerciseKey, parseWeight(draft));
  };

  return (
    <div className="split-ref-weight">
      <label className="split-ref-weight__label" htmlFor={id}>
        База, кг — {exerciseName}
      </label>
      <input
        id={id}
        className="split-ref-weight__input"
        type="number"
        inputMode="decimal"
        min={0}
        step={0.5}
        autoComplete="off"
        placeholder="—"
        aria-describedby={workingWeightLabel ? `${id}-hint` : undefined}
        value={draft}
        onChange={event => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            event.preventDefault();
            commit();
            event.currentTarget.blur();
          }
        }}
      />
      {workingWeightLabel ? (
        <span id={`${id}-hint`} className="split-ref-weight__hint">
          → {workingWeightLabel}
        </span>
      ) : (
        <span className="split-ref-weight__hint split-ref-weight__hint--muted">
          Для расчёта по %
        </span>
      )}
    </div>
  );
}

export function SplitReferenceWeightInput(props: SplitReferenceWeightInputProps) {
  const {exerciseKey, referenceWeight} = props;
  return (
    <SplitReferenceWeightFields key={`${exerciseKey}-${referenceWeight ?? 'none'}`} {...props} />
  );
}
