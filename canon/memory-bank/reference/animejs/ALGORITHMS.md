# Anime.js v4 — алгоритмы и механики (для внедрения в проект)

> **Назначение:** как работают фичи изнутри — чтобы правильно применять в Journal / Calculator.  
> **Полный текст API:** `offline/pages/` · **Рецепты кода:** [IMPLEMENTATIONS.md](./IMPLEMENTATIONS.md)

---

## 1. `animate()` — tween over time

**Суть:** для каждого target и каждого свойства создаётся tween; движок (`engine` Clock) на каждом кадре интерполирует `from → to` через `ease(t)`.

| Концепт   | v4 API                                         | Примечание для проекта                       |
| --------- | ---------------------------------------------- | -------------------------------------------- |
| Target    | селектор в scope, DOM node, массив             | В React — только внутри `useAnimeScope` root |
| Property  | `opacity`, `translateX`, `scale`, SVG `draw`   | Только transform/opacity в UI (Quiet UI)     |
| Keyframes | массив `{to, duration, ease}` или `{from, to}` | Для pulse: `scale: [{to:1.04},{to:1}]`       |
| Duration  | ms; переопределяется spring                    | Default 400ms из `configureAppAnimeEngine`   |
| Delay     | число или **function** (`stagger`)             | `delay: stagger(80)` — см. §2                |
| Ease      | `'out(3)'`, `spring({bounce:.3})`              | Spring задаёт свою settling duration         |
| Cleanup   | `animation.revert()` или `scope.revert()`      | Scope revert — batch для компонента          |

**Function-based values:** любой параметр может быть `(target, index, length) => value`. `stagger()` возвращает такую функцию для `delay`, `translateX`, и т.д.

**Источник:** `offline/pages/animation/` · `animation/tween-value-types/function-based.md`

---

## 2. `stagger()` — распределение по индексу

**Формула (time staggering):** для target с индексом `i` из `n` элементов:

```
delay(i) = staggerStart + i * staggerInterval   // при linear stagger
```

**API:**

```typescript
stagger(value, {
  start: 0, // delay первого
  from: 'first', // 'first' | 'last' | 'center' | index
  reversed: false,
  ease: 'linear', // easing распределения (не tween ease)
  grid: [cols, rows], // 2D stagger
});
```

**Типичные value:**

| value              | Эффект                                  |
| ------------------ | --------------------------------------- |
| `80`               | +80ms delay на каждый следующий элемент |
| `[0, 100]`         | delay от 0 до 100ms по индексу          |
| `'random'` / range | случайные задержки в диапазоне          |

**В проекте:** заменяет CSS `.stagger-grid > *:nth-child(n) { transition-delay }` там, где нужен **re-run при смене данных** (график, список недель).

**Источник:** `offline/pages/utilities/stagger/` · `time-staggering.md`, `values-staggering.md`

---

## 3. `createTimeline()` — оркестрация

**Суть:** единая временная шкала; `add()` ставит анимации/таймеры/callbacks в **позицию** на timeline.

| Position syntax | Значение                                |
| --------------- | --------------------------------------- |
| `500`           | абсолютно 500ms от начала               |
| `'+=200'`       | +200ms после предыдущего                |
| `'-=100'`       | overlap на 100ms                        |
| `'label'`       | на метку `timeline.label('label', pos)` |
| `0` (default)   | последовательно после предыдущего add   |

**Методы:**

```typescript
timeline.add(target, params, position);
timeline.add(timerParams, position);
timeline.call(fn, position);
timeline.label(name, position);
timeline.sync(otherTimeline, position);
```

**Алгоритм для Calculator (PeriodizationChart):**

1. `t=0` — fade phase chips (`stagger` по `.ta-period__phase-summary-item`)
2. `+=100` — `createDrawable` line: `draw: ['0 0', '0 1']`
3. `+=0` overlap — bars height `scaleY` или `translateY` + `stagger(60)`
4. on complete — idle (no loop)

**Источник:** `offline/pages/timeline/` · `add-animations.md`, `time-position.md`

---

## 4. `svg.createDrawable()` — отрисовка линии

**Суть:** Proxy на SVG path/line; свойство `draw` = два числа `[start, end]` в диапазоне **0–1** (доля длины path).

```
draw: '0 1'   → вся линия видима
draw: '0 0'   → скрыта
draw: '0 .5'  → первая половина
```

**Анимация:**

```typescript
import * as svg from 'animejs/svg';

const [line] = svg.createDrawable('.journal-chart-line');
animate(line, {
  draw: ['0 0', '0 1'],
  duration: 600,
  ease: 'out(3)',
});
```

**Заменяет:** CSS `@keyframes` stroke-dashoffset / `ta-period-line-draw` — один API для Journal и Calculator.

**Источник:** `offline/pages/svg/createdrawable.md`

---

## 5. `spring()` — физика easing

**Два режима:**

| Режим                    | Параметры                                  | Когда                                 |
| ------------------------ | ------------------------------------------ | ------------------------------------- |
| Perceived (SwiftUI-like) | `bounce`, `duration`                       | UI feedback: delta pulse, chip bounce |
| Physics                  | `stiffness`, `damping`, `mass`, `velocity` | Точная симуляция                      |

**Поведение:** `ease: spring({ bounce: 0.35, duration: 400 })` **переопределяет** `duration` tween — settling time считает spring.

**Perceived onComplete:** для синхронизации UI с «ощущаемым» концом — `spring({ bounce: 0.3, duration: 300, onComplete: fn })`.

**В проекте:** `.journal-chart-delta` при смене `delta` — короткий pulse, `bounce` 0.2–0.35 (Quiet UI, без overshoot).

**Источник:** `offline/pages/easings/spring.md`

---

## 6. `createScope()` — изоляция + revert

**Суть:** все `animate()` внутри `.add(setup)` привязаны к `root` ref; селектор `.foo` = только внутри root.

**Batch revert:** `scope.revert()` откатывает DOM (inline styles), отменяет animations, draggable, media query handlers.

**React lifecycle:**

```
mount  → createScope({ root }).add(setup)
deps   → revert (unmount effect) → re-add
unmount → revert()
```

**Проект:** `useAnimeScope(rootRef, setup, deps)` — канон.

**Media queries в scope:** `mediaQueries: { reduceMotion: '(prefers-reduced-motion)' }` — альтернатива нашему `useReducedMotion()` на уровне scope (можно комбинировать).

**Источник:** `offline/pages/scope/` · `scope-methods/revert.md`

---

## 7. `engine` — глобальные defaults

**Singleton Clock** — все animations синхронизированы по времени.

| Property                       | Проект           |
| ------------------------------ | ---------------- |
| `engine.defaults.duration`     | `400`            |
| `engine.defaults.ease`         | `'out(3)'`       |
| `engine.pauseOnDocumentHidden` | `true` (battery) |

**Источник:** `offline/pages/engine/` · `configureAppAnimeEngine.ts`

---

## 8. `createTimer()` — синхронный clock (вместо setTimeout/setInterval)

**Суть:** `Timer` — тот же **engine Clock**, что и `animate()` / `createTimeline()`. Каждый кадр движок тикает один раз; `onUpdate` вызывается с cap `frameRate`, не «сырым» `requestAnimationFrame` в обход анимаций.

| Концепт           | API / свойство                      | Алгоритм                                                                |
| ----------------- | ----------------------------------- | ----------------------------------------------------------------------- |
| Прогресс итерации | `progress`, `iterationProgress` 0→1 | `currentTime / duration` (с учётом `reversed`, `alternate`)             |
| Глобальное время  | `currentTime` (ms), read/write      | `seek(ms)` сдвигает; `stretch(newDuration)` масштабирует шкалу          |
| Между кадрами     | `deltaTime`                         | ms с прошлого onUpdate — для физики / velocity UI                       |
| Loop              | `loop: true \| number`, `loopDelay` | `onLoop` → `currentIteration`++; при `alternate` направление чередуется |
| Interval-like     | `loop: true` + `frameRate: 30`      | onUpdate не чаще 30fps, sync с pause engine / hidden tab                |
| One-shot delay    | `duration` + `onComplete`           | Эквивалент setTimeout, но пауза с `engine.pauseOnDocumentHidden`        |
| Orchestration     | `timeline.add(timerParams, pos)`    | inline timer на шкале timeline                                          |
| External timer    | `timeline.sync(timer, pos)`         | существующий `createTimer()` встраивается в timeline                    |
| Cleanup           | `timer.revert()`                    | отмена + сброс callbacks (React: в return `useEffect` / `scope.revert`) |

**Псевдокод кадра:**

```
engine.tick(delta)
  for each active Timer t:
    if t.paused or t.completed: skip
    advance t.currentTime by delta * t.speed
    if frame due per t.fps: t.onUpdate(t)  // self.currentTime, self.progress
    if t.currentTime >= t.duration: t.onLoop? / t.onComplete? / loop reset
```

**React:** не создавать timer при `useReducedMotion()`; тяжёлый setState в `onUpdate` — throttle или ref + rAF batch. Канон: `useAnimeScope` + `revert()` в cleanup.

**В проекте:** timer — когда delay/interval должен **паузиться вместе** с chart enter (`animate`) или timeline PeriodizationChart; простой UI delay без sync — React `setTimeout` допустим.

**Источник:** https://animejs.com/documentation/timer · `usage/timer.md` · `offline/pages/timer/` · `timeline/add-timers.md`

---

## 9. Что НЕ переносим (алгоритмически избыточно)

| Module                       | Причина                            |
| ---------------------------- | ---------------------------------- |
| `createDraggable`            | Нет drag UX                        |
| `createLayout` FLIP          | Split static                       |
| `splitText` / `scrambleText` | Quiet UI                           |
| `onScroll`                   | CSS + `useScrollReveal`            |
| `waapi.animate`              | Два стека; JS `animate` достаточно |
| `createAnimatable`           | Нет cursor-follow                  |

---

## Cross-ref

| Док                                                                       | Роль                            |
| ------------------------------------------------------------------------- | ------------------------------- |
| [USAGE-INDEX.md](./USAGE-INDEX.md)                                        | Дерево «нужно X → API»          |
| [usage/](./usage/README.md)                                               | Пошаговая структура каждого API |
| [IMPLEMENTATIONS.md](./IMPLEMENTATIONS.md)                                | Рецепты по экранам              |
| [PROJECT-MAPPING.md](./PROJECT-MAPPING.md)                                | module → component              |
| [animejs-react-integration-plan.md](../animejs-react-integration-plan.md) | фазы rollout                    |
