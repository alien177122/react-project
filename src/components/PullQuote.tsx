import type { CSSProperties } from 'react'

interface PullQuoteProps {
  eyebrow: string
  figure: string
  caption: string
  color: string
  tint: string
}

export function PullQuote({
  eyebrow,
  figure,
  caption,
  color,
  tint,
}: PullQuoteProps) {
  const style: CSSProperties = {
    ['--ta-pq-color' as string]: color,
    ['--ta-pq-tint' as string]: tint,
  }
  return (
    <aside className="ta-pullquote" style={style} aria-label={caption}>
      <div className="ta-pullquote-eyebrow">{eyebrow}</div>
      <div className="ta-pullquote-figure">{figure}</div>
      <p className="ta-pullquote-cap">{caption}</p>
    </aside>
  )
}
