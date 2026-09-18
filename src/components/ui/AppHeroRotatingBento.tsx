import {HERO_BENTO_CELL_COUNT, HERO_TIP_INTERVAL_MS, heroTipsForTab} from '../../data/hero-tips';
import {useRotatingTipIndex} from '../../hooks/useRotatingTipIndex';
import {useReducedMotion} from '../../hooks/useReducedMotion';
import type {AppTab} from '../app/tabs';

interface AppHeroRotatingBentoProps {
  tab: AppTab;
}

function tipAt(tips: readonly string[], tick: number, cellIndex: number): string {
  if (tips.length === 0) return '';
  return tips[(tick + cellIndex) % tips.length];
}

interface RotatingCellProps {
  tip: string;
  accent?: boolean;
  animateTips: boolean;
}

function RotatingCell({tip, accent, animateTips}: RotatingCellProps) {
  return (
    <div
      className={`app-hero__bento-cell app-hero__bento-cell--rotating${
        accent ? ' app-hero__bento-cell--accent' : ''
      }`}
      role="listitem">
      <span className="app-hero__bento-cell-inner">
        <span
          key={animateTips ? tip : undefined}
          className={`app-hero__bento-tip${animateTips ? ' app-hero__bento-tip--swap' : ''}`}>
          {tip}
        </span>
      </span>
    </div>
  );
}

/** Three frosted bento cells cycling tab-specific tips with CSS crossfade. */
export function AppHeroRotatingBento({tab}: AppHeroRotatingBentoProps) {
  const tips = heroTipsForTab(tab);
  const tick = useRotatingTipIndex(tips.length, HERO_TIP_INTERVAL_MS);
  const reduced = useReducedMotion();
  const animateTips = tips.length > 1 && !reduced;

  return (
    <div
      className="app-hero__bento app-hero__stagger-3"
      role="list"
      aria-label="Подсказки"
      aria-live="polite"
      aria-atomic="false">
      {Array.from({length: HERO_BENTO_CELL_COUNT}, (_, cellIndex) => (
        <RotatingCell
          key={cellIndex}
          tip={tipAt(tips, tick, cellIndex)}
          accent={cellIndex === 0}
          animateTips={animateTips}
        />
      ))}
    </div>
  );
}
