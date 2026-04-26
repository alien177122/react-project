import { useCallback, useEffect, useState } from 'react'

/**
 * Lightweight URL query-string state, router-free.
 *
 * The project does not use react-router-dom — tab routing is internal
 * React state. This hook lets Calculator persist `?ex=…&w=…&r=…` into
 * the address bar using the History API directly, so:
 *   — refreshing the page restores the form state
 *   — copy/paste of a URL reproduces the same calculation
 *   — the browser Back button steps through parameter changes
 *
 * Write semantics:
 *   — `setValue` mutates the URL via `history.replaceState`, not
 *     `pushState`, so incremental edits (typing into a number field)
 *     do not flood browser history. Callers wanting a back-navigation
 *     checkpoint (e.g. after pressing "Calculate") can call
 *     `commitHistory()` explicitly.
 *
 * Read semantics:
 *   — Cross-hook synchronization uses the `popstate` event (fires on
 *     Back/Forward) plus a custom `urlstatechange` event dispatched
 *     on every in-app write. Without the custom event, two instances
 *     of the hook on the same page would fall out of sync.
 */
const URL_STATE_EVENT = 'urlstatechange'

function readParam(key: string): string | null {
  if (typeof window === 'undefined') return null
  return new URLSearchParams(window.location.search).get(key)
}

function writeParam(key: string, value: string | null, push: boolean): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  if (value === null || value === '') {
    params.delete(key)
  } else {
    params.set(key, value)
  }
  const query = params.toString()
  const next = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`
  const method = push ? 'pushState' : 'replaceState'
  window.history[method](null, '', next)
  window.dispatchEvent(new Event(URL_STATE_EVENT))
}

export interface URLStateAPI<T extends string> {
  value: T | null
  /** Replace the param without adding a history entry. */
  setValue: (next: T | null) => void
  /** Push a history entry with the current URL (use sparingly). */
  commitHistory: () => void
}

export function useURLState<T extends string = string>(key: string): URLStateAPI<T> {
  const [value, setLocal] = useState<T | null>(() => readParam(key) as T | null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const sync = () => setLocal(readParam(key) as T | null)
    window.addEventListener('popstate', sync)
    window.addEventListener(URL_STATE_EVENT, sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener(URL_STATE_EVENT, sync)
    }
  }, [key])

  const setValue = useCallback(
    (next: T | null) => {
      writeParam(key, next, false)
    },
    [key],
  )

  const commitHistory = useCallback(() => {
    if (typeof window === 'undefined') return
    window.history.pushState(null, '', window.location.href)
  }, [])

  return { value, setValue, commitHistory }
}
