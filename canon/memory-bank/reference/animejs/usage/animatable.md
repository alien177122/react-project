# Animatable — как реализовать (`createAnimatable`)

> **Когда:** частые updates (mousemove, scroll-linked) без нового `animate()` каждый frame.  
> **Не в проекте** (нет cursor-follow widgets).  
> **Offline:** `offline/pages/animatable/`

---

## Factory

```typescript
import {createAnimatable} from 'animejs/animatable';

const animatable = createAnimatable(targets, {
  x: {duration: 400, ease: 'out(3)'},
  y: {duration: 400},
});
```

## Usage pattern

```typescript
animatable.x(100); // setter — smooth to value
animatable.x(); // getter
animatable.revert();
```

## Settings per property

`duration`, `ease`, `modifier`, `unit`

## React

Scope + revert on unmount. Prefer over raw `animate()` in `mousemove` handler.

## Offline

`animatable/index.md` · `animatable-methods/*` · `animatable-settings/*`
