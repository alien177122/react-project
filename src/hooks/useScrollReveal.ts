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
  const [isVisible, setIsVisible] = useState(false)
  const reducedMotion   = useReducedMotion()

  const handleTransitionEnd = useCallback(() => {
    if (ref.current) ref.current.style.willChange = 'auto'
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reducedMotion || disabled) {
      setIsVisible(true)
      return
    }

    el.style.willChange = 'transform, opacity'
    el.addEventListener('transitionend', handleTransitionEnd, { once: true })

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
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
    }
  }, [threshold, rootMargin, disabled, reducedMotion, handleTransitionEnd])

  return { ref, isVisible }
}
