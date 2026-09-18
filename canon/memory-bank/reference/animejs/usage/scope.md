# Scope — как реализовать (`createScope`)

> **Когда:** React (или component) — изоляция селекторов, batch revert, media queries, shared defaults.  
> **Offline:** `offline/pages/scope/`

---

## 1. Import

```typescript
import {createScope} from 'animejs/scope';
```

---

## 2. Create

```typescript
const scope = createScope(parameters);
```

| Parameter      | Role                                   |
| -------------- | -------------------------------------- |
| `root`         | Ref / Element — граница селекторов     |
| `defaults`     | Default animate params в scope         |
| `mediaQueries` | `{ name: '(prefers-reduced-motion)' }` |

---

## 3. Setup — `.add(setupFn)`

```typescript
scope.add(self => {
  animate('.child', {opacity: [0, 1]});

  // Register callable method
  self.add('pulse', (n: number) => {
    animate('.child', {rotate: n * 360, duration: 1500});
  });
});
```

| `self`               | Role                            |
| -------------------- | ------------------------------- |
| `self.matches`       | Media query booleans            |
| `self.add(name, fn)` | Register `scope.methods.name()` |

---

## 4. Methods

| Method             | When                          |
| ------------------ | ----------------------------- |
| `add(setupFn)`     | Register animations + methods |
| `addOnce(setupFn)` | Run setup once                |
| `refresh()`        | After DOM change              |
| **`revert()`**     | **Cancel all + restore DOM**  |
| `keepTime()`       | Preserve time on refresh      |

---

## 5. React — канон проекта

**Hook:** `src/hooks/useAnimeScope.ts`

```typescript
useAnimeScope(rootRef, scope => {
  animate('.el', { ... });
}, [deps], { disabled });
```

| Step | Action                                |
| ---- | ------------------------------------- |
| 1    | `rootRef` on container                |
| 2    | `useAnimeScope(rootRef, setup, deps)` |
| 3    | Selectors relative to root only       |
| 4    | `useReducedMotion` inside hook — skip |
| 5    | Unmount → automatic `scope.revert()`  |

**Call scope method from handler:**

```typescript
scopeRef.current?.methods.rotateLogo(n);
```

---

## Offline

`scope/index.md` · `scope-parameters/*` · `scope-methods/*` · `getting-started/using-with-react.md`
