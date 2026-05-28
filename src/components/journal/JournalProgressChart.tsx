import {deltaLastWeeks} from '../../../packages/shared/src/utils/journalMetrics.ts';
import type {ChartPoint} from '../../../packages/shared/src/utils/journalMetrics.ts';

interface JournalProgressChartProps {
  points: ChartPoint[];
}

const WIDTH = 320;
const HEIGHT = 120;
const PAD = 16;

export function JournalProgressChart({points}: JournalProgressChartProps) {
  if (points.length === 0) {
    return (
      <div className="journal-chart-empty">
        <p className="journal-chart-empty__title">Запиши первый подход</p>
        <p className="journal-chart-empty__hint">
          Сохраните подходы с весом и повторами — тренд построится по факту, не по программе.
        </p>
      </div>
    );
  }

  const minPeak = Math.min(...points.map(point => point.peak));
  const maxPeak = Math.max(...points.map(point => point.peak));
  const range = Math.max(maxPeak - minPeak, 1);
  const delta = deltaLastWeeks(points, 4);

  const coords = points.map((point, index) => {
    const x = PAD + (index / Math.max(points.length - 1, 1)) * (WIDTH - PAD * 2);
    const y = HEIGHT - PAD - ((point.peak - minPeak) / range) * (HEIGHT - PAD * 2);
    return {x, y, point};
  });

  const polyline = coords.map(({x, y}) => `${x},${y}`).join(' ');

  return (
    <div className="journal-chart-live">
      <div className="journal-chart-summary">
        <div className="journal-chart-stat">
          <span className="journal-chart-label">Пик 1ПМ</span>
          <span className="journal-chart-peak">
            {points[points.length - 1].peak.toFixed(1)}
            <span className="journal-chart-unit">кг</span>
          </span>
        </div>
        {delta != null ? (
          <div
            className={`journal-chart-stat journal-chart-stat--delta${delta < 0 ? ' is-down' : ''}`}>
            <span className="journal-chart-label">За 4 нед</span>
            <span className="journal-chart-delta">
              {delta >= 0 ? '+' : ''}
              {delta} кг
            </span>
          </div>
        ) : null}
      </div>
      <div className="journal-chart-frame">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          width="100%"
          height={HEIGHT}
          role="img"
          aria-label="График пика 1ПМ"
          preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polyline}
          />
          {coords.map(({x, y, point}) => (
            <circle
              key={point.date}
              className="journal-chart-dot"
              cx={x}
              cy={y}
              r="3"
              fill="var(--accent)"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
