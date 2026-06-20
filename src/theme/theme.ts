export const THEME_STORAGE_KEY = 'app-theme' as const;

export type ThemeMode = 'light' | 'dark';

export const THEME_META_COLORS: Record<ThemeMode, string> = {
  light: '#fafafa',
  dark: '#0a0a0b',
} as const;

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

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', THEME_META_COLORS[theme]);
  }
}
