import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useHaptic } from './useHaptic'
import { useReducedMotion } from './useReducedMotion'

const HOLD_DELAY = 400
const TICK_INTERVAL = 80

type InputValue = string | number | readonly string[] | undefined

interface UseStepperHoldOptions {
  value: InputValue
  min?: string | number
  max?: string | number
  disabled?: boolean
  loading?: boolean
  onCommit?: (next: string) => void
}

function numberFrom(value: InputValue | string | number | undefined): number | null {
  if (Array.isArray(value) || value == null || value === '') return null
  const clean = typeof value === 'string' ? value.replace(',', '.') : value
  const parsed = Number(clean)
  return Number.isFinite(parsed) ? parsed : null
}

function formatNumber(value: number): string {
  return Number(value.toFixed(2)).toString()
}

function clamp(value: number, min?: string | number, max?: string | number): number {
  const minValue = numberFrom(min)
  const maxValue = numberFrom(max)
  if (minValue != null && value < minValue) return minValue
  if (maxValue != null && value > maxValue) return maxValue
  return value
}

export function useStepperHold({
  value,
  min,
  max,
  disabled,
  loading,
  onCommit,
}: UseStepperHoldOptions) {
  const haptic = useHaptic()
  const reducedMotion = useReducedMotion()
  const timerRef = useRef<number | null>(null)
  const activeRef = useRef(false)
  const latestValueRef = useRef(numberFrom(value) ?? 0)

  useEffect(() => {
    const parsed = numberFrom(value)
    if (parsed != null) latestValueRef.current = parsed
  }, [value])

  const stop = useCallback(() => {
    activeRef.current = false
    if (timerRef.current != null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => stop, [stop])

  const commit = useCallback(
    (next: number, button?: HTMLButtonElement | null) => {
      const clamped = clamp(next, min, max)
      latestValueRef.current = clamped
      onCommit?.(formatNumber(clamped))
      if (!reducedMotion) haptic(button ?? null, 'light')
    },
    [haptic, max, min, onCommit, reducedMotion],
  )

  const stepOnce = useCallback(
    (delta: number, button?: HTMLButtonElement | null) => {
      if (disabled || loading) return
      commit(latestValueRef.current + delta, button)
    },
    [commit, disabled, loading],
  )

  const start = useCallback(
    (button: HTMLButtonElement, delta: number) => {
      if (disabled || loading) return
      stop()
      activeRef.current = true
      stepOnce(delta, button)

      const tick = () => {
        if (!activeRef.current) return
        stepOnce(delta, button)
        timerRef.current = window.setTimeout(tick, TICK_INTERVAL)
      }

      timerRef.current = window.setTimeout(tick, HOLD_DELAY)
    },
    [disabled, loading, stepOnce, stop],
  )

  const current = numberFrom(value)
  const minValue = numberFrom(min)
  const maxValue = numberFrom(max)

  return useMemo(() => ({
    start,
    stop,
    stepOnce,
    commitValue: commit,
    decrementDisabled: Boolean(disabled || loading || (current != null && minValue != null && current <= minValue)),
    incrementDisabled: Boolean(disabled || loading || (current != null && maxValue != null && current >= maxValue)),
  }), [commit, current, disabled, loading, maxValue, minValue, start, stepOnce, stop])
}

export type StepperHold = ReturnType<typeof useStepperHold>
