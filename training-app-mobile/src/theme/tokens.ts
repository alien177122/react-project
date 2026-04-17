export const theme = {
  colors: {
    bg: '#0d0d0d',
    bgGradientTop: '#121827',
    bgGradientBottom: '#070a12',
    surface: '#141414',
    card: '#1a1a1a',
    glass: 'rgba(255,255,255,0.045)',
    glassBorder: 'rgba(255,255,255,0.11)',
    border: '#252525',
    text: '#e0e0d8',
    muted: '#666666',
    accent: '#ff6b35',
    accentDim: 'rgba(255,107,53,0.12)',
    red: '#ff4d4d',
    green: '#3affb8',
    blue: '#5ba4ff',
    orange: '#ff9f40',
    glowWarm: 'rgba(255,107,53,0.20)',
    glowCool: 'rgba(91,164,255,0.16)',
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
