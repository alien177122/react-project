import {useCallback, useEffect, useState} from 'react';
import {applyTheme, getStoredTheme, THEME_STORAGE_KEY, type ThemeMode} from '../theme/theme';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(getStoredTheme);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return {theme, setTheme, toggleTheme} as const;
}
