import { useCallback } from 'react'

export type HapticIntensity = 'light' | 'medium'

export type HapticFn = (el: HTMLElement | null, intensity?: HapticIntensity) => void

const SCALE: Record<HapticIntensity, number> = {
  light: 0.96,
  medium: 0.92,
}

/**
 * Visual haptic feedback.
 *
 * iOS Safari does not implement the Vibration API (`navigator.vibrate`
 * is undefined on WebKit/iOS). Instead, we simulate tactile confirmation
 * with a scoped transform pulse on the pressed element. The pulse is
 * applied inline and cleared on the next two animation frames so it
 * plays once per invocation and does not conflict with CSS transitions
 * on the same property (the element's own `transition: transform` will
 * interpolate back to the resting value).
 *
 * No-ops when the element is null, or when the user has requested
 * reduced motion — check that at the call site via useReducedMotion.
 */
export function useHaptic(): HapticFn {
  return useCallback((el, intensity = 'light') => {
    if (!el) return
    const scale = SCALE[intensity]
    el.style.transform = `scale(${scale})`
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transform = ''
      })
    })
  }, [])
}
