# SVG — как реализовать (`svg.*`)

> **Когда:** линии графиков, path morph, motion along path.  
> **Offline:** `offline/pages/svg/`

---

## 1. Import

```typescript
import * as svg from 'animejs/svg';
```

---

## 2. createDrawable — line reveal

**When:** e1RM line, periodization line (замена stroke-dashoffset CSS).

```typescript
const [drawable] = svg.createDrawable('path.ta-period__line');
// или NodeList — destructure first

animate(drawable, {
  draw: ['0 0', '0 1'], // hidden → full
  duration: 600,
  ease: 'out(3)',
});
```

| `draw`      | Meaning   |
| ----------- | --------- |
| `'0 0'`     | hidden    |
| `'0 1'`     | full path |
| `'0 .5'`    | half      |
| `'.25 .75'` | segment   |

**Target types:** `path`, `line`, `polyline`, `rect`

---

## 3. createMotionPath

Animate element along SVG path — not used in project yet.

```typescript
const path = svg.createMotionPath('path#motion');
animate('.dot', {...path, duration: 2000});
```

---

## 4. morphTo

Morph between two paths — not in project.

---

## 5. React steps

1. SVG path in DOM before `createDrawable`
2. Inside `useAnimeScope` after `linePath` computed
3. deps: `[linePath, exerciseKey]`
4. Reset: `animate(drawable, { draw: '0 0', duration: 0 })` before replay

→ [IMPLEMENTATIONS R5, R6](../IMPLEMENTATIONS.md)

---

## Offline

`svg/createdrawable.md` · `createmotionpath.md` · `morphto.md`
