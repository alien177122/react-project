import {useCallback, useMemo, useState} from 'react';
import {EXERCISES} from '../data/exercises.ts';
import {resolveProgramSettings} from '../program/resolveProgramSettings.ts';
import type {TrainingPreferences, UserData} from '../types/index.ts';
import {DEFAULT_TRAINING_PREFERENCES, getTrainingExercises} from '../utils/training.ts';

export interface UseTrainingProgramOptions {
  token: string;
  userData: UserData | null;
  setUserData: (value: UserData | null) => void;
  saveUser: (data: UserData, token: string) => Promise<{ok: boolean} | void> | void;
}

export function useTrainingProgram({
  token,
  userData,
  setUserData,
  saveUser,
}: UseTrainingProgramOptions) {
  const [restDismissed, setRestDismissed] = useState(false);

  const savedExerciseKeys = useMemo(
    () => new Set(userData?.exercises.map(exercise => exercise.exerciseKey) ?? []),
    [userData?.exercises],
  );

  const allSaved = userData
    ? Object.keys(EXERCISES).every(key => savedExerciseKeys.has(key))
    : false;

  const completedSessions = userData?.trainingProgress?.completedSessions ?? 0;
  const programSettings = resolveProgramSettings(userData, '2.0');
  const daysPerWeek = programSettings.daysPerWeek;
  const totalSessions = 8 * daysPerWeek;

  const currentDayIdx = completedSessions % daysPerWeek;
  const currentWeekIdx = Math.floor(completedSessions / daysPerWeek);
  const programDone = completedSessions >= totalSessions;
  const nextSessions = completedSessions + 1;
  const nextDayIdx = nextSessions % daysPerWeek;
  const nextWeekIdx = Math.floor(nextSessions / daysPerWeek);

  const isMicrocycleBreak =
    completedSessions > 0 &&
    completedSessions % daysPerWeek === 0 &&
    !programDone &&
    !restDismissed;
  const completedMicrocycle = Math.ceil(completedSessions / daysPerWeek);

  const missingExercises = useMemo(
    () =>
      Object.entries(EXERCISES)
        .filter(([key]) => !savedExerciseKeys.has(key))
        .map(([, exercise]) => exercise.name),
    [savedExerciseKeys],
  );

  const trainingPreferences = userData?.trainingPreferences ?? DEFAULT_TRAINING_PREFERENCES;

  const currentTrainingExercises = useMemo(
    () =>
      getTrainingExercises(
        currentDayIdx,
        currentWeekIdx,
        userData?.exercises ?? [],
        trainingPreferences,
        programSettings,
      ),
    [currentDayIdx, currentWeekIdx, userData?.exercises, trainingPreferences, programSettings],
  );

  const nextTrainingExercises = useMemo(
    () =>
      getTrainingExercises(
        nextDayIdx,
        nextWeekIdx,
        userData?.exercises ?? [],
        trainingPreferences,
        programSettings,
      ),
    [nextDayIdx, nextWeekIdx, userData?.exercises, trainingPreferences, programSettings],
  );

  const updateProgramSettings = useCallback(
    (patch: Partial<typeof programSettings>) => {
      if (!userData) return;

      const updated: UserData = {
        ...userData,
        programSettings: {
          ...programSettings,
          ...patch,
        },
      };

      setUserData(updated);
      void saveUser(updated, token);
    },
    [userData, programSettings, setUserData, saveUser, token],
  );

  const updateTrainingPreferences = useCallback(
    (patch: Partial<TrainingPreferences>) => {
      if (!userData) return;

      const updated: UserData = {
        ...userData,
        trainingPreferences: {
          ...trainingPreferences,
          ...patch,
        },
      };

      setUserData(updated);
      void saveUser(updated, token);
    },
    [userData, trainingPreferences, setUserData, saveUser, token],
  );

  function updateTrainingProgress(completed: number) {
    if (!userData) return;

    const updated: UserData = {
      ...userData,
      trainingProgress: {completedSessions: completed},
    };

    setUserData(updated);
    void saveUser(updated, token);
  }

  function handleComplete() {
    if (!userData || programDone) return;
    updateTrainingProgress(completedSessions + 1);
    setRestDismissed(false);
  }

  function handleReset() {
    if (!userData) return;
    updateTrainingProgress(0);
    setRestDismissed(false);
  }

  function resetTrainingState() {
    setRestDismissed(false);
  }

  return {
    allSaved,
    missingExercises,
    completedSessions,
    currentDayIdx,
    currentWeekIdx,
    programDone,
    nextSessions,
    nextDayIdx,
    nextWeekIdx,
    isMicrocycleBreak,
    completedMicrocycle,
    currentTrainingExercises,
    nextTrainingExercises,
    trainingPreferences,
    programSettings,
    updateTrainingPreferences,
    updateProgramSettings,
    handleComplete,
    handleReset,
    setRestDismissed,
    resetTrainingState,
    totalSessions,
  };
}
