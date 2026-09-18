import {buildApiConfig} from '@training/shared/config/api';
import {resolveApiPlatform} from './detectPlatform';

/**
 * Resolves API base URL for web, Capacitor iOS/Android, and Electron.
 * Native shells require an absolute URL — set VITE_API_URL at build time.
 */
export function resolveApiBase(): string {
  const platform = resolveApiPlatform();
  const viteEnv = import.meta.env as Record<string, string | boolean | undefined>;

  const env: Record<string, string | undefined> = {
    VITE_API_URL: typeof viteEnv.VITE_API_URL === 'string' ? viteEnv.VITE_API_URL : undefined,
    VITE_API_ENV: typeof viteEnv.VITE_API_ENV === 'string' ? viteEnv.VITE_API_ENV : undefined,
    VITE_API_TIMEOUT_MS:
      typeof viteEnv.VITE_API_TIMEOUT_MS === 'string' ? viteEnv.VITE_API_TIMEOUT_MS : undefined,
    VITE_API_RETRY_COUNT:
      typeof viteEnv.VITE_API_RETRY_COUNT === 'string' ? viteEnv.VITE_API_RETRY_COUNT : undefined,
  };

  return buildApiConfig({
    platform,
    env,
    dev: import.meta.env.DEV,
  }).baseUrl;
}
