import Constants from 'expo-constants';
import {buildApiConfig} from '@training/shared/config';
import {createApiClient} from '@training/shared/utils/api';

const envRecord: Record<string, string | undefined> = {
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_API_ENV: process.env.EXPO_PUBLIC_API_ENV,
  EXPO_PUBLIC_API_TIMEOUT_MS: process.env.EXPO_PUBLIC_API_TIMEOUT_MS,
  EXPO_PUBLIC_ENABLE_LOGGING: process.env.EXPO_PUBLIC_ENABLE_LOGGING,
  EXPO_PUBLIC_ALLOW_OFFLINE_MODE: process.env.EXPO_PUBLIC_ALLOW_OFFLINE_MODE,
};

const config = buildApiConfig({
  platform: 'ios',
  env: envRecord,
  extra: Constants.expoConfig?.extra as Record<string, unknown> | undefined,
  dev: typeof __DEV__ !== 'undefined' ? __DEV__ : true,
});

export const API_BASE_URL = config.baseUrl;

export const apiClient = createApiClient(API_BASE_URL);
