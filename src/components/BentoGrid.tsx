import type { CSSProperties } from 'react'
import { StaggerGrid } from './StaggerGrid'

export type BentoSize = 'large' | 'medium' | 'small'

export interface BentoItem {
  id: string
  title: string
  body: string
  size: BentoSize
  featured?: boolean
  badge?: string
  icon?: string
}

interface BentoGridProps {
  items: BentoItem[]
  /** CSS var that defines the section accent, e.g. '--ta-sec-01' */
  accentVar: string
  tintVar: string
}

export function BentoGrid({ items, accentVar, tintVar }: BentoGridProps) {
  const gridStyle: CSSProperties = {
    ['--ta-sec' as string]: `var(${accentVar})`,
    ['--ta-sec-tint' as string]: `var(${tintVar})`,
  }

  return (
    <StaggerGrid className="ta-bento" baseDelayMs={70} style={gridStyle}>
      {items.map((item) => (
        <article
          key={item.id}
          className={`ta-bento-card is-${item.size}${item.featured ? ' is-featured' : ''}`}
        >
          {item.badge && <span className="ta-bento-badge">{item.badge}</span>}
          {item.icon && (
            <span className="ta-bento-icon" aria-hidden="true">
              {item.icon}
            </span>
          )}
          <h3 className="ta-bento-title">{item.title}</h3>
          <p className="ta-bento-body">{item.body}</p>
        </article>
      ))}
    </StaggerGrid>
  )
}
