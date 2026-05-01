import AsyncStorage from '@react-native-async-storage/async-storage';

import type { SavedExercise, UserData } from '@/types';

const STORAGE_KEY = 'training-calculator:user-data:v1';

const DEFAULT_DATA: UserData = {
  name: 'Атлет',
  exercises: [],
  trainingProgress: { completedSessions: 0 },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isSavedExercise(value: unknown): value is SavedExercise {
  if (!isRecord(value)) return false;

  return (
    typeof value.exerciseKey === 'string' &&
    typeof value.testWeight === 'number' &&
    Number.isFinite(value.testWeight) &&
    typeof value.testReps === 'number' &&
    Number.isInteger(value.testReps) &&
    typeof value.oneRM === 'number' &&
    Number.isFinite(value.oneRM) &&
    typeof value.date === 'string' &&
    (value.bodyWeight === undefined ||
      (typeof value.bodyWeight === 'number' && Number.isFinite(value.bodyWeight)))
  );
}

function normalizeUserData(value: unknown): UserData {
  if (!isRecord(value)) return DEFAULT_DATA;

  const exercises = Array.isArray(value.exercises)
    ? value.exercises.filter(isSavedExercise)
    : DEFAULT_DATA.exercises;

  const completedSessions =
    isRecord(value.trainingProgress) &&
    typeof value.trainingProgress.completedSessions === 'number' &&
    Number.isInteger(value.trainingProgress.completedSessions) &&
    value.trainingProgress.completedSessions >= 0
      ? value.trainingProgress.completedSessions
      : DEFAULT_DATA.trainingProgress?.completedSessions ?? 0;

  return {
    name:
      typeof value.name === 'string' && value.name.trim().length > 0
        ? value.name.trim()
        : DEFAULT_DATA.name,
    exercises,
    trainingProgress: { completedSessions },
  };
}

export const storage = {
  async load(): Promise<UserData> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_DATA;

      return normalizeUserData(JSON.parse(raw) as unknown);
    } catch {
      return DEFAULT_DATA;
    }
  },

  async save(data: UserData): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  },
};
