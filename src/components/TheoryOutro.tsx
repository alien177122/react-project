import type { CSSProperties } from 'react'

export interface OutroLink {
  id: string
  eyebrow: string
  title: string
  color: string
  onClick?: () => void
}

interface TheoryOutroProps {
  title: string
  links: readonly OutroLink[]
}

export function TheoryOutro({ title, links }: TheoryOutroProps) {
  return (
    <section className="ta-outro" aria-label="Что дальше">
      <h2 className="ta-outro-title">{title}</h2>
      <div className="ta-outro-grid">
        {links.map((link) => {
          const style: CSSProperties = {
            ['--ta-outro-color' as string]: link.color,
          }
          return (
            <button
              key={link.id}
              type="button"
              className="ta-outro-link"
              style={style}
              onClick={link.onClick}
            >
              <span className="ta-outro-link-eyebrow">{link.eyebrow}</span>
              <h3 className="ta-outro-link-title">{link.title}</h3>
              <span className="ta-outro-link-arrow" aria-hidden="true">→</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
