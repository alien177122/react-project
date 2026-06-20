# Spring easing — как реализовать (`spring`)

> **Когда:** параметр **`ease`** с физическим bounce (delta pulse, release).  
> **Offline:** `offline/pages/easings/spring.md`

---

## 1. Import

```typescript
import {spring} from 'animejs';
```

---

## 2. Use (not factory — curve generator)

```typescript
animate('.el', {
  scale: [{to: 1.06}, {to: 1}],
  ease: spring({bounce: 0.25, duration: 350}),
});
```

**Важно:** spring **overrides** `duration` tween → settling time от spring.

---

## 3. Perceived params (SwiftUI-like)

| Param      | Range                 | Default |
| ---------- | --------------------- | ------- |
| `bounce`   | -1..1 (use -0.5..0.5) | 0.5     |
| `duration` | perceived ms          | 628     |

```typescript
spring({bounce: 0.3, duration: 400, onComplete: () => {}});
```

`onComplete` на **spring object** — когда визуально «дошло», не physics end.

---

## 4. Physics params

| Param       | Role               |
| ----------- | ------------------ |
| `stiffness` | Жёсткость          |
| `damping`   | Затухание          |
| `mass`      | Инерция            |
| `velocity`  | Начальная скорость |

```typescript
spring({stiffness: 95, damping: 13});
```

---

## 5. Project rule

Quiet UI: `bounce` ≤ 0.35, one-shot, no infinite spring loops.

→ [IMPLEMENTATIONS R3](../IMPLEMENTATIONS.md)

---

## Offline

`easings/spring.md`
