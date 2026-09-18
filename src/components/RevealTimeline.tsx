import {useScrollReveal} from '../hooks/useScrollReveal';

export interface TimelineNode {
  id: string;
  title: string;
  definition: string;
  pattern?: string;
  bullets?: readonly string[];
}

interface RevealTimelineProps {
  items: readonly TimelineNode[];
  asideEyebrow?: string;
  asideQuote?: string;
  asideNote?: string;
}

/**
 * Sequential rounded blocks (intro + step cards). Used by mTOR + special methods + basics groups.
 * Why: vertical stack reads top→bottom; optional intro for section framing.
 */
export function RevealTimeline({items, asideEyebrow, asideQuote, asideNote}: RevealTimelineProps) {
  const {ref, isVisible} = useScrollReveal<HTMLDivElement>({
    rootMargin: '0px 0px -20% 0px',
  });
  const showIntro = Boolean(asideQuote);

  return (
    <div ref={ref} className={`ta-timeline${isVisible ? ' is-visible' : ''}`}>
      {showIntro ? (
        <header className="ta-timeline-intro">
          {asideEyebrow ? <span className="ta-timeline-intro-eyebrow">{asideEyebrow}</span> : null}
          <p className="ta-timeline-intro-quote">{asideQuote}</p>
          {asideNote ? <p className="ta-timeline-intro-note">{asideNote}</p> : null}
        </header>
      ) : null}

      <ol className="ta-timeline-list">
        {items.map((item, index) => (
          <TimelineNodeCard key={item.id} item={item} index={index} parentVisible={isVisible} />
        ))}
      </ol>
    </div>
  );
}

function TimelineNodeCard({
  item,
  index,
  parentVisible,
}: {
  item: TimelineNode;
  index: number;
  parentVisible: boolean;
}) {
  const {ref, isVisible} = useScrollReveal<HTMLLIElement>({
    rootMargin: '0px 0px -15% 0px',
  });
  const show = isVisible || parentVisible;
  const step = String(index + 1).padStart(2, '0');

  return (
    <li
      ref={ref}
      className={`ta-timeline-item${show ? ' is-visible' : ''}`}
      style={{transitionDelay: `${Math.min(index, 8) * 60}ms`}}>
      <article className="ta-timeline-card">
        <div className="ta-timeline-card-head">
          <span className="ta-timeline-step" aria-hidden="true">
            {step}
          </span>
          <h3 className="ta-timeline-card-title">{item.title}</h3>
        </div>

        <div className="ta-timeline-block">
          <p className="ta-timeline-label">Определение</p>
          <p className="ta-timeline-card-def">{item.definition}</p>
        </div>

        {item.pattern ? (
          <div className="ta-timeline-block ta-timeline-block--pattern">
            <p className="ta-timeline-label">Схема</p>
            <p className="ta-timeline-card-pattern">{item.pattern}</p>
          </div>
        ) : null}

        {item.bullets && item.bullets.length > 0 ? (
          <div className="ta-timeline-block">
            <p className="ta-timeline-label">Как применять</p>
            <ul className="ta-timeline-bullets">
              {item.bullets.map(bullet => (
                <li key={bullet} className="ta-timeline-bullet">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
    </li>
  );
}
