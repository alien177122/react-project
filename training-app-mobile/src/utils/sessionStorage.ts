import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

const TOKEN_KEY = 'gym_token'
const USERNAME_KEY = 'gym_user_name'

interface StoredSession {
  token: string
  userName: string
}

function canUseWebStorage() {
  return Platform.OS === 'web' && typeof window !== 'undefined' && !!window.localStorage
}

async function getItem(key: string) {
  if (canUseWebStorage()) return window.localStorage.getItem(key)
  return SecureStore.getItemAsync(key)
}

async function setItem(key: string, value: string) {
  if (canUseWebStorage()) {
    window.localStorage.setItem(key, value)
    return
  }

  await SecureStore.setItemAsync(key, value)
}

async function removeItem(key: string) {
  if (canUseWebStorage()) {
    window.localStorage.removeItem(key)
    return
  }

  await SecureStore.deleteItemAsync(key)
}

export async function loadStoredSession(): Promise<StoredSession> {
  const [token, userName] = await Promise.all([
    getItem(TOKEN_KEY),
    getItem(USERNAME_KEY),
  ])

  return {
    token: token ?? '',
    userName: userName ?? '',
  }
}

export async function saveStoredSession(token: string, userName: string): Promise<void> {
  await Promise.all([
    setItem(TOKEN_KEY, token),
    setItem(USERNAME_KEY, userName),
  ])
}

export async function clearStoredSession(): Promise<void> {
  await Promise.all([
    removeItem(TOKEN_KEY),
    removeItem(USERNAME_KEY),
  ])
}
