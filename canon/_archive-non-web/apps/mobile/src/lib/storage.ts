import AsyncStorage from '@react-native-async-storage/async-storage';
import {normalizeLoadedUser} from '@training/shared/utils/api';
import type {UserData} from '@training/shared/types';

const STORAGE_KEY = 'training-calculator:user-data:v1';
const GUEST_NAME = 'Атлет';

export const DEFAULT_USER_DATA: UserData = {
  name: GUEST_NAME,
  exercises: [],
  trainingProgress: {completedSessions: 0},
};

function cacheKey(userName?: string): string {
  const trimmed = userName?.trim();
  return trimmed ? `${STORAGE_KEY}:${trimmed}` : STORAGE_KEY;
}

export const storage = {
  async load(userName?: string): Promise<UserData> {
    try {
      const raw = await AsyncStorage.getItem(cacheKey(userName));
      if (!raw) {
        if (userName) {
          const guest = await AsyncStorage.getItem(cacheKey());
          if (guest) {
            return normalizeLoadedUser(JSON.parse(guest) as unknown, userName);
          }
        }
        return {...DEFAULT_USER_DATA, name: userName?.trim() || GUEST_NAME};
      }

      return normalizeLoadedUser(JSON.parse(raw) as unknown, userName?.trim() || GUEST_NAME);
    } catch {
      return {...DEFAULT_USER_DATA, name: userName?.trim() || GUEST_NAME};
    }
  },

  async save(data: UserData): Promise<void> {
    await AsyncStorage.setItem(cacheKey(data.name), JSON.stringify(data));
    // Keep guest slot as latest working copy for offline continue.
    await AsyncStorage.setItem(cacheKey(), JSON.stringify(data));
  },

  async clear(userName?: string): Promise<void> {
    await AsyncStorage.multiRemove([cacheKey(userName), cacheKey()]);
  },
};
