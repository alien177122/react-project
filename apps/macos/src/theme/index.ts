export const colors = {
  bg: '#0d0d0d',
  panel: '#141414',
  panelAlt: '#111111',
  border: '#252525',
  surface: '#141414',
  card: '#1a1a1a',
  text: '#e0e0d8',
  textMuted: '#666666',
  muted: '#666666',
  accent: '#ff6b35',
  accentSoft: 'rgba(255,107,53,0.08)',
  accentDim: 'rgba(255,107,53,0.12)',
  success: '#3affb8',
  warning: '#ff9f40',
  green: '#3affb8',
  red: '#ff4d4d',
  blue: '#5ba4ff',
  orange: '#ff9f40',
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
};

export const typography = {
  eyebrow: 12,
  body: 16,
  title: 24,
  hero: 34,
};

export const theme = {colors, spacing, radius, typography} as const;
