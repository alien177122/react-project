# Draggable — как реализовать (`createDraggable`)

> **Не в продукте** — reference only.  
> **Offline:** `offline/pages/draggable/`

---

## Factory

```typescript
import {createDraggable} from 'animejs/draggable';

const draggable = createDraggable(target, {
  container: [0, 0, 0, 0],
  releaseEase: spring({bounce: 0.7}),
});
```

## Callbacks

`onGrab`, `onDrag`, `onUpdate`, `onRelease`, `onSettle`, `onSnap`, `onResize`, …

## Methods

`enable()`, `disable()`, `setX()`, `setY()`, `reset()`, `refresh()`, **`revert()`**, `stop()`, `scrollInView()`, `animateInView()`

## Settings (axes)

`x`, `y`, `snap`, `modifier`, `mapTo`, `container`, `releaseStiffness`, `releaseDamping`, …

## React

Inside `createScope({ root }).add(() => createDraggable('.handle', {...}))` — cleanup `scope.revert()`.

## Offline

`draggable/index.md` + 46 subpages in `offline/pages/draggable/`
