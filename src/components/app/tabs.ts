export const APP_TABS = ['training', 'calculator', 'theory', 'split', 'journal'] as const

export type AppTab = (typeof APP_TABS)[number]

export function isAppTab(value: string | null): value is AppTab {
  return APP_TABS.some(tab => tab === value)
}
