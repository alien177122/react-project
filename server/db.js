import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const db = new Database(join(__dirname, '..', 'gym.db'))

db.exec(`CREATE TABLE IF NOT EXISTS users (
  name          TEXT PRIMARY KEY,
  password_hash TEXT NOT NULL,
  data          TEXT NOT NULL DEFAULT '{}'
)`)

export const userExists  = name => !!db.prepare('SELECT 1 FROM users WHERE name = ?').get(name)
export const getUserAuth = name => db.prepare('SELECT name, password_hash FROM users WHERE name = ?').get(name)
export const createUser  = (name, hash) =>
  db.prepare('INSERT INTO users (name, password_hash, data) VALUES (?, ?, ?)').run(name, hash, '{}')

export const getUser = name => {
  const r = db.prepare('SELECT data FROM users WHERE name = ?').get(name)
  return r ? JSON.parse(r.data) : null
}
export const putUser = (name, data) =>
  db.prepare('UPDATE users SET data = ? WHERE name = ?').run(JSON.stringify(data), name)

export const delUser = name =>
  db.prepare('DELETE FROM users WHERE name = ?').run(name)
