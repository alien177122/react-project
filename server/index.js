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

const DUMMY_HASH = bcrypt.hashSync('dummy_password', 10)

// ── Вход ─────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  const { name, password } = req.body
  if (!name?.trim() || !password) return res.status(400).json({ error: 'Заполни все поля' })

  const row = getUserAuth(name.trim())
  if (!row) {
    await bcrypt.compare(password, DUMMY_HASH)
    return res.status(401).json({ error: 'Неверное имя пользователя или пароль' })
  }

  const ok = await bcrypt.compare(password, row.password_hash)
  if (!ok) return res.status(401).json({ error: 'Неверное имя пользователя или пароль' })

  const token = jwt.sign({ name: row.name }, JWT_SECRET, { expiresIn: '30d' })
  res.json({ token, name: row.name })
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

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API → http://localhost:${PORT}`)
})
