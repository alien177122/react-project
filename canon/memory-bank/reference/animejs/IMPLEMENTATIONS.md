# Anime.js v4 — реализации для Training Calculator

> **Приоритетный банк:** готовые способы анимации под наш код — не ссылка на docs, а **что писать в `src/`**.  
> **Алгоритмы:** [ALGORITHMS.md](./ALGORITHMS.md) · **Как реализовать API:** [USAGE-INDEX.md](./USAGE-INDEX.md) → [usage/](./usage/README.md)

**Стек проекта:** `src/lib/anime/` · `useAnimeScope` · `configureAppAnimeEngine()` · `useReducedMotion()`

---

## Статус внедрения

| ID  | Рецепт                         | Компонент                      | Статус      |
| --- | ------------------------------ | ------------------------------ | ----------- |
| R0  | Engine defaults                | `index.tsx`                    | ✅          |
| R1  | Stat cards enter + stagger     | `JournalProgressChart`         | ✅          |
| R2  | Chart redraw on data change    | `JournalProgressChart`         | 🔲 фаза 1.1 |
| R3  | Delta spring pulse             | `JournalProgressChart`         | 🔲 фаза 1.2 |
| R4  | Tooltip translateX follow      | `JournalProgressChart`         | 🔲 фаза 1.3 |
| R5  | SVG line draw                  | Journal + `PeriodizationChart` | 🔲          |
| R6  | Timeline: phases → line → bars | `PeriodizationChart`           | 🔲 фаза 2.1 |
| R7  | Preset switch redraw           | `ProgressionPreviewChart`      | 🔲 фаза 2.2 |
| R8  | Result chips stagger           | Calculator sec 02              | 🔲 фаза 2.3 |
| R9  | Session list expand            | `JournalSessionList`           | 🔲 фаза 1.6 |

---

## R0 — Engine (один раз)

**Файл:** `src/lib/anime/configureAppAnimeEngine.ts` · вызов из `index.tsx`

```typescript
engine.pauseOnDocumentHidden = true;
engine.defaults.duration = 400;
engine.defaults.ease = 'out(3)';
```

---

## R1 — Stagger enter (реализовано)

**Файл:** `JournalProgressChart.tsx`  
**Триггер deps:** `[sessions.length, chart.latestPeak, delta]`

```typescript
useAnimeScope(
  liveRef,
  () => {
    animate('.journal-chart-stat', {
      opacity: [{from: 0, to: 1}],
      translateY: [{from: 8, to: 0}],
      duration: 400,
      delay: stagger(80),
      ease: 'out(3)',
    });
  },
  [sessions.length, chart.latestPeak, delta],
  {disabled: sessions.length === 0},
);
```

**Правила:** только opacity + translateY; stagger 80ms; без loop.

---

## R2 — Redraw line + bars при смене упражнения/данных

**Цель:** при смене `exerciseKey` / `sessions` — не CSS keyframes, а controlled replay.

```typescript
import {animate, stagger} from '../../lib/anime/index.ts';
import * as svg from 'animejs/svg';

useAnimeScope(
  chartRef,
  scope => {
    const [line] = svg.createDrawable('.journal-chart-line');
    const bars = scope.root.querySelectorAll('.journal-chart-bar');

    // Reset instant (avoid flash)
    if (line) animate(line, {draw: '0 0', duration: 0});
    animate(bars, {opacity: 0, translateY: 8, duration: 0});

    const tl = createTimeline({defaults: {ease: 'out(3)'}});

    tl.add(line, {draw: ['0 0', '0 1'], duration: 500}, 0);
    tl.add(
      bars,
      {
        opacity: [{from: 0, to: 1}],
        translateY: [{from: 8, to: 0}],
        duration: 350,
        delay: stagger(50),
      },
      200,
    );
  },
  [exerciseKey, sessionsSignature],
);
```

**Добавить в facade:** `export {createTimeline} from 'animejs/timeline'` (уже есть) + `export * as svg from 'animejs/svg'`.

**Убрать:** дублирующие `@keyframes ta-period-*` для journal (фаза 1.4).

---

## R3 — Delta pulse (spring)

**Триггер:** изменение `delta` (число кг за 4 нед).

```typescript
import {animate, spring} from '../../lib/anime/index.ts';

useAnimeScope(
  deltaRef,
  () => {
    animate('.journal-chart-delta', {
      scale: [{to: 1.06}, {to: 1}],
      ease: spring({bounce: 0.25, duration: 350}),
    });
  },
  [delta],
  {disabled: delta == null},
);
```

**Quiet UI:** `bounce` ≤ 0.35; один shot, без loop.

---

## R4 — Tooltip follow activeIndex

**Суть:** `translateX` на `.journal-chart-tip` к вычисленному `tipX` (уже есть в render).

```typescript
useAnimeScope(
  chartRef,
  () => {
    // tipX from closure or data attribute on root
    animate('.journal-chart-tip', {
      translateX: tipX,
      duration: 220,
      ease: 'out(3)',
    });
  },
  [activeIndex, tipX],
  {disabled: activeIndex == null},
);
```

**a11y:** не анимировать при keyboard-only focus без pointer; `prefers-reduced-motion` → skip (hook).

---

## R5 — SVG line draw (shared Journal + Calculator)

**Targets:** `.ta-period__line` / `.journal-chart-line` (path в SVG).

```typescript
import * as svg from 'animejs/svg';
import {animate} from '../../lib/anime/index.ts';

const [drawable] = svg.createDrawable('path.ta-period__line');
animate(drawable, {
  draw: ['0 0', '0 1'],
  duration: 600,
  ease: 'out(3)',
});
```

**DOM:** path должен существовать до `createDrawable`; в React — после layout, внутри `useAnimeScope` deps когда `linePath` готов.

---

## R6 — Calculator timeline (PeriodizationChart)

**Последовательность:**

```typescript
import {createTimeline, animate, stagger} from '../../lib/anime/index.ts';
import * as svg from 'animejs/svg';

useAnimeScope(sectionRef, () => {
  const [line] = svg.createDrawable('.ta-period__line');
  const tl = createTimeline();

  tl.add('.ta-period__phase-summary-item', {
    opacity: [{from: 0, to: 1}],
    translateY: [{from: 6, to: 0}],
    duration: 300,
    delay: stagger(60),
  });

  tl.add(line, {draw: ['0 0', '0 1'], duration: 550}, '+=80');

  tl.add(
    '.ta-period__bar',
    {
      scaleY: [{from: 0, to: 1}],
      duration: 400,
      delay: stagger(45),
      ease: 'out(3)',
    },
    '-=200',
  );

  return () => tl.revert?.(); // scope.revert() covers all
}, [config.id, result.updatedAt]);
```

**CSS:** `transform-origin: bottom` на bars; цвета — только CSS tokens.

---

## R7 — ProgressionPreviewChart preset switch

**Триггер:** смена preset / week selection.

```typescript
animate('.progression-preview-bar', {
  scaleY: [{from: 0.6, to: 1}],
  opacity: [{from: 0.5, to: 1}],
  duration: 350,
  delay: stagger(40),
  ease: 'out(3)',
});
```

Deps: `[presetId, activeWeekIndex]`.

---

## R8 — Calculator result chips / plates

**Замена:** фиксированные CSS `transition-delay` на sec 02.

```typescript
animate('.calc-result-chip', {
  opacity: [{from: 0, to: 1}],
  translateY: [{from: 6, to: 0}],
  delay: stagger(50, {from: 'first'}),
  duration: 300,
});
```

---

## R9 — JournalSessionList expand

```typescript
animate('.journal-session-detail', {
  opacity: [{from: 0, to: 1}],
  translateY: [{from: 8, to: 0}],
  duration: 280,
  ease: 'out(3)',
});
```

Один элемент за раз; без height animation (reflow).

---

## Facade — расширение для фаз 1–2

**Файл:** `src/lib/anime/index.ts` — добавить при `/build`:

```typescript
export * as svg from 'animejs/svg';
// createTimeline, stagger, spring — уже экспортированы
```

---

## React checklist (каждый рецепт)

1. `const rootRef = useRef<HTMLDivElement>(null)` на контейнере секции
2. `useAnimeScope(rootRef, setup, deps, { disabled })`
3. `useReducedMotion()` — внутри hook (skip scope)
4. Селекторы — классы внутри root, не глобальный `document`
5. Animate **transform + opacity** (+ SVG `draw`); цвета в CSS
6. `deps` = данные, при смене которых нужен replay
7. iPhone 390px — без overflow; touch targets 44px

---

## Исключения (оставить как есть)

| Область                     | Stack                       |
| --------------------------- | --------------------------- |
| TabPanel, Theory hero, Auth | framer-motion               |
| TabNav indicator            | CSS + `useSlidingIndicator` |
| Scroll reveal               | CSS + `useScrollReveal`     |
| Draggable, splitText        | не в продукте               |

---

## Источники в offline mirror

| Рецепт | Slug                                         |
| ------ | -------------------------------------------- |
| R1–R2  | `animation/`, `utilities/stagger`            |
| R3     | `easings/spring`                             |
| R5–R6  | `svg/createdrawable`, `timeline/`            |
| Scope  | `scope/`, `getting-started/using-with-react` |

Полный crawl: `npm run docs:animejs:verify`
