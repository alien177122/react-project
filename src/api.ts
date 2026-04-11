import type { UserData } from './types'

// ============================================================
// API — работа с сервером (server/index.mjs, порт 3001)
// URL сервера берётся из .env.local (VITE_API_URL) или localhost
// ============================================================
const API = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3001/api'

// Загружает данные пользователя (упражнения, прогресс) с сервера
// При ошибке (нет сети, 401) возвращает пустой объект — не крашит приложение
export async function loadUser(name: string, token: string): Promise<UserData> {
  try {
    const r = await fetch(`${API}/users/${encodeURIComponent(name)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!r.ok) return { name, exercises: [] }
    return r.json()
  } catch {
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
