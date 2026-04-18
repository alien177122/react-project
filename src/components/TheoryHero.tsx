import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface TheoryHeroProps {
  onCTAClick?: (target: 'basics' | 'tiers') => void
}

export function TheoryHero({ onCTAClick }: TheoryHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const bg = heroRef.current?.querySelector<HTMLElement>('.ta-hero-bg')
    if (!bg) return

    let raf = 0
    const tick = () => {
      const top = heroRef.current?.getBoundingClientRect().top ?? 0
      bg.style.transform = `translate3d(0, ${-top * 0.08}px, 0)`
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
  }, [reduced])

  return (
    <section ref={heroRef} className="ta-hero" aria-labelledby="ta-hero-title">
      <div className="ta-hero-bg" aria-hidden="true" />
      <div className="ta-hero-glow" aria-hidden="true" />

      <div className="ta-hero-content">
        <span className="ta-hero-eyebrow">Theory · 8 глав</span>
        <h1 id="ta-hero-title" className="ta-hero-title">
          Теория
          <br />
          <span className="ta-hero-title-accent">тренинга</span>
        </h1>
        <p className="ta-hero-sub">
          Прогрессия, mTOR, tier-лист добавок и ключевые ориентиры — в одном
          справочном разделе. Восемь коротких глав, каждая со своим акцентом.
        </p>

        <div className="ta-hero-cta">
          <button
            type="button"
            className="ta-btn ta-btn-glass"
            onClick={() => onCTAClick?.('basics')}
          >
            Начать с основ
          </button>
          <button
            type="button"
            className="ta-btn ta-btn-outline"
            onClick={() => onCTAClick?.('tiers')}
          >
            Сразу к Tier List →
          </button>
        </div>
      </div>
    </section>
  )
}
