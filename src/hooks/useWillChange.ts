import { useEffect, useRef } from 'react'

export function useWillChange<T extends HTMLElement>(
  properties: string[] = ['transform', 'opacity'],
) {
  const ref = useRef<T>(null)
  const value = properties.join(', ')

  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.style.willChange = value
        observer.unobserve(element)
      },
      { rootMargin: '50px' },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      element.style.willChange = 'auto'
    }
  }, [value])

  return ref
}
