import {useState} from 'react';
import {SPLIT_MUSCLE_LABELS, SPLIT_MUSCLES} from '@training/shared/data/split-muscles';
import type {CustomSplit, SplitMuscleId} from '../../types';

interface MuscleDayGridProps {
  split: CustomSplit;
  onMoveMuscle: (muscle: SplitMuscleId, dayNumber: 1 | 2 | 3) => void;
}

export function MuscleDayGrid({split, onMoveMuscle}: MuscleDayGridProps) {
  const [dragMuscle, setDragMuscle] = useState<SplitMuscleId | null>(null);
  const [overDay, setOverDay] = useState<number | null>(null);

  const assigned = new Set(split.days.flatMap(day => day.muscles));
  const unassigned = SPLIT_MUSCLES.filter(muscle => !assigned.has(muscle));

  function handleDrop(dayNumber: 1 | 2 | 3, muscle: SplitMuscleId | null) {
    if (!muscle) return;
    onMoveMuscle(muscle, dayNumber);
    setDragMuscle(null);
    setOverDay(null);
  }

  return (
    <section className="app-tab-section" aria-labelledby="split-muscles-title">
      <div className="app-tab-section__head">
        <h2 id="split-muscles-title" className="app-tab-section__title">
          Группы мышц
        </h2>
      </div>

      {unassigned.length > 0 ? (
        <div className="split-muscle-pool" aria-label="Неназначенные группы">
          {unassigned.map(muscle => (
            <button
              key={muscle}
              type="button"
              className="split-chip split-chip--muscle"
              draggable
              onDragStart={event => {
                setDragMuscle(muscle);
                event.dataTransfer.setData('text/muscle', muscle);
              }}
              onClick={() => onMoveMuscle(muscle, split.days[0]?.dayNumber ?? 1)}>
              {SPLIT_MUSCLE_LABELS[muscle]}
            </button>
          ))}
        </div>
      ) : null}

      <div className={`split-day-grid${split.daysPerWeek === 2 ? ' is-two-days' : ''}`}>
        {split.days.map(day => (
          <div
            key={day.dayNumber}
            className={`split-day-column${overDay === day.dayNumber ? ' is-over' : ''}`}
            onDragOver={event => {
              event.preventDefault();
              setOverDay(day.dayNumber);
            }}
            onDragLeave={() => setOverDay(null)}
            onDrop={event => {
              event.preventDefault();
              const muscle =
                dragMuscle ?? (event.dataTransfer.getData('text/muscle') as SplitMuscleId);
              handleDrop(day.dayNumber, muscle);
            }}>
            <h3 className="split-day-title">День {day.dayNumber}</h3>
            <div className="split-day-muscles">
              {day.muscles.map(muscle => (
                <button
                  key={muscle}
                  type="button"
                  className="split-chip split-chip--muscle"
                  draggable
                  onDragStart={event => {
                    setDragMuscle(muscle);
                    event.dataTransfer.setData('text/muscle', muscle);
                  }}
                  onClick={() => {
                    const nextDay = split.days.find(d => d.dayNumber !== day.dayNumber);
                    if (nextDay) onMoveMuscle(muscle, nextDay.dayNumber);
                  }}>
                  {SPLIT_MUSCLE_LABELS[muscle]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
