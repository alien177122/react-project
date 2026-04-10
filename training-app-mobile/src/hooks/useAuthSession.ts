import Constants from 'expo-constants'
import { useAuthSession as useAuthSessionCore } from '../../../packages/shared/src/hooks/useAuthSession'
import { mobileTokenStorage } from '../utils/mobileTokenStorage'

const API_BASE =
  (Constants.expoConfig?.extra?.apiUrl as string | undefined) ??
  process.env.EXPO_PUBLIC_API_URL ??
  'http://127.0.0.1:3001/api'

export function useAuthSession() {
  return useAuthSessionCore({
    storage: mobileTokenStorage,
    apiBaseUrl: API_BASE,
  })
}
