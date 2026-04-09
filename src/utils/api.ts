import {
  createApiClient,
  createTrainingApi,
} from '@training/shared/api'
import { buildApiConfig } from '@training/shared/config'
import type { FileWorkspaceResponse } from '../types'

// ============================================================
// API — работа с сервером через единый shared config.
// Для web/desktop fallback остаётся relative /api, чтобы работал Vite proxy,
// Docker same-origin и embedded Electron server.
// ============================================================
const API_CONFIG = buildApiConfig({
  platform: 'web',
  env: {
    VITE_API_ENV: import.meta.env.VITE_API_ENV as string | undefined,
    VITE_API_URL: import.meta.env.VITE_API_URL as string | undefined,
    VITE_API_TIMEOUT_MS: import.meta.env.VITE_API_TIMEOUT_MS as string | undefined,
    VITE_API_RETRY_COUNT: import.meta.env.VITE_API_RETRY_COUNT as string | undefined,
    VITE_ENABLE_LOGGING: import.meta.env.VITE_ENABLE_LOGGING as string | undefined,
    VITE_ALLOW_OFFLINE_MODE: import.meta.env.VITE_ALLOW_OFFLINE_MODE as string | undefined,
  },
  fallbackBaseUrl: '/api',
  dev: import.meta.env.DEV,
})

export const API = API_CONFIG.baseUrl
const apiClient = createApiClient({
  config: API_CONFIG,
  logger: API_CONFIG.enableLogging ? console : undefined,
})
const trainingApi = createTrainingApi(apiClient)

// Декодирует JWT-токен и извлекает имя пользователя из payload
// Используется при восстановлении сессии из localStorage
export function jwtName(token: string): string | null {
  try { return JSON.parse(atob(token.split('.')[1])).name ?? null } catch { return null }
}

export const loadUser = trainingApi.loadUser
export const saveUser = trainingApi.saveUser
export const apiAuth = trainingApi.apiAuth
export function loadFileWorkspace(token: string): Promise<FileWorkspaceResponse> {
  return trainingApi.loadFileWorkspace(token)
}

export function analyzeFileWorkspace(token: string): Promise<FileWorkspaceResponse> {
  return trainingApi.analyzeFileWorkspace(token)
}

export function analyzeSingleWorkspaceFile(token: string, fileName: string): Promise<FileWorkspaceResponse> {
  return trainingApi.analyzeSingleWorkspaceFile(token, fileName)
}
