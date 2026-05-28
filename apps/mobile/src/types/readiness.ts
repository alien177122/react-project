export type ReadinessFocus = 'sleep' | 'load' | 'mobility';

export type ReadinessStatus = 'low' | 'steady' | 'high';

type MetricBase = {
  helper: string;
  id: ReadinessFocus;
  label: string;
  status: ReadinessStatus;
};

export type ReadinessMetric =
  | (MetricBase & {
      kind: 'sleep';
      minutes: number;
      qualityLabel: string;
      targetMinutes: number;
    })
  | (MetricBase & {
      deltaPercent: number;
      kind: 'load';
      unit: 'AU';
      value: number;
    })
  | (MetricBase & {
      kind: 'mobility';
      max: 100;
      unit: '%';
      value: number;
    });

export type ReadinessSnapshot = {
  athleteName: string;
  dateLabel: string;
  metrics: ReadinessMetric[];
  score: number;
  summary: string;
};

export type ReadinessScreenState =
  | { status: 'loading' }
  | { message: string; status: 'error' }
  | { snapshot: ReadinessSnapshot; status: 'ready' };
