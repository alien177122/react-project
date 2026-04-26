import { AnimatePresence, motion, type Transition, type Variants } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface PremiumInputMessageProps {
  id?: string
  message?: string
  error?: boolean
}

const enterTx: Transition = { duration: 0.18, ease: 'easeOut' }
const exitTx: Transition = { duration: 0.14, ease: 'easeIn' }
const variants: Variants = {
  hidden: { opacity: 0, y: -4, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: enterTx },
  exit: { opacity: 0, y: -4, scale: 0.98, transition: exitTx },
}

export function PremiumInputMessage({ id, message, error }: PremiumInputMessageProps) {
  const reduced = useReducedMotion()
  if (!message) return null

  const className = `pi-message pi-message--${error ? 'error' : 'helper'}`
  const liveProps = {
    id,
    className,
    role: error ? 'alert' : 'status',
    'aria-live': 'polite',
  } as const

  if (reduced) {
    return <p {...liveProps}>{message}</p>
  }

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.p
        key={message}
        {...liveProps}
        variants={variants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {message}
      </motion.p>
    </AnimatePresence>
  )
}
