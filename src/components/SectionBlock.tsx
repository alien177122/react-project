import type { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface SectionBlockProps {
  num: string
  title: string
  children: ReactNode
}

export function SectionBlock({ num, title, children }: SectionBlockProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      className={`theory-section reveal-section${isVisible ? ' is-visible' : ''}`}
    >
      <div className="theory-section-header">
        <div className="theory-section-pill">{num}</div>
        <h2 className="theory-section-title">{title}</h2>
      </div>
      <div className="theory-section-body">{children}</div>
    </section>
  )
}

export function NoteBox({ children }: { children: ReactNode }) {
  return <div className="theory-note-box">{children}</div>
}
