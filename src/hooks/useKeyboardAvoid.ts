import { useEffect, useState } from 'react'

function readKeyboardHeight(): number {
  if (typeof window === 'undefined') return 0
  const viewport = window.visualViewport
  if (!viewport) return 0

  const visualBottom = viewport.offsetTop + viewport.height
  return Math.max(0, Math.round(window.innerHeight - visualBottom))
}

export function useKeyboardAvoid(): { keyboardHeight: number } {
  const [keyboardHeight, setKeyboardHeight] = useState(readKeyboardHeight)

  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) return

    let frame = 0
    const update = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        setKeyboardHeight(readKeyboardHeight())
      })
    }

    const options: AddEventListenerOptions = { passive: true }
    viewport.addEventListener('resize', update)
    viewport.addEventListener('scroll', update, options)
    update()

    return () => {
      viewport.removeEventListener('resize', update)
      viewport.removeEventListener('scroll', update, options)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return { keyboardHeight }
}
