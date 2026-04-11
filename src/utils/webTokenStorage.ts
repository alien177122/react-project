import type { StoredSession, TokenStorage } from '../../packages/shared/src/types/index.ts'
import { jwtName } from '../../packages/shared/src/utils/api.ts'

const TOKEN_KEY = 'gym_token'
const USERNAME_KEY = 'gym_username'

export function readStoredSession(): StoredSession {
  if (typeof localStorage === 'undefined') {
    return { token: '', userName: '' }
  }

  const token = localStorage.getItem(TOKEN_KEY) ?? ''
  const storedUserName = localStorage.getItem(USERNAME_KEY) ?? ''
  const userName = storedUserName || (token ? (jwtName(token) || '') : '')

  if (token && userName && !storedUserName) {
    localStorage.setItem(USERNAME_KEY, userName)
  }

  return { token, userName }
}

export const webTokenStorage: TokenStorage = {
  async load(): Promise<StoredSession> {
    return readStoredSession()
  },

  async save(token: string, userName: string): Promise<void> {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USERNAME_KEY, userName)
  },

  async clear(): Promise<void> {
    if (typeof localStorage === 'undefined') return
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USERNAME_KEY)
  },
}
