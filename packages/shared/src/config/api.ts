export type ApiPlatform = 'ios' | 'android' | 'web' | 'macos' | 'electron';
export const API_ENVS = ['dev', 'stage', 'prod'] as const;

export type ApiEnv = (typeof API_ENVS)[number];

export interface ApiConfig {
  baseUrl: string;
  timeoutMs: number;
  retryCount: number;
  enableLogging: boolean;
  allowOfflineMode: boolean;
}

export interface BuildApiConfigInput {
  platform: ApiPlatform;
  env?: Record<string, string | undefined>;
  extra?: Record<string, unknown> | null | undefined;
  fallbackBaseUrl?: string;
  dev?: boolean;
}

const DEFAULT_TIMEOUT_MS = 15000;
const DEFAULT_RETRY_COUNT = 1;

export const API_ENV_CONFIG: Record<
  ApiEnv,
  Pick<ApiConfig, 'baseUrl' | 'timeoutMs' | 'retryCount'>
> = {
  dev: {
    baseUrl: 'http://127.0.0.1:3001/api',
    timeoutMs: 10000,
    retryCount: 1,
  },
  stage: {
    baseUrl: 'https://stage.training.app/api',
    timeoutMs: 15000,
    retryCount: 2,
  },
  prod: {
    baseUrl: 'https://api.training.app/api',
    timeoutMs: 20000,
    retryCount: 3,
  },
};

export const API_CONFIG = API_ENV_CONFIG;

const PLATFORM_DEFAULTS: Record<ApiPlatform, Omit<ApiConfig, 'baseUrl'>> = {
  ios: {
    timeoutMs: DEFAULT_TIMEOUT_MS,
    retryCount: DEFAULT_RETRY_COUNT,
    enableLogging: false,
    allowOfflineMode: false,
  },
  android: {
    timeoutMs: DEFAULT_TIMEOUT_MS,
    retryCount: DEFAULT_RETRY_COUNT,
    enableLogging: false,
    allowOfflineMode: false,
  },
  web: {
    timeoutMs: DEFAULT_TIMEOUT_MS,
    retryCount: DEFAULT_RETRY_COUNT,
    enableLogging: false,
    allowOfflineMode: false,
  },
  macos: {
    timeoutMs: DEFAULT_TIMEOUT_MS,
    retryCount: DEFAULT_RETRY_COUNT,
    enableLogging: false,
    allowOfflineMode: true,
  },
  electron: {
    timeoutMs: DEFAULT_TIMEOUT_MS,
    retryCount: DEFAULT_RETRY_COUNT,
    enableLogging: false,
    allowOfflineMode: true,
  },
};

const DEFAULT_FALLBACKS: Record<ApiPlatform, string> = {
  ios: 'http://127.0.0.1:3001/api',
  android: 'http://127.0.0.1:3001/api',
  web: '/api',
  macos: 'http://127.0.0.1:3001/api',
  electron: '/api',
};

const ENV_KEYS = {
  apiEnv: ['API_ENV', 'VITE_API_ENV', 'EXPO_PUBLIC_API_ENV'],
  apiUrl: ['API_URL', 'VITE_API_URL', 'EXPO_PUBLIC_API_URL'],
  timeoutMs: ['API_TIMEOUT_MS', 'VITE_API_TIMEOUT_MS', 'EXPO_PUBLIC_API_TIMEOUT_MS'],
  retryCount: ['API_RETRY_COUNT', 'VITE_API_RETRY_COUNT', 'EXPO_PUBLIC_API_RETRY_COUNT'],
  enableLogging: ['ENABLE_LOGGING', 'VITE_ENABLE_LOGGING', 'EXPO_PUBLIC_ENABLE_LOGGING'],
  allowOfflineMode: [
    'ALLOW_OFFLINE_MODE',
    'VITE_ALLOW_OFFLINE_MODE',
    'EXPO_PUBLIC_ALLOW_OFFLINE_MODE',
  ],
} as const;

const EXTRA_KEYS = {
  apiEnv: ['API_ENV', 'apiEnv'],
  apiUrl: ['API_URL', 'apiUrl'],
  timeoutMs: ['API_TIMEOUT_MS', 'apiTimeoutMs'],
  retryCount: ['API_RETRY_COUNT', 'apiRetryCount'],
  enableLogging: ['ENABLE_LOGGING', 'enableLogging'],
  allowOfflineMode: ['ALLOW_OFFLINE_MODE', 'allowOfflineMode'],
} as const;

function readFirstEnvValue(
  env: Record<string, string | undefined> | undefined,
  keys: readonly string[],
): string | undefined {
  if (!env) return undefined;

  for (const key of keys) {
    const value = env[key]?.trim();
    if (value) return value;
  }

  return undefined;
}

function readFirstExtraValue(
  extra: Record<string, unknown> | null | undefined,
  keys: readonly string[],
): unknown {
  if (!extra) return undefined;

  for (const key of keys) {
    if (extra[key] !== undefined) return extra[key];
  }

  return undefined;
}

function normalizeBaseUrl(value: string, allowRelative: boolean): string {
  const trimmed = value.trim();
  if (!trimmed) throw new Error('API base URL is empty');

  if (trimmed.startsWith('/')) {
    if (!allowRelative) {
      throw new Error(`Relative API base URL is not supported on this platform: ${trimmed}`);
    }

    const normalized = trimmed.replace(/\/+$/, '');
    return normalized || '/';
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error(`API base URL is not a valid URL: ${trimmed}`);
  }

  if (!/^https?:$/i.test(parsed.protocol)) {
    throw new Error(`API base URL must use http or https: ${trimmed}`);
  }

  const pathname = parsed.pathname.replace(/\/+$/, '');
  if (!pathname || pathname === '/') {
    parsed.pathname = '/api';
  }

  const normalized = parsed.toString().replace(/\/+$/, '');
  return normalized || trimmed;
}

function parseTimeoutMs(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) return value;
  if (typeof value !== 'string') return undefined;

  const parsed = Number(value.trim());
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function parseRetryCount(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isInteger(value) && value >= 0) return value;
  if (typeof value !== 'string') return undefined;

  const parsed = Number(value.trim());
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : undefined;
}

function parseApiEnv(value: unknown): ApiEnv | undefined {
  if (typeof value !== 'string') return undefined;

  const normalized = value.trim().toLowerCase();
  return (API_ENVS as readonly string[]).includes(normalized) ? (normalized as ApiEnv) : undefined;
}

export function getApiConfig(env: ApiEnv): Pick<ApiConfig, 'baseUrl' | 'timeoutMs' | 'retryCount'> {
  return API_CONFIG[env];
}

export function resolveApiEnv(value: string | null | undefined): ApiEnv {
  return parseApiEnv(value) ?? 'dev';
}

function parseBoolean(value: unknown): boolean | undefined {
  if (typeof value === 'boolean') return value;
  if (typeof value !== 'string') return undefined;

  const normalized = value.trim().toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false;
  return undefined;
}

function logConfigWarning(dev: boolean | undefined, message: string, error?: Error) {
  if (!dev) return;

  if (error) {
    console.warn(`[api-config] ${message}`, error);
    return;
  }

  console.warn(`[api-config] ${message}`);
}

export function buildApiConfig({
  platform,
  env,
  extra,
  fallbackBaseUrl,
  dev = false,
}: BuildApiConfigInput): ApiConfig {
  const defaults = PLATFORM_DEFAULTS[platform];
  const fallback = fallbackBaseUrl ?? DEFAULT_FALLBACKS[platform];
  const allowRelative = platform === 'web' || platform === 'electron';
  const envApiEnv = readFirstEnvValue(env, ENV_KEYS.apiEnv);
  const extraApiEnv = readFirstExtraValue(extra, EXTRA_KEYS.apiEnv);
  const envProfile = parseApiEnv(envApiEnv);
  const extraProfile = parseApiEnv(extraApiEnv);
  const envProfileConfig = envProfile ? API_ENV_CONFIG[envProfile] : null;
  const extraProfileConfig = extraProfile ? API_ENV_CONFIG[extraProfile] : null;

  const envApiUrl = readFirstEnvValue(env, ENV_KEYS.apiUrl);
  const extraApiUrl = readFirstExtraValue(extra, EXTRA_KEYS.apiUrl);
  const rawApiUrl =
    envApiUrl ??
    envProfileConfig?.baseUrl ??
    (typeof extraApiUrl === 'string' ? extraApiUrl : undefined) ??
    extraProfileConfig?.baseUrl ??
    fallback;

  let baseUrl: string;
  try {
    baseUrl = normalizeBaseUrl(rawApiUrl, allowRelative);
  } catch (error) {
    const normalizedFallback = normalizeBaseUrl(fallback, allowRelative);
    if (!dev) throw error;

    logConfigWarning(
      dev,
      `Invalid API base URL "${String(rawApiUrl)}". Falling back to "${normalizedFallback}".`,
      error instanceof Error ? error : undefined,
    );
    baseUrl = normalizedFallback;
  }

  const envTimeout = readFirstEnvValue(env, ENV_KEYS.timeoutMs);
  const extraTimeout = readFirstExtraValue(extra, EXTRA_KEYS.timeoutMs);
  const timeoutMs =
    parseTimeoutMs(envTimeout) ??
    envProfileConfig?.timeoutMs ??
    parseTimeoutMs(extraTimeout) ??
    extraProfileConfig?.timeoutMs ??
    defaults.timeoutMs;

  const envRetryCount = readFirstEnvValue(env, ENV_KEYS.retryCount);
  const extraRetryCount = readFirstExtraValue(extra, EXTRA_KEYS.retryCount);
  const retryCount =
    parseRetryCount(envRetryCount) ??
    envProfileConfig?.retryCount ??
    parseRetryCount(extraRetryCount) ??
    extraProfileConfig?.retryCount ??
    defaults.retryCount;

  const envLogging = readFirstEnvValue(env, ENV_KEYS.enableLogging);
  const extraLogging = readFirstExtraValue(extra, EXTRA_KEYS.enableLogging);
  const enableLogging = parseBoolean(envLogging ?? extraLogging) ?? (dev || defaults.enableLogging);

  const envOffline = readFirstEnvValue(env, ENV_KEYS.allowOfflineMode);
  const extraOffline = readFirstExtraValue(extra, EXTRA_KEYS.allowOfflineMode);
  const allowOfflineMode = parseBoolean(envOffline ?? extraOffline) ?? defaults.allowOfflineMode;

  return {
    baseUrl,
    timeoutMs,
    retryCount,
    enableLogging,
    allowOfflineMode,
  };
}
