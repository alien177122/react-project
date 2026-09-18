import {useEffect, useId, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {isWeekEffectivelyDone} from '@training/shared/utils/split-progress';
import {Button} from '../ui/Button';
import {useBodyScrollLock} from '../../hooks/useBodyScrollLock';
import type {SplitCalculation} from '../../types';
import {CATALOG_EXERCISES} from '@training/shared/data/exercises';
import {exerciseKeysForDay} from '@training/shared/utils/split-constructor';

interface SplitCalculationHistoryProps {
  calculations: SplitCalculation[];
  activeId?: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void | Promise<void>;
}

const DATE_FORMAT = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

function formatCalculationDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : DATE_FORMAT.format(date);
}

function getCalculationExerciseKeys(calculation: SplitCalculation, dayNumber: 1 | 2 | 3): string[] {
  const explicitKeys = calculation.split.customExercisesByDay?.[dayNumber];
  const keys = explicitKeys ?? exerciseKeysForDay(calculation.split, dayNumber);
  return [...new Set(keys)];
}

function formatExerciseLabel(calculation: SplitCalculation, exerciseKey: string): string {
  const name = CATALOG_EXERCISES[exerciseKey]?.name ?? exerciseKey;
  const saved = calculation.exercises.find(exercise => exercise.exerciseKey === exerciseKey);
  if (!saved) return name;
  return `${name} ${saved.testWeight} кг × ${saved.testReps} повт.`;
}

function DeleteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 4.5h9M6.25 4.5V3.25a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 .75.75V4.5m1.5 0V12a1 1 0 0 1-1 1H5.75a1 1 0 0 1-1-1V4.5h7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface DeleteConfirmDialogProps {
  calculation: SplitCalculation;
  onCancel: () => void;
  onConfirm: () => void;
}

function DeleteConfirmDialog({calculation, onCancel, onConfirm}: DeleteConfirmDialogProps) {
  const titleId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(true);

  useEffect(() => {
    cancelRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onCancel();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onCancel]);

  return createPortal(
    <div className="split-calculation-delete-backdrop" onClick={onCancel}>
      <div
        className="split-calculation-delete-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={event => event.stopPropagation()}>
        <h2 className="split-calculation-delete-dialog__title" id={titleId}>
          Удалить расчёт?
        </h2>
        <p className="split-calculation-delete-dialog__body">
          «{calculation.split.name}» от {formatCalculationDate(calculation.calculatedAt)}. Прогресс
          по неделям будет удалён без восстановления.
        </p>
        <div className="split-calculation-delete-dialog__actions">
          <button ref={cancelRef} type="button" className="btn btn-ghost" onClick={onCancel}>
            Отмена
          </button>
          <Button type="button" variant="danger" onClick={onConfirm}>
            Удалить
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function SplitCalculationHistory({
  calculations,
  activeId,
  onSelect,
  onDelete,
}: SplitCalculationHistoryProps) {
  const [pendingDelete, setPendingDelete] = useState<SplitCalculation | null>(null);

  if (calculations.length === 0) return null;

  return (
    <div className="split-calculation-history" aria-labelledby="split-calculation-history-title">
      <div className="split-calculation-history__head">
        <h3 id="split-calculation-history-title">История расчётов</h3>
        <span>{calculations.length}</span>
      </div>
      <div className="split-calculation-history__list">
        {calculations.map(calculation => {
          const completedWeeks = Array.from({length: 8}, (_, index) => index).filter(week =>
            isWeekEffectivelyDone(calculation.split, week),
          ).length;
          const completedDays = calculation.split.completedDays?.length ?? 0;
          const selected = calculation.id === activeId;
          const programRows = Array.from({length: calculation.split.daysPerWeek}, (_, index) => {
            const dayNumber = (index + 1) as 1 | 2 | 3;
            const keys = getCalculationExerciseKeys(calculation, dayNumber);
            return `День ${dayNumber}: ${
              keys.length > 0
                ? keys.map(key => formatExerciseLabel(calculation, key)).join(' · ')
                : 'упражнения не заданы'
            }`;
          });
          const exerciseCount = new Set(
            programRows.flatMap((_, index) =>
              getCalculationExerciseKeys(calculation, (index + 1) as 1 | 2 | 3),
            ),
          ).size;

          return (
            <article
              key={calculation.id}
              className={`split-calculation-card-wrap${selected ? ' is-active' : ''}`}>
              <button
                type="button"
                className="split-calculation-card"
                aria-pressed={selected}
                onClick={() => onSelect(calculation.id)}>
                <span className="split-calculation-card__copy">
                  <strong>{calculation.split.name}</strong>
                  <span>
                    Расчёт {formatCalculationDate(calculation.calculatedAt)} ·{' '}
                    {calculation.split.daysPerWeek} дня в неделю · {exerciseCount} упражн.
                  </span>
                  <span className="split-calculation-card__program">
                    {programRows.map(row => (
                      <span key={row}>{row}</span>
                    ))}
                  </span>
                  <span>
                    Отмечено: {completedWeeks} из 8 недель · {completedDays} дн.
                  </span>
                </span>
                <span className="split-calculation-card__action">
                  <span className="split-calculation-card__metric">{completedWeeks}/8</span>
                  <span>{selected ? 'Открыт' : 'Открыть'}</span>
                </span>
              </button>
              <button
                type="button"
                className="split-calculation-card__delete"
                aria-label={`Удалить расчёт «${calculation.split.name}»`}
                onClick={() => setPendingDelete(calculation)}>
                <DeleteIcon />
              </button>
            </article>
          );
        })}
      </div>
      {pendingDelete ? (
        <DeleteConfirmDialog
          calculation={pendingDelete}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => {
            void onDelete(pendingDelete.id);
            setPendingDelete(null);
          }}
        />
      ) : null}
    </div>
  );
}
