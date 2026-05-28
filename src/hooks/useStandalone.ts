import { useSyncExternalStore } from 'react'

type NavigatorWithStandalone = Navigator & { standalone?: boolean }

function getSnapshot(): boolean {
  if (typeof window === 'undefined') return false
  return (window.navigator as NavigatorWithStandalone).standalone === true
}

function getServerSnapshot(): boolean {
  return false
}

export function useStandalone(): boolean {
  return useSyncExternalStore(() => () => {}, getSnapshot, getServerSnapshot)
}
