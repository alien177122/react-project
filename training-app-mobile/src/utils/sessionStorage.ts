import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'gym_token'
const USERNAME_KEY = 'gym_user_name'

interface StoredSession {
  token: string
  userName: string
}

export async function loadStoredSession(): Promise<StoredSession> {
  const [token, userName] = await Promise.all([
    SecureStore.getItemAsync(TOKEN_KEY),
    SecureStore.getItemAsync(USERNAME_KEY),
  ])

  return {
    token: token ?? '',
    userName: userName ?? '',
  }
}

export async function saveStoredSession(token: string, userName: string): Promise<void> {
  await Promise.all([
    SecureStore.setItemAsync(TOKEN_KEY, token),
    SecureStore.setItemAsync(USERNAME_KEY, userName),
  ])
}

export async function clearStoredSession(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(TOKEN_KEY),
    SecureStore.deleteItemAsync(USERNAME_KEY),
  ])
}
