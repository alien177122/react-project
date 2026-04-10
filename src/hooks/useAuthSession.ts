import { useAuthSession as useAuthSessionCore } from '../../packages/shared/src/hooks/useAuthSession'
import { webTokenStorage } from '../utils/webTokenStorage'

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api'

export function useAuthSession() {
  return useAuthSessionCore({
    storage: webTokenStorage,
    apiBaseUrl: API_BASE,
  })
}
