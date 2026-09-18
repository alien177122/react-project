import {useMemo, useState} from 'react';
import {
  CATALOG_EXERCISES,
  CATALOG_WHEEL_ORDER,
  TYPE_COLORS,
  TYPE_LABELS,
} from '@training/shared/data/exercises';
import {
  LOWER_BODY_MUSCLES,
  SPLIT_BODY_REGION_LABELS,
  SPLIT_MUSCLE_COLORS,
  SPLIT_MUSCLE_LABELS,
  SPLIT_MUSCLE_REGION,
  UPPER_BODY_MUSCLES,
  type SplitBodyRegionFilter,
} from '@training/shared/data/split-muscles';
import type {SplitMuscleId} from '@training/shared/types';

export type SplitExercisePickerMuscleFilter = 'all' | SplitMuscleId;

export interface SplitExercisePickerItem {
  key: string;
  name: string;
  typeLabel: string;
  typeColor: string;
  muscle: SplitMuscleId;
  muscleLabel: string;
  muscleColor: string;
}

const REGION_ORDER: SplitBodyRegionFilter[] = ['all', 'upper', 'lower'];

export function muscleFiltersForRegion(
  region: SplitBodyRegionFilter,
): SplitExercisePickerMuscleFilter[] {
  if (region === 'upper') {
    return ['all', ...UPPER_BODY_MUSCLES];
  }
  if (region === 'lower') {
    return ['all', ...LOWER_BODY_MUSCLES];
  }
  return ['all', ...UPPER_BODY_MUSCLES, ...LOWER_BODY_MUSCLES];
}

export function filterSplitExerciseItems(
  items: SplitExercisePickerItem[],
  region: SplitBodyRegionFilter,
  muscle: SplitExercisePickerMuscleFilter,
): SplitExercisePickerItem[] {
  return items.filter(item => {
    if (region !== 'all' && SPLIT_MUSCLE_REGION[item.muscle] !== region) return false;
    if (muscle !== 'all' && item.muscle !== muscle) return false;
    return true;
  });
}

export function useSplitExercisePicker() {
  const [regionFilter, setRegionFilter] = useState<SplitBodyRegionFilter>('all');
  const [muscleFilter, setMuscleFilter] = useState<SplitExercisePickerMuscleFilter>('all');

  const allItems = useMemo<SplitExercisePickerItem[]>(
    () =>
      CATALOG_WHEEL_ORDER.map(key => {
        const exercise = CATALOG_EXERCISES[key];
        if (!exercise) return null;
        const muscle = exercise.primaryMuscle;
        return {
          key,
          name: exercise.name,
          typeLabel: TYPE_LABELS[exercise.type],
          typeColor: TYPE_COLORS[exercise.type],
          muscle,
          muscleLabel: SPLIT_MUSCLE_LABELS[muscle],
          muscleColor: SPLIT_MUSCLE_COLORS[muscle],
        };
      }).filter((item): item is SplitExercisePickerItem => item !== null),
    [],
  );

  const availableMuscleFilters = useMemo(
    () => muscleFiltersForRegion(regionFilter),
    [regionFilter],
  );

  const activeMuscleFilter = availableMuscleFilters.includes(muscleFilter) ? muscleFilter : 'all';

  const filteredItems = useMemo(
    () => filterSplitExerciseItems(allItems, regionFilter, activeMuscleFilter),
    [allItems, regionFilter, activeMuscleFilter],
  );

  function selectRegion(region: SplitBodyRegionFilter) {
    setRegionFilter(region);
    setMuscleFilter('all');
  }

  function selectMuscle(muscle: SplitExercisePickerMuscleFilter) {
    setMuscleFilter(muscle);
  }

  return {
    regionFilter,
    muscleFilter: activeMuscleFilter,
    regionOptions: REGION_ORDER.map(value => ({
      value,
      label: SPLIT_BODY_REGION_LABELS[value],
    })),
    muscleOptions: availableMuscleFilters.map(value => ({
      value,
      label: value === 'all' ? 'Все' : SPLIT_MUSCLE_LABELS[value],
    })),
    filteredItems,
    selectRegion,
    selectMuscle,
  };
}
