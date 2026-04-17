import {
  forwardRef,
  useCallback,
  useId,
  useState,
  type InputHTMLAttributes,
} from 'react'
import { AnimatePresence, motion, type Variants, type Transition } from 'framer-motion'

export interface PremiumInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visible label above the field */
  label: string
  /** Unit suffix shown inside the field on the right, e.g. "кг", "раз" */
  unit?: string
  /** Error message — replaces helper, adds red focus ring */
  error?: string
  /** Secondary hint shown below the field */
  helper?: string
}

const enterTx: Transition = { duration: 0.18, ease: 'easeOut' }
const exitTx: Transition = { duration: 0.14, ease: 'easeIn' }

const messageVariants: Variants = {
  hidden: { opacity: 0, height: 0, y: -4 },
  show: { opacity: 1, height: 'auto', y: 0, transition: enterTx },
  exit:  { opacity: 0, height: 0,    y: -4, transition: exitTx },
}

/**
 * Premium text / number input.
 *
 * - CSS-first hover/focus states — zero JS layout overhead
 * - AnimatePresence for error/helper message height shift
 * - Removes native number spinners
 * - `tabular-nums` on numeric fields (pass `type="number"` or `data-tabular`)
 * - Adapts to the app's dark `--theory-*` / `--surface` palette
 */
export const PremiumInput = forwardRef<HTMLInputElement, PremiumInputProps>(
  ({ label, unit, error, helper, id: externalId, className, ...props }, ref) => {
    const autoId = useId()
    const id = externalId ?? autoId

    const [focused, setFocused] = useState(false)
    const onFocus = useCallback(() => setFocused(true), [])
    const onBlur = useCallback(() => setFocused(false), [])

    const state = error ? 'error' : focused ? 'focused' : 'idle'
    const message = error ?? helper

    return (
      <div className="pi-group">
        <label htmlFor={id} className={`pi-label pi-label--${state}`}>
          {label}
        </label>

        <div className={`pi-wrapper pi-wrapper--${state}`}>
          <input
            ref={ref}
            id={id}
            className={`pi-input${className ? ` ${className}` : ''}`}
            style={unit ? ({ '--pi-pr': '52px' } as React.CSSProperties) : undefined}
            onFocus={onFocus}
            onBlur={onBlur}
            {...props}
          />
          {unit && <span className="pi-unit" aria-hidden="true">{unit}</span>}
        </div>

        <AnimatePresence initial={false} mode="popLayout">
          {message ? (
            <motion.p
              key={message}
              className={`pi-message pi-message--${error ? 'error' : 'helper'}`}
              variants={messageVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              role={error ? 'alert' : 'status'}
              aria-live="polite"
            >
              {message}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    )
  }
)

PremiumInput.displayName = 'PremiumInput'
