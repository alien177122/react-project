# Layout (Auto Layout) — как реализовать (`createLayout`)

> **Не в продукте** — FLIP/reorder. Reference only.  
> **Offline:** `offline/pages/layout/`

---

## Factory

```typescript
import {createLayout} from 'animejs/layout';

const layout = createLayout(root, {
  duration: 400,
  ease: 'out(3)',
  children: true,
});
```

## Methods

| Method         | When                       |
| -------------- | -------------------------- |
| `record()`     | Snapshot before DOM change |
| `animate()`    | FLIP after DOM change      |
| `update()`     | Update recorded state      |
| **`revert()`** | Cleanup                    |

## States

`enterFrom`, `leaveTo`, `swapAt` — `states-parameters/`

## Usage patterns (docs)

- Enter/exit layout animation
- DOM order change
- Modal dialog
- Staggered layout
- CSS display animation

## React

Record → setState/reorder → animate in `useLayoutEffect` + scope revert.

## Offline

`layout/index.md` · `layout/usage/*`
