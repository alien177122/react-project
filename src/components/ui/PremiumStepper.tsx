import { useRef, type MouseEvent, type PointerEvent, type ReactNode } from 'react'
import type { StepperHold } from '../../hooks/useStepperHold'

interface PremiumStepperProps {
  label: string
  state: string
  unit?: string
  isDisabled: boolean
  stepSize: number
  stepper: StepperHold
  children: ReactNode
}

export function PremiumStepper({
  label,
  state,
  unit,
  isDisabled,
  stepSize,
  stepper,
  children,
}: PremiumStepperProps) {
  const suppressClickRef = useRef(false)

  const pointerDown = (event: PointerEvent<HTMLButtonElement>, delta: number) => {
    event.preventDefault()
    suppressClickRef.current = true
    try { event.currentTarget.setPointerCapture(event.pointerId) } catch { /* best effort */ }
    stepper.start(event.currentTarget, delta)
  }

  const pointerCancel = () => {
    suppressClickRef.current = false
    stepper.stop()
  }

  const click = (event: MouseEvent<HTMLButtonElement>, delta: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    stepper.stepOnce(delta, event.currentTarget)
  }

  return (
    <div className={`pi-stepper pi-stepper--${state}${isDisabled ? ' is-disabled' : ''}`}>
      <button
        type="button"
        className="pi-stepper__btn"
        aria-label={`Уменьшить ${label}`}
        disabled={stepper.decrementDisabled}
        onPointerDown={(event) => pointerDown(event, -stepSize)}
        onPointerUp={stepper.stop}
        onPointerCancel={pointerCancel}
        onPointerLeave={pointerCancel}
        onClick={(event) => click(event, -stepSize)}
      >
        −
      </button>
      <div className={`pi-wrapper pi-wrapper--${state} pi-wrapper--stepper`}>
        {children}
        {unit && <span className="pi-unit" aria-hidden="true">{unit}</span>}
      </div>
      <button
        type="button"
        className="pi-stepper__btn"
        aria-label={`Увеличить ${label}`}
        disabled={stepper.incrementDisabled}
        onPointerDown={(event) => pointerDown(event, stepSize)}
        onPointerUp={stepper.stop}
        onPointerCancel={pointerCancel}
        onPointerLeave={pointerCancel}
        onClick={(event) => click(event, stepSize)}
      >
        +
      </button>
    </div>
  )
}
