import type {PropsWithChildren} from 'react';
import {createContext, useContext} from 'react';
import {useAuthSession} from '../hooks/useAuthSession';

type AuthSessionValue = ReturnType<typeof useAuthSession>;

const AuthSessionContext = createContext<AuthSessionValue | null>(null);

export function AuthProvider({children}: PropsWithChildren) {
  const value = useAuthSession();
  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const ctx = useContext(AuthSessionContext);
  if (!ctx) throw new Error('useAuthContext must be inside AuthProvider');
  return ctx;
}
