import * as SecureStore from 'expo-secure-store';
import type {StoredSession, TokenStorage} from '@training/shared/types';
import {jwtName} from '@training/shared/utils/api';

const TOKEN_KEY = 'gym_token';
const USERNAME_KEY = 'gym_username';

export const secureTokenStorage: TokenStorage = {
  async load(): Promise<StoredSession> {
    const token = (await SecureStore.getItemAsync(TOKEN_KEY)) ?? '';
    const storedUserName = (await SecureStore.getItemAsync(USERNAME_KEY)) ?? '';
    const userName = storedUserName || (token ? jwtName(token) || '' : '');

    if (token && userName && !storedUserName) {
      await SecureStore.setItemAsync(USERNAME_KEY, userName);
    }

    return {token, userName};
  },

  async save(token: string, userName: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(USERNAME_KEY, userName);
  },

  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USERNAME_KEY);
  },
};
