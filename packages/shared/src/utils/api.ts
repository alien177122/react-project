import {EXERCISES} from '../data/exercises.ts';
import {isV3ExerciseKey} from '../program/v3/exercises.ts';
import {normalizeLegExercises} from '../data/split-exercises.ts';
import type {
  ActiveProgram,
  CustomSplit,
  FileWorkspaceResponse,
  JournalSession,
  JournalSet,
  SplitMuscleId,
  TestResult,
  TestWeekNumber,
  UserData,
} from '../types/index.ts';
import type {AuthResult} from '../types/auth.ts';
import {JOURNAL_LIMITS} from './journalLimits.ts';

const AUTH_EXPIRED = 'AUTH_EXPIRED';
const LOAD_USER_FAILED = 'Не удалось загрузить данные пользователя';

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');

  if (typeof globalThis.atob === 'function') {
    return globalThis.atob(padded);
  }

  const buffer = (
    globalThis as {
      Buffer?: {
        from(input: string, encoding: string): {toString(encoding: string): string};
      };
    }
  ).Buffer;

  if (buffer) {
    return buffer.from(padded, 'base64').toString('utf-8');
  }

  throw new Error('Base64 decoder is unavailable');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function positiveNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null;
}

function positiveInteger(value: unknown): number | null {
  return Number.isInteger(value) && Number(value) > 0 ? Number(value) : null;
}

function nonNegativeInteger(value: unknown): number | null {
  return Number.isInteger(value) && Number(value) >= 0 ? Number(value) : null;
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function trimNote(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, JOURNAL_LIMITS.MAX_NOTE_LENGTH);
}

function normalizeJournalSet(set: unknown, index: number): JournalSet | null {
  if (!isRecord(set)) return null;

  const weight = positiveNumber(set.weight);
  const reps = positiveInteger(set.reps);
  if (weight === null || reps === null) return null;

  const setIndex = positiveInteger(set.setIndex) ?? index + 1;
  const normalized: JournalSet = {setIndex, weight, reps};

  if (set.rpe !== undefined) {
    if (typeof set.rpe !== 'number' || !Number.isFinite(set.rpe) || set.rpe < 6 || set.rpe > 10) {
      return null;
    }
    normalized.rpe = set.rpe;
  }

  const note = trimNote(set.note);
  if (note) normalized.note = note;

  const additionalWeight = positiveNumber(set.additionalWeight);
  if (additionalWeight !== null) normalized.additionalWeight = additionalWeight;

  return normalized;
}

function normalizeJournalSession(session: unknown): JournalSession | null {
  if (!isRecord(session)) return null;

  const id = typeof session.id === 'string' ? session.id.trim() : '';
  const exerciseKey = typeof session.exerciseKey === 'string' ? session.exerciseKey.trim() : '';
  const date = typeof session.date === 'string' ? session.date.trim() : '';
  const createdAt = typeof session.createdAt === 'string' ? session.createdAt.trim() : '';

  if (!id || !exerciseKey || !date || !ISO_DATE_RE.test(date)) return null;
  if (!EXERCISES[exerciseKey]) return null;
  if (!createdAt) return null;
  if (!Array.isArray(session.sets) || session.sets.length === 0) return null;

  const sets = session.sets
    .map((set, index) => normalizeJournalSet(set, index))
    .filter((set): set is JournalSet => set !== null);

  if (sets.length === 0) return null;

  const normalized: JournalSession = {id, exerciseKey, date, sets, createdAt};

  const sessionNote = trimNote(session.sessionNote);
  if (sessionNote) normalized.sessionNote = sessionNote;

  if (typeof session.updatedAt === 'string' && session.updatedAt.trim()) {
    normalized.updatedAt = session.updatedAt.trim();
  }

  return normalized;
}

export function jwtName(token: string): string | null {
  try {
    return JSON.parse(decodeBase64Url(token.split('.')[1] ?? '')).name ?? null;
  } catch {
    return null;
  }
}

export function normalizeLoadedUser(input: unknown, fallbackName: string): UserData {
  if (!isRecord(input)) return {name: fallbackName, exercises: []};

  const name =
    typeof input.name === 'string' && input.name.trim() ? input.name.trim() : fallbackName;

  const exercises = Array.isArray(input.exercises)
    ? input.exercises.flatMap(exercise => {
        if (!isRecord(exercise)) return [];

        const exerciseKey =
          typeof exercise.exerciseKey === 'string' ? exercise.exerciseKey.trim() : '';
        const date = typeof exercise.date === 'string' ? exercise.date.trim() : '';

        if (!exerciseKey || !date) return [];
        if (!EXERCISES[exerciseKey] && !isV3ExerciseKey(exerciseKey)) return [];

        const testWeight = positiveNumber(exercise.testWeight);
        const testReps = positiveInteger(exercise.testReps);
        const oneRM = positiveNumber(exercise.oneRM);

        if (testWeight === null || testReps === null || oneRM === null) return [];

        return [
          {
            exerciseKey,
            testWeight,
            testReps,
            oneRM,
            date,
            ...(positiveNumber(exercise.bodyWeight) !== null
              ? {bodyWeight: positiveNumber(exercise.bodyWeight)!}
              : {}),
          },
        ];
      })
    : [];

  const completedSessions = isRecord(input.trainingProgress)
    ? nonNegativeInteger(input.trainingProgress.completedSessions)
    : null;

  const journal = Array.isArray(input.journal)
    ? input.journal
        .map(session => normalizeJournalSession(session))
        .filter((session): session is JournalSession => session !== null)
    : [];

  const splits = Array.isArray(input.splits)
    ? input.splits
        .map(split => normalizeLoadedSplit(split))
        .filter((split): split is CustomSplit => split !== null)
    : [];

  const activeSplitId =
    typeof input.activeSplitId === 'string' && input.activeSplitId.trim()
      ? input.activeSplitId.trim()
      : null;

  const activeProgram: ActiveProgram | undefined =
    input.activeProgram === '3.0' ? '3.0' : input.activeProgram === '2.0' ? '2.0' : undefined;

  let trainingProgressByProgram:
    | Partial<Record<ActiveProgram, {completedSessions: number}>>
    | undefined;
  if (isRecord(input.trainingProgressByProgram)) {
    const byProgram = input.trainingProgressByProgram as Record<string, unknown>;
    const normalized: Partial<Record<ActiveProgram, {completedSessions: number}>> = {};
    for (const program of ['2.0', '3.0'] as const) {
      const block = byProgram[program];
      if (!isRecord(block)) continue;
      const sessions = nonNegativeInteger(block.completedSessions);
      if (sessions === null) continue;
      normalized[program] = {completedSessions: sessions};
    }
    if (Object.keys(normalized).length > 0) trainingProgressByProgram = normalized;
  }

  const testResults = Array.isArray(input.testResults)
    ? input.testResults.flatMap((entry): TestResult[] => {
        if (!isRecord(entry)) return [];
        const exerciseKey = typeof entry.exerciseKey === 'string' ? entry.exerciseKey.trim() : '';
        const testWeek = entry.testWeek;
        const date = typeof entry.date === 'string' ? entry.date.trim() : '';
        const weight = positiveNumber(entry.weight);
        const reps = positiveInteger(entry.reps);
        if (!exerciseKey || !date || weight === null || reps === null) return [];
        if (testWeek !== 4 && testWeek !== 8 && testWeek !== 12 && testWeek !== 16) return [];
        if (!isV3ExerciseKey(exerciseKey)) return [];
        return [
          {
            exerciseKey,
            testWeek: testWeek as TestWeekNumber,
            weight,
            reps,
            date,
          },
        ];
      })
    : [];

  const base: UserData = {name, exercises};
  if (completedSessions !== null) base.trainingProgress = {completedSessions};
  if (trainingProgressByProgram && Object.keys(trainingProgressByProgram).length > 0) {
    base.trainingProgressByProgram = trainingProgressByProgram;
  }
  if (activeProgram) base.activeProgram = activeProgram;
  if (testResults.length > 0) base.testResults = testResults;
  if (journal.length > 0) base.journal = journal;
  if (splits.length > 0) base.splits = splits;
  if (activeSplitId) base.activeSplitId = activeSplitId;

  return base;
}

const SPLIT_MUSCLES = new Set<SplitMuscleId>([
  'chest',
  'biceps',
  'legs',
  'shoulders',
  'back',
  'triceps',
]);

function normalizeLoadedSplit(input: unknown): CustomSplit | null {
  if (!isRecord(input)) return null;

  const id = typeof input.id === 'string' ? input.id.trim() : '';
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const createdAt = typeof input.createdAt === 'string' ? input.createdAt.trim() : '';
  const updatedAt = typeof input.updatedAt === 'string' ? input.updatedAt.trim() : '';
  const daysPerWeek = input.daysPerWeek;

  if (!id || !name || !createdAt || !updatedAt) return null;
  if (daysPerWeek !== 2 && daysPerWeek !== 3) return null;
  if (typeof input.varyIntensity !== 'boolean') return null;
  if (
    input.weightMode !== 'progression' &&
    input.weightMode !== 'fixed' &&
    input.weightMode !== 'scheme_only'
  ) {
    return null;
  }
  if (!Array.isArray(input.days) || input.days.length !== daysPerWeek) return null;

  const days = input.days.flatMap(day => {
    if (!isRecord(day)) return [];
    const dayNumber = day.dayNumber;
    if (dayNumber !== 1 && dayNumber !== 2 && dayNumber !== 3) return [];
    if (!Array.isArray(day.muscles) || day.muscles.length === 0) return [];

    const muscles = day.muscles.flatMap(muscle => {
      if (typeof muscle !== 'string' || !SPLIT_MUSCLES.has(muscle as SplitMuscleId)) return [];
      return [muscle as SplitMuscleId];
    });

    if (muscles.length === 0) return [];
    return [{dayNumber: dayNumber as 1 | 2 | 3, muscles}];
  });

  if (days.length !== daysPerWeek) return null;

  const split: CustomSplit = {
    id,
    name,
    daysPerWeek,
    days,
    varyIntensity: input.varyIntensity,
    weightMode: input.weightMode,
    createdAt,
    updatedAt,
  };

  if (Array.isArray(input.legExercises) && input.legExercises.length === 2) {
    split.legExercises = normalizeLegExercises(input.legExercises);
  }

  return split;
}

async function apiJson<T>(
  baseUrl: string,
  path: string,
  token: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });

  if (response.status === 401 || response.status === 403) {
    throw new Error('Сессия истекла');
  }

  if (!response.ok) {
    let message = 'Ошибка запроса';

    try {
      const errorBody = await response.json();
      if (typeof errorBody?.error === 'string') message = errorBody.error;
    } catch {
      message = 'Ошибка запроса';
    }

    throw new Error(message);
  }

  return response.json();
}

async function parseJsonSafe(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export function createApiClient(baseUrl: string) {
  async function loadUser(name: string, token: string): Promise<UserData | null> {
    try {
      const response = await fetch(`${baseUrl}/users/${encodeURIComponent(name)}`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      if (response.status === 401 || response.status === 403) {
        throw new Error(AUTH_EXPIRED);
      }

      if (!response.ok) throw new Error(LOAD_USER_FAILED);

      return normalizeLoadedUser(await response.json(), name);
    } catch (error) {
      if (error instanceof Error && error.message === AUTH_EXPIRED) return null;
      throw error instanceof Error ? error : new Error(LOAD_USER_FAILED);
    }
  }

  async function saveUser(data: UserData, token: string): Promise<{ok: boolean}> {
    try {
      const response = await fetch(`${baseUrl}/users/${encodeURIComponent(data.name)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return {ok: response.ok};
    } catch {
      return {ok: false};
    }
  }

  async function apiAuth(
    path: 'login' | 'register',
    body: {name: string; password: string},
  ): Promise<AuthResult> {
    try {
      const response = await fetch(`${baseUrl}/auth/${path}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });

      const payload = await parseJsonSafe(response);

      if (!response.ok) {
        if (isRecord(payload) && typeof payload.error === 'string' && payload.error.trim()) {
          return {error: payload.error.trim()};
        }

        return {
          error: response.status >= 500 ? 'Ошибка сервера' : 'Ошибка авторизации',
        };
      }

      if (!isRecord(payload)) {
        return {error: 'Некорректный ответ сервера'};
      }

      return {
        ...(typeof payload.token === 'string' ? {token: payload.token} : {}),
        ...(typeof payload.name === 'string' ? {name: payload.name} : {}),
        ...(typeof payload.error === 'string' ? {error: payload.error} : {}),
      };
    } catch {
      return {error: 'Нет соединения с сервером'};
    }
  }

  function loadFileWorkspace(token: string): Promise<FileWorkspaceResponse> {
    return apiJson(baseUrl, '/files/workspace', token);
  }

  function analyzeFileWorkspace(token: string): Promise<FileWorkspaceResponse> {
    return apiJson(baseUrl, '/files/workspace/analyze', token, {method: 'POST'});
  }

  function analyzeSingleWorkspaceFile(
    token: string,
    fileName: string,
  ): Promise<FileWorkspaceResponse> {
    return apiJson(baseUrl, `/files/workspace/analyze/${encodeURIComponent(fileName)}`, token, {
      method: 'POST',
    });
  }

  return {
    jwtName,
    loadUser,
    saveUser,
    apiAuth,
    loadFileWorkspace,
    analyzeFileWorkspace,
    analyzeSingleWorkspaceFile,
  };
}
