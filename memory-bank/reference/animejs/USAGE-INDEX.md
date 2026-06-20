# Anime.js — индекс «нужно X → реализуй так»

> **Главный вход для агента:** выбери задачу → открой файл в [`usage/`](./usage/README.md) → следуй структуре factory → settings → callbacks → methods → React steps.  
> **Рецепты под экраны проекта:** [IMPLEMENTATIONS.md](./IMPLEMENTATIONS.md) · **Теория:** [ALGORITHMS.md](./ALGORITHMS.md)

---

## Дерево решений

```
Нужно анимировать DOM/SVG свойство?
  └─ animate()          → usage/animation.md

Нужна последовательность (A → B → C) или sync с анимациями?
  └─ createTimeline()   → usage/timeline.md

Нужен setTimeout/setInterval, но sync с engine и анимациями?
  └─ createTimer()      → usage/timer.md

Нужен React + cleanup + селекторы внутри компонента?
  └─ createScope()      → usage/scope.md  (+ useAnimeScope)

Нужна задержка по индексу (список, бары, карточки)?
  └─ stagger()          → usage/stagger.md

Нужен физический bounce / pulse?
  └─ spring()           → usage/spring-easing.md

Нужна отрисовка SVG линии / path?
  └─ svg.createDrawable → usage/svg.md

Нужны глобальные defaults / pause при hidden tab?
  └─ engine             → usage/engine.md

Нужен drag?
  └─ createDraggable()  → usage/draggable.md (не в продукте)

Нужен scroll-trigger?
  └─ onScroll()         → usage/events-onscroll.md (в проекте — CSS)

Нужен FLIP / reorder layout?
  └─ createLayout()     → usage/layout.md (не в продукте)

Нужен cursor-follow / частые updates?
  └─ createAnimatable() → usage/animatable.md

Нужен лёгкий WAAPI?
  └─ waapi.animate()    → usage/waapi.md (не в продукте)
```

---

## Сравнение похожих API

| Задача             | ❌ Не так              | ✅ Так (anime.js)                                                               |
| ------------------ | ---------------------- | ------------------------------------------------------------------------------- |
| Отложить код на 2s | `setTimeout(fn, 2000)` | `createTimer({ duration: 2000, onComplete: fn })` или `timeline.call(fn, 2000)` |
| Интервал 30fps     | `setInterval`          | `createTimer({ loop: true, frameRate: 30, onUpdate })`                          |
| Цепочка анимаций   | nested `onComplete`    | `createTimeline().add().add()`                                                  |
| Список с delay     | CSS nth-child delay    | `delay: stagger(80)` в `animate()`                                              |
| React cleanup      | забытый cancel         | `scope.revert()` в `useEffect` return                                           |

---

## Единый шаблон реализации (все модули)

1. **Import** — subpath (`animejs/timer`, `animejs/timeline`, …)
2. **Factory** — `createX(parameters)` → instance
3. **Playback settings** — duration, delay, loop, autoplay, …
4. **Callbacks** — onBegin, onUpdate, onComplete, …
5. **Methods** — play, pause, seek, revert, …
6. **Compose** — timeline.add / sync; scope.add
7. **React** — `useAnimeScope` + deps + `useReducedMotion`
8. **Cleanup** — `revert()` или `cancel()`

---

## Файлы usage/

| Файл                                                   | Factory                | Когда                  |
| ------------------------------------------------------ | ---------------------- | ---------------------- |
| [usage/animation.md](./usage/animation.md)             | `animate()`            | tween свойств          |
| [usage/timeline.md](./usage/timeline.md)               | `createTimeline()`     | оркестрация            |
| [usage/timer.md](./usage/timer.md)                     | `createTimer()`        | таймер / interval sync |
| [usage/scope.md](./usage/scope.md)                     | `createScope()`        | React изоляция         |
| [usage/stagger.md](./usage/stagger.md)                 | `stagger()`            | function-based delay   |
| [usage/spring-easing.md](./usage/spring-easing.md)     | `spring()`             | ease параметр          |
| [usage/svg.md](./usage/svg.md)                         | `svg.createDrawable()` | линии графика          |
| [usage/engine.md](./usage/engine.md)                   | `engine` singleton     | defaults               |
| [usage/animatable.md](./usage/animatable.md)           | `createAnimatable()`   | frequent updates       |
| [usage/draggable.md](./usage/draggable.md)             | `createDraggable()`    | drag                   |
| [usage/events-onscroll.md](./usage/events-onscroll.md) | `onScroll()`           | scroll observer        |
| [usage/layout.md](./usage/layout.md)                   | `createLayout()`       | FLIP                   |
| [usage/waapi.md](./usage/waapi.md)                     | `waapi.animate()`      | WAAPI                  |

Полный текст API: `offline/pages/<section>/`
