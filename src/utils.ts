import type { ExerciseConfig } from './types'

// Модифицированная формула Эпли — возвращает 1ПМ из (вес × повторения)
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

// Рабочий вес на конкретной неделе = 1ПМ × процент / 100, затем округление
export function calcWorkingWeight(oneRM: number, pct: number, cfg: ExerciseConfig): number {
  return roundWeight(oneRM * (pct / 100), cfg.step, cfg.type)
}

// CSS-класс для колонки "Повт итого" в таблице прогрессии
// Жёлтый ≥28, Серый 17–27, Красный ≤16
export function volumeClass(t: number): string {
  if (t >= 28) return 'v-hi'
  if (t <= 16) return 'v-lo'
  return 'v-md'
}

// Цвет столбца волнового графика — совпадает с цветом объёмного класса
export function barColor(t: number): string {
  if (t >= 28) return 'var(--accent,#e8ff3a)'
  if (t <= 16) return '#ff4d4d'
  return '#ff9f40'
}

// Декодирует JWT-токен и извлекает имя пользователя из payload
// Используется при восстановлении сессии из localStorage
export function jwtName(token: string): string | null {
  try { return JSON.parse(atob(token.split('.')[1])).name ?? null } catch { return null }
}

export function pol(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = (deg - 90) * Math.PI / 180
  return [+(cx + r * Math.cos(rad)).toFixed(2), +(cy + r * Math.sin(rad)).toFixed(2)]
}

export function donutArc(cx: number, cy: number, ro: number, ri: number, s: number, e: number): string {
  const [ax, ay] = pol(cx, cy, ro, s), [bx, by] = pol(cx, cy, ro, e)
  const [cx2, cy2] = pol(cx, cy, ri, e), [dx, dy] = pol(cx, cy, ri, s)
  const lg = e - s > 180 ? 1 : 0
  return `M${ax},${ay} A${ro},${ro} 0 ${lg} 1 ${bx},${by} L${cx2},${cy2} A${ri},${ri} 0 ${lg} 0 ${dx},${dy}Z`
}
