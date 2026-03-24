import Constants from 'expo-constants'
import type { FileWorkspaceResponse, UserData } from '../types'

const extra = Constants.expoConfig?.extra as { apiUrl?: string } | undefined

// Для симулятора можно оставить localhost, для физического устройства нужен LAN IP.
export const API = extra?.apiUrl ?? process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:3001/api'
const AUTH_EXPIRED = 'AUTH_EXPIRED'

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

function normalizeLoadedUser(input: unknown, fallbackName: string): UserData {
  if (!isRecord(input)) return { name: fallbackName, exercises: [] }

  const name = typeof input.name === 'string' && input.name.trim()
    ? input.name.trim()
    : fallbackName

  const exercises = Array.isArray(input.exercises)
    ? input.exercises.flatMap(exercise => {
      if (!isRecord(exercise)) return []

      const exerciseKey = typeof exercise.exerciseKey === 'string' ? exercise.exerciseKey.trim() : ''
      const date = typeof exercise.date === 'string' ? exercise.date.trim() : ''
      if (!exerciseKey || !date) return []

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

export async function loadUser(name: string, token: string): Promise<UserData | null> {
  try {
    const response = await fetch(`${API}/users/${encodeURIComponent(name)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (response.status === 401 || response.status === 403) throw new Error(AUTH_EXPIRED)
    if (!response.ok) return { name, exercises: [] }

    return normalizeLoadedUser(await response.json(), name)
  } catch (error) {
    if (error instanceof Error && error.message === AUTH_EXPIRED) return null
    return { name, exercises: [] }
  }
}

export async function saveUser(data: UserData, token: string): Promise<void> {
  await fetch(`${API}/users/${encodeURIComponent(data.name)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
}

export async function apiAuth(
  path: 'login' | 'register',
  body: { name: string; password: string },
): Promise<{ token?: string; name?: string; error?: string }> {
  try {
    const response = await fetch(`${API}/auth/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return await response.json()
  } catch {
    return { error: 'Нет соединения с сервером' }
  }
}

async function apiJson<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API}${path}`, {
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

export function loadFileWorkspace(token: string): Promise<FileWorkspaceResponse> {
  return apiJson('/files/workspace', token)
}

export function analyzeFileWorkspace(token: string): Promise<FileWorkspaceResponse> {
  return apiJson('/files/workspace/analyze', token, { method: 'POST' })
}

export function analyzeSingleWorkspaceFile(token: string, fileName: string): Promise<FileWorkspaceResponse> {
  return apiJson(`/files/workspace/analyze/${encodeURIComponent(fileName)}`, token, { method: 'POST' })
}
