# Timer — как реализовать (`createTimer`)

> **Когда:** нужен `setTimeout` / `setInterval`, но **синхронно с engine** и другими анимациями.  
> **Не когда:** достаточно React `useEffect` + timeout для одноразового UI (без sync) — см. проект exclude.  
> **Алгоритм (engine tick, loop, sync):** [ALGORITHMS.md §8](../ALGORITHMS.md#8-createtimer--синхронный-clock-вместо-settimeoutsetinterval)  
> **Offline (32 стр.):** `offline/pages/timer/` · manifest order 320–351  
> **Как смотреть всю структуру банка:** [HOW-TO-TRACK.md](../HOW-TO-TRACK.md)

---

## 1. Import

```typescript
import {createTimer} from 'animejs/timer';
// или
import {createTimer} from 'animejs';
```

---

## 2. Create (factory)

```typescript
const timer = createTimer(parameters);
```

| Param        | Тип                 | Роль                          |
| ------------ | ------------------- | ----------------------------- |
| `parameters` | `Object` (optional) | playback settings + callbacks |

**Returns:** `Timer` instance

---

## 3. Playback settings (в parameters)

| Setting        | Тип               | Назначение                 |
| -------------- | ----------------- | -------------------------- |
| `duration`     | ms                | Длина одной итерации       |
| `delay`        | ms                | Задержка перед стартом     |
| `loop`         | boolean \| number | Повтор (`true` = ∞)        |
| `loopDelay`    | ms                | Пауза между loop           |
| `alternate`    | boolean           | ping-pong                  |
| `reversed`     | boolean           | С конца                    |
| `autoplay`     | boolean           | Старт сразу (default true) |
| `frameRate`    | number            | Cap FPS (напр. `30`)       |
| `playbackRate` | number            | Скорость множитель         |

---

## 4. Callbacks (в parameters)

| Callback     | Когда вызывается                                       |
| ------------ | ------------------------------------------------------ |
| `onBegin`    | Старт timer                                            |
| `onUpdate`   | Каждый frame — **`self.currentTime`**, `self.progress` |
| `onLoop`     | Каждый loop — **`self._currentIteration`**             |
| `onPause`    | Пауза                                                  |
| `onComplete` | Конец (если не loop)                                   |
| `then`       | Promise-style chain                                    |

```typescript
createTimer({
  duration: 1000,
  loop: true,
  frameRate: 30,
  onUpdate: self => {
    // self.currentTime — ms
    // self.progress — 0..1
  },
  onLoop: self => {
    // self._currentIteration
  },
});
```

---

## 5. Methods (на instance)

| Method                | Когда вызывать                 |
| --------------------- | ------------------------------ |
| `play()`              | Старт / resume после pause     |
| `pause()`             | Пауза                          |
| `restart()`           | С начала                       |
| `reset()`             | Сброс time без play            |
| `resume()`            | После pause                    |
| `reverse()`           | Обратное направление           |
| `alternate()`         | Toggle alternate               |
| `seek(timeMs)`        | Перейти на время               |
| `stretch(durationMs)` | Растянуть/сжать timeline timer |
| `complete()`          | Форс complete                  |
| `cancel()`            | Отмена                         |
| **`revert()`**        | **Cleanup** — откат + отмена   |

---

## 6. Properties (read/write)

| Property                                   | Описание        |
| ------------------------------------------ | --------------- |
| `currentTime`                              | ms              |
| `progress`                                 | 0–1             |
| `duration`                                 | ms              |
| `currentIteration`                         | номер loop      |
| `iterationProgress`                        | 0–1 внутри loop |
| `paused`, `completed`, `began`, `reversed` | flags           |
| `speed`                                    | playbackRate    |
| `fps`                                      | frameRate       |

---

## 7. Compose с Timeline

**Создать timer на timeline:**

```typescript
timeline.add(
  {
    duration: 500,
    onUpdate: self => {
      /* ... */
    },
  },
  position, // см. timeline/time-position
);
```

**Sync существующий timer:**

```typescript
const timer1 = createTimer({ duration: 1500, onUpdate: ... });
const tl = createTimeline()
  .sync(timer1)
  .add({ duration: 500, onUpdate: ... });
```

→ [timeline.md](./timeline.md)

---

## 8. React — шаги реализации

1. `const rootRef = useRef<HTMLDivElement>(null)`
2. `useAnimeScope(rootRef, () => { const t = createTimer({...}); return () => t.revert(); }, deps)`
3. Или хранить timer в scope setup; cleanup через **`scope.revert()`**
4. **`useReducedMotion()`** — не создавать timer
5. Для UI clock: `onUpdate` → setState **throttle** или ref (не каждый frame в тяжёлый render без нужды)

---

## 9. Канонические сниппеты

**One-shot delay (вместо setTimeout):**

```typescript
createTimer({
  duration: 2000,
  onComplete: () => doSomething(),
});
```

**Interval-like (30fps):**

```typescript
createTimer({
  duration: 1000,
  loop: true,
  frameRate: 30,
  onUpdate: self => updateUI(self.currentTime),
});
```

**Внутри timeline после анимации:**

```typescript
createTimeline()
  .add('.el', {opacity: [0, 1], duration: 400})
  .add({duration: 300, onComplete: () => showHint()}, '+=100');
```

---

## 10. В проекте Training Calculator

| Сценарий                       | Рекомендация                                              |
| ------------------------------ | --------------------------------------------------------- |
| Debounce перед redraw chart    | `createTimer` в scope или `timeline.add`                  |
| Countdown rest между подходами | `createTimer` + `onUpdate` (если будет training timer UI) |
| Простой delay в React          | React state достаточно; timer — если sync с `animate()`   |

---

## Offline pages

`timer/index.md` · `timer-playback-settings/*` · `timer-callbacks/*` · `timer-methods/*` · `timer-properties.md` · `timeline/add-timers.md`
