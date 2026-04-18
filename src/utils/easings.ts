export const EASINGS = {
  revealOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  microOut:  'cubic-bezier(0.22, 1, 0.36, 1)',
  standard:  'cubic-bezier(0.4, 0, 0.2, 1)',
} as const

export const DURATIONS = {
  fast:   250,
  medium: 600,
  slow:   800,
  slower: 1200,
} as const

export type EasingKey  = keyof typeof EASINGS
export type DurationKey = keyof typeof DURATIONS
