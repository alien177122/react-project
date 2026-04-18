import type { CSSProperties, ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export interface TimelineConnectorProps {
  children: ReactNode
  className?: string
  gradient?: string
}

export function TimelineConnector({
  children,
  className = '',
  gradient,
}: TimelineConnectorProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    threshold:  0,
    rootMargin: '0px 0px -20% 0px',
  })

  const style: CSSProperties | undefined = gradient
    ? ({ '--timeline-gradient': gradient } as CSSProperties)
    : undefined

  return (
    <div
      ref={ref}
      style={style}
      className={`timeline-connector${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  )
}
