import type {CSSProperties} from 'react';
import {StaggerGrid} from './StaggerGrid';

export interface PodiumEntry {
  id: string;
  num: string;
  rank: 1 | 2 | 3;
  color: string;
  name: string;
  dose: string;
  definition: string;
  pattern: string;
  bullets: readonly string[];
}

interface Top3PodiumProps {
  items: readonly PodiumEntry[];
}

/**
 * Top-3 supplements as sequential textbook cards (not a decorative podium grid).
 * Why: each topic needs definition → pattern → limits, readable at ≥16px on mobile.
 */
export function Top3Podium({items}: Top3PodiumProps) {
  const ordered = [...items].sort((a, b) => a.rank - b.rank);

  return (
    <StaggerGrid className="ta-podium" baseDelayMs={80}>
      {ordered.map(item => {
        const style: CSSProperties = {
          ['--ta-podium-color' as string]: item.color,
          ['--ta-podium-tint' as string]: hexToRgba(item.color, 0.12),
        };
        return (
          <article
            key={item.id}
            className={`ta-podium-card is-rank-${item.rank}`}
            style={style}
            aria-labelledby={`podium-${item.id}-title`}>
            <span className="ta-podium-watermark" aria-hidden="true">
              {item.num}
            </span>
            <header className="ta-podium-head">
              <span className="ta-podium-rank">
                {item.num} · приоритет {item.rank}
              </span>
              <h3 id={`podium-${item.id}-title`} className="ta-podium-name">
                {item.name}
              </h3>
              <p className="ta-podium-dose">{item.dose}</p>
            </header>

            <div className="ta-podium-block">
              <p className="ta-podium-label">Основные понятия</p>
              <p className="ta-podium-def">{item.definition}</p>
            </div>

            <div className="ta-podium-block ta-podium-block--pattern">
              <p className="ta-podium-label">Суть</p>
              <p className="ta-podium-pattern">{item.pattern}</p>
            </div>

            <div className="ta-podium-block">
              <p className="ta-podium-label">Уточнения</p>
              <ul className="ta-podium-bullets">
                {item.bullets.map(bullet => (
                  <li key={bullet} className="ta-podium-bullet">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </StaggerGrid>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
