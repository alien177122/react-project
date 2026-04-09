import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ApiClientError,
  ApiResponseParseError,
  ApiTimeoutError,
  ApiUnauthorizedError,
  createApiClient,
  normalizeLoadedUser,
} from '../packages/shared/src/api/index.ts'

function createTestClient(overrides?: {
  onUnauthorized?: () => void | Promise<void>
  logger?: { log?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void }
}) {
  return createApiClient({
    config: {
      baseUrl: 'https://api.example.com',
      timeoutMs: 25,
    },
    onUnauthorized: overrides?.onUnauthorized,
    logger: overrides?.logger,
  })
}

test('createApiClient adds bearer token and serializes JSON bodies', async t => {
  const originalFetch = globalThis.fetch
  t.after(() => {
    globalThis.fetch = originalFetch
  })

  let capturedUrl = ''
  let capturedInit: RequestInit | undefined

  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    capturedUrl = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url
    capturedInit = init
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }) as typeof fetch

  const client = createTestClient()
  const payload = await client.post<{ ok: boolean }>('/users/me', { enabled: true }, { token: 'jwt-token' })

  const headers = new Headers(capturedInit?.headers)
  assert.equal(capturedUrl, 'https://api.example.com/users/me')
  assert.equal(capturedInit?.method, 'POST')
  assert.equal(headers.get('Authorization'), 'Bearer jwt-token')
  assert.equal(headers.get('Content-Type'), 'application/json')
  assert.equal(capturedInit?.body, JSON.stringify({ enabled: true }))
  assert.deepEqual(payload, { ok: true })
})

test('createApiClient calls onUnauthorized on 401 responses', async t => {
  const originalFetch = globalThis.fetch
  t.after(() => {
    globalThis.fetch = originalFetch
  })

  let unauthorizedCalls = 0
  globalThis.fetch = (async () => new Response(JSON.stringify({ error: 'Сессия истекла' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  })) as typeof fetch

  const client = createTestClient({
    onUnauthorized: () => {
      unauthorizedCalls += 1
    },
  })

  await assert.rejects(
    () => client.get('/users/me'),
    error => {
      assert.ok(error instanceof ApiUnauthorizedError)
      assert.equal(error.message, 'Сессия истекла')
      assert.equal(error.status, 401)
      return true
    },
  )

  assert.equal(unauthorizedCalls, 1)
})

test('createApiClient can skip unauthorized handler per request', async t => {
  const originalFetch = globalThis.fetch
  t.after(() => {
    globalThis.fetch = originalFetch
  })

  let unauthorizedCalls = 0
  globalThis.fetch = (async () => new Response(JSON.stringify({ error: 'expired' }), {
    status: 403,
    headers: { 'Content-Type': 'application/json' },
  })) as typeof fetch

  const client = createTestClient({
    onUnauthorized: () => {
      unauthorizedCalls += 1
    },
  })

  await assert.rejects(() => client.get('/users/me', { handleUnauthorized: false }), ApiUnauthorizedError)
  assert.equal(unauthorizedCalls, 0)
})

test('createApiClient returns plain-text error payloads when backend does not send JSON', async t => {
  const originalFetch = globalThis.fetch
  t.after(() => {
    globalThis.fetch = originalFetch
  })

  globalThis.fetch = (async () => new Response('Bad gateway', {
    status: 502,
    headers: { 'Content-Type': 'text/plain' },
  })) as typeof fetch

  const client = createTestClient()

  await assert.rejects(
    () => client.get('/health'),
    error => {
      assert.ok(error instanceof ApiClientError)
      assert.equal(error.message, 'Bad gateway')
      assert.equal(error.status, 502)
      assert.equal(error.responseBody, 'Bad gateway')
      return true
    },
  )
})

test('createApiClient throws ApiResponseParseError on invalid JSON success payloads', async t => {
  const originalFetch = globalThis.fetch
  t.after(() => {
    globalThis.fetch = originalFetch
  })

  globalThis.fetch = (async () => new Response('not-json', {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })) as typeof fetch

  const client = createTestClient()
  await assert.rejects(() => client.get('/broken'), ApiResponseParseError)
})

test('createApiClient aborts requests after timeout', async t => {
  const originalFetch = globalThis.fetch
  t.after(() => {
    globalThis.fetch = originalFetch
  })

  globalThis.fetch = ((_: string | URL | Request, init?: RequestInit) => new Promise<Response>((_, reject) => {
    init?.signal?.addEventListener('abort', () => {
      const abortError = new Error('aborted')
      abortError.name = 'AbortError'
      reject(abortError)
    }, { once: true })
  })) as typeof fetch

  const client = createTestClient()
  await assert.rejects(() => client.get('/slow'), ApiTimeoutError)
})

test('normalizeLoadedUser keeps only valid exercises and progress payloads', () => {
  const user = normalizeLoadedUser({
    name: ' alien17 ',
    exercises: [
      {
        exerciseKey: 'bench',
        testWeight: 100,
        testReps: 5,
        oneRM: 116.7,
        bodyWeight: 82,
        date: '2026-04-08',
      },
      {
        exerciseKey: 'unknown',
        testWeight: 50,
        testReps: 5,
        oneRM: 58,
        date: '2026-04-08',
      },
      {
        exerciseKey: 'deadlift',
        testWeight: 0,
        testReps: 5,
        oneRM: 58,
        date: '2026-04-08',
      },
    ],
    trainingProgress: {
      completedSessions: 6,
    },
  }, 'fallback')

  assert.equal(user.name, 'alien17')
  assert.equal(user.exercises.length, 1)
  assert.deepEqual(user.trainingProgress, { completedSessions: 6 })
  assert.deepEqual(user.exercises[0], {
    exerciseKey: 'bench',
    testWeight: 100,
    testReps: 5,
    oneRM: 116.7,
    bodyWeight: 82,
    date: '2026-04-08',
  })
})
