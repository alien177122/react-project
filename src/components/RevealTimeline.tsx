import { useScrollReveal } from '../hooks/useScrollReveal'

export interface TimelineNode {
  id: string
  title: string
  definition: string
  pattern?: string
  bullets?: readonly string[]
}

interface RevealTimelineProps {
  items: readonly TimelineNode[]
  asideEyebrow: string
  asideQuote: string
  asideNote?: string
}

export function RevealTimeline({
  items,
  asideEyebrow,
  asideQuote,
  asideNote,
}: RevealTimelineProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    rootMargin: '0px 0px -20% 0px',
  })

  return (
    <div
      ref={ref}
      className={`ta-timeline${isVisible ? ' is-visible' : ''}`}
    >
      <aside className="ta-timeline-aside">
        <span className="ta-timeline-aside-eyebrow">{asideEyebrow}</span>
        <p className="ta-timeline-aside-quote">{asideQuote}</p>
        {asideNote && <p className="ta-timeline-aside-note">{asideNote}</p>}
      </aside>

      <div className="ta-timeline-list">
        <div className="ta-timeline-line" aria-hidden="true" />
        {items.map((item, index) => (
          <TimelineNodeCard
            key={item.id}
            item={item}
            index={index}
            parentVisible={isVisible}
          />
        ))}
      </div>
    </div>
  )
}

function TimelineNodeCard({
  item,
  index,
  parentVisible,
}: {
  item: TimelineNode
  index: number
  parentVisible: boolean
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    rootMargin: '0px 0px -15% 0px',
  })
  const show = isVisible || parentVisible

  return (
    <div
      ref={ref}
      className={`ta-timeline-item${show ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="ta-timeline-dot" aria-hidden="true" />
      <div className="ta-timeline-card">
        <h3 className="ta-timeline-card-title">{item.title}</h3>
        <p className="ta-timeline-card-def">
          <strong>Определение: </strong>
          {item.definition}
        </p>
        {item.pattern && (
          <p className="ta-timeline-card-pattern">{item.pattern}</p>
        )}
        {item.bullets && item.bullets.length > 0 && (
          <ul className="ta-timeline-bullets">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="ta-timeline-bullet">
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
