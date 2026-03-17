import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ipKeyGenerator, rateLimit } from 'express-rate-limit'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { userExists, getUserAuth, createUser, getUser, putUser, delUser } from './db.js'

const app = express()
const JWT_SECRET = process.env.JWT_SECRET || 'gym-secret-dev'
const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const AUTH_WINDOW_MS = Math.max(1000, Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 10 * 60 * 1000)
const LOGIN_MAX_ATTEMPTS = Math.max(1, Number(process.env.LOGIN_MAX_ATTEMPTS) || 7)
const REGISTER_MAX_ATTEMPTS = Math.max(1, Number(process.env.REGISTER_MAX_ATTEMPTS) || 5)

app.use(cors())
app.use(express.json())

function normalizedName(req) {
  return typeof req.body?.name === 'string' ? req.body.name.trim().toLowerCase() : ''
}

function requestIp(req) {
  const cfIp = req.headers['cf-connecting-ip']
  if (typeof cfIp === 'string' && cfIp.trim()) return cfIp.trim()
  return req.ip || req.socket.remoteAddress || '127.0.0.1'
}

function limitExceeded(_req, res) {
  return res.status(429).json({ error: 'Слишком много попыток. Попробуй позже.' })
}

function makeIpLimiter(scope, limit) {
  return rateLimit({
    windowMs: AUTH_WINDOW_MS,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    keyGenerator: req => `${scope}:ip:${ipKeyGenerator(requestIp(req))}`,
    handler: limitExceeded,
  })
}

function makeNameLimiter(scope, limit) {
  return rateLimit({
    windowMs: AUTH_WINDOW_MS,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    keyGenerator: req => `${scope}:name:${normalizedName(req) || ipKeyGenerator(requestIp(req))}`,
    handler: limitExceeded,
  })
}

function resetLimiters(req, scope, ipLimiter, nameLimiter) {
  ipLimiter.resetKey(`${scope}:ip:${ipKeyGenerator(requestIp(req))}`)
  nameLimiter.resetKey(`${scope}:name:${normalizedName(req) || ipKeyGenerator(requestIp(req))}`)
}

const loginIpLimiter = makeIpLimiter('login', LOGIN_MAX_ATTEMPTS)
const loginNameLimiter = makeNameLimiter('login', LOGIN_MAX_ATTEMPTS)
const registerIpLimiter = makeIpLimiter('register', REGISTER_MAX_ATTEMPTS)
const registerNameLimiter = makeNameLimiter('register', REGISTER_MAX_ATTEMPTS)

// ── Auth middleware ──────────────────────────────────────────
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Нет токена' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    if (payload.name !== req.params.name) return res.status(403).json({ error: 'Доступ запрещён' })
    req.user = payload
    next()
  } catch {
    res.status(401).json({ error: 'Токен недействителен' })
  }
}

// ── Регистрация ──────────────────────────────────────────────
app.post('/api/auth/register', registerIpLimiter, registerNameLimiter, async (req, res) => {
  const { name, password } = req.body
  if (!name?.trim() || !password) return res.status(400).json({ error: 'Заполни все поля' })
  if (name.trim().length < 2) return res.status(400).json({ error: 'Имя минимум 2 символа' })
  if (password.length < 4) return res.status(400).json({ error: 'Пароль минимум 4 символа' })
  if (userExists(name.trim())) return res.status(409).json({ error: 'Пользователь уже существует' })

  const hash = await bcrypt.hash(password, 10)
  createUser(name.trim(), hash)
  resetLimiters(req, 'register', registerIpLimiter, registerNameLimiter)
  const token = jwt.sign({ name: name.trim() }, JWT_SECRET, { expiresIn: '30d' })
  res.json({ token, name: name.trim() })
})

// ── Вход ─────────────────────────────────────────────────────
app.post('/api/auth/login', loginIpLimiter, loginNameLimiter, async (req, res) => {
  const { name, password } = req.body
  if (!name?.trim() || !password) return res.status(400).json({ error: 'Заполни все поля' })

  const row = getUserAuth(name.trim())
  if (!row) return res.status(401).json({ error: 'Пользователь не найден' })

  const ok = await bcrypt.compare(password, row.password_hash)
  if (!ok) return res.status(401).json({ error: 'Неверный пароль' })

  resetLimiters(req, 'login', loginIpLimiter, loginNameLimiter)
  const token = jwt.sign({ name: row.name }, JWT_SECRET, { expiresIn: '30d' })
  res.json({ token, name: row.name })
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

// ── Данные пользователя (защищённые) ─────────────────────────
app.get('/api/users/:name', auth, (req, res) => {
  const data = getUser(req.params.name)
  const fallback = { name: req.params.name, exercises: [] }
  res.json(data && data.name ? data : fallback)
})

app.put('/api/users/:name', auth, (req, res) => {
  putUser(req.params.name, req.body)
  res.json({ ok: true })
})

app.delete('/api/users/:name', auth, (req, res) => {
  delUser(req.params.name)
  res.json({ ok: true })
})

if (existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get(/^(?!\/api(?:\/|$)).*/, (_req, res) => {
    res.sendFile(join(distDir, 'index.html'))
  })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API → http://localhost:${PORT}`)
})
