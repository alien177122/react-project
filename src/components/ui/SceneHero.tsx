import { memo, useEffect, useId, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { addPassiveScroll } from '../../lib/scroll'

export interface SceneHeroProps {
  /** Small label above the title (e.g. "Calculator", "Theory · 8 глав"). */
  eyebrow: string
  /** Main heading. */
  title: string
  /** Secondary copy below the title. */
  subtitle: string
  /**
   * CSS color reference for the accent word. Usually a `var(--ta-*)`
   * string. Defaults to the calc accent.
   */
  accent?: string
  /**
   * If provided, the first occurrence of this substring inside `title`
   * is wrapped in an accent span. Use for short, visually loud words
   * like "1ПМ". Case-sensitive.
   */
  accentWord?: string
}

/**
 * Unified hero for Apple-style scenes (Calculator first, Theory later).
 *
 * Parallax
 * ────────
 * A decorative glow layer is translated vertically based on scroll
 * position via a CSS custom property (`--scene-hero-y`). The scroll
 * listener is gated by an IntersectionObserver so it is only attached
 * while the hero is in the viewport — no wasted work on other tabs.
 * The handler coalesces scroll events through a single `rAF` frame so
 * we get at most one DOM write per frame even on iOS Safari's 120Hz
 * scrollers.
 *
 * Reduced motion
 * ──────────────
 * No observer, no scroll listener, no parallax — the hero renders
 * static and the glow layer is invisible via CSS.
 */
export const SceneHero = memo(function SceneHero({
  eyebrow,
  title,
  subtitle,
  accent = 'var(--ta-calc-accent)',
  accentWord,
}: SceneHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const titleId = useId()

  useEffect(() => {
    if (reduced) return
    if (typeof window === 'undefined') return
    if (!('IntersectionObserver' in window)) return

    const el = sectionRef.current
    if (!el) return

    let rafId = 0
    let active = false
    let removeScroll: (() => void) | null = null

    const tick = () => {
      rafId = 0
      const top = el.getBoundingClientRect().top
      el.style.setProperty('--scene-hero-y', `${-top * 0.08}px`)
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          active = true
          removeScroll = addPassiveScroll(window, onScroll)
          tick()
        } else if (!entry.isIntersecting && active) {
          active = false
          removeScroll?.()
          removeScroll = null
          if (rafId) cancelAnimationFrame(rafId)
          rafId = 0
        }
      },
      { threshold: 0 },
    )

    io.observe(el)
    return () => {
      io.disconnect()
      if (active) removeScroll?.()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      className="ta-scene-hero"
      role="region"
      aria-labelledby={titleId}
      style={{ '--scene-hero-accent': accent } as React.CSSProperties}
    >
      <div className="ta-scene-hero__glow" aria-hidden="true" />

      <div className="ta-scene-hero__content">
        <span className="ta-scene-hero__eyebrow">{eyebrow}</span>
        <h1 id={titleId} className="ta-scene-hero__title">
          {renderTitle(title, accentWord)}
        </h1>
        <p className="ta-scene-hero__subtitle">{subtitle}</p>
      </div>
    </section>
  )
})

function renderTitle(title: string, accentWord?: string) {
  if (!accentWord) return title
  const idx = title.indexOf(accentWord)
  if (idx === -1) return title
  return (
    <>
      {title.slice(0, idx)}
      <span className="ta-scene-hero__accent">{accentWord}</span>
      {title.slice(idx + accentWord.length)}
    </>
  )
}
