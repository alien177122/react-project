export const THEME_STORAGE_KEY = 'app-theme' as const;

export type ThemeMode = 'light' | 'dark';

export const THEME_META_COLORS: Record<ThemeMode, string> = {
  light: '#282c31',
  dark: '#0a0a0b',
} as const;

/** Auth screen always uses black canvas — overrides light theme-color */
export const AUTH_CANVAS_COLOR = '#0a0a0b' as const;

export function isValidTheme(value: string): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

export function getStoredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && isValidTheme(stored)) return stored;
  } catch {
    // localStorage unavailable (private mode, etc.)
  }
  return 'light';
}

export function applyTheme(theme: ThemeMode): void {
  const html = document.documentElement;
  html.dataset.theme = theme;
  html.style.colorScheme = theme;
  html.classList.toggle('theme-light', theme === 'light');
  html.classList.toggle('theme-dark', theme === 'dark');

  const onAuth = html.classList.contains('auth-open') || html.querySelector('.auth-screen');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', onAuth ? AUTH_CANVAS_COLOR : THEME_META_COLORS[theme]);
  }
}
