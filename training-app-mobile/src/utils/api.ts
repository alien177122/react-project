import Constants from 'expo-constants'
import {
  createApiClient,
  createTrainingApi,
} from '@training/shared/api'
import {
  API_CONFIG as API_PROFILES,
  resolveApiEnv,
  type ApiConfig,
} from '@training/shared/config'
import { clearStoredSession } from './sessionStorage'
import type { FileWorkspaceResponse } from '../types'
import type { AppExtra } from '../config/app-extra'

const extra = Constants.expoConfig?.extra as AppExtra | undefined
const apiEnv = resolveApiEnv(extra?.apiEnv)
const apiProfile = API_PROFILES[apiEnv]
const API_CONFIG: ApiConfig = {
  baseUrl: extra?.apiUrl ?? apiProfile.baseUrl,
  timeoutMs: extra?.apiTimeoutMs ?? apiProfile.timeoutMs,
  retryCount: extra?.apiRetryCount ?? apiProfile.retryCount,
  enableLogging: extra?.enableLogging ?? false,
  allowOfflineMode: extra?.allowOfflineMode ?? false,
}

export const API = API_CONFIG.baseUrl
const apiClient = createApiClient({
  config: API_CONFIG,
  onUnauthorized: clearStoredSession,
  logger: API_CONFIG.enableLogging ? console : undefined,
})
const trainingApi = createTrainingApi(apiClient)

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
