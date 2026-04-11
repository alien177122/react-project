// Модифицированная формула Эпли — возвращает 1ПМ из (вес × повторения)
// Коэффициенты 1.3/1.2/1.1 дают немного более консервативный результат
export function calc1RM(weight: number, reps: number): number {
  if (reps < 5)  return weight / (1.0278 - 0.0278 * reps * 1.3)
  if (reps <= 8) return weight / (1.0278 - 0.0278 * reps * 1.2)
  return weight * (1 + 0.0333 * reps * 1.1)
}
