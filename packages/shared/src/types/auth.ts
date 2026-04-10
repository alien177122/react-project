export interface AuthResult {
  token?: string
  name?: string
  error?: string
}

export interface StoredSession {
  token: string
  userName: string
}

export interface TokenStorage {
  load(): Promise<StoredSession>
  save(token: string, userName: string): Promise<void>
  clear(): Promise<void>
}
