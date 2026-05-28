import {useCallback, useEffect, useMemo, useState} from 'react';
import type {CustomSplit, SplitMuscleId, UserData} from '../types/index.ts';
import type {TrainingDayDef} from '../types/index.ts';
import {
  allMusclesAssigned,
  buildDayPreview,
  createDefaultSplit,
  mergeToTwoDays,
  validateSplit,
} from '../utils/split-constructor.ts';
import {SPLIT_MUSCLE_LABELS} from '../data/split-muscles.ts';
import {
  normalizeLegExercises,
  splitUsesLegs,
  type LegExerciseKey,
} from '../data/split-exercises.ts';

export interface UseSplitConstructorOptions {
  userData: UserData;
  setUserData: (value: UserData) => void;
  saveUser: (data: UserData, token: string) => Promise<{ok: boolean} | void>;
  token: string;
  initialSplitId?: string | null;
  onSplitIdChange?: (id: string | null) => void;
  onSaveError?: (message: string) => void;
}

export function useSplitConstructor({
  userData,
  setUserData,
  saveUser,
  token,
  initialSplitId,
  onSplitIdChange,
  onSaveError,
}: UseSplitConstructorOptions) {
  const savedSplits = userData.splits ?? [];
  const [draft, setDraft] = useState<CustomSplit>(() => {
    const existing = savedSplits.find(split => split.id === initialSplitId) ?? savedSplits[0];
    return existing
      ? {...existing, days: existing.days.map(day => ({...day, muscles: [...day.muscles]}))}
      : createDefaultSplit();
  });
  const [previewWeek, setPreviewWeek] = useState(0);
  const [volumeWarning, setVolumeWarning] = useState<string | null>(null);

  useEffect(() => {
    if (!initialSplitId) return;
    const found = savedSplits.find(split => split.id === initialSplitId);
    if (found) {
      setDraft({
        ...found,
        days: found.days.map(day => ({...day, muscles: [...day.muscles]})),
      });
    }
  }, [initialSplitId, savedSplits]);

  const validationError = useMemo(() => validateSplit(draft), [draft]);

  const dayPreviews = useMemo(() => {
    return draft.days.map(day => {
      const exercises = buildDayPreview({
        split: draft,
        dayNumber: day.dayNumber,
        weekIndex: previewWeek,
        savedExercises: userData.exercises,
      });
      const dayDef: TrainingDayDef = {
        dayNumber: day.dayNumber,
        name: day.label ?? `День ${day.dayNumber}`,
        exerciseKeys: exercises.map(row => row.key),
      };
      return {day, dayDef, exercises};
    });
  }, [draft, previewWeek, userData.exercises]);

  const updateDraft = useCallback((patch: Partial<CustomSplit>) => {
    setDraft(current => ({...current, ...patch, updatedAt: new Date().toISOString()}));
  }, []);

  const setDaysPerWeek = useCallback((daysPerWeek: 2 | 3) => {
    setDraft(current => {
      let days = current.days.map(day => ({
        ...day,
        muscles: [...day.muscles] as SplitMuscleId[],
      }));
      if (daysPerWeek === 2) {
        days = mergeToTwoDays(
          days.length === 3
            ? days
            : [
                {dayNumber: 1, muscles: ['chest', 'biceps']},
                {dayNumber: 2, muscles: ['legs', 'shoulders']},
                {dayNumber: 3, muscles: ['back', 'triceps']},
              ],
        );
      } else if (days.length < 3) {
        const assigned = new Set(days.flatMap(day => day.muscles));
        const missing = (Object.keys(SPLIT_MUSCLE_LABELS) as SplitMuscleId[]).filter(
          muscle => !assigned.has(muscle),
        );
        days = [
          days[0] ?? {dayNumber: 1, muscles: ['chest', 'biceps']},
          days[1] ?? {dayNumber: 2, muscles: ['legs', 'shoulders']},
          {dayNumber: 3, muscles: missing.length ? missing : ['back', 'triceps']},
        ];
      }
      return {
        ...current,
        daysPerWeek,
        days: days.slice(0, daysPerWeek).map((day, index) => ({
          ...day,
          dayNumber: (index + 1) as 1 | 2 | 3,
        })),
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const moveMuscle = useCallback((muscle: SplitMuscleId, targetDay: 1 | 2 | 3) => {
    setDraft(current => {
      const days = current.days.map(day => ({
        ...day,
        muscles:
          day.dayNumber === targetDay
            ? [...new Set([...day.muscles.filter(item => item !== muscle), muscle])]
            : day.muscles.filter(item => item !== muscle),
      }));
      const usesLegs = splitUsesLegs(days);
      return {
        ...current,
        days,
        legExercises: usesLegs ? normalizeLegExercises(current.legExercises) : current.legExercises,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const toggleLegExercise = useCallback((key: LegExerciseKey) => {
    setDraft(current => {
      const legs = normalizeLegExercises(current.legExercises);
      if (legs.includes(key)) return current;

      const next: [LegExerciseKey, LegExerciseKey] =
        legs[0] === key || legs[1] === key ? legs : [legs[0], key];

      return {
        ...current,
        legExercises: next,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const saveSplit = useCallback(async () => {
    const error = validateSplit(draft);
    if (error) {
      onSaveError?.(error);
      return;
    }

    const nextSplits = [
      ...savedSplits.filter(split => split.id !== draft.id),
      {...draft, updatedAt: new Date().toISOString()},
    ];

    const updated: UserData = {
      ...userData,
      splits: nextSplits,
      activeSplitId: draft.id,
    };

    setUserData(updated);
    onSplitIdChange?.(draft.id);

    try {
      const result = await saveUser(updated, token);
      if (result && 'ok' in result && !result.ok) {
        throw new Error('Failed to save');
      }
    } catch {
      onSaveError?.('Не удалось сохранить сплит');
    }
  }, [draft, onSaveError, onSplitIdChange, saveUser, savedSplits, setUserData, token, userData]);

  const createNewSplit = useCallback(() => {
    const split = createDefaultSplit(`Сплит ${savedSplits.length + 1}`);
    setDraft(split);
    onSplitIdChange?.(split.id);
  }, [onSplitIdChange, savedSplits.length]);

  const duplicateLast = useCallback(() => {
    const last = savedSplits[0];
    if (!last) return;
    const copy: CustomSplit = {
      ...last,
      id: crypto.randomUUID(),
      name: `${last.name} (копия)`,
      days: last.days.map(day => ({...day, muscles: [...day.muscles]})),
      legExercises: last.legExercises ? normalizeLegExercises(last.legExercises) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDraft(copy);
    onSplitIdChange?.(copy.id);
  }, [onSplitIdChange, savedSplits]);

  const selectSplit = useCallback(
    (id: string) => {
      const found = savedSplits.find(split => split.id === id);
      if (!found) return;
      setDraft({
        ...found,
        days: found.days.map(day => ({...day, muscles: [...day.muscles]})),
      });
      onSplitIdChange?.(id);
    },
    [onSplitIdChange, savedSplits],
  );

  const setFixedWeight = useCallback((exerciseKey: string, weekIndex: number, weight: number) => {
    setDraft(current => {
      const existing = current.fixedWeights?.[exerciseKey] ?? Array(8).fill(0);
      const weeks = [...existing];
      weeks[weekIndex] = weight;
      return {
        ...current,
        weightMode: 'fixed',
        fixedWeights: {...current.fixedWeights, [exerciseKey]: weeks},
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  useEffect(() => {
    if (!allMusclesAssigned(draft)) {
      setVolumeWarning(null);
      return;
    }
    setVolumeWarning(null);
  }, [draft]);

  return {
    draft,
    savedSplits,
    previewWeek,
    setPreviewWeek,
    dayPreviews,
    validationError,
    volumeWarning,
    updateDraft,
    setDaysPerWeek,
    moveMuscle,
    saveSplit,
    createNewSplit,
    duplicateLast,
    selectSplit,
    setFixedWeight,
    toggleLegExercise,
    usesLegs: splitUsesLegs(draft.days),
    legExercises: normalizeLegExercises(draft.legExercises),
  };
}
