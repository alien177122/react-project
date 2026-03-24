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
  // Push — orange-red family
  chest:      { label: 'Грудь',          color: '#ff6b35', catKey: 'push' },
  front_delt: { label: 'Перед. дельта',  color: '#e85a2a', catKey: 'push' },
  mid_delt:   { label: 'Сред. дельта',   color: '#d04a20', catKey: 'push' },
  triceps:    { label: 'Трицепс',        color: '#b83a18', catKey: 'push' },
  // Pull — blue family
  lats:       { label: 'Широчайшие',     color: '#5ba4ff', catKey: 'pull' },
  biceps:     { label: 'Бицепс',         color: '#4090ee', catKey: 'pull' },
  traps:      { label: 'Трапеции',       color: '#2b77d4', catKey: 'pull' },
  rear_delt:  { label: 'Задн. дельта',   color: '#1a5eb8', catKey: 'pull' },
  // Legs — green family
  quads:      { label: 'Квадрицепсы',    color: '#3affb8', catKey: 'legs' },
  glutes:     { label: 'Ягодичные',      color: '#00e099', catKey: 'legs' },
  hamstrings: { label: 'Бицепс бедра',   color: '#00b878', catKey: 'legs' },
}

export const MUSCLE_ORDER = [
  'chest','front_delt','mid_delt','triceps',
  'lats','biceps','traps','rear_delt',
  'quads','glutes','hamstrings',
]

export const CAT_ORDER = ['push','pull','legs'] as const

export const CAT_META: Record<string, { label: string; color: string }> = {
  push: { label: 'Жим',  color: '#ff6b35' },
  pull: { label: 'Тяга', color: '#5ba4ff' },
  legs: { label: 'Ноги', color: '#3affb8' },
}
