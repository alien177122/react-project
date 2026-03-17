import type { ExerciseConfig } from '../types'

// ============================================================
// РАСЧЁТЫ
// ============================================================

// Модифицированная формула Эпли — возвращает 1ПМ из (вес x повторения)
// Коэффициенты 1.3/1.2/1.1 дают немного более консервативный результат
export function calc1RM(weight: number, reps: number): number {
  if (reps < 5)  return weight / (1.0278 - 0.0278 * reps * 1.3)
  if (reps <= 8) return weight / (1.0278 - 0.0278 * reps * 1.2)
  return weight * (1 + 0.0333 * reps * 1.1)
}

// Округляет рабочий вес до ближайшего шага с учётом типа снаряда
// Гантели (C) — округление вниз (FLOOR), штанги/тренажёры — вверх (CEIL)
export function roundWeight(value: number, step: number, type: 'A'|'B'|'C'|'D'): number {
  if (type === 'C') return Math.floor(value / step) * step
  return Math.ceil(value / step) * step
}

// Рабочий вес на конкретной неделе = 1ПМ x процент / 100, затем округление
export function calcWorkingWeight(oneRM: number, pct: number, cfg: ExerciseConfig): number {
  return roundWeight(oneRM * (pct / 100), cfg.step, cfg.type)
}

// CSS-класс для колонки "Повт итого" в таблице прогрессии
// Жёлтый >=28, Серый 17–27, Красный <=16
export function volumeClass(t: number): string {
  if (t >= 28) return 'v-hi'
  if (t <= 16) return 'v-lo'
  return 'v-md'
}

// Цвет столбца волнового графика — совпадает с цветом объёмного класса
export function barColor(t: number): string {
  if (t >= 28) return 'var(--accent,#ffd34a)'
  if (t <= 16) return 'var(--red,#ff5a36)'
  return 'var(--orange,#ff9f2e)'
}
