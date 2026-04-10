export const theme = {
  colors: {
    bg: '#0d0d0d',
    surface: '#141414',
    card: '#1a1a1a',
    border: '#252525',
    text: '#e0e0d8',
    muted: '#666666',
    accent: '#ff6b35',
    accentDim: 'rgba(255,107,53,0.12)',
    red: '#ff4d4d',
    green: '#3affb8',
    blue: '#5ba4ff',
    orange: '#ff9f40',
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
