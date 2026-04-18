import type { CSSProperties, ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export interface StaggerGridProps {
  children: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  baseDelayMs?: number
  style?: CSSProperties
}

export function StaggerGrid({
  children,
  className = '',
  threshold  = 0,
  rootMargin = '0px 0px -15% 0px',
  baseDelayMs,
  style,
}: StaggerGridProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold, rootMargin })

  const mergedStyle: CSSProperties = {
    ...style,
    ...(baseDelayMs !== undefined
      ? ({ '--stagger-base-delay': `${baseDelayMs}ms` } as CSSProperties)
      : {}),
  }

  return (
    <div
      ref={ref}
      style={mergedStyle}
      className={`stagger-grid${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  )
}
