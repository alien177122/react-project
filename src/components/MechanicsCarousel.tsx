import { useCallback, useRef } from 'react'

export interface MechanicsSlide {
  id: string
  title: string
  body: string
}

interface MechanicsCarouselProps {
  items: readonly MechanicsSlide[]
}

export function MechanicsCarousel({ items }: MechanicsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = useCallback((direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const slideWidth = track.querySelector<HTMLElement>('.ta-carousel-slide')?.offsetWidth ?? 320
    track.scrollBy({ left: direction * (slideWidth + 16), behavior: 'smooth' })
  }, [])

  return (
    <div className="ta-carousel">
      <div
        ref={trackRef}
        className="ta-carousel-track"
        role="region"
        aria-label="Карточки по механике"
        tabIndex={0}
      >
        {items.map((item, index) => (
          <article key={item.id} className="ta-carousel-slide">
            <span className="ta-carousel-slide-num">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="ta-carousel-slide-title">{item.title}</h3>
            <p className="ta-carousel-slide-body">{item.body}</p>
          </article>
        ))}
      </div>

      <div className="ta-carousel-controls">
        <button
          type="button"
          className="ta-carousel-btn"
          onClick={() => scrollBy(-1)}
          aria-label="Предыдущая карточка"
        >
          ‹
        </button>
        <button
          type="button"
          className="ta-carousel-btn"
          onClick={() => scrollBy(1)}
          aria-label="Следующая карточка"
        >
          ›
        </button>
      </div>
    </div>
  )
}
