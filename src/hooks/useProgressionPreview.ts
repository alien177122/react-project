import {useMemo} from 'react';
import type {ProgramSettings} from '../types';
import {
  buildProgressionPreviewWeeks,
  filterChartPreviewWeeks,
  getPhaseDisplayLabel,
  type ProgressionPreviewWeek,
} from '@shared/program/progressionPreview';

export interface PreviewChartWeek extends ProgressionPreviewWeek {
  hasWeight: boolean;
  phaseLabel: string;
  phaseColorVar: string;
  phaseTintVar: string;
  x: number;
  y: number;
  barX: number;
  barY: number;
  barHeight: number;
}

export interface PreviewPhase {
  label: string;
  weeks: number;
  colorVar: string;
  tintVar: string;
}

const VIEW = {left: 56, right: 56, top: 28, bottom: 238, width: 800, barWidth: 40};

function phaseTokens(label: string): {colorVar: string; tintVar: string} {
  switch (label) {
    case 'Тест':
      return {colorVar: '--ta-text-dim', tintVar: '--ta-calc-border'};
    case 'Разгрузка':
      return {colorVar: '--ta-sec-03', tintVar: '--ta-sec-03-tint'};
    case 'Сила':
      return {colorVar: '--ta-sec-06', tintVar: '--ta-sec-06-tint'};
    case 'Пик':
    case 'Гипертрофия':
      return {colorVar: '--ta-sec-01', tintVar: '--ta-sec-01-tint'};
    default:
      return {colorVar: '--ta-sec-02', tintVar: '--ta-sec-02-tint'};
  }
}

function linePath(points: {x: number; y: number}[]): string {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ');
}

function areaPath(points: {x: number; y: number}[]): string {
  if (points.length === 0) return '';
  const base = VIEW.bottom;
  return `${linePath(points)} L ${points[points.length - 1].x.toFixed(1)} ${base} L ${points[0].x.toFixed(1)} ${base} Z`;
}

function buildPhases(weeks: PreviewChartWeek[]): PreviewPhase[] {
  const phases: PreviewPhase[] = [];
  for (const week of weeks) {
    const last = phases[phases.length - 1];
    if (last && last.label === week.phaseLabel) {
      last.weeks += 1;
      continue;
    }
    phases.push({
      label: week.phaseLabel,
      weeks: 1,
      colorVar: week.phaseColorVar,
      tintVar: week.phaseTintVar,
    });
  }
  return phases;
}

export function useProgressionPreview(settings: ProgramSettings) {
  return useMemo(() => {
    const preset = settings.progressionPreset;
    const source = filterChartPreviewWeeks(buildProgressionPreviewWeeks(preset), preset);
    const chartWidth = VIEW.width - VIEW.left - VIEW.right;
    const stepX = chartWidth / Math.max(1, source.length - 1);
    const chartHeight = VIEW.bottom - VIEW.top;

    const weights = source.map(w => w.weight).filter((w): w is number => w != null);
    const maxWeight = weights.length ? Math.max(...weights) : 1;
    const minWeight = weights.length ? Math.min(...weights) : 0;
    const weightSpan = Math.max(maxWeight - minWeight, 1);
    const maxVolume = Math.max(...source.map(w => w.totalReps), 1);

    const weeks: PreviewChartWeek[] = source.map((week, index) => {
      const hasWeight = week.weight != null;
      const phaseLabel = getPhaseDisplayLabel(week, preset);
      const tokens = phaseTokens(phaseLabel);
      const x = VIEW.left + stepX * index;
      const y = hasWeight
        ? VIEW.bottom - ((week.weight! - minWeight) / weightSpan) * chartHeight
        : VIEW.bottom;
      const barHeight = (week.totalReps / maxVolume) * chartHeight;

      return {
        ...week,
        hasWeight,
        phaseLabel,
        phaseColorVar: tokens.colorVar,
        phaseTintVar: tokens.tintVar,
        x,
        y,
        barX: x - VIEW.barWidth / 2,
        barY: VIEW.bottom - barHeight,
        barHeight,
      };
    });

    const intensityPoints = weeks.filter(w => w.hasWeight).map(({x, y}) => ({x, y}));
    const deloadWeek = weeks.find(w => w.isDeload)?.week;

    return {
      weeks,
      phases: buildPhases(weeks),
      linePath: linePath(intensityPoints),
      areaPath: areaPath(intensityPoints),
      viewBox: `0 0 ${VIEW.width} 280`,
      grid: [0, 1, 2, 3].map(i => VIEW.top + i * (chartHeight / 3)),
      deloadWeek,
    };
  }, [settings.progressionPreset, settings.daysPerWeek]);
}
