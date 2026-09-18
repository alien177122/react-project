import type {CSSProperties} from 'react';
import {useScrollReveal} from '../hooks/useScrollReveal';

export interface TierEntry {
  tier: string;
  color: string;
  /** Contrast color for the badge glyph on `color` fill (see SUPPLEMENT_TIERS.textColor). */
  textColor?: string;
  label: string;
  items: readonly string[];
  note: string;
}

interface TierPyramidProps {
  tiers: readonly TierEntry[];
}

export function TierPyramid({tiers}: TierPyramidProps) {
  const {ref, isVisible} = useScrollReveal<HTMLDivElement>({
    rootMargin: '0px 0px -10% 0px',
  });

  return (
    <div
      ref={ref}
      className={`ta-pyramid stagger-grid${isVisible ? ' is-visible' : ''}`}
      style={{['--stagger-base-delay' as string]: '70ms'} as CSSProperties}>
      {tiers.map(tier => {
        const style: CSSProperties = {
          ['--ta-tier-color' as string]: tier.color,
          ['--ta-tier-tint' as string]: hexToRgba(tier.color, 0.14),
          ...(tier.textColor ? {['--ta-tier-badge-fg' as string]: tier.textColor} : {}),
        };
        return (
          <article key={tier.tier} className={`ta-tier ta-tier--${tier.tier}`} style={style}>
            <div className="ta-tier-badge" aria-hidden="true">
              {tier.tier}
            </div>
            <div className="ta-tier-content">
              <h3 className="ta-tier-label">{tier.label}</h3>
              <div className="ta-tier-chips">
                {tier.items.map(item => (
                  <span key={item} className="ta-tier-chip">
                    {item}
                  </span>
                ))}
              </div>
              <p className="ta-tier-note">{tier.note}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
