# Timeline — как реализовать (`createTimeline`)

> **Когда:** несколько анимаций/timers/callbacks **в одной временной шкале** (phases → line → bars).  
> **Не когда:** одна простая анимация → `animate()` достаточно.  
> **Offline:** `offline/pages/timeline/`

---

## 1. Import

```typescript
import {createTimeline} from 'animejs/timeline';
```

---

## 2. Create (factory)

```typescript
const timeline = createTimeline(parameters);
```

| Param        | Тип          | Роль                                                                 |
| ------------ | ------------ | -------------------------------------------------------------------- |
| `parameters` | Object (opt) | playback settings + timeline callbacks + **`defaults`** для children |

**Returns:** `Timeline`

---

## 3. Добавление children (4 типа)

| Тип           | API      | Сигнатура                                                  |
| ------------- | -------- | ---------------------------------------------------------- |
| **Animation** | `add()`  | `timeline.add(targets, animationParams, position?)`        |
| **Timer**     | `add()`  | `timeline.add(timerParams, position?)`                     |
| **Callback**  | `call()` | `timeline.call(fn, position?)`                             |
| **Existing**  | `sync()` | `timeline.sync(animation \| timer \| timeline, position?)` |

**Labels:**

```typescript
timeline.label('start', 0);
timeline.add(target, params, 'start');
```

---

## 4. Time position (3-й аргумент)

| Type        | Example       | Effect                   |
| ----------- | ------------- | ------------------------ |
| Absolute    | `500`         | 500ms от начала timeline |
| Addition    | `'+=100'`     | +100ms после предыдущего |
| Subtraction | `'-=100'`     | overlap 100ms            |
| Multiplier  | `'*=.5'`      | половина duration prev   |
| Prev end    | `'<'`         | конец предыдущего        |
| Prev start  | `'<<'`        | начало предыдущего       |
| Combined    | `'<<+=250'`   | 250ms после start prev   |
| Label       | `'My Label'`  | на метку                 |
| Stagger     | `stagger(10)` | stagger позиций          |

Default (без position): **в конец** timeline.

---

## 5. Playback settings (timeline-level)

| Setting                                      | Роль                                        |
| -------------------------------------------- | ------------------------------------------- |
| `delay`, `duration`                          | Общая шкала (редко override children)       |
| `loop`, `loopDelay`, `alternate`, `reversed` | Loop всего timeline                         |
| `autoplay`                                   | Auto start                                  |
| `playbackRate`, `playbackEase`               | Скорость/ease всей шкалы                    |
| `frameRate`                                  | Cap FPS                                     |
| **`defaults`**                               | `{ duration, ease, ... }` для всех `.add()` |

```typescript
createTimeline({
  defaults: {ease: 'out(3)', duration: 400},
});
```

---

## 6. Timeline callbacks

| Callback     | Когда         |
| ------------ | ------------- |
| `onBegin`    | Старт         |
| `onUpdate`   | Каждый frame  |
| `onComplete` | Конец         |
| `onLoop`     | Loop          |
| `onPause`    | Пауза         |
| `then`       | Promise chain |

---

## 7. Methods (на instance)

| Method                                         | Когда                                            |
| ---------------------------------------------- | ------------------------------------------------ |
| `add(...)`                                     | Добавить animation/timer                         |
| `call(fn, pos?)`                               | Callback на позиции                              |
| `sync(instance, pos?)`                         | Подключить существующий animation/timer/timeline |
| `label(name, pos?)`                            | Метка                                            |
| `set(params)`                                  | Обновить playback settings                       |
| `play()` / `pause()` / `restart()` / `reset()` | Transport                                        |
| `resume()` / `reverse()` / `alternate()`       | Direction                                        |
| `seek(ms)`                                     | Scrub                                            |
| `stretch(ms)`                                  | Retime                                           |
| `complete()` / `cancel()`                      | Force end                                        |
| `remove(target?)`                              | Удалить child                                    |
| `init()`                                       | Re-init children                                 |
| `refresh()`                                    | После DOM change                                 |
| **`revert()`**                                 | **Cleanup batch**                                |

---

## 8. Properties

`currentTime`, `progress`, `duration`, `paused`, `completed`, … — аналогично Animation/Timer.

---

## 9. React — шаги реализации

1. `useAnimeScope(rootRef, () => { ... }, [dataDeps])`
2. В setup:

```typescript
const tl = createTimeline({defaults: {ease: 'out(3)'}});
tl.add('.phase', {opacity: [0, 1], delay: stagger(60)})
  .add(line, {draw: ['0 0', '0 1'], duration: 550}, '+=80')
  .add('.bar', {scaleY: [0, 1], delay: stagger(45)}, '-=200');
```

3. Cleanup: **`scope.revert()`** (revert timeline + все children)
4. Replay: deps change → effect re-run → новый timeline
5. Не хранить timeline в React state

---

## 10. Канон: Calculator PeriodizationChart

```typescript
import {createTimeline, animate, stagger} from 'animejs';
import * as svg from 'animejs/svg';

useAnimeScope(sectionRef, () => {
  const [line] = svg.createDrawable('.ta-period__line');
  createTimeline({defaults: {duration: 400, ease: 'out(3)'}})
    .add('.ta-period__phase-summary-item', {
      opacity: [{from: 0, to: 1}],
      translateY: [{from: 6, to: 0}],
      delay: stagger(60),
    })
    .add(line, {draw: ['0 0', '0 1'], duration: 550}, '+=80')
    .add(
      '.ta-period__bar',
      {
        scaleY: [{from: 0, to: 1}],
        delay: stagger(45),
      },
      '-=200',
    );
}, [config.id, result.updatedAt]);
```

→ [IMPLEMENTATIONS.md R6](../IMPLEMENTATIONS.md)

---

## Offline pages

`timeline/index.md` · `add-animations.md` · `add-timers.md` · `call-functions.md` · `time-position.md` · `timeline-methods/*` · `timeline-playback-settings/*`
