import { Platform } from 'react-native';

const systemFont = Platform.select({
  android: 'sans-serif',
  ios: 'System',
  default: undefined,
});

export const theme = {
  cssVars: {
    bgPrimary: '--color-bg-primary',
    bgSecondary: '--color-bg-secondary',
    textPrimary: '--color-text-primary',
    textAccent: '--color-text-accent',
  },
  colors: {
    bgPrimary: '#0A0A0B',
    bgSecondary: '#111113',
    surface: '#18181B',
    surfaceRaised: '#202024',
    light: '#FFFFFF',
    textPrimary: '#FFFFFF',
    textSecondary: '#D8D8E0',
    textMuted: '#A7A7B0',
    textDisabled: '#9A9AA3',
    textInverse: '#0A0A0B',
    textAccent: '#FF8C00',
    accent: '#FF8C00',
    accentPressed: '#CC7000',
    border: 'rgba(255, 255, 255, 0.16)',
    borderStrong: 'rgba(255, 255, 255, 0.28)',
    overlay: 'rgba(255, 255, 255, 0.06)',
  },
  fonts: {
    family: {
      body: systemFont,
    },
    weight: {
      regular: '400',
      medium: '500',
      semibold: '600',
    },
    size: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
      display: 48,
    },
    lineHeight: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 28,
      xl: 32,
      xxl: 40,
      display: 56,
    },
    letterSpacing: {
      none: 0,
    },
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radii: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  shadows: {
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.28,
      shadowRadius: 24,
      elevation: 8,
    },
    control: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.22,
      shadowRadius: 8,
      elevation: 3,
    },
    layers: {
      card: [
        { x: 0, y: 1, blur: 2, opacity: 0.2 },
        { x: 0, y: 12, blur: 32, opacity: 0.24 },
      ],
    },
  },
  motion: {
    duration: {
      micro: 180,
      macro: 480,
    },
    easing: {
      reveal: [0.16, 1, 0.3, 1] as const,
      transition: [0.4, 0, 0.2, 1] as const,
    },
  },
  hitSlop: {
    control: { top: 8, right: 8, bottom: 8, left: 8 },
  },
} as const;

export type Theme = typeof theme;
