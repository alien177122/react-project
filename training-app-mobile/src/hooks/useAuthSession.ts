import { useEffect, useState } from 'react'
import type { UserData } from '../types'
import { clearStoredSession, loadStoredSession, saveStoredSession } from '../utils/sessionStorage'
import { apiAuth, loadUser } from '../utils/api'

export function useAuthSession() {
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

    async function restoreSession() {
      try {
        const storedSession = await loadStoredSession()
        if (cancelled) return

        setToken(storedSession.token)
        setUserName(storedSession.userName)
      } finally {
        if (!cancelled) setSessionLoading(false)
      }
    }

    void restoreSession()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    let cancelled = false
    if (sessionLoading) return () => { cancelled = true }
    if (!userName || !token) {
      setUserData(null)
      return () => { cancelled = true }
    }

    loadUser(userName, token).then(async data => {
      if (cancelled) return

      if (data) {
        setUserData(data)
        return
      }

      await clearStoredSession()
      if (cancelled) return

      setToken('')
      setUserName('')
      setUserData(null)
    })

    return () => { cancelled = true }
  }, [sessionLoading, token, userName])

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
    const nextUserName = result.name ?? name

    await saveStoredSession(nextToken, nextUserName)

    setToken(nextToken)
    setUserName(nextUserName)
    setNameInput('')
    setPassInput('')
    setPass2Input('')
  }

  async function handleLogout() {
    await clearStoredSession()
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
