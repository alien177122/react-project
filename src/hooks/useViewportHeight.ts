import { useCallback, useEffect, useState } from 'react'

function readViewportHeight(): number {
  if (typeof window === 'undefined') return 0
  return Math.round(window.visualViewport?.height ?? window.innerHeight)
}

export function useViewportHeight(): number {
  const [height, setHeight] = useState(readViewportHeight)

  const update = useCallback(() => {
    setHeight(readViewportHeight())
  }, [])

  useEffect(() => {
    const viewport = window.visualViewport
    const options: AddEventListenerOptions = { passive: true }
    if (viewport) {
      viewport.addEventListener('resize', update)
      viewport.addEventListener('scroll', update, options)
      return () => {
        viewport.removeEventListener('resize', update)
        viewport.removeEventListener('scroll', update, options)
      }
    }

    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  return height
}
