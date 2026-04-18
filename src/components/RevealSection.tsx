import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useScrollReveal, type ScrollRevealOptions } from '../hooks/useScrollReveal'

export interface RevealSectionProps extends ScrollRevealOptions {
  children: ReactNode
  className?: string
  style?: CSSProperties
  as?: ElementType
  id?: string
}

export function RevealSection({
  children,
  className = '',
  style,
  as: Tag = 'section',
  id,
  ...revealOptions
}: RevealSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>(revealOptions)

  return (
    <Tag
      ref={ref}
      id={id}
      style={style}
      className={`reveal-section${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Tag>
  )
}
