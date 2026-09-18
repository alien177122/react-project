import test from 'node:test'
import assert from 'node:assert/strict'
import { buildApiConfig } from '../packages/shared/src/config/api.ts'

test('buildApiConfig prefers explicit env over expo extra and fallback', () => {
  const config = buildApiConfig({
    platform: 'ios',
    env: {
      EXPO_PUBLIC_API_URL: 'https://env.example.com/api/',
      EXPO_PUBLIC_API_TIMEOUT_MS: '20000',
      EXPO_PUBLIC_ENABLE_LOGGING: 'false',
    },
    extra: {
      apiUrl: 'https://extra.example.com/api',
      apiTimeoutMs: 5000,
      enableLogging: true,
    },
    fallbackBaseUrl: 'http://127.0.0.1:3001/api',
    dev: true,
  })

  assert.equal(config.baseUrl, 'https://env.example.com/api')
  assert.equal(config.timeoutMs, 20000)
  assert.equal(config.retryCount, 1)
  assert.equal(config.enableLogging, false)
  assert.equal(config.allowOfflineMode, false)
})

test('buildApiConfig resolves stage profile when API_ENV is provided', () => {
  const config = buildApiConfig({
    platform: 'web',
    env: {
      VITE_API_ENV: 'stage',
    },
    fallbackBaseUrl: '/api',
  })

  assert.equal(config.baseUrl, 'https://stage.training.app/api')
  assert.equal(config.timeoutMs, 15000)
  assert.equal(config.retryCount, 2)
})

test('buildApiConfig lets explicit env API_URL override extra apiEnv defaults', () => {
  const config = buildApiConfig({
    platform: 'ios',
    env: {
      EXPO_PUBLIC_API_URL: 'http://192.168.1.77:3001/api',
    },
    extra: {
      apiEnv: 'dev',
    },
  })

  assert.equal(config.baseUrl, 'http://192.168.1.77:3001/api')
  assert.equal(config.timeoutMs, 10000)
  assert.equal(config.retryCount, 1)
})

test('buildApiConfig lets explicit env API_URL override env profile defaults', () => {
  const config = buildApiConfig({
    platform: 'ios',
    env: {
      EXPO_PUBLIC_API_ENV: 'stage',
      EXPO_PUBLIC_API_URL: 'http://192.168.1.77:3001/api',
    },
  })

  assert.equal(config.baseUrl, 'http://192.168.1.77:3001/api')
  assert.equal(config.timeoutMs, 15000)
  assert.equal(config.retryCount, 2)
})

test('buildApiConfig accepts relative /api only for web-style platforms', () => {
  const webConfig = buildApiConfig({
    platform: 'web',
    fallbackBaseUrl: '/api/',
  })

  assert.equal(webConfig.baseUrl, '/api')

  assert.throws(() => buildApiConfig({
    platform: 'ios',
    fallbackBaseUrl: '/api',
  }), /Relative API base URL is not supported/)
})

test('buildApiConfig falls back in dev when env base URL is invalid', () => {
  const warnings: unknown[][] = []
  const originalWarn = console.warn
  console.warn = (...args) => {
    warnings.push(args)
  }

  const config = (() => {
    try {
      return buildApiConfig({
        platform: 'web',
        env: {
          VITE_API_URL: 'ftp://broken-host/api',
        },
        fallbackBaseUrl: '/api',
        dev: true,
      })
    } finally {
      console.warn = originalWarn
    }
  })()

  assert.equal(config.baseUrl, '/api')
  assert.equal(warnings.length, 1)
})

test('buildApiConfig preserves platform defaults when optional flags are absent', () => {
  const macosConfig = buildApiConfig({
    platform: 'macos',
    fallbackBaseUrl: 'http://127.0.0.1:3001/api',
  })

  assert.equal(macosConfig.allowOfflineMode, true)
  assert.equal(macosConfig.timeoutMs, 15000)
  assert.equal(macosConfig.retryCount, 1)
  assert.equal(macosConfig.enableLogging, false)
})

test('buildApiConfig appends /api when absolute URL has no path', () => {
  const config = buildApiConfig({
    platform: 'ios',
    env: { VITE_API_URL: 'http://127.0.0.1:3002' },
    dev: true,
  })

  assert.equal(config.baseUrl, 'http://127.0.0.1:3002/api')
})

