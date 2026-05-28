import {useEffect, useId, useRef, useState} from 'react';
import {useBodyScrollLock} from '../../hooks/useBodyScrollLock';

const PYRAMID_STEPS = [
  {
    title: 'Вход',
    body: 'Вес и схема из программы (напр. 100 кг × 4×4). Целевой RPE 7–9.',
  },
  {
    title: 'Нисходящая ↓',
    body: 'Вес снижается ~3% на каждый +1 повтор. Повторы: 4 → 5 → 6 → 6. Пример: 100×4 → 97×5 → 94×6 → 91×6.',
  },
  {
    title: 'Разминка',
    body: 'От топ-веса рабочих подходов: ~50%, 65%, 80%, 90% с убыванием повторов. Шаг блинов — из типа упражнения.',
  },
  {
    title: 'Отдых',
    body: '3–5 мин между рабочими. Техника важнее веса; если последний подход с запасом >2 повторов — +2.5% в следующем цикле.',
  },
] as const;

export default function PyramidHelpDialog() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="progression-pyramid-help"
        aria-label="Алгоритм пирамиды нагрузки"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}>
        <span className="progression-pyramid-help__icon" aria-hidden="true">
          △
        </span>
        <span className="progression-pyramid-help__text">Алгоритм</span>
      </button>

      {open && (
        <div className="progression-dialog-backdrop" onClick={() => setOpen(false)}>
          <div
            className="progression-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={event => event.stopPropagation()}>
            <header className="progression-dialog__head">
              <div>
                <p className="progression-dialog__eyebrow">Пирамида нагрузки</p>
                <h2 className="progression-dialog__title" id={titleId}>
                  Алгоритм подходов
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="progression-dialog__close"
                onClick={() => setOpen(false)}>
                Закрыть
              </button>
            </header>

            <ol className="progression-dialog__steps">
              {PYRAMID_STEPS.map((step, index) => (
                <li key={step.title} className="progression-dialog__step">
                  <span className="progression-dialog__step-num">{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="progression-dialog__note">
              Расчёты — ориентиры. Корректируйте по технике и RPE в зале.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
