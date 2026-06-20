import {useMemo} from 'react';
import type {JournalSession} from '../types/index.ts';
import {
  sessionPeak,
  sessionHasWeights,
  sessionTopWeight,
  sessionTotalReps,
  sessionVolume,
} from '../utils/journalMetrics.ts';

const VIEW = {left: 56, right: 56, top: 28, bottom: 238, width: 800, barWidth: 40};
const DEFAULT_WEEK_COUNT = 8;

export interface JournalChartWeek {
  week: number;
  date: string | null;
  peak: number | null;
  topWeight: number | null;
  totalReps: number | null;
  volume: number | null;
  setCount: number;
  hasData: boolean;
  x: number;
  y: number | null;
  barX: number;
  barY: number | null;
  barHeight: number | null;
}

export interface JournalProgressChartModel {
  weekCount: number;
  journalWeeks: JournalChartWeek[];
  journalLinePath: string;
  viewBox: string;
  grid: number[];
  weightTicks: {y: number; value: number}[];
  latestPeak: number | null;
}

function linePath(points: {x: number; y: number}[]): string {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ');
}

function mapSessionsToWeeks(
  sessions: JournalSession[],
  weekCount: number,
): Map<number, JournalSession> {
  const sorted = [...sessions]
    .filter(sessionHasWeights)
    .sort((a, b) => a.date.localeCompare(b.date));
  const recent = sorted.slice(-weekCount);
  const map = new Map<number, JournalSession>();
  recent.forEach((session, index) => {
    map.set(index + 1, session);
  });
  return map;
}

export function buildJournalProgressChartModel(
  sessions: JournalSession[],
  weekCount: number = DEFAULT_WEEK_COUNT,
): JournalProgressChartModel {
  const slots = Math.max(weekCount, 1);
  const chartWidth = VIEW.width - VIEW.left - VIEW.right;
  const stepX = chartWidth / Math.max(1, slots - 1);
  const chartHeight = VIEW.bottom - VIEW.top;
  const sessionByWeek = mapSessionsToWeeks(sessions, slots);

  const journalPeaks = [...sessionByWeek.values()].map(session => sessionPeak(session.sets));
  const journalVolumes = [...sessionByWeek.values()].map(session => sessionVolume(session.sets));
  const maxJournalVolume = Math.max(...journalVolumes, 1);

  const weightValues = journalPeaks.filter(value => Number.isFinite(value) && value > 0);
  const minWeight = weightValues.length ? Math.min(...weightValues) : 0;
  const maxWeight = weightValues.length ? Math.max(...weightValues) : 1;
  const weightSpan = Math.max(maxWeight - minWeight, 1);
  const weightTicks = Array.from({length: 4}, (_, index) => {
    const ratio = 1 - index / 3;
    return {
      y: VIEW.top + index * (chartHeight / 3),
      value: Math.round((minWeight + weightSpan * ratio) * 10) / 10,
    };
  });

  const journalWeeks: JournalChartWeek[] = Array.from({length: slots}, (_, index) => {
    const week = index + 1;
    const session = sessionByWeek.get(week);
    const x = VIEW.left + stepX * index;

    if (!session) {
      return {
        week,
        date: null,
        peak: null,
        topWeight: null,
        totalReps: null,
        volume: null,
        setCount: 0,
        hasData: false,
        x,
        y: null,
        barX: x - VIEW.barWidth / 2,
        barY: null,
        barHeight: null,
      };
    }

    const peak = sessionPeak(session.sets);
    const totalReps = sessionTotalReps(session.sets);
    const volume = sessionVolume(session.sets);
    const barHeight = (volume / maxJournalVolume) * chartHeight;

    return {
      week,
      date: session.date,
      peak,
      topWeight: sessionTopWeight(session.sets),
      totalReps,
      volume,
      setCount: session.sets.length,
      hasData: true,
      x,
      y: VIEW.bottom - ((peak - minWeight) / weightSpan) * chartHeight,
      barX: x - VIEW.barWidth / 2,
      barY: VIEW.bottom - barHeight,
      barHeight,
    };
  });

  const journalPoints = journalWeeks
    .filter(week => week.hasData && week.y != null)
    .map(week => ({x: week.x, y: week.y!}));

  const latestWithData = [...journalWeeks]
    .reverse()
    .find(week => week.hasData && week.peak != null);

  return {
    weekCount: slots,
    journalWeeks,
    journalLinePath: linePath(journalPoints),
    viewBox: `0 0 ${VIEW.width} 280`,
    grid: [0, 1, 2, 3].map(i => VIEW.top + i * (chartHeight / 3)),
    weightTicks,
    latestPeak: latestWithData?.peak ?? null,
  };
}

export function useJournalProgressChart(sessions: JournalSession[]) {
  return useMemo(() => buildJournalProgressChartModel(sessions), [sessions]);
}
