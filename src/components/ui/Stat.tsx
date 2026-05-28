import type { ReactNode } from 'react'

interface StatProps {
  children: ReactNode
}

export function Stat({ children }: StatProps) {
  return <span className="ta-stat">{children}</span>
}
