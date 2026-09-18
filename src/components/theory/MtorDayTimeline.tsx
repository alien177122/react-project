import {useState} from 'react';

const SLOTS = [
  {id: 'morning', label: 'Утро', hint: 'белок'},
  {id: 'lunch', label: 'Обед', hint: 'белок'},
  {id: 'training', label: 'Тренировка', hint: 'механика'},
  {id: 'dinner', label: 'Ужин', hint: 'белок'},
  {id: 'sleep', label: 'Сон', hint: 'восстановление'},
] as const;

type SlotId = (typeof SLOTS)[number]['id'];

const INITIAL: Record<SlotId, boolean> = {
  morning: true,
  lunch: true,
  training: true,
  dinner: true,
  sleep: false,
};

export function MtorDayTimeline() {
  const [on, setOn] = useState(INITIAL);
  const closed = SLOTS.filter(slot => on[slot.id]).length;

  return (
    <section className="ta-day-timeline" aria-labelledby="mtor-day-timeline-title">
      <h4 id="mtor-day-timeline-title" className="ta-day-timeline__title">
        Карта входов за день
      </h4>
      <p className="ta-day-timeline__lede">
        Учебный сценарий, не измерение пиков mTORC1. Нажми слот, чтобы закрыть или открыть вход.
      </p>
      <div className="ta-day-timeline__slots">
        {SLOTS.map(slot => {
          const pressed = on[slot.id];
          return (
            <button
              key={slot.id}
              type="button"
              className={`ta-day-timeline__slot${pressed ? ' is-on' : ''}`}
              aria-pressed={pressed}
              onClick={() => setOn(current => ({...current, [slot.id]: !current[slot.id]}))}>
              <span className="ta-day-timeline__label">{slot.label}</span>
              <span className="ta-day-timeline__hint">{slot.hint}</span>
              <span className="ta-day-timeline__state">{pressed ? 'закрыт' : 'открыт'}</span>
            </button>
          );
        })}
      </div>
      <p className="ta-day-timeline__sum" aria-live="polite">
        В этом сценарии закрыты {closed} {ruSlots(closed)} из {SLOTS.length}.
      </p>
    </section>
  );
}

function ruSlots(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'вход';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'входа';
  return 'входов';
}
