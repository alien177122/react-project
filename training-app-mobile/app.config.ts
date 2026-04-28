import { networkInterfaces } from 'node:os'
import type { ConfigContext, ExpoConfig } from 'expo/config'
import {
  API_CONFIG,
  buildApiConfig,
  getApiConfig,
  resolveApiEnv,
} from '@training/shared/config'
import type { AppExtra } from './src/config/app-extra'

const APP_NAME = 'Training Calculator'
const APP_SLUG = 'training-app-mobile'
const APP_SCHEME = 'training-app-mobile'
const APP_VERSION = '1.0.0'
const IOS_BUNDLE_IDENTIFIER = 'com.stevegordiyenko.trainingcalculator'
const API_PORT = '3001'
const API_PATH = '/api'

function getPrivateIpv4Address(): string | null {
  const interfaces = networkInterfaces()
  const privateRanges = [/^10\./, /^192\.168\./, /^172\.(1[6-9]|2\d|3[0-1])\./]
  const fallback: string[] = []

  for (const entries of Object.values(interfaces)) {
    if (!entries) continue

    for (const entry of entries) {
      if (entry.family !== 'IPv4' || entry.internal || entry.address.startsWith('127.')) continue

      if (privateRanges.some((pattern) => pattern.test(entry.address))) {
        return entry.address
      }

      fallback.push(entry.address)
    }
  }

  return fallback[0] ?? null
}

function resolveDevApiUrl(defaultBaseUrl: string): string {
  const localIpAddress = getPrivateIpv4Address()
  if (!localIpAddress) return defaultBaseUrl

  return `http://${localIpAddress}:${API_PORT}${API_PATH}`
}

export default function appConfig({ config }: ConfigContext): ExpoConfig {
  const isEasProductionBuild = process.env.EAS_BUILD_PROFILE === 'production'
  const apiEnv = resolveApiEnv(process.env.EXPO_PUBLIC_API_ENV ?? (isEasProductionBuild ? 'prod' : undefined))
  const profileConfig = getApiConfig(apiEnv)
  const isDevelopment = process.env.NODE_ENV === 'development'
  const explicitApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim()

  if (isEasProductionBuild && !explicitApiUrl) {
    throw new Error('EXPO_PUBLIC_API_URL is required for EAS production iOS builds.')
  }

  const apiUrlOverride = explicitApiUrl
    || (apiEnv === 'dev' && isDevelopment ? resolveDevApiUrl(profileConfig.baseUrl) : undefined)
  const resolvedApiConfig = buildApiConfig({
    platform: 'ios',
    env: {
      EXPO_PUBLIC_API_ENV: apiEnv,
      EXPO_PUBLIC_API_URL: apiUrlOverride,
      EXPO_PUBLIC_API_TIMEOUT_MS: process.env.EXPO_PUBLIC_API_TIMEOUT_MS,
      EXPO_PUBLIC_API_RETRY_COUNT: process.env.EXPO_PUBLIC_API_RETRY_COUNT,
      EXPO_PUBLIC_ENABLE_LOGGING: process.env.EXPO_PUBLIC_ENABLE_LOGGING,
      EXPO_PUBLIC_ALLOW_OFFLINE_MODE: process.env.EXPO_PUBLIC_ALLOW_OFFLINE_MODE,
    },
    fallbackBaseUrl: API_CONFIG.dev.baseUrl,
    dev: isDevelopment,
  })

  const extra = {
    ...(config.extra ?? {}),
    apiEnv,
    apiUrl: resolvedApiConfig.baseUrl,
    apiTimeoutMs: resolvedApiConfig.timeoutMs,
    apiRetryCount: resolvedApiConfig.retryCount,
    enableLogging: resolvedApiConfig.enableLogging,
    allowOfflineMode: resolvedApiConfig.allowOfflineMode,
  } satisfies AppExtra & Record<string, unknown>

  return {
    ...config,
    name: APP_NAME,
    slug: APP_SLUG,
    scheme: APP_SCHEME,
    version: APP_VERSION,
    orientation: 'portrait',
    newArchEnabled: true,
    userInterfaceStyle: 'dark',
    ios: {
      bundleIdentifier: IOS_BUNDLE_IDENTIFIER,
      buildNumber: '1',
      supportsTablet: false,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    plugins: ['expo-router', 'expo-asset', 'expo-secure-store'],
    experiments: {
      typedRoutes: true,
    },
    assetBundlePatterns: ['**/*'],
    extra,
  }
}
