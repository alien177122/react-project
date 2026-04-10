import Constants from 'expo-constants'
import { createApiClient } from '../../../packages/shared/src/utils/api'

export const API =
  (Constants.expoConfig?.extra?.apiUrl as string | undefined) ??
  process.env.EXPO_PUBLIC_API_URL ??
  'http://127.0.0.1:3001/api'

const apiClient = createApiClient(API)

export const jwtName = apiClient.jwtName
export const loadUser = apiClient.loadUser
export const saveUser = apiClient.saveUser
export const apiAuth = apiClient.apiAuth
export const loadFileWorkspace = apiClient.loadFileWorkspace
export const analyzeFileWorkspace = apiClient.analyzeFileWorkspace
export const analyzeSingleWorkspaceFile = apiClient.analyzeSingleWorkspaceFile
