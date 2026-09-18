import {useMemo} from 'react';
import type {SavedExercise} from '../types';
import {EXERCISES, WHEEL_ORDER, TYPE_COLORS, TYPE_LABELS} from '../data/exercises';
import {ExercisePicker} from './calculator/ExercisePicker';

interface ExerciseWheelProps {
  value: string;
  onChange: (key: string) => void;
  savedExercises?: SavedExercise[];
  triggerId?: string;
  ariaLabelledBy?: string;
}

export default function ExerciseWheel({
  value,
  onChange,
  savedExercises = [],
  triggerId,
  ariaLabelledBy,
}: ExerciseWheelProps) {
  const items = useMemo(
    () =>
      WHEEL_ORDER.map(key => {
        const exercise = EXERCISES[key];
        return {
          key,
          name: exercise.name,
          typeLabel: TYPE_LABELS[exercise.type],
          typeColor: TYPE_COLORS[exercise.type],
        };
      }),
    [],
  );

  return (
    <ExercisePicker
      value={value}
      onChange={onChange}
      items={items}
      savedExercises={savedExercises}
      triggerId={triggerId}
      ariaLabelledBy={ariaLabelledBy}
    />
  );
}
