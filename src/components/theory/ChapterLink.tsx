import type { ReactNode } from 'react'
import type { ChapterId } from '../../data/theoryChapters'

interface ChapterLinkProps {
  chapterId: ChapterId
  children: ReactNode
  onSelectChapter: (chapterId: ChapterId) => void
  ariaLabel?: string
}

export function ChapterLink({
  chapterId,
  children,
  onSelectChapter,
  ariaLabel,
}: ChapterLinkProps) {
  return (
    <button
      type="button"
      className="ta-see-also-link"
      onClick={() => onSelectChapter(chapterId)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
