import { Platform, PlatformColor } from 'react-native'

const platformColor = (iosColorName: string, fallback: string) => (
  Platform.OS === 'ios' ? PlatformColor(iosColorName) : fallback
)

export const WEB_TOKEN_PARITY = {
  bg: '#0a0c10',
  surface: '#151a22',
  surface2: '#1c222c',
  border: 'rgba(148,163,184,0.14)',
  borderStrong: 'rgba(148,163,184,0.28)',
  text: '#f3efe6',
  muted: '#99a1ad',
  dim: '#6a7383',
  accent: '#ff9f40',
  accentTint: 'rgba(255,159,64,0.12)',
  error: '#ff3b30',
} as const

export const theme = {
  colors: {
    bg: WEB_TOKEN_PARITY.bg,
    bgGradientTop: WEB_TOKEN_PARITY.bg,
    bgGradientBottom: '#0c0f15',
    surface: WEB_TOKEN_PARITY.surface,
    surface2: WEB_TOKEN_PARITY.surface2,
    card: WEB_TOKEN_PARITY.surface,
    glass: 'rgba(243,239,230,0.04)',
    glassBorder: WEB_TOKEN_PARITY.border,
    border: WEB_TOKEN_PARITY.border,
    borderStrong: WEB_TOKEN_PARITY.borderStrong,
    text: WEB_TOKEN_PARITY.text,
    muted: WEB_TOKEN_PARITY.muted,
    dim: WEB_TOKEN_PARITY.dim,
    textDim: WEB_TOKEN_PARITY.dim,
    accent: WEB_TOKEN_PARITY.accent,
    accentTint: WEB_TOKEN_PARITY.accentTint,
    accentDim: WEB_TOKEN_PARITY.accentTint,
    tabBarBg: 'rgba(10,12,16,0.92)',
    error: WEB_TOKEN_PARITY.error,
    red: WEB_TOKEN_PARITY.error,
    green: '#34c759',
    blue: '#0a84ff',
    orange: WEB_TOKEN_PARITY.accent,
    glowWarm: 'rgba(255,159,64,0.08)',
    glowCool: 'rgba(167,139,250,0.08)',
    semanticError: platformColor('systemRed', WEB_TOKEN_PARITY.error),
    semanticGreen: platformColor('systemGreen', '#34c759'),
    semanticBlue: platformColor('systemBlue', '#0a84ff'),
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 10,
    md: 16,
    lg: 24,
  },
  /**
   * Letter-spacing tokens (positive = expanded, negative = tight/premium)
   *   tight   -0.5   large display / hero text
   *   snug    -0.3   section titles and subheadlines
   *   normal   0     body copy
   *   caps     1.5   uppercase small text
   *   label    2     eyebrow / screen labels
   */
  letterSpacing: {
    tight: -0.5,
    snug: -0.3,
    normal: 0,
    caps: 1.5,
    label: 2,
  },
  /**
   * Named type scale — use these in StyleSheet / mixins instead of raw numbers.
   *   caption  11  table column headers
   *   eyebrow  12  screen labels, tags
   *   small    13  secondary body, table rows
   *   data     14  numeric values, medium body
   *   button   15  button labels
   *   body     16  primary paragraph copy
   *   subhead  18  card titles
   *   subhLg   20  larger card titles
   *   title    24  section titles
   *   titleLg  28  hero secondary
   *   hero     34  screen hero
   */
  typography: {
    caption: 11,
    eyebrow: 12,
    small: 13,
    data: 14,
    button: 15,
    body: 16,
    subhead: 18,
    subhLg: 20,
    title: 24,
    titleLg: 28,
    hero: 34,
  },
} as const
