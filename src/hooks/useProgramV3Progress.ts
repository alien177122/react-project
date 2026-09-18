import {useMemo} from 'react';
import {filterProgramV3ChartWeeks, type ProgramV3ChartRow} from '@training/shared/program/v3/chartProgress';

export type {ProgramV3ChartRow};

export interface ProgramV3ChartWeek extends ProgramV3ChartRow {
  hasWeight: boolean;
  phaseColorVar: string;
  phaseTintVar: string;
  x: number;
  y: number;
  barX: number;
  barY: number;
  barHeight: number;
}

export interface ProgramV3ChartPhase {
  label: string;
  /** Full phase name for native tooltip on the strip segment */
  title: string;
  weeks: number;
  colorVar: string;
  tintVar: string;
}

/** Macro blocks for phase strip — 4 segments for 16 weeks (etalon: ~4 groups for 8 weeks). */
/** Macro strip colors — distinct segments (etalon: border + tint, not error-red for mesos). */
const MACRO_PHASE_BLOCKS = [
  {
    key: 'prep',
    label: 'Подг.',
    title: 'Подготовка (нед. 1–3)',
    fromWeek: 1,
    toWeek: 3,
    colorVar: '--ta-sec-05',
    tintVar: '--ta-sec-05-tint',
  },
  {
    key: 'm1',
    label: 'М1',
    title: 'Тест + Мезоцикл 1 (нед. 4–7)',
    fromWeek: 4,
    toWeek: 7,
    colorVar: '--ta-sec-03',
    tintVar: '--ta-sec-03-tint',
  },
  {
    key: 'm2',
    label: 'М2',
    title: 'Тест + Мезоцикл 2 (нед. 8–11)',
    fromWeek: 8,
    toWeek: 11,
    colorVar: '--ta-sec-02',
    tintVar: '--ta-sec-02-tint',
  },
  {
    key: 'm3',
    label: 'М3',
    title: 'Тест + Мезоцикл 3 (нед. 12–16)',
    fromWeek: 12,
    toWeek: 16,
    colorVar: '--ta-sec-01',
    tintVar: '--ta-sec-01-tint',
  },
] as const;

const VIEW = {left: 56, right: 56, top: 28, bottom: 238, width: 800, barWidth: 40};

function phaseTokens(phaseLabel: string, isTestWeek: boolean): {colorVar: string; tintVar: string} {
  if (isTestWeek || phaseLabel === 'Тест') {
    return {colorVar: '--ta-text-dim', tintVar: '--ta-calc-border'};
  }
  if (phaseLabel === 'Подготовка' || phaseLabel === 'Подг.') {
    return {colorVar: '--ta-sec-02', tintVar: '--ta-sec-02-tint'};
  }
  if (phaseLabel === 'Сила') {
    return {colorVar: '--ta-sec-06', tintVar: '--ta-sec-06-tint'};
  }
  if (phaseLabel === 'Гипертрофия' || phaseLabel === 'Пик') {
    return {colorVar: '--ta-sec-01', tintVar: '--ta-sec-01-tint'};
  }
  return {colorVar: '--ta-sec-02', tintVar: '--ta-sec-02-tint'};
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

function buildMacroPhases(allWeeks: ProgramV3ChartRow[]): ProgramV3ChartPhase[] {
  if (allWeeks.length === 0) return [];

  return MACRO_PHASE_BLOCKS.map(block => {
    const blockWeeks = allWeeks.filter(
      week => week.week >= block.fromWeek && week.week <= block.toWeek,
    );
    return {
      label: block.label,
      title: block.title,
      weeks: blockWeeks.length,
      colorVar: block.colorVar,
      tintVar: block.tintVar,
    };
  }).filter(phase => phase.weeks > 0);
}

function mapChartGeometry(source: ProgramV3ChartRow[]): ProgramV3ChartWeek[] {
  const chartWidth = VIEW.width - VIEW.left - VIEW.right;
  const stepX = chartWidth / Math.max(1, source.length - 1);
  const chartHeight = VIEW.bottom - VIEW.top;

  const weights = source.map(row => row.weight).filter((w): w is number => w != null);
  const maxWeight = weights.length ? Math.max(...weights) : 1;
  const minWeight = weights.length ? Math.min(...weights) : 0;
  const weightSpan = Math.max(maxWeight - minWeight, 1);
  const maxVolume = Math.max(...source.map(row => row.totalReps), 1);

  return source.map((row, index) => {
    const hasWeight = row.weight != null;
    const tokens = phaseTokens(row.phaseLabel, row.isTestWeek);
    const x = VIEW.left + stepX * index;
    const y = hasWeight
      ? VIEW.bottom - ((row.weight! - minWeight) / weightSpan) * chartHeight
      : VIEW.bottom;
    const barHeight = (row.totalReps / maxVolume) * chartHeight;

    return {
      ...row,
      hasWeight,
      phaseColorVar: tokens.colorVar,
      phaseTintVar: tokens.tintVar,
      x,
      y,
      barX: x - VIEW.barWidth / 2,
      barY: VIEW.bottom - barHeight,
      barHeight,
    };
  });
}

export function useProgramV3Progress(rows: ProgramV3ChartRow[]) {
  return useMemo(() => {
    const listWeeks = mapChartGeometry(rows);
    const chartSource = filterProgramV3ChartWeeks(rows);
    const chartWeeks = mapChartGeometry(chartSource);

    const intensityPoints = chartWeeks.filter(w => w.hasWeight).map(({x, y}) => ({x, y}));
    const chartHeight = VIEW.bottom - VIEW.top;

    return {
      listWeeks,
      chartWeeks,
      phases: buildMacroPhases(rows),
      linePath: linePath(intensityPoints),
      areaPath: areaPath(intensityPoints),
      viewBox: `0 0 ${VIEW.width} 280`,
      grid: Array.from({length: 7}, (_, i) => VIEW.top + i * (chartHeight / 6)),
    };
  }, [rows]);
}
