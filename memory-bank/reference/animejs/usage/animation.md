# Animation — как реализовать (`animate`)

> **Когда:** tween CSS/DOM/SVG/JS object свойств.  
> **Offline:** `offline/pages/animation/`

---

## 1. Import

```typescript
import {animate} from 'animejs/animation';
```

---

## 2. Create

```typescript
const animation = animate(targets, parameters);
```

| Param        | Accepts                                          |
| ------------ | ------------------------------------------------ |
| `targets`    | selector (в scope), Node, Node[], object         |
| `parameters` | properties + tween params + playback + callbacks |

---

## 3. Targets

| Type         | Example                                   |
| ------------ | ----------------------------------------- |
| CSS selector | `'.journal-chart-stat'`                   |
| DOM          | `elementRef.current`                      |
| Array        | `[el1, el2]`                              |
| JS object    | `{ value: 0 }` → animate `value` property |

---

## 4. Tween parameters (на property)

| Param         | Role                        |
| ------------- | --------------------------- |
| `to` / `from` | Конечное / начальное        |
| `duration`    | ms per tween                |
| `delay`       | ms или **`stagger()`**      |
| `ease`        | `'out(3)'`, `spring({...})` |
| `composition` | blend при overlap           |
| `modifier`    | map value                   |

**Keyframes:**

```typescript
animate('.el', {
  scale: [
    {to: 1.25, ease: 'inOut(3)', duration: 200},
    {to: 1, ease: spring({bounce: 0.3})},
  ],
});
```

**From/to syntax:**

```typescript
opacity: [{ from: 0, to: 1 }],
translateY: [{ from: 8, to: 0 }],
```

---

## 5. Playback settings

`delay`, `duration`, `loop`, `loopDelay`, `alternate`, `reversed`, `autoplay`, `frameRate`, `playbackRate`, `playbackEase`, `persist`

---

## 6. Callbacks

`onBegin`, `onUpdate`, `onBeforeUpdate`, `onRender`, `onLoop`, `onPause`, `onComplete`, `then`

---

## 7. Methods

| Method         | When                    |
| -------------- | ----------------------- |
| `play()`       | Start / resume          |
| `pause()`      | Pause                   |
| `restart()`    | From start              |
| `reset()`      | Reset values            |
| `resume()`     | After pause             |
| `reverse()`    | Reverse dir             |
| `alternate()`  | Toggle alternate        |
| `seek(ms)`     | Scrub                   |
| `stretch(ms)`  | Retime                  |
| `refresh()`    | After DOM/layout change |
| `complete()`   | Force complete          |
| `cancel()`     | Cancel                  |
| **`revert()`** | Cleanup DOM styles      |

---

## 8. Properties

`targets`, `currentTime`, `progress`, `duration`, `paused`, `completed`, … — см. `animation-properties.md`

---

## 9. Compose

- **Timeline:** `timeline.add(target, params, position)` — [timeline.md](./timeline.md)
- **Scope:** только selectors внутри `createScope({ root })`

---

## 10. React steps

1. `useAnimeScope(rootRef, () => animate(...), deps)`
2. Animate **opacity, transform, SVG draw** — not layout props
3. `useReducedMotion()` skip
4. Replay: put data keys in `deps`

**Project example (R1):**

```typescript
animate('.journal-chart-stat', {
  opacity: [{from: 0, to: 1}],
  translateY: [{from: 8, to: 0}],
  duration: 400,
  delay: stagger(80),
  ease: 'out(3)',
});
```

---

## Offline

`animation/index.md` · `targets/*` · `tween-parameters/*` · `keyframes/*` · `animation-methods/*` · `animation-playback-settings/*`
