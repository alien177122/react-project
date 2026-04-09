import {
  buildApiConfig,
  type ApiPlatform,
} from '@training/shared/config';
import {
  createApiClient,
  createTrainingApi,
} from '@training/shared/api';
import type {FileWorkspaceResponse} from '@training/shared/types';
import {clearStoredSession} from './storage';

type RuntimeGlobals = typeof globalThis & {
  __TRAINING_APP_ENV__?: Record<string, string | undefined>;
  process?: {
    env?: Record<string, string | undefined>;
  };
};

const runtimeGlobals = globalThis as RuntimeGlobals;
const platform: ApiPlatform = 'macos';
const API_CONFIG = buildApiConfig({
  platform,
  env: {
    ...runtimeGlobals.process?.env,
    ...runtimeGlobals.__TRAINING_APP_ENV__,
  },
  fallbackBaseUrl: 'http://127.0.0.1:3001/api',
  dev: __DEV__,
});

const apiClient = createApiClient({
  config: API_CONFIG,
  onUnauthorized: clearStoredSession,
  logger: API_CONFIG.enableLogging ? console : undefined,
});
const trainingApi = createTrainingApi(apiClient);

export const loadUser = trainingApi.loadUser;
export const saveUser = trainingApi.saveUser;
export const apiAuth = trainingApi.apiAuth;
export function loadFileWorkspace(token: string): Promise<FileWorkspaceResponse> {
  return trainingApi.loadFileWorkspace(token);
}

export function analyzeFileWorkspace(
  token: string,
): Promise<FileWorkspaceResponse> {
  return trainingApi.analyzeFileWorkspace(token);
}

export function analyzeSingleWorkspaceFile(
  token: string,
  fileName: string,
): Promise<FileWorkspaceResponse> {
  return trainingApi.analyzeSingleWorkspaceFile(token, fileName);
}
