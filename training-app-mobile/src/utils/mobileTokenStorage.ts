import type { TokenStorage } from '../../../packages/shared/src/types/auth'
import {
  clearStoredSession,
  loadStoredSession,
  saveStoredSession,
} from './sessionStorage'

export const mobileTokenStorage: TokenStorage = {
  load: loadStoredSession,
  async save(token: string, userName: string): Promise<void> {
    await saveStoredSession(token, userName)
  },
  clear: clearStoredSession,
}
