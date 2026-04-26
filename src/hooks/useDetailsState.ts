import { useEffect, useState } from 'react'

export function useDetailsState(groupId: string, defaultOpen: boolean) {
  const storageKey = `strength:details:${groupId}` as const

  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultOpen

    try {
      const saved = window.sessionStorage.getItem(storageKey)
      if (!saved) return defaultOpen
      const parsed: unknown = JSON.parse(saved)
      return typeof parsed === 'boolean' ? parsed : defaultOpen
    } catch {
      return defaultOpen
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(open))
    } catch {
      // Session storage can be unavailable in private modes; native details still works.
    }
  }, [storageKey, open])

  return [open, setOpen] as const
}
