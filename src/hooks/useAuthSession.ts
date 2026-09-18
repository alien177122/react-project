import { useAuthSession as useAuthSessionCore } from '@training/shared/hooks/useAuthSession'
import { API } from '../utils/api'
import { webTokenStorage } from '../utils/webTokenStorage'

export function useAuthSession() {
  return useAuthSessionCore({
    storage: webTokenStorage,
    apiBaseUrl: API,
  })
}
