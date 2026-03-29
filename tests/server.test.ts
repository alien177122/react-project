import test from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { access, mkdtemp, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import Database from 'better-sqlite3'
import { createApp } from '../server/app.js'
import { getServerConfig } from '../server/config.js'
import { createDb } from '../server/db.js'

async function createTestContext() {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), 'gym-api-'))
  const dbPath = path.join(tempDir, 'gym.db')
  const db = createDb({ dbPath })
  const app = createApp({
    env: { NODE_ENV: 'test', JWT_SECRET: 'test-secret' },
    db,
    enableStatic: false,
  })

  const server = app.listen(0, '127.0.0.1')
  await once(server, 'listening')

  const address = server.address()
  if (!address || typeof address === 'string') throw new Error('Server did not start on a TCP port')

  const baseUrl = `http://127.0.0.1:${address.port}`

  return {
    db,
    dbPath,
    baseUrl,
    async close() {
      await new Promise((resolve, reject) => {
        server.close(error => {
          if (error) reject(error)
          else resolve(undefined)
        })
      })
      db.close()
      await rm(tempDir, { recursive: true, force: true })
    },
  }
}

async function createCustomTestContext(env: Record<string, string>) {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), 'gym-api-custom-'))
  const dbPath = path.join(tempDir, 'gym.db')
  const db = createDb({ dbPath })
  const app = createApp({
    env,
    db,
    enableStatic: false,
  })

  const server = app.listen(0, '127.0.0.1')
  await once(server, 'listening')

  const address = server.address()
  if (!address || typeof address === 'string') throw new Error('Server did not start on a TCP port')

  const baseUrl = `http://127.0.0.1:${address.port}`

  return {
    db,
    dbPath,
    baseUrl,
    async close() {
      await new Promise((resolve, reject) => {
        server.close(error => {
          if (error) reject(error)
          else resolve(undefined)
        })
      })
      db.close()
      await rm(tempDir, { recursive: true, force: true })
    },
  }
}

async function requestJson(baseUrl: string, pathname: string, init?: RequestInit) {
  const response = await fetch(`${baseUrl}${pathname}`, init)
  const body = await response.json()
  return { response, body }
}

test('getServerConfig requires JWT_SECRET when NODE_ENV is not development', () => {
  assert.throws(
    () => getServerConfig({ NODE_ENV: 'test' }),
    /JWT_SECRET is required/,
  )
})

test('createDb respects DB_PATH from env when dbPath is omitted', async t => {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), 'gym-db-env-'))
  const dbPath = path.join(tempDir, 'nested', 'gym.db')
  const db = createDb({ env: { DB_PATH: dbPath } })

  t.after(async () => {
    db.close()
    await rm(tempDir, { recursive: true, force: true })
  })

  db.createUser('Steve', 'hash')
  await access(dbPath)
})

test('auth endpoints and protected user lifecycle work with validated payloads', async t => {
  const ctx = await createTestContext()
  t.after(async () => ctx.close())

  const register = await requestJson(ctx.baseUrl, '/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Steve', password: 'squat123' }),
  })

  assert.equal(register.response.status, 200)
  assert.equal(register.body.name, 'Steve')
  assert.ok(typeof register.body.token === 'string')

  const payload = {
    name: 'Steve',
    exercises: [
      {
        exerciseKey: 'bench',
        testWeight: 100,
        testReps: 5,
        oneRM: 118.9,
        date: '17.03.2026',
      },
    ],
    trainingProgress: { completedSessions: 2 },
  }

  const put = await requestJson(ctx.baseUrl, '/api/users/Steve', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${register.body.token}`,
    },
    body: JSON.stringify(payload),
  })

  assert.equal(put.response.status, 200)
  assert.deepEqual(put.body, { ok: true })

  const get = await requestJson(ctx.baseUrl, '/api/users/Steve', {
    headers: { Authorization: `Bearer ${register.body.token}` },
  })

  assert.equal(get.response.status, 200)
  assert.deepEqual(get.body, payload)

  const login = await requestJson(ctx.baseUrl, '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Steve', password: 'squat123' }),
  })

  assert.equal(login.response.status, 200)
  assert.equal(login.body.name, 'Steve')
  assert.ok(typeof login.body.token === 'string')
})

test('PUT /api/users/:name rejects malformed or mismatched user payloads', async t => {
  const ctx = await createTestContext()
  t.after(async () => ctx.close())

  const register = await requestJson(ctx.baseUrl, '/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Steve', password: 'squat123' }),
  })

  const invalid = await requestJson(ctx.baseUrl, '/api/users/Steve', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${register.body.token}`,
    },
    body: JSON.stringify({
      name: 'NotSteve',
      exercises: [],
    }),
  })

  assert.equal(invalid.response.status, 400)
  assert.match(invalid.body.error, /не совпадает с токеном/i)
})

test('corrupted stored JSON falls back to an empty user shape instead of crashing', async t => {
  const ctx = await createTestContext()
  t.after(async () => ctx.close())

  const register = await requestJson(ctx.baseUrl, '/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Steve', password: 'squat123' }),
  })

  const rawDb = new Database(ctx.dbPath)
  rawDb.prepare('UPDATE users SET data = ? WHERE name = ?').run('{broken-json', 'Steve')
  rawDb.close()

  const get = await requestJson(ctx.baseUrl, '/api/users/Steve', {
    headers: { Authorization: `Bearer ${register.body.token}` },
  })

  assert.equal(get.response.status, 200)
  assert.deepEqual(get.body, { name: 'Steve', exercises: [] })
})

test('legacy stored user payload is normalized before it reaches the client', async t => {
  const ctx = await createTestContext()
  t.after(async () => ctx.close())

  const register = await requestJson(ctx.baseUrl, '/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Steve', password: 'squat123' }),
  })

  const rawDb = new Database(ctx.dbPath)
  rawDb.prepare('UPDATE users SET data = ? WHERE name = ?').run(JSON.stringify({
    name: 'Steve',
    exercises: [
      null,
      {
        exerciseKey: 'bench',
        testWeight: 100,
        testReps: 5,
        oneRM: 118.9,
        date: '17.03.2026',
      },
      {
        exerciseKey: 'row',
        testWeight: 0,
        testReps: 6,
        oneRM: 80,
        date: '17.03.2026',
      },
    ],
    trainingProgress: { completedSessions: 2 },
  }), 'Steve')
  rawDb.close()

  const get = await requestJson(ctx.baseUrl, '/api/users/Steve', {
    headers: { Authorization: `Bearer ${register.body.token}` },
  })

  assert.equal(get.response.status, 200)
  assert.deepEqual(get.body, {
    name: 'Steve',
    exercises: [
      {
        exerciseKey: 'bench',
        testWeight: 100,
        testReps: 5,
        oneRM: 118.9,
        date: '17.03.2026',
      },
    ],
    trainingProgress: { completedSessions: 2 },
  })
})

test('development localhost requests bypass auth rate limiting', async t => {
  const ctx = await createCustomTestContext({
    NODE_ENV: 'development',
    LOGIN_MAX_ATTEMPTS: '1',
    AUTH_RATE_LIMIT_WINDOW_MS: '600000',
  })
  t.after(async () => ctx.close())

  await requestJson(ctx.baseUrl, '/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Steve', password: 'squat123' }),
  })

  const wrong1 = await requestJson(ctx.baseUrl, '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Steve', password: 'wrong-pass' }),
  })

  const wrong2 = await requestJson(ctx.baseUrl, '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Steve', password: 'wrong-pass-again' }),
  })

  assert.equal(wrong1.response.status, 401)
  assert.equal(wrong2.response.status, 401)
  assert.equal(wrong2.body.error, 'Неверный пароль')
})

test('non-development auth rate limiting still blocks repeated failures', async t => {
  const ctx = await createCustomTestContext({
    NODE_ENV: 'test',
    JWT_SECRET: 'test-secret',
    LOGIN_MAX_ATTEMPTS: '1',
    AUTH_RATE_LIMIT_WINDOW_MS: '600000',
  })
  t.after(async () => ctx.close())

  await requestJson(ctx.baseUrl, '/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Steve', password: 'squat123' }),
  })

  const wrong1 = await requestJson(ctx.baseUrl, '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Steve', password: 'wrong-pass' }),
  })

  const wrong2 = await requestJson(ctx.baseUrl, '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Steve', password: 'wrong-pass-again' }),
  })

  assert.equal(wrong1.response.status, 401)
  assert.equal(wrong2.response.status, 429)
  assert.equal(wrong2.body.error, 'Слишком много попыток. Попробуй позже.')
})
