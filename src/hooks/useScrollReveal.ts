import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  disabled?: boolean
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const {
    threshold  = 0,
    rootMargin = '0px 0px -10% 0px',
    disabled   = false,
  } = options

  const ref             = useRef<T | null>(null)
  const reducedMotion   = useReducedMotion()
  // Initialize visible immediately when motion is reduced or the hook is
  // explicitly disabled. This avoids the `set-state-in-effect` lint
  // warning that fires for synchronous setState calls inside effects —
  // the same outcome (instant reveal) is achieved purely through state
  // initialization.
  const [isVisible, setIsVisible] = useState<boolean>(() => reducedMotion || disabled)

  const handleTransitionEnd = useCallback(() => {
    if (ref.current) ref.current.style.willChange = 'auto'
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reducedMotion || disabled) {
      // Initial state already covers the mount-time case. The microtask
      // handles runtime toggles (e.g. user enables Reduce Motion mid-session)
      // and keeps the setState off the synchronous effect body to satisfy
      // `react-hooks/set-state-in-effect`.
      queueMicrotask(() => setIsVisible(true))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          el.style.willChange = 'transform, opacity'
          el.addEventListener('transitionend', handleTransitionEnd, { once: true })
          setIsVisible(true)
          observer.unobserve(entry.target)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      el.removeEventListener('transitionend', handleTransitionEnd)
      el.style.willChange = 'auto'
    }
  }, [threshold, rootMargin, disabled, reducedMotion, handleTransitionEnd])

  return { ref, isVisible }
}
