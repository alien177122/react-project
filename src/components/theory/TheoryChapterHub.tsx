import { motion } from 'framer-motion'
import type { CSSProperties, MutableRefObject } from 'react'
import { THEORY_CHAPTERS, type ChapterId } from '../../data/theoryChapters'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface TheoryChapterHubProps {
  activeId: ChapterId | null
  buttonRefs: MutableRefObject<Partial<Record<ChapterId, HTMLButtonElement | null>>>
  onSelect: (next: ChapterId | null) => void
}

export function TheoryChapterHub({
  activeId,
  buttonRefs,
  onSelect,
}: TheoryChapterHubProps) {
  const reduced = useReducedMotion()

  return (
    <section className="ta-chapter-hub" aria-labelledby="ta-chapter-hub-title">
      <div className="ta-chapter-hub__inner">
        <header className="ta-chapter-hub__head">
          <span className="ta-section-pill">Theory hub</span>
          <h2 id="ta-chapter-hub-title" className="ta-section-title">
            Выбери главу
          </h2>
          <p className="ta-section-lede">
            Открой одну тему и читай её в отдельной панели. URL обновится
            автоматически, чтобы ссылкой можно было поделиться.
          </p>
        </header>

        <div className="ta-chapter-grid">
          {THEORY_CHAPTERS.map((chapter, index) => {
            const active = activeId === chapter.id
            const style: CSSProperties = {
              ['--ta-card-accent' as string]: `var(${chapter.accentVar})`,
              ['--ta-card-tint' as string]: `var(${chapter.tintVar})`,
              transitionDelay: reduced ? undefined : `${index * 35}ms`,
            }

            return (
              <motion.button
                key={chapter.id}
                ref={(node) => {
                  buttonRefs.current[chapter.id] = node
                }}
                type="button"
                className={`ta-chapter-card${active ? ' is-active' : ''}`}
                style={style}
                aria-expanded={active}
                aria-controls={active ? 'chapter-panel' : undefined}
                onClick={() => onSelect(active ? null : chapter.id)}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                whileHover={reduced ? undefined : { y: -4 }}
                whileTap={reduced ? undefined : { y: 0 }}
                transition={{
                  duration: 0.24,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <span className="ta-chapter-card__num" aria-hidden="true">
                  {chapter.num}
                </span>
                <span className="ta-chapter-card__body">
                  <span className="ta-chapter-card__title">
                    {chapter.cardTitle}
                  </span>
                  <span className="ta-chapter-card__summary">
                    {chapter.summary}
                  </span>
                  <span className="ta-chapter-card__action">
                    {active ? 'Закрыть тему' : 'Открыть тему'}
                    <svg
                      className="ta-chapter-card__chevron"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={active ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'} />
                    </svg>
                  </span>
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
