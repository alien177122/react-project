import { AnimatePresence } from 'framer-motion'
import { useCallback, useRef } from 'react'
import {
  getTheoryChapter,
  type ChapterId,
} from '../data/theoryChapters'
import { useChapterURL } from '../hooks/useChapterURL'
import { TheoryHero } from './TheoryHero'
import { TheoryOutro } from './TheoryOutro'
import { TheoryChapterHub } from './theory/TheoryChapterHub'
import { TheoryChapterPanel } from './theory/TheoryChapterPanel'
import { renderChapterContent } from './theory/chapterContent'

export default function TheoryTab() {
  const { chapterId, invalidChapter, setChapterId } = useChapterURL()
  const buttonRefs = useRef<Partial<Record<ChapterId, HTMLButtonElement | null>>>({})
  const activeChapter = chapterId ? getTheoryChapter(chapterId) : null

  const focusChapterCard = useCallback((id: ChapterId) => {
    window.requestAnimationFrame(() => {
      buttonRefs.current[id]?.focus()
    })
  }, [])

  const selectChapter = useCallback((next: ChapterId | null) => {
    setChapterId(next)
  }, [setChapterId])

  const closePanel = useCallback(() => {
    const chapterToFocus = chapterId
    setChapterId(null)
    if (chapterToFocus) focusChapterCard(chapterToFocus)
  }, [chapterId, focusChapterCard, setChapterId])

  return (
    <div className="ta-shell">
      <TheoryHero onCTAClick={(target) => selectChapter(target)} />

      <TheoryChapterHub
        activeId={chapterId}
        buttonRefs={buttonRefs}
        onSelect={selectChapter}
      />

      <AnimatePresence mode="wait">
        {(activeChapter || invalidChapter) && (
          <TheoryChapterPanel
            key={activeChapter?.id ?? invalidChapter}
            chapter={activeChapter}
            invalidChapter={invalidChapter}
            onClose={closePanel}
          >
            {activeChapter
              ? renderChapterContent(activeChapter.id, selectChapter)
              : null}
          </TheoryChapterPanel>
        )}
      </AnimatePresence>

      <TheoryOutro
        title="Что дальше?"
        links={[
          {
            id: 'basics',
            eyebrow: 'Старт',
            title: 'Начать с основ',
            color: 'var(--ta-sec-01)',
            onClick: () => selectChapter('basics'),
          },
          {
            id: 'progression',
            eyebrow: 'Управление нагрузкой',
            title: 'Прогрессия 2.0',
            color: 'var(--ta-sec-10)',
            onClick: () => selectChapter('progression'),
          },
          {
            id: 'strength',
            eyebrow: 'Силовой протокол',
            title: 'Формула силы',
            color: 'var(--ta-sec-09)',
            onClick: () => selectChapter('strength'),
          },
        ]}
      />
    </div>
  )
}
