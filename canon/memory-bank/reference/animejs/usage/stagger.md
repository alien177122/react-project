# Stagger — как реализовать (`stagger`)

> **Когда:** `delay` (или другое поле) **разный для каждого target** по индексу.  
> **Offline:** `offline/pages/utilities/stagger/`

---

## 1. Import

```typescript
import {stagger} from 'animejs';
// или animejs/utils
```

---

## 2. Create (returns function)

```typescript
const delayFn = stagger(value, parameters?);
// use as:
animate('.items', { opacity: [0, 1], delay: delayFn });
```

---

## 3. Value types

| value                             | Effect               |
| --------------------------------- | -------------------- |
| `80`                              | +80ms per index      |
| `[0, 200]`                        | range across indices |
| `stagger(80, { from: 'center' })` | from center          |

---

## 4. Parameters

| Param      | Role                                         |
| ---------- | -------------------------------------------- |
| `start`    | Base delay                                   |
| `from`     | `'first'` \| `'last'` \| `'center'` \| index |
| `reversed` | Reverse order                                |
| `ease`     | Distribution ease                            |
| `grid`     | `[cols, rows]` 2D                            |
| `gridAxis` | `'x'` \| `'y'`                               |
| `modifier` | Transform stagger value                      |
| `total`    | Total spread ms                              |
| `use`      | `'delay'` \| `'timeline'` position           |

---

## 5. Use cases

| Need               | Code                                                 |
| ------------------ | ---------------------------------------------------- |
| List enter         | `delay: stagger(80)`                                 |
| Chart bars         | `delay: stagger(50)`                                 |
| Timeline positions | 3rd arg `stagger(10)` — [timeline.md](./timeline.md) |

---

## 6. React

Inside `useAnimeScope` → `animate(selector, { delay: stagger(n) })`.  
Deps change → replay entire stagger sequence.

---

## Offline

`utilities/stagger.md` · `stagger/time-staggering.md` · `stagger-parameters/*`
