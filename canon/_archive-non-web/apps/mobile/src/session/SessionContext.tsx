import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthSession} from '@training/shared/hooks/useAuthSession';
import type {UserData} from '@training/shared/types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {API_BASE_URL, apiClient} from '@/lib/api';
import {secureTokenStorage} from '@/lib/secureTokenStorage';
import {DEFAULT_USER_DATA, storage} from '@/lib/storage';

const GUEST_FLAG_KEY = 'training-calculator:guest:v1';

type AuthSession = ReturnType<typeof useAuthSession>;

export interface SessionContextValue extends AuthSession {
  isGuest: boolean;
  enterGuest: () => Promise<void>;
  persistUserData: (data: UserData) => Promise<{ok: boolean; error?: string}>;
  apiBaseUrl: string;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({children}: {children: ReactNode}) {
  const auth = useAuthSession({
    storage: secureTokenStorage,
    apiBaseUrl: API_BASE_URL,
  });

  const [isGuest, setIsGuest] = useState(false);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    if (auth.sessionLoading) return;

    let cancelled = false;

    async function bootstrap() {
      if (auth.token && auth.userName) {
        await AsyncStorage.removeItem(GUEST_FLAG_KEY);
        if (!cancelled) setIsGuest(false);

        if (!auth.userData) {
          const cached = await storage.load(auth.userName);
          if (!cancelled) auth.setUserData(cached);
        }
        if (!cancelled) setBootstrapped(true);
        return;
      }

      const guestFlag = await AsyncStorage.getItem(GUEST_FLAG_KEY);
      if (guestFlag === '1') {
        const local = await storage.load();
        if (!cancelled) {
          setIsGuest(true);
          auth.setUserData(local);
        }
      } else if (!cancelled) {
        setIsGuest(false);
      }

      if (!cancelled) setBootstrapped(true);
    }

    void bootstrap();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bootstrap when auth session settles
  }, [auth.sessionLoading, auth.token, auth.userName]);

  useEffect(() => {
    if (!auth.userData) return;
    void storage.save(auth.userData);
  }, [auth.userData]);

  useEffect(() => {
    if (auth.sessionLoading || !auth.token || !auth.userName || auth.userData) return;
    if (!auth.sessionError) return;

    let cancelled = false;
    storage.load(auth.userName).then(cached => {
      if (!cancelled) auth.setUserData(cached);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.sessionError, auth.sessionLoading, auth.token, auth.userData, auth.userName]);

  const enterGuest = useCallback(async () => {
    await auth.handleLogout();
    await AsyncStorage.setItem(GUEST_FLAG_KEY, '1');
    const data = await storage.load();
    auth.setUserData(data);
    setIsGuest(true);
  }, [auth]);

  const handleLogout = useCallback(async () => {
    await auth.handleLogout();
    await AsyncStorage.removeItem(GUEST_FLAG_KEY);
    setIsGuest(false);
    auth.setUserData(null);
  }, [auth]);

  const persistUserData = useCallback(
    async (data: UserData): Promise<{ok: boolean; error?: string}> => {
      auth.setUserData(data);
      await storage.save(data);

      if (!auth.token) {
        return {ok: true};
      }

      return apiClient.saveUser(data, auth.token);
    },
    [auth],
  );

  const value = useMemo<SessionContextValue>(() => {
    return {
      ...auth,
      handleLogout,
      userData: auth.userData ?? (isGuest ? DEFAULT_USER_DATA : null),
      isGuest,
      enterGuest,
      persistUserData,
      apiBaseUrl: API_BASE_URL,
      sessionLoading: auth.sessionLoading || !bootstrapped,
    };
  }, [auth, bootstrapped, enterGuest, handleLogout, isGuest, persistUserData]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return ctx;
}
