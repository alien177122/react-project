import type {JournalSet} from '../types/index.ts';

export function e1rm(weight: number, reps: number): number {
  return weight * (1 + reps / 30);
}

export function sessionPeak(sets: JournalSet[]): number {
  if (sets.length === 0) return 0;
  return Math.max(...sets.map(set => e1rm(set.weight, set.reps)));
}

export function sessionVolume(sets: JournalSet[]): number {
  return sets.reduce((sum, set) => sum + set.weight * set.reps, 0);
}

export function sessionTopWeight(sets: JournalSet[]): number {
  if (sets.length === 0) return 0;
  return Math.max(...sets.map(set => set.weight));
}

export interface ChartPoint {
  date: string;
  peak: number;
}

export function buildPeakSeries(
  sessions: {date: string; sets: JournalSet[]}[],
  maxPoints = 8,
): ChartPoint[] {
  const byDate = new Map<string, number>();

  for (const session of sessions) {
    const peak = sessionPeak(session.sets);
    const prev = byDate.get(session.date) ?? 0;
    byDate.set(session.date, Math.max(prev, peak));
  }

  return [...byDate.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-maxPoints)
    .map(([date, peak]) => ({date, peak}));
}

export function deltaLastWeeks(points: ChartPoint[], weeks = 4): number | null {
  if (points.length < 2) return null;
  const latest = points[points.length - 1].peak;
  const cutoffIndex = Math.max(0, points.length - weeks - 1);
  const earlier = points[cutoffIndex]?.peak;
  if (earlier == null) return null;
  return Math.round((latest - earlier) * 10) / 10;
}
