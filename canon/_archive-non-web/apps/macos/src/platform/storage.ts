import AsyncStorage from '@react-native-async-storage/async-storage';
import type {StoredSession, TokenStorage} from '@training/shared/types';

const TOKEN_KEY = 'gym_token';
const USERNAME_KEY = 'gym_username';
const LEGACY_USERNAME_KEY = 'gym_user_name';

export async function loadStoredSession(): Promise<StoredSession> {
  const [token, userName, legacyUserName] = await Promise.all([
    AsyncStorage.getItem(TOKEN_KEY),
    AsyncStorage.getItem(USERNAME_KEY),
    AsyncStorage.getItem(LEGACY_USERNAME_KEY),
  ]);
  return {token: token ?? '', userName: userName ?? legacyUserName ?? ''};
}

export async function saveStoredSession(
  token: string,
  userName: string,
): Promise<void> {
  await Promise.all([
    AsyncStorage.setItem(TOKEN_KEY, token),
    AsyncStorage.setItem(USERNAME_KEY, userName),
    AsyncStorage.setItem(LEGACY_USERNAME_KEY, userName),
  ]);
}

export async function clearStoredSession(): Promise<void> {
  await Promise.all([
    AsyncStorage.removeItem(TOKEN_KEY),
    AsyncStorage.removeItem(USERNAME_KEY),
    AsyncStorage.removeItem(LEGACY_USERNAME_KEY),
  ]);
}

export const macosTokenStorage: TokenStorage = {
  load: loadStoredSession,
  async save(token: string, userName: string): Promise<void> {
    await saveStoredSession(token, userName);
  },
  clear: clearStoredSession,
};
