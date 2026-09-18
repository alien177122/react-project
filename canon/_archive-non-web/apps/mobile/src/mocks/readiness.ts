import type { ReadinessSnapshot } from '@/types/readiness';

export const mockReadinessSnapshot: ReadinessSnapshot = {
  athleteName: 'Стив',
  dateLabel: '5 мая',
  score: 82,
  summary: 'Система готова к плановой интенсивности. Держите рабочий объём, но не добавляйте отказные подходы.',
  metrics: [
    {
      helper: '7 ч 36 мин сна при цели 8 ч. Качество стабильно, дефицит небольшой.',
      id: 'sleep',
      kind: 'sleep',
      label: 'Сон',
      minutes: 456,
      qualityLabel: 'Стабильно',
      status: 'steady',
      targetMinutes: 480,
    },
    {
      deltaPercent: -6,
      helper: 'Острая нагрузка ниже прошлой недели, восстановление не конфликтует с планом.',
      id: 'load',
      kind: 'load',
      label: 'Нагрузка',
      status: 'high',
      unit: 'AU',
      value: 1140,
    },
    {
      helper: 'Движение в рабочем диапазоне. Добавьте короткую мобилизацию перед приседом.',
      id: 'mobility',
      kind: 'mobility',
      label: 'Мобилити',
      max: 100,
      status: 'steady',
      unit: '%',
      value: 88,
    },
  ],
};
