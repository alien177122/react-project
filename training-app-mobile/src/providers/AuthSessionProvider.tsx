import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import { useAuthSession } from '../hooks/useAuthSession'

type AuthSessionValue = ReturnType<typeof useAuthSession>

const AuthSessionContext = createContext<AuthSessionValue | null>(null)

export function AuthSessionProvider({ children }: PropsWithChildren) {
  const value = useAuthSession()
  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthSessionContext() {
  const context = useContext(AuthSessionContext)
  if (!context) throw new Error('useAuthSessionContext must be used inside AuthSessionProvider')
  return context
}
