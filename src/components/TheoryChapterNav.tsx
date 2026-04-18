import { useEffect, useState, type CSSProperties } from 'react'

export interface Chapter {
  id: string
  num: string
  title: string
  accentVar: string
}

export const THEORY_CHAPTERS: Chapter[] = [
  { id: 'basics',    num: '01', title: 'Основы',         accentVar: '--ta-sec-01' },
  { id: 'mtor',      num: '02', title: 'mTOR',           accentVar: '--ta-sec-02' },
  { id: 'tiers',     num: '03', title: 'Tier List',      accentVar: '--ta-sec-03' },
  { id: 'top3',      num: '04', title: 'Топ-3',          accentVar: '--ta-sec-04' },
  { id: 'tables',    num: '05', title: '%ПМ + RPE',      accentVar: '--ta-sec-05' },
  { id: 'tendon',    num: '06', title: 'Сухожилия',      accentVar: '--ta-sec-06' },
  { id: 'mechanics', num: '07', title: 'Механика',       accentVar: '--ta-sec-07' },
  { id: 'formula',   num: '08', title: 'Формула силы',   accentVar: '--ta-sec-08' },
]

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

    window.addEventListener('scroll', onScroll, { passive: true })
    tick()
    return () => {
      window.removeEventListener('scroll', onScroll)
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
