import type { FileWorkspaceResponse, UserData } from '../types/index.ts'
import { normalizeLoadedUser } from '../utils/api.ts'
import {
  ApiNetworkError,
  ApiTimeoutError,
  ApiUnauthorizedError,
  type ApiClient,
} from './client.ts'

export { normalizeLoadedUser }

export interface AuthRequestBody {
  name: string
  password: string
}

export interface AuthResponse {
  token?: string
  name?: string
  error?: string
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
