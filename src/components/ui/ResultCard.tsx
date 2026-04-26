import { memo, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface ResultCardProps {
  /** Primary display number (calculated 1RM in kg). */
  oneRM: number
  /** Meta chips. Render order is preserved. */
  chips: string[]
  /** Screen-reader label. Should include units so VoiceOver reads "88 kg". */
  ariaLabel: string
}

const COUNT_UP_MS = 250

function useCountUp(target: number): number {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)
  const previousRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (reduced) {
      previousRef.current = target
      return
    }
    const from = previousRef.current
    previousRef.current = target
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_UP_MS)
      const eased = 1 - Math.pow(1 - t, 4)
      const next = from + (target - from) * eased
      setValue(Math.round(next * 10) / 10)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, reduced])

  return reduced ? target : value
}

function formatKg(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, '')
}

/**
 * Apple-style result card for the Calculator scene.
 *
 * - Entrance is handled by the parent `.ta-stack` on first mount.
 * - `role="status" aria-live="polite"` announces the final value via
 *   `ariaLabel` (screen readers ignore the animated digit updates).
 * - Count-up restarts on `oneRM` change to make re-calculation feel
 *   responsive without unmounting the card.
 */
export const ResultCard = memo(function ResultCard({
  oneRM,
  chips,
  ariaLabel,
}: ResultCardProps) {
  const displayed = useCountUp(oneRM)
  return (
    <div
      className="ta-result-card"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={ariaLabel}
    >
      <div className="ta-result-card__label">Расчётный 1ПМ</div>
      <div className="ta-result-card__value" aria-hidden="true">
        {formatKg(displayed)}
        <span className="ta-result-card__unit">кг</span>
      </div>
      <ul className="ta-result-card__chips" aria-hidden="true">
        {chips.map((chip) => (
          <li key={chip} className="ta-result-card__chip">{chip}</li>
        ))}
      </ul>
    </div>
  )
})
