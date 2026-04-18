import type { CSSProperties } from 'react'
import { StaggerGrid } from './StaggerGrid'

export interface PodiumEntry {
  num: string
  rank: 1 | 2 | 3
  color: string
  name: string
  dose: string
  desc: string
}

interface Top3PodiumProps {
  items: readonly PodiumEntry[]
}

export function Top3Podium({ items }: Top3PodiumProps) {
  const ordered = [...items].sort((a, b) => {
    const order: Record<1 | 2 | 3, number> = { 2: 0, 1: 1, 3: 2 }
    return order[a.rank] - order[b.rank]
  })

  return (
    <StaggerGrid className="ta-podium" baseDelayMs={80}>
      {ordered.map((item) => {
        const style: CSSProperties = {
          ['--ta-podium-color' as string]: item.color,
          ['--ta-podium-tint' as string]: hexToRgba(item.color, 0.12),
        }
        return (
          <article
            key={item.num}
            className={`ta-podium-card is-rank-${item.rank}`}
            style={style}
          >
            <span className="ta-podium-watermark" aria-hidden="true">
              {item.num}
            </span>
            <span className="ta-podium-rank">Место {item.num}</span>
            <h3 className="ta-podium-name">{item.name}</h3>
            <div className="ta-podium-dose">{item.dose}</div>
            <p className="ta-podium-desc">{item.desc}</p>
          </article>
        )
      })}
    </StaggerGrid>
  )
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
