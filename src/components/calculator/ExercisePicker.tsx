import {useCallback, useEffect, useId, useMemo, useRef, useState, type CSSProperties} from 'react';
import type {SavedExercise} from '../../types';

export interface ExercisePickerItem {
  key: string;
  name: string;
  typeLabel: string;
  typeColor: string;
}

export interface ExercisePickerProps {
  value: string;
  onChange: (key: string) => void;
  items: ExercisePickerItem[];
  savedExercises?: SavedExercise[];
  placeholder?: string;
  menuTitle?: string;
  triggerId?: string;
  ariaLabelledBy?: string;
}

export function ExercisePicker({
  value,
  onChange,
  items,
  savedExercises = [],
  placeholder = 'Выберите упражнение',
  menuTitle = 'Выбери упражнение',
  triggerId,
  ariaLabelledBy,
}: ExercisePickerProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const menuId = `${titleId}-menu`;
  const shellRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const savedByKey = useMemo(
    () => new Map(savedExercises.map(saved => [saved.exerciseKey, saved])),
    [savedExercises],
  );
  const activeItem = items.find(item => item.key === value);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) close();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      close();
      triggerRef.current?.focus({preventScroll: true});
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, open]);

  function pick(key: string) {
    onChange(key);
    close();
    triggerRef.current?.focus({preventScroll: true});
  }

  return (
    <div ref={shellRef} className="ew-select">
      <button
        ref={triggerRef}
        id={triggerId}
        className={`ew-trigger${activeItem ? '' : ' ew-trigger--placeholder'}`}
        onClick={() => setOpen(current => !current)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        aria-labelledby={ariaLabelledBy}>
        <span className="ew-trigger-copy">
          <span className="ew-trigger-name">{activeItem?.name ?? placeholder}</span>
          {activeItem ? <span className="ew-trigger-meta">{activeItem.typeLabel}</span> : null}
        </span>
        <span className={`ew-trigger-icon${open ? ' is-open' : ''}`} aria-hidden="true">
          ⌄
        </span>
      </button>

      <div className={`ew-menu-panel${open ? ' is-open' : ''}`} inert={!open}>
        <div className="ew-menu-panel__clip">
          <div
            id={menuId}
            className="ew-menu"
            role="listbox"
            aria-labelledby={titleId}
            aria-hidden={!open}>
            <div id={titleId} className="ew-menu-title">
              {menuTitle}
            </div>
            <div className="ew-options">
              {items.map(item => (
                <ExercisePickerOption
                  key={item.key}
                  item={item}
                  active={item.key === value}
                  saved={savedByKey.get(item.key)}
                  onPick={pick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExercisePickerOption({
  item,
  active,
  saved,
  onPick,
}: {
  item: ExercisePickerItem;
  active: boolean;
  saved?: SavedExercise;
  onPick: (key: string) => void;
}) {
  return (
    <button
      className={`ew-option${active ? ' is-active' : ''}`}
      type="button"
      role="option"
      aria-selected={active}
      onClick={() => onPick(item.key)}>
      <span
        className="ew-option-swatch"
        style={{'--ew-option-color': item.typeColor} as CSSProperties}
        aria-hidden="true"
      />
      <span className="ew-option-copy">
        <strong>{item.name}</strong>
        <span>{item.typeLabel}</span>
      </span>
      {saved ? <span className="ew-option-rm">{saved.oneRM} кг</span> : null}
      {active ? (
        <span className={`ew-option-check${saved ? ' has-rm' : ''}`} aria-hidden="true">
          ✓
        </span>
      ) : null}
    </button>
  );
}
