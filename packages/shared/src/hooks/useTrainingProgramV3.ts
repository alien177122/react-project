import {useCallback, useMemo, useState} from 'react';
import {WEEKS_V3} from '../program/v3/constants.ts';
import {EX_COUNT_V3, EXERCISE_KEYS_V3} from '../program/v3/exercises.ts';
import {getTrainingExercisesV3} from '../program/v3/trainingV3.ts';
import {resolveProgramSettings} from '../program/resolveProgramSettings.ts';
import type {ActiveProgram, UserData} from '../types/index.ts';
import {DEFAULT_TRAINING_PREFERENCES} from '../utils/training.ts';

export interface UseTrainingProgramV3Options {
  token: string;
  userData: UserData | null;
  setUserData: (value: UserData | null) => void;
  saveUser: (data: UserData, token: string) => Promise<{ok: boolean} | void> | void;
}

function getV3CompletedSessions(userData: UserData | null): number {
  return userData?.trainingProgressByProgram?.['3.0']?.completedSessions ?? 0;
}

export function useTrainingProgramV3({
  token,
  userData,
  setUserData,
  saveUser,
}: UseTrainingProgramV3Options) {
  const [restDismissed, setRestDismissed] = useState(false);

  const completedSessions = getV3CompletedSessions(userData);
  const trainingPreferences = userData?.trainingPreferences ?? DEFAULT_TRAINING_PREFERENCES;
  const programSettings = resolveProgramSettings(userData, '3.0');
  const daysPerWeek = programSettings.daysPerWeek;
  const totalSessions = WEEKS_V3 * daysPerWeek;
  const testResults = userData?.testResults;

  const currentDayIdx = completedSessions % daysPerWeek;
  const currentWeekIdx = Math.floor(completedSessions / daysPerWeek);
  const programDone = completedSessions >= totalSessions;
  const nextSessions = completedSessions + 1;
  const nextDayIdx = nextSessions % daysPerWeek;
  const nextWeekIdx = Math.floor(nextSessions / daysPerWeek);

  const isMicrocycleBreak =
    completedSessions > 0 && completedSessions % WEEKS_V3 === 0 && !programDone && !restDismissed;
  const completedMicrocycle = Math.floor(completedSessions / WEEKS_V3);

  const currentTrainingExercises = useMemo(
    () =>
      getTrainingExercisesV3(
        currentDayIdx,
        currentWeekIdx,
        userData?.exercises ?? [],
        testResults,
        trainingPreferences,
        programSettings,
      ),
    [
      currentDayIdx,
      currentWeekIdx,
      userData?.exercises,
      testResults,
      trainingPreferences,
      programSettings,
    ],
  );

  const nextTrainingExercises = useMemo(
    () =>
      getTrainingExercisesV3(
        nextDayIdx,
        nextWeekIdx,
        userData?.exercises ?? [],
        testResults,
        trainingPreferences,
        programSettings,
      ),
    [
      nextDayIdx,
      nextWeekIdx,
      userData?.exercises,
      testResults,
      trainingPreferences,
      programSettings,
    ],
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
    (patch: Partial<typeof trainingPreferences>) => {
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

    const program: ActiveProgram = '3.0';
    const updated: UserData = {
      ...userData,
      activeProgram: program,
      trainingProgressByProgram: {
        ...userData.trainingProgressByProgram,
        [program]: {completedSessions: completed},
      },
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
    allSaved: true,
    missingExercises: [] as string[],
    savedCount: EX_COUNT_V3,
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
    exerciseKeys: EXERCISE_KEYS_V3,
  };
}
