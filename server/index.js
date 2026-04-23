import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userExists, getUserAuth, createUser, getUser, putUser, delUser } from './db.js'

const app = express()
const JWT_SECRET = process.env.JWT_SECRET || 'gym-secret-dev'

app.use(cors())
app.use(express.json())

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
app.post('/api/auth/register', async (req, res) => {
  const { name, password } = req.body
  if (!name?.trim() || !password) return res.status(400).json({ error: 'Заполни все поля' })
  if (name.trim().length < 2) return res.status(400).json({ error: 'Имя минимум 2 символа' })
  if (password.length < 4)   return res.status(400).json({ error: 'Пароль минимум 4 символа' })
  if (userExists(name.trim())) return res.status(409).json({ error: 'Пользователь уже существует' })

  const hash = await bcrypt.hash(password, 10)
  createUser(name.trim(), hash)
  const token = jwt.sign({ name: name.trim() }, JWT_SECRET, { expiresIn: '30d' })
  res.json({ token, name: name.trim() })
})

// ── Вход ─────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  const { name, password } = req.body
  if (!name?.trim() || !password) return res.status(400).json({ error: 'Заполни все поля' })

  const row = getUserAuth(name.trim())
  if (!row) return res.status(401).json({ error: 'Пользователь не найден' })

  const ok = await bcrypt.compare(password, row.password_hash)
  if (!ok) return res.status(401).json({ error: 'Неверный пароль' })

  const token = jwt.sign({ name: row.name }, JWT_SECRET, { expiresIn: '30d' })
  res.json({ token, name: row.name })
})

// ── Данные пользователя (защищённые) ─────────────────────────
function validateUserData(data, expectedName) {
  if (!data || typeof data !== 'object') return 'Invalid payload format';
  if (data.name !== expectedName) return 'Name in payload does not match URL';
  if (!Array.isArray(data.exercises)) return 'exercises must be an array';

  for (const ex of data.exercises) {
    if (!ex || typeof ex !== 'object') return 'Invalid exercise object';
    if (typeof ex.exerciseKey !== 'string') return 'exerciseKey must be a string';
    if (typeof ex.testWeight !== 'number') return 'testWeight must be a number';
    if (typeof ex.testReps !== 'number') return 'testReps must be a number';
    if (typeof ex.oneRM !== 'number') return 'oneRM must be a number';
    if (typeof ex.date !== 'string') return 'date must be a string';
    if (ex.bodyWeight !== undefined && typeof ex.bodyWeight !== 'number') return 'bodyWeight must be a number';
  }

  if (data.trainingProgress !== undefined) {
    if (!data.trainingProgress || typeof data.trainingProgress !== 'object') return 'trainingProgress must be an object';
    if (typeof data.trainingProgress.completedSessions !== 'number') return 'completedSessions must be a number';
  }

  return null; // No errors
}

app.get('/api/users/:name', auth, (req, res) => {
  const data = getUser(req.params.name)
  const fallback = { name: req.params.name, exercises: [] }
  res.json(data && data.name ? data : fallback)
})

app.put('/api/users/:name', auth, (req, res) => {
  const error = validateUserData(req.body, req.params.name)
  if (error) {
    return res.status(400).json({ error })
  }
  putUser(req.params.name, req.body)
  res.json({ ok: true })
})

app.delete('/api/users/:name', auth, (req, res) => {
  delUser(req.params.name)
  res.json({ ok: true })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API → http://localhost:${PORT}`)
})
