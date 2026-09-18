# Engine — как настроить (`engine`)

> **Когда:** глобальные defaults для всех `animate()` / timelines.  
> **Offline:** `offline/pages/engine/`

---

## 1. Import

```typescript
import {engine} from 'animejs/engine';
```

---

## 2. Configure (once at app boot)

**Project:** `src/lib/anime/configureAppAnimeEngine.ts` → `index.tsx`

```typescript
engine.pauseOnDocumentHidden = true;
engine.defaults.duration = 400;
engine.defaults.ease = 'out(3)';
```

---

## 3. Methods

| Method            | When               |
| ----------------- | ------------------ |
| `engine.pause()`  | Pause global clock |
| `engine.resume()` | Resume             |
| `engine.update()` | Manual tick (rare) |

---

## 4. Parameters / properties

`fps`, `speed`, `precision`, `timeUnit`, `pauseOnDocumentHidden`

---

## Rule

Не дублировать duration/ease в каждом animate если совпадает с defaults — override только где нужно (spring, fast tooltip 220ms).

---

## Offline

`engine/index.md` · `engine-defaults.md` · `engine-methods/*`
