import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'gym_token';
const USERNAME_KEY = 'gym_user_name';

export interface StoredSession {
  token: string;
  userName: string;
}

export async function loadStoredSession(): Promise<StoredSession> {
  const [token, userName] = await Promise.all([
    AsyncStorage.getItem(TOKEN_KEY),
    AsyncStorage.getItem(USERNAME_KEY),
  ]);
  return {token: token ?? '', userName: userName ?? ''};
}

export async function saveStoredSession(
  token: string,
  userName: string,
): Promise<void> {
  await Promise.all([
    AsyncStorage.setItem(TOKEN_KEY, token),
    AsyncStorage.setItem(USERNAME_KEY, userName),
  ]);
}

export async function clearStoredSession(): Promise<void> {
  await Promise.all([
    AsyncStorage.removeItem(TOKEN_KEY),
    AsyncStorage.removeItem(USERNAME_KEY),
  ]);
}
