# Codex Task: Unified Auth + Shared Content Migration

## Context

Monorepo: Yarn Workspaces
Stack: React 19 (web) + Expo 52 (mobile) + Electron 41 (macOS desktop)
Backend: Express 5 / SQLite (better-sqlite3) at `/server`
Shared package: `packages/shared` (`@training/shared`)
Database: `gym.db` — SQLite, table `users(name PK, password_hash, data JSON)`
Auth: JWT, 30-day expiry, stored in `localStorage` (web/desktop) or `expo-secure-store` (mobile)

**Verification account:** `alien17`
The database already contains this user with 12 strength exercises (силовые данные).
After every migration step, login as `alien17` on all platforms and confirm the exercise list loads correctly.

---

## Goal

1. Move auth logic and API utilities into `packages/shared` (single source of truth)
2. Provide a `TokenStorage` interface so web/mobile/desktop use the same core code
3. Ensure all three platforms (web, mobile, macOS Electron) log in identically and show strength data
4. Zero regression on existing tests (`npm run test` must stay green — 15/15)

---

## Step 1 — Add shared types for auth

File: `packages/shared/src/types/auth.ts`

```ts
export interface AuthResult {
  token?: string
  name?: string
  error?: string
}

export interface StoredSession {
  token: string
  userName: string
}

/** Platform-specific storage implementation injected at runtime */
export interface TokenStorage {
  load(): Promise<StoredSession>
  save(token: string, userName: string): Promise<void>
  clear(): Promise<void>
}
```

Export from `packages/shared/src/types/index.ts`:
```ts
export * from './auth'
```

---

## Step 2 — Move API utilities to shared

File: `packages/shared/src/utils/api.ts`

Extract the **platform-agnostic** fetch functions from `src/utils/api.ts`.
The shared module must NOT import `import.meta.env` (Vite-specific).
Instead accept `baseUrl` as a parameter or inject via a factory.

```ts
import type { UserData } from '../types'
import type { AuthResult } from '../types/auth'

export function createApiClient(baseUrl: string) {
  const AUTH_EXPIRED = 'AUTH_EXPIRED'

  // ... move normalizeLoadedUser, jwtName, loadUser, saveUser, apiAuth here
  // Replace: import.meta.env.VITE_API_URL  →  baseUrl parameter

  return { jwtName, loadUser, saveUser, apiAuth }
}
```

Export from `packages/shared/src/index.ts`:
```ts
export * from './utils/api'
```

Update `packages/shared/package.json` exports:
```json
"./utils/api": "./src/utils/api.ts"
```

---

## Step 3 — Create shared `useAuthSession` core

File: `packages/shared/src/hooks/useAuthSession.ts`

This hook works on **both** React 19 (web) and React Native (mobile) because it only uses `useState`/`useEffect` — no DOM, no native modules.

```ts
import { useEffect, useState } from 'react'
import type { UserData } from '../types'
import type { TokenStorage } from '../types/auth'
import { createApiClient } from '../utils/api'

export interface AuthSessionOptions {
  storage: TokenStorage
  apiBaseUrl: string
}

export function useAuthSession({ storage, apiBaseUrl }: AuthSessionOptions) {
  const { jwtName, loadUser, saveUser, apiAuth } = createApiClient(apiBaseUrl)

  const [token, setToken] = useState('')
  const [userName, setUserName] = useState('')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [sessionLoading, setSessionLoading] = useState(true)

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [nameInput, setNameInput] = useState('')
  const [passInput, setPassInput] = useState('')
  const [pass2Input, setPass2Input] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Restore session from platform storage
  useEffect(() => {
    let cancelled = false
    storage.load().then(session => {
      if (cancelled) return
      setToken(session.token)
      setUserName(session.userName)
    }).finally(() => {
      if (!cancelled) setSessionLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  // Load user data when session is ready
  useEffect(() => {
    let cancelled = false
    if (sessionLoading || !userName || !token) {
      if (!sessionLoading) setUserData(null)
      return () => { cancelled = true }
    }

    loadUser(userName, token).then(async data => {
      if (cancelled) return
      if (data) { setUserData(data); return }
      await storage.clear()
      if (!cancelled) { setToken(''); setUserName(''); setUserData(null) }
    })

    return () => { cancelled = true }
  }, [sessionLoading, token, userName])

  async function handleAuth() {
    const name = nameInput.trim()
    const pass = passInput
    if (!name || !pass) { setAuthError('Заполни все поля'); return }
    if (authMode === 'register' && pass !== pass2Input) { setAuthError('Пароли не совпадают'); return }

    setAuthLoading(true)
    setAuthError('')
    const result = await apiAuth(authMode, { name, password: pass })
    setAuthLoading(false)

    if (result.error) { setAuthError(result.error); return }

    const nextToken = result.token ?? ''
    const nextName = result.name ?? name
    await storage.save(nextToken, nextName)
    setToken(nextToken)
    setUserName(nextName)
    setNameInput(''); setPassInput(''); setPass2Input('')
  }

  async function handleLogout() {
    await storage.clear()
    setToken(''); setUserName(''); setUserData(null)
  }

  return {
    token, userName, userData, setUserData, sessionLoading,
    authMode, setAuthMode,
    nameInput, setNameInput,
    passInput, setPassInput,
    pass2Input, setPass2Input,
    authError, setAuthError,
    authLoading,
    handleAuth, handleLogout,
  }
}
```

Export from `packages/shared/src/hooks/index.ts` and `packages/shared/src/index.ts`.
Add to `packages/shared/package.json` exports:
```json
"./hooks/useAuthSession": "./src/hooks/useAuthSession.ts"
```

---

## Step 4 — Platform `TokenStorage` implementations

### 4a. Web (`src/utils/webTokenStorage.ts`)

```ts
import type { TokenStorage, StoredSession } from '@training/shared/types'

const KEY = 'gym_token'
const KEY_NAME = 'gym_username'

export const webTokenStorage: TokenStorage = {
  async load(): Promise<StoredSession> {
    const token = localStorage.getItem(KEY) ?? ''
    const userName = localStorage.getItem(KEY_NAME) ?? ''
    return { token, userName }
  },
  async save(token, userName) {
    localStorage.setItem(KEY, token)
    localStorage.setItem(KEY_NAME, userName)
  },
  async clear() {
    localStorage.removeItem(KEY)
    localStorage.removeItem(KEY_NAME)
  },
}
```

> Note: Previously the web version derived userName from the JWT via `jwtName()`.
> Going forward, store it explicitly with `KEY_NAME` for symmetry.
> On first load, if `KEY_NAME` is empty but `KEY` exists, fall back to `jwtName(token)`.

### 4b. Mobile — already exists at `training-app-mobile/src/utils/sessionStorage.ts`

Wrap it to satisfy the `TokenStorage` interface:

File: `training-app-mobile/src/utils/mobileTokenStorage.ts`
```ts
import type { TokenStorage } from '@training/shared/types'
import { clearStoredSession, loadStoredSession, saveStoredSession } from './sessionStorage'

export const mobileTokenStorage: TokenStorage = {
  load: loadStoredSession,
  async save(token, userName) { await saveStoredSession(token, userName) },
  clear: clearStoredSession,
}
```

### 4c. macOS Electron — uses web's `localStorage`, reuse `webTokenStorage` as-is.

---

## Step 5 — Wire up each platform

### 5a. Web `src/hooks/useAuthSession.ts`

Replace existing implementation:
```ts
import { useAuthSession as useAuthSessionCore } from '@training/shared/hooks/useAuthSession'
import { webTokenStorage } from '../utils/webTokenStorage'

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api'

export function useAuthSession() {
  return useAuthSessionCore({ storage: webTokenStorage, apiBaseUrl: API_BASE })
}
```

### 5b. Mobile `training-app-mobile/src/hooks/useAuthSession.ts`

```ts
import { useAuthSession as useAuthSessionCore } from '@training/shared/hooks/useAuthSession'
import { mobileTokenStorage } from '../utils/mobileTokenStorage'
import Constants from 'expo-constants'

const API_BASE = (Constants.expoConfig?.extra?.apiUrl as string | undefined) ?? 'http://127.0.0.1:3001/api'

export function useAuthSession() {
  return useAuthSessionCore({ storage: mobileTokenStorage, apiBaseUrl: API_BASE })
}
```

### 5c. macOS React Native `apps/macos/src/hooks/useAuthSession.ts`

```ts
import { useAuthSession as useAuthSessionCore } from '@training/shared/hooks/useAuthSession'
import { webTokenStorage } from '../utils/webTokenStorage'  // AsyncStorage variant if needed

export function useAuthSession() {
  return useAuthSessionCore({ storage: webTokenStorage, apiBaseUrl: 'http://127.0.0.1:3001/api' })
}
```

---

## Step 6 — Shared `saveUser` export

Expose `saveUser` from the shared api client so all platforms call the same function.
All three platforms currently call `saveUser` when exercises change — keep that call-site the same, just import from shared.

---

## Step 7 — Verification checklist (use account `alien17`)

After all changes, run through this checklist on every platform:

### Web (`npm run dev` + open http://localhost:5173)
- [ ] Login form appears when no session
- [ ] Login as `alien17` with correct password → welcome message shows
- [ ] Calculator tab → exercise list shows 12 saved lifts (squat 100kg, bench 70kg, etc.)
- [ ] Refresh page → session persists (localStorage)
- [ ] Logout → form reappears, exercises cleared

### Mobile (`npx expo start --clear` in `training-app-mobile/`)
- [ ] App opens to login screen
- [ ] Login as `alien17` → home tabs visible
- [ ] Calculator tab shows same 12 exercises
- [ ] Kill and reopen app → session persists (SecureStore)
- [ ] Logout → back to login

### macOS Electron (`npm run desktop` or open DMG)
- [ ] Login screen on cold start
- [ ] Login as `alien17` → exercises load
- [ ] Quit and reopen → session persists

### Expected `alien17` exercise data (from DB, date 12–28 March 2026):
| Exercise | Test kg | Reps | 1RM kg |
|---|---|---|---|
| Squat | 100 | 5 | 116.1 |
| Glute Bridge | 190 | 3 | 206.7 |
| Pull-up | 106 | 4 | 120 (BW 82) |
| Bench Press | 70 | 3 | 76.1 |
| Barbell Row | 70 | 8 | 92 |
| Overhead Press | 55 | 3 | 59.8 |
| Barbell Curl | 50 | 4 | 56.6 |
| Leg Extension | 105 | 10 | 143.5 |
| Leg Curl | 75 | 10 | 102.5 |
| Lateral Raise | 30 | 3 | 32.6 |
| Dumbbell Press | 60 | 6 | 72.5 |
| Leg Press | 220 | 7 | 277 |

---

## Step 8 — Tests

After all changes:
```bash
npm run build   # TypeScript + Vite, must succeed
npm run test    # 15/15 must pass
```

If any test imports `useAuthSession` or `api.ts` directly, update imports to the new shared paths.

---

## File change summary

| File | Action |
|---|---|
| `packages/shared/src/types/auth.ts` | **Create** — AuthResult, StoredSession, TokenStorage interface |
| `packages/shared/src/utils/api.ts` | **Create** — createApiClient factory (platform-agnostic) |
| `packages/shared/src/hooks/useAuthSession.ts` | **Create** — core hook with injected storage |
| `packages/shared/src/hooks/index.ts` | **Update** — export useAuthSession |
| `packages/shared/src/types/index.ts` | **Update** — export auth types |
| `packages/shared/package.json` | **Update** — add exports for new paths |
| `src/utils/webTokenStorage.ts` | **Create** — localStorage adapter |
| `src/hooks/useAuthSession.ts` | **Replace** — thin wrapper over shared hook |
| `src/utils/api.ts` | **Simplify** — re-export from shared, keep VITE_API_URL resolution |
| `training-app-mobile/src/utils/mobileTokenStorage.ts` | **Create** — SecureStore adapter |
| `training-app-mobile/src/hooks/useAuthSession.ts` | **Replace** — thin wrapper |
| `training-app-mobile/src/utils/api.ts` | **Simplify** — re-export from shared |
| `apps/macos/src/hooks/useAuthSession.ts` | **Create** (if missing) — wrapper for macOS |

**Do NOT modify:**
- `server/` — backend stays unchanged
- `gym.db` — database stays unchanged
- `packages/shared/src/data/` — theory/exercise data stays unchanged
- Any test files in `tests/` — only update imports if they break

---

## Notes for Codex

- All files are TypeScript. Run `tsc --noEmit` after each step.
- `packages/shared` must NOT depend on `react-native`, `expo-secure-store`, or browser globals.
- The `TokenStorage` interface is the only async surface — implementations live in each app.
- `jwtName` helper can stay exported from shared utils for any platform that needs it.
- Rate-limit bypass in dev mode (loopback IP) is server-side only — no client changes needed.
- The `AuthSessionProvider` in `training-app-mobile/src/providers/` wraps the hook in Context — keep that pattern, just update it to call the new wrapper hook.
