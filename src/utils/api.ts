import { createApiClient } from '../../packages/shared/src/utils/api.ts'

export const API = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api'

const apiClient = createApiClient(API)

export const jwtName = apiClient.jwtName
export const loadUser = apiClient.loadUser
export const saveUser = apiClient.saveUser
export const apiAuth = apiClient.apiAuth
export const loadFileWorkspace = apiClient.loadFileWorkspace
export const analyzeFileWorkspace = apiClient.analyzeFileWorkspace
export const analyzeSingleWorkspaceFile = apiClient.analyzeSingleWorkspaceFile
