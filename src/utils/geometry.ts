// SVG-геометрия: полярные координаты и дуги донатов

// Переводит полярные координаты в декартовы (для SVG)
export function pol(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = (deg - 90) * Math.PI / 180
  return [+(cx + r * Math.cos(rad)).toFixed(2), +(cy + r * Math.sin(rad)).toFixed(2)]
}

// Строит SVG path для дуги доната (от угла s до e, внешний ro, внутренний ri)
export function donutArc(cx: number, cy: number, ro: number, ri: number, s: number, e: number): string {
  const [ax, ay] = pol(cx, cy, ro, s), [bx, by] = pol(cx, cy, ro, e)
  const [cx2, cy2] = pol(cx, cy, ri, e), [dx, dy] = pol(cx, cy, ri, s)
  const lg = e - s > 180 ? 1 : 0
  return `M${ax},${ay} A${ro},${ro} 0 ${lg} 1 ${bx},${by} L${cx2},${cy2} A${ri},${ri} 0 ${lg} 0 ${dx},${dy}Z`
}
