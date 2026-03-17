import type { UserData } from '../types'

// ============================================================
// API — работа с сервером (server/index.mjs, порт 3001)
// URL сервера берётся из .env.local (VITE_API_URL) или localhost
// ============================================================
export const API = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api'
const AUTH_EXPIRED = 'AUTH_EXPIRED'

// Декодирует JWT-токен и извлекает имя пользователя из payload
// Используется при восстановлении сессии из localStorage
export function jwtName(token: string): string | null {
  try { return JSON.parse(atob(token.split('.')[1])).name ?? null } catch { return null }
}

// Загружает данные пользователя.
// При 401/403 возвращает null, чтобы приложение сбросило невалидную сессию.
// При сетевой ошибке отдаёт пустые данные, чтобы UI не падал.
export async function loadUser(name: string, token: string): Promise<UserData | null> {
  try {
    const r = await fetch(`${API}/users/${encodeURIComponent(name)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (r.status === 401 || r.status === 403) throw new Error(AUTH_EXPIRED)
    if (!r.ok) return { name, exercises: [] }
    return r.json()
  } catch (error) {
    if (error instanceof Error && error.message === AUTH_EXPIRED) return null
    return { name, exercises: [] }
  }
}

// Сохраняет все данные пользователя на сервер одним PUT-запросом
// Вызывается после каждого изменения (расчёт, удаление, завершение тренировки)
export async function saveUser(data: UserData, token: string): Promise<void> {
  await fetch(`${API}/users/${encodeURIComponent(data.name)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
}

// Вход / регистрация: отправляет имя + пароль, получает JWT-токен
export async function apiAuth(path: string, body: object): Promise<{ token?: string; name?: string; error?: string }> {
  try {
    const r = await fetch(`${API}/auth/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return await r.json()
  } catch {
    return { error: 'Нет соединения с сервером' }
  }
}
