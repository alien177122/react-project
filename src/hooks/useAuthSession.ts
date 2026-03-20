import { useEffect, useState } from 'react'
import type { UserData } from '../types'
import { apiAuth, jwtName, loadUser } from '../utils/api'

export function useAuthSession() {
  const [token, setToken] = useState(() => localStorage.getItem('gym_token') || '')
  const [userName, setUserName] = useState(() => {
    const storedToken = localStorage.getItem('gym_token') || ''
    return storedToken ? (jwtName(storedToken) || '') : ''
  })
  const [userData, setUserData] = useState<UserData | null>(null)

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [nameInput, setNameInput] = useState('')
  const [passInput, setPassInput] = useState('')
  const [pass2Input, setPass2Input] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    if (!userName || !token) return () => { cancelled = true }

    loadUser(userName, token).then(data => {
      if (cancelled) return
      if (data) {
        setUserData(data)
        return
      }

      localStorage.removeItem('gym_token')
      setToken('')
      setUserName('')
      setUserData(null)
    })

    return () => { cancelled = true }
  }, [userName, token])

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
    const res = await apiAuth(authMode === 'login' ? 'login' : 'register', { name, password: pass })
    setAuthLoading(false)

    if (res.error) {
      setAuthError(res.error)
      return
    }

    const nextToken = res.token!
    localStorage.setItem('gym_token', nextToken)
    setToken(nextToken)
    setUserName(res.name!)
    setNameInput('')
    setPassInput('')
    setPass2Input('')
  }

  function handleLogout() {
    localStorage.removeItem('gym_token')
    setToken('')
    setUserName('')
    setUserData(null)
  }

  return {
    token,
    userName,
    userData,
    setUserData,
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
