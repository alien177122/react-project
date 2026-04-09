import { EXERCISES } from '../data/exercises.ts'
import type { FileWorkspaceResponse, UserData } from '../types/index.ts'
import {
  ApiNetworkError,
  ApiTimeoutError,
  ApiUnauthorizedError,
  type ApiClient,
} from './client.ts'

export interface AuthRequestBody {
  name: string
  password: string
}

export interface AuthResponse {
  token?: string
  name?: string
  error?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function positiveNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null
}

function positiveInteger(value: unknown): number | null {
  return Number.isInteger(value) && Number(value) > 0 ? Number(value) : null
}

function nonNegativeInteger(value: unknown): number | null {
  return Number.isInteger(value) && Number(value) >= 0 ? Number(value) : null
}

function isKnownExerciseKey(exerciseKey: string): boolean {
  return Object.prototype.hasOwnProperty.call(EXERCISES, exerciseKey)
}

export function normalizeLoadedUser(input: unknown, fallbackName: string): UserData {
  if (!isRecord(input)) return { name: fallbackName, exercises: [] }

  const name = typeof input.name === 'string' && input.name.trim()
    ? input.name.trim()
    : fallbackName

  const exercises = Array.isArray(input.exercises)
    ? input.exercises.flatMap(exercise => {
      if (!isRecord(exercise)) return []

      const exerciseKey = typeof exercise.exerciseKey === 'string' ? exercise.exerciseKey.trim() : ''
      const date = typeof exercise.date === 'string' ? exercise.date.trim() : ''
      if (!exerciseKey || !date || !isKnownExerciseKey(exerciseKey)) return []

      const testWeight = positiveNumber(exercise.testWeight)
      const testReps = positiveInteger(exercise.testReps)
      const oneRM = positiveNumber(exercise.oneRM)

      if (testWeight === null || testReps === null || oneRM === null) return []

      return [{
        exerciseKey,
        testWeight,
        testReps,
        oneRM,
        date,
        ...(positiveNumber(exercise.bodyWeight) !== null
          ? { bodyWeight: positiveNumber(exercise.bodyWeight)! }
          : {}),
      }]
    })
    : []

  const completedSessions = isRecord(input.trainingProgress)
    ? nonNegativeInteger(input.trainingProgress.completedSessions)
    : null

  if (completedSessions !== null) {
    return {
      name,
      exercises,
      trainingProgress: { completedSessions },
    }
  }

  return { name, exercises }
}

function normalizeProtectedApiError(error: unknown): Error {
  if (error instanceof ApiUnauthorizedError) return new Error('Сессия истекла')
  if (error instanceof Error) return error
  return new Error('Ошибка запроса')
}

export function createTrainingApi(client: ApiClient) {
  return {
    async loadUser(name: string, token: string): Promise<UserData | null> {
      try {
        const payload = await client.get<unknown>(`/users/${encodeURIComponent(name)}`, { token })
        return normalizeLoadedUser(payload, name)
      } catch (error) {
        if (error instanceof ApiUnauthorizedError) return null
        return { name, exercises: [] }
      }
    },

    async saveUser(data: UserData, token: string): Promise<void> {
      await client.put<void>(`/users/${encodeURIComponent(data.name)}`, data, {
        token,
        parseAs: 'void',
      })
    },

    async apiAuth(path: 'login' | 'register', body: AuthRequestBody): Promise<AuthResponse> {
      try {
        return await client.post<AuthResponse>(`/auth/${path}`, body, {
          handleUnauthorized: false,
        })
      } catch (error) {
        if (error instanceof ApiNetworkError || error instanceof ApiTimeoutError) {
          return { error: 'Нет соединения с сервером' }
        }

        if (error instanceof Error) {
          return { error: error.message }
        }

        return { error: 'Ошибка авторизации' }
      }
    },

    async loadFileWorkspace(token: string): Promise<FileWorkspaceResponse> {
      try {
        return await client.get<FileWorkspaceResponse>('/files/workspace', { token })
      } catch (error) {
        throw normalizeProtectedApiError(error)
      }
    },

    async analyzeFileWorkspace(token: string): Promise<FileWorkspaceResponse> {
      try {
        return await client.post<FileWorkspaceResponse>('/files/workspace/analyze', undefined, { token })
      } catch (error) {
        throw normalizeProtectedApiError(error)
      }
    },

    async analyzeSingleWorkspaceFile(token: string, fileName: string): Promise<FileWorkspaceResponse> {
      try {
        return await client.post<FileWorkspaceResponse>(`/files/workspace/analyze/${encodeURIComponent(fileName)}`, undefined, { token })
      } catch (error) {
        throw normalizeProtectedApiError(error)
      }
    },
  }
}
