import {useEffect, useState} from 'react';
import type {UserData} from '@training/shared/types';
import {apiAuth, loadUser, saveUser} from '../platform/api';
import {
  clearStoredSession,
  loadStoredSession,
  saveStoredSession,
} from '../platform/storage';

export function useAuthSession() {
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [nameInput, setNameInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [pass2Input, setPass2Input] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Restore session on mount
  useEffect(() => {
    loadStoredSession().then(({token: t, userName: u}) => {
      setToken(t);
      setUserName(u);
      setSessionLoading(false);
    });
  }, []);

  // Load user data when session is ready
  useEffect(() => {
    if (sessionLoading || !token || !userName) return;
    loadUser(userName, token).then(data => {
      if (data) {
        setUserData(data);
      } else {
        clearStoredSession();
        setToken('');
        setUserName('');
        setUserData(null);
      }
    });
  }, [sessionLoading, token, userName]);

  async function handleAuth() {
    setAuthError('');
    const name = nameInput.trim();
    const password = passInput;

    if (!name || !password) {
      setAuthError('Введи имя и пароль');
      return;
    }
    if (authMode === 'register' && password !== pass2Input) {
      setAuthError('Пароли не совпадают');
      return;
    }

    setAuthLoading(true);
    const result = await apiAuth(authMode, {name, password});
    setAuthLoading(false);

    if (result.error) {
      setAuthError(result.error);
      return;
    }
    if (result.token && result.name) {
      await saveStoredSession(result.token, result.name);
      setToken(result.token);
      setUserName(result.name);
      setNameInput('');
      setPassInput('');
      setPass2Input('');
    }
  }

  async function handleLogout() {
    await clearStoredSession();
    setToken('');
    setUserName('');
    setUserData(null);
    setNameInput('');
    setPassInput('');
    setPass2Input('');
    setAuthError('');
  }

  // Helper to persist user data changes
  async function updateAndSave(next: UserData | null) {
    setUserData(next);
    if (next && token) await saveUser(next, token);
  }

  return {
    token,
    userName,
    userData,
    setUserData: updateAndSave,
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
  };
}
