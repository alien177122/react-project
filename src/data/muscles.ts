import type { MuscleMeta } from '../types'

// ============================================================
// ВКЛАД МЫШЦ — используется для расчёта доната объёма
// Число = доля от среднего кол-ва подходов упражнения
// (1.0 = основная мышца, 0.3 = синергист)
// ============================================================
export const MUSCLE_CONTRIB: Record<string, Record<string, number>> = {
  bench:        { chest: 1.0, triceps: 0.4, front_delt: 0.2 },
  gluteBridge:  { glutes: 0.8, hamstrings: 0.2 },
  legPress:     { quads: 0.7, glutes: 0.3 },
  squat:        { quads: 0.6, glutes: 0.4 },
  row:          { lats: 0.5, traps: 0.3, biceps: 0.2, rear_delt: 0.2 },
  pullUp:       { lats: 0.7, biceps: 0.3 },
  ohp:          { front_delt: 0.7, mid_delt: 0.3, triceps: 0.3 },
  curl:         { biceps: 1.0 },
  dbPress:      { chest: 0.7, triceps: 0.3, front_delt: 0.2 },
  lateralRaise: { mid_delt: 1.0 },
  legExt:       { quads: 1.0 },
  legCurl:      { hamstrings: 1.0 },
}

export const MUSCLE_META: Record<string, MuscleMeta> = {
  // Push — yellow family
  chest:      { label: 'Грудь',          color: '#ffd34a', catKey: 'push' },
  front_delt: { label: 'Перед. дельта',  color: '#ffc44f', catKey: 'push' },
  mid_delt:   { label: 'Сред. дельта',   color: '#ffb347', catKey: 'push' },
  triceps:    { label: 'Трицепс',        color: '#ff9f2e', catKey: 'push' },
  // Pull — orange family
  lats:       { label: 'Широчайшие',     color: '#ff9f2e', catKey: 'pull' },
  biceps:     { label: 'Бицепс',         color: '#ff8a3d', catKey: 'pull' },
  traps:      { label: 'Трапеции',       color: '#ff7933', catKey: 'pull' },
  rear_delt:  { label: 'Задн. дельта',   color: '#ff6a2d', catKey: 'pull' },
  // Legs — red family
  quads:      { label: 'Квадрицепсы',    color: '#ff6d3a', catKey: 'legs' },
  glutes:     { label: 'Ягодичные',      color: '#ff5a36', catKey: 'legs' },
  hamstrings: { label: 'Бицепс бедра',   color: '#e1492f', catKey: 'legs' },
}

export const MUSCLE_ORDER = [
  'chest','front_delt','mid_delt','triceps',
  'lats','biceps','traps','rear_delt',
  'quads','glutes','hamstrings',
]

export const CAT_ORDER = ['push','pull','legs'] as const

export const CAT_META: Record<string, { label: string; color: string }> = {
  push: { label: 'Жим',  color: '#ffd34a' },
  pull: { label: 'Тяга', color: '#ff9f2e' },
  legs: { label: 'Ноги', color: '#ff5a36' },
}
