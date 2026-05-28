import { useEffect, useState, type CSSProperties } from 'react'
import { THEORY_CHAPTERS } from '../data/theoryChapters'
import { addPassiveScroll } from '../lib/scroll'

export function TheoryChapterNav() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0
      setProgress(ratio)

      const probe = window.innerHeight * 0.35
      let next = 0
      for (let i = 0; i < THEORY_CHAPTERS.length; i++) {
        const el = document.getElementById(THEORY_CHAPTERS[i].id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= probe) next = i
      }
      setActiveIndex(next)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(tick)
    }

    const removeScroll = addPassiveScroll(window, onScroll)
    tick()
    return () => {
      removeScroll()
      cancelAnimationFrame(raf)
    }
  }, [])

  const handleJump = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const active = THEORY_CHAPTERS[activeIndex]

  return (
    <nav className="ta-nav" aria-label="Навигация по главам теории">
      <div className="ta-nav-progress" aria-hidden="true">
        <div
          className="ta-nav-progress-fill"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <div className="ta-nav-row" role="tablist">
        {THEORY_CHAPTERS.map((chapter, i) => {
          const isActive = i === activeIndex
          const style: CSSProperties = {
            ['--ta-dot-accent' as string]: `var(${chapter.accentVar})`,
          }
          return (
            <button
              key={chapter.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`Перейти: ${chapter.title}`}
              onClick={() => handleJump(chapter.id)}
              className={`ta-nav-dot${isActive ? ' is-active' : ''}`}
              style={style}
            >
              {chapter.num}
            </button>
          )
        })}
      </div>

      <div className="ta-nav-title" aria-live="polite">
        <span className="ta-nav-eyebrow">Глава {active.num}</span>
        <span className="ta-nav-name">{active.title}</span>
      </div>
    </nav>
  )
}
