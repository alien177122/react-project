import Database from 'better-sqlite3'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fallbackDbPath = join(__dirname, '..', 'gym.db')

function getDefaultDbPath(env = process.env) {
  const configuredDbPath = env.DB_PATH?.trim()
  return configuredDbPath || fallbackDbPath
}

function safeParseUserData(raw) {
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

function resolveDbPath(rawPath, env = process.env) {
  const configuredPath = dbPathOrDefault(rawPath, env)
  return configuredPath === ':memory:' ? configuredPath : resolve(configuredPath)
}

function dbPathOrDefault(rawPath, env = process.env) {
  return rawPath || getDefaultDbPath(env)
}

export function createDb({ dbPath, env = process.env } = {}) {
  const resolvedDbPath = resolveDbPath(dbPath, env)
  if (resolvedDbPath !== ':memory:') {
    mkdirSync(dirname(resolvedDbPath), { recursive: true })
  }

  const db = new Database(resolvedDbPath)

  db.exec(`CREATE TABLE IF NOT EXISTS users (
    name          TEXT PRIMARY KEY,
    password_hash TEXT NOT NULL,
    data          TEXT NOT NULL DEFAULT '{}'
  )`)

  return {
    userExists: name => !!db.prepare('SELECT 1 FROM users WHERE name = ?').get(name),
    getUserAuth: name => db.prepare('SELECT name, password_hash FROM users WHERE name = ?').get(name),
    createUser: (name, hash) =>
      db.prepare('INSERT INTO users (name, password_hash, data) VALUES (?, ?, ?)').run(name, hash, '{}'),
    seedUser: (name, hash) => {
      const exists = db.prepare('SELECT 1 FROM users WHERE name = ?').get(name)
      if (!exists) {
        db.prepare('INSERT INTO users (name, password_hash, data) VALUES (?, ?, ?)').run(name, hash, '{}')
      }
    },
    getUser: name => {
      const row = db.prepare('SELECT data FROM users WHERE name = ?').get(name)
      return row ? safeParseUserData(row.data) : null
    },
    putUser: (name, data) =>
      db.prepare('UPDATE users SET data = ? WHERE name = ?').run(JSON.stringify(data), name),
    delUser: name =>
      db.prepare('DELETE FROM users WHERE name = ?').run(name),
    close: () => db.close(),
  }
}
