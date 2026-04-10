import { useEffect, useState } from 'react'
import type { UserData } from '../types/index.ts'
import type { TokenStorage } from '../types/auth.ts'
import { createApiClient } from '../utils/api.ts'

export interface AuthSessionOptions {
  storage: TokenStorage
  apiBaseUrl: string
}

export function useAuthSession({ storage, apiBaseUrl }: AuthSessionOptions) {
  const { loadUser, apiAuth } = createApiClient(apiBaseUrl)

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

  useEffect(() => {
    let cancelled = false

    storage
      .load()
      .then(session => {
        if (cancelled) return
        setToken(session.token)
        setUserName(session.userName)
      })
      .catch(() => {
        if (cancelled) return
        setToken('')
        setUserName('')
      })
      .finally(() => {
        if (!cancelled) setSessionLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [storage])

  useEffect(() => {
    let cancelled = false

    if (sessionLoading || !userName || !token) {
      if (!sessionLoading) setUserData(null)
      return () => {
        cancelled = true
      }
    }

    loadUser(userName, token).then(async data => {
      if (cancelled) return

      if (data) {
        setUserData(data)
        return
      }

      await storage.clear()
      if (cancelled) return

      setToken('')
      setUserName('')
      setUserData(null)
    })

    return () => {
      cancelled = true
    }
  }, [apiBaseUrl, sessionLoading, storage, token, userName])

  async function handleAuth() {
    const name = nameInput.trim()
    const pass = passInput

    if (!name || !pass) {
      setAuthError('Заполни все поля')
      return
    }

    if (authMode === 'register' && pass !== pass2Input) {
      setAuthError('Пароли не совпадают')
      return
    }

    setAuthLoading(true)
    setAuthError('')

    const result = await apiAuth(authMode, { name, password: pass })
    setAuthLoading(false)

    if (result.error) {
      setAuthError(result.error)
      return
    }

    const nextToken = result.token ?? ''
    const nextName = result.name ?? name

    await storage.save(nextToken, nextName)

    setToken(nextToken)
    setUserName(nextName)
    setNameInput('')
    setPassInput('')
    setPass2Input('')
  }

  async function handleLogout() {
    await storage.clear()
    setToken('')
    setUserName('')
    setUserData(null)
  }

  return {
    token,
    userName,
    userData,
    setUserData,
    sessionLoading,
    authMode,
    setAuthMode,
    nameInput,
    setNameInput,
    passInput,
    setPassInput,
    pass2Input,
    setPass2Input,
    authError,
    setAuthError,
    authLoading,
    handleAuth,
    handleLogout,
  }
}
