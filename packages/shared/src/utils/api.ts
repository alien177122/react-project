import { EXERCISES } from '../data/exercises.ts'
import type { FileWorkspaceResponse, UserData } from '../types/index.ts'
import type { AuthResult } from '../types/auth.ts'

const AUTH_EXPIRED = 'AUTH_EXPIRED'

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')

  if (typeof globalThis.atob === 'function') {
    return globalThis.atob(padded)
  }

  const buffer = (globalThis as {
    Buffer?: {
      from(input: string, encoding: string): { toString(encoding: string): string }
    }
  }).Buffer

  if (buffer) {
    return buffer.from(padded, 'base64').toString('utf-8')
  }

  throw new Error('Base64 decoder is unavailable')
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

export function jwtName(token: string): string | null {
  try {
    return JSON.parse(decodeBase64Url(token.split('.')[1] ?? '')).name ?? null
  } catch {
    return null
  }
}

function normalizeLoadedUser(input: unknown, fallbackName: string): UserData {
  if (!isRecord(input)) return { name: fallbackName, exercises: [] }

  const name =
    typeof input.name === 'string' && input.name.trim()
      ? input.name.trim()
      : fallbackName

  const exercises = Array.isArray(input.exercises)
    ? input.exercises.flatMap(exercise => {
        if (!isRecord(exercise)) return []

        const exerciseKey =
          typeof exercise.exerciseKey === 'string'
            ? exercise.exerciseKey.trim()
            : ''
        const date = typeof exercise.date === 'string' ? exercise.date.trim() : ''

        if (!exerciseKey || !date || !EXERCISES[exerciseKey]) return []

        const testWeight = positiveNumber(exercise.testWeight)
        const testReps = positiveInteger(exercise.testReps)
        const oneRM = positiveNumber(exercise.oneRM)

        if (testWeight === null || testReps === null || oneRM === null) return []

        return [
          {
            exerciseKey,
            testWeight,
            testReps,
            oneRM,
            date,
            ...(positiveNumber(exercise.bodyWeight) !== null
              ? { bodyWeight: positiveNumber(exercise.bodyWeight)! }
              : {}),
          },
        ]
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

async function apiJson<T>(baseUrl: string, path: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  })

  if (response.status === 401 || response.status === 403) {
    throw new Error('Сессия истекла')
  }

  if (!response.ok) {
    let message = 'Ошибка запроса'

    try {
      const errorBody = await response.json()
      if (typeof errorBody?.error === 'string') message = errorBody.error
    } catch {
      message = 'Ошибка запроса'
    }

    throw new Error(message)
  }

  return response.json()
}

export function createApiClient(baseUrl: string) {
  async function loadUser(name: string, token: string): Promise<UserData | null> {
    try {
      const response = await fetch(`${baseUrl}/users/${encodeURIComponent(name)}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.status === 401 || response.status === 403) {
        throw new Error(AUTH_EXPIRED)
      }

      if (!response.ok) return { name, exercises: [] }

      return normalizeLoadedUser(await response.json(), name)
    } catch (error) {
      if (error instanceof Error && error.message === AUTH_EXPIRED) return null
      return { name, exercises: [] }
    }
  }

  async function saveUser(data: UserData, token: string): Promise<void> {
    await fetch(`${baseUrl}/users/${encodeURIComponent(data.name)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
  }

  async function apiAuth(
    path: 'login' | 'register',
    body: { name: string; password: string },
  ): Promise<AuthResult> {
    try {
      const response = await fetch(`${baseUrl}/auth/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      return await response.json()
    } catch {
      return { error: 'Нет соединения с сервером' }
    }
  }

  function loadFileWorkspace(token: string): Promise<FileWorkspaceResponse> {
    return apiJson(baseUrl, '/files/workspace', token)
  }

  function analyzeFileWorkspace(token: string): Promise<FileWorkspaceResponse> {
    return apiJson(baseUrl, '/files/workspace/analyze', token, { method: 'POST' })
  }

  function analyzeSingleWorkspaceFile(
    token: string,
    fileName: string,
  ): Promise<FileWorkspaceResponse> {
    return apiJson(
      baseUrl,
      `/files/workspace/analyze/${encodeURIComponent(fileName)}`,
      token,
      { method: 'POST' },
    )
  }

  return {
    jwtName,
    loadUser,
    saveUser,
    apiAuth,
    loadFileWorkspace,
    analyzeFileWorkspace,
    analyzeSingleWorkspaceFile,
  }
}
