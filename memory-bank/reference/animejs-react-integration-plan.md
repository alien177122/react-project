# Anime.js × React — канон docs + план внедрения в проект

> **Источник (канон):** [Using with React | Getting started | Anime.js](https://animejs.com/documentation/getting-started/using-with-react)  
> **Дата:** 2026-05-31  
> **Статус:** план (не `/build`); пакет `animejs@^4.4.1` установлен; facade `src/lib/anime/`, hook `src/hooks/useAnimeScope.ts`; первый consumer — `JournalProgressChart` (stat enter).

Связанные документы: `animejs-getting-started.md`, `.cursor/skills/animejs/SKILL.md`, `.cursor/rules/animejs.mdc`, `journal-progress-chart-standard.md` § цвета.

---

## 1. Тезис docs (официальный)

> Anime.js can be used with React by combining React's `useEffect()` and Anime.js `createScope()` methods.

Паттерн: **`useEffect` + `createScope({ root })` + cleanup `revert()`**. Селекторы внутри scope ограничены DOM-поддеревом `ref={root}`.

---

## 2. Абсолютный каталог компонентов со страницы Using with React

Ниже — **все** импорты, API, refs, state, JSX-узлы, CSS-классы, параметры анимаций и lifecycle-вызовы **как на странице docs** (ничего не опущено).

### 2.1 Импорты — Anime.js (`'animejs'`)

| Export            | Роль на странице                                                   |
| ----------------- | ------------------------------------------------------------------ |
| `animate`         | Основная анимация `.logo` (scale loop + rotate по клику)           |
| `createScope`     | Создание scope, привязка к React `root` ref                        |
| `spring`          | Easing: `spring({ bounce: .7 })` в scale и `releaseEase` draggable |
| `createDraggable` | Drag `.logo` с spring на release                                   |

### 2.2 Импорты — React (`'react'`)

| Export      | Роль на странице                                        |
| ----------- | ------------------------------------------------------- |
| `useEffect` | Mount scope + animations; cleanup `revert()`            |
| `useRef`    | `root` — DOM-контейнер scope; `scope` — экземпляр Scope |
| `useState`  | `rotations` — счётчик для label кнопки                  |

### 2.3 Импорты — ассеты / стили

| Import      | Путь                   |
| ----------- | ---------------------- |
| `reactLogo` | `'./assets/react.svg'` |
| CSS         | `'./App.css'`          |

### 2.4 React-компонент (официальный пример)

| Идентификатор        | Тип                | Назначение                 |
| -------------------- | ------------------ | -------------------------- |
| `App`                | function component | Корневой компонент примера |
| `export default App` | default export     | Entry компонента           |

### 2.5 Refs (useRef)

| Ref     | Initial | Назначение                                                                 |
| ------- | ------- | -------------------------------------------------------------------------- |
| `root`  | `null`  | `<div ref={root}>` — корень scope; передаётся в `createScope({ root })`    |
| `scope` | `null`  | Хранит return value `createScope(...).add(...)` для `methods` и `revert()` |

### 2.6 State (useState)

| State          | Initial | Назначение                                        |
| -------------- | ------- | ------------------------------------------------- |
| `rotations`    | `0`     | Отображается в `button`: `rotations: {rotations}` |
| `setRotations` | —       | Обновление в `handleClick`                        |

### 2.7 useEffect — тело (mount)

| Шаг | Код / API                                                    | Детали                                                                  |
| --- | ------------------------------------------------------------ | ----------------------------------------------------------------------- |
| 1   | `scope.current = createScope({ root }).add(self => { ... })` | Scope на React ref `root`                                               |
| 2   | `animate('.logo', { scale: [...], loop, loopDelay })`        | Bounce loop                                                             |
| 3   | scale keyframe 1                                             | `{ to: 1.25, ease: 'inOut(3)', duration: 200 }`                         |
| 4   | scale keyframe 2                                             | `{ to: 1, ease: spring({ bounce: .7 }) }`                               |
| 5   | loop                                                         | `true`                                                                  |
| 6   | loopDelay                                                    | `250`                                                                   |
| 7   | `createDraggable('.logo', { container, releaseEase })`       | Draggable logo                                                          |
| 8   | container                                                    | `[0, 0, 0, 0]`                                                          |
| 9   | releaseEase                                                  | `spring({ bounce: .7 })`                                                |
| 10  | `self.add('rotateLogo', (i) => { ... })`                     | Метод scope для вызова снаружи effect                                   |
| 11  | rotateLogo body                                              | `animate('.logo', { rotate: i * 360, ease: 'out(4)', duration: 1500 })` |
| 12  | cleanup                                                      | `return () => scope.current.revert()`                                   |
| 13  | deps                                                         | `[]` (только mount)                                                     |

### 2.8 Обработчики вне useEffect

| Handler       | Поведение                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `handleClick` | `setRotations(prev => { const newRotations = prev + 1; scope.current.methods.rotateLogo(newRotations); return newRotations; })` |

### 2.9 Scope methods (runtime API со страницы)

| Path                                  | Вызов                            |
| ------------------------------------- | -------------------------------- |
| `scope.current.methods.rotateLogo(i)` | Из `handleClick` после increment |

### 2.10 JSX-дерево (все узлы и классы)

```
div                    ref={root}
  div.large.centered.row
    img.logo.react     src={reactLogo}  alt="React logo"
  div.medium.row
    fieldset.controls
      button           onClick={handleClick}  children: rotations: {rotations}
```

| CSS class (JSX) | Элемент        |
| --------------- | -------------- |
| `large`         | wrapper row    |
| `centered`      | wrapper row    |
| `row`           | wrapper row    |
| `logo`          | img            |
| `react`         | img (modifier) |
| `medium`        | controls row   |
| `controls`      | fieldset       |

### 2.11 CSS из примера (`App.css`)

```css
.logo.react {
  width: 150%;
  height: 150%;
}
```

### 2.12 Easing / параметры (сводная таблица)

| Контекст          | Параметр    | Значение                 |
| ----------------- | ----------- | ------------------------ |
| scale in          | ease        | `'inOut(3)'`             |
| scale in          | duration    | `200`                    |
| scale out         | ease        | `spring({ bounce: .7 })` |
| draggable release | releaseEase | `spring({ bounce: .7 })` |
| rotate            | ease        | `'out(4)'`               |
| rotate            | duration    | `1500`                   |
| rotate            | property    | `rotate: i * 360`        |

### 2.13 Соседние разделы (навигация страницы docs)

| Ссылка                | URL path                                               |
| --------------------- | ------------------------------------------------------ |
| Engine defaults       | `/documentation/engine/engine-defaults`                |
| Using with vanilla JS | `/documentation/getting-started/using-with-vanilla-js` |
| Imports               | `/documentation/getting-started/module-imports`        |

---

## 3. Маппинг официального примера → проект

| Docs                                                  | Проект (канон)                                                                     |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `import { animate, createScope, ... } from 'animejs'` | `import { animate, createScope, ... } from '../../lib/anime/index.ts'`             |
| `root` ref + `scope` ref + manual `useEffect`         | **`useAnimeScope(rootRef, setup, deps, options)`** — обёртка с `revert()`          |
| —                                                     | **`useReducedMotion()`** — guard (нет в официальном примере; обязателен в проекте) |
| `self.add('name', fn)`                                | Тот же API внутри callback `useAnimeScope`                                         |
| `scope.current.methods.name()`                        | `scopeRef.current?.methods.name()` из hook                                         |
| `configureAppAnimeEngine()`                           | `index.tsx` — engine defaults                                                      |
| framer-motion табы                                    | **Не заменять** без задачи                                                         |

---

## 4. План внедрения (phased rollout)

**Принцип:** anime.js — DOM/SVG/data-driven; framer-motion — React enter/exit табов и Theory hero.

### Фаза 0 — Foundation ✅ (done)

| #   | Задача                | Артеfact                                                | Статус |
| --- | --------------------- | ------------------------------------------------------- | ------ |
| 0.1 | `npm install animejs` | `package.json`                                          | ✅     |
| 0.2 | Facade subpaths       | `src/lib/anime/index.ts`                                | ✅     |
| 0.3 | Engine defaults       | `src/lib/anime/configureAppAnimeEngine.ts`, `index.tsx` | ✅     |
| 0.4 | React scope hook      | `src/hooks/useAnimeScope.ts`                            | ✅     |
| 0.5 | Тест                  | `tests/anime-lib.test.ts`                               | ✅     |
| 0.6 | Memory + skill + rule | `memory-bank/reference/`, `.cursor/skills/animejs/`     | ✅     |

### Фаза 1 — Journal (приоритет ★★★)

**Цель:** анимации привязаны к **данным** (смена exercise, новые sessions), цвета через CSS tokens.

| #   | Компонент проекта      | Anime API (из docs + module)            | Что анимировать                                                                       | Файлы                             |
| --- | ---------------------- | --------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------- |
| 1.1 | `JournalProgressChart` | `useAnimeScope` + `animate` + `stagger` | Перерисовка SVG: line `strokeDashoffset`, bars `scaleY` при `[exerciseKey, sessions]` | `JournalProgressChart.tsx`        |
| 1.2 | `JournalProgressChart` | `animate` + `spring({ bounce })`        | Pulse `.journal-chart-delta` при изменении `delta`                                    | same                              |
| 1.3 | `JournalProgressChart` | `animate` `translateX`                  | Tooltip `.ta-period__tip` follow `activeIndex`                                        | same                              |
| 1.4 | `JournalProgressChart` | ✅ частично                             | Stat cards enter — уже `stagger(80)`                                                  | same                              |
| 1.5 | `ExerciseWheel`        | `animate` scale                         | Pulse `.ew-trigger` при смене exercise                                                | `ExerciseWheel.tsx` + journal CSS |
| 1.6 | `JournalSessionList`   | `useAnimeScope` + `animate`             | Expand detail: `opacity` + `translateY` (без height)                                  | `JournalSessionList.tsx`          |

**Чеклист фазы 1:**

- [ ] `useAnimeScope` на `.journal-chart-shell` / `liveRef`
- [ ] deps: `exerciseKey`, `sessions.length`, `chart.journalLinePath`
- [ ] `prefers-reduced-motion` → skip (hook)
- [ ] iPhone 390px preview
- [ ] Не дублировать CSS `@keyframes ta-period-*` — либо anime, либо CSS (решить в 1.1)

### Фаза 2 — Calculator charts (★★★)

| #   | Компонент                 | Anime API                    | Что анимировать                              | Файлы                         |
| --- | ------------------------- | ---------------------------- | -------------------------------------------- | ----------------------------- |
| 2.1 | `PeriodizationChart`      | `createTimeline` + `stagger` | Phase strip → line draw → bars               | `PeriodizationChart.tsx`      |
| 2.2 | `ProgressionPreviewChart` | `animate` + timeline         | Redraw при смене `progressionPreset`         | `ProgressionPreviewChart.tsx` |
| 2.3 | Секция 02 progression     | `stagger`                    | Result chips / plates вместо фикс. CSS delay | `CalculatorTab.tsx`, parts    |

**Чеклист фазы 2:**

- [ ] Timeline после `handleCalculate` / появление `activeResult`
- [ ] Scope root = `.ta-period` section ref
- [ ] Сохранить `--ta-sec-01` / `--ta-sec-02` в CSS

### Фаза 3 — Polish (★★)

| #   | Компонент         | Anime API                                | Примечание                                                               |
| --- | ----------------- | ---------------------------------------- | ------------------------------------------------------------------------ |
| 3.1 | Shared chart hook | `usePeriodChartAnimation(rootRef, deps)` | DRY для Journal + Periodization                                          |
| 3.2 | `createDraggable` | —                                        | **Не планируется** (нет drag UX в продукте; есть в docs только как demo) |
| 3.3 | `splitText`       | `animejs/text`                           | **Отложено** (против Quiet UI)                                           |

### Фаза 4 — Не трогать (explicit exclude)

| Комponent                                         | Причина                        |
| ------------------------------------------------- | ------------------------------ |
| `TabPanel` / `AnimatePresence`                    | framer-motion exit enter канон |
| `HeroSection`, `TheoryChapterPanel`               | framer-motion variants         |
| `AuthScreen`                                      | framer-motion                  |
| `TabNav` + `useSlidingIndicator`                  | CSS transform достаточно       |
| `RevealSection`, `StaggerGrid`, `useScrollReveal` | CSS + IntersectionObserver     |
| Кнопки `:active` / hover                          | CSS micro                      |

---

## 5. Шаблон внедрения (по официальному React-паттерну)

```tsx
import {useRef} from 'react';
import {animate, createScope, stagger} from '../../lib/anime/index.ts';
import {useAnimeScope} from '../../hooks/useAnimeScope.ts';

export function ExampleChartBlock() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Эквивалент docs: useEffect + createScope({ root }).add(self => ...)
  useAnimeScope(
    rootRef,
    self => {
      animate('.target-line', {
        strokeDashoffset: [1, 0],
        duration: 900,
        ease: 'out(3)',
      });

      self.add('emphasizePoint', (index: number) => {
        animate(`.point-${index}`, {
          scale: [1, 1.25, 1],
          duration: 300,
          ease: 'out(3)',
        });
      });
    },
    [dataRevision],
  );

  return <div ref={rootRef}>{/* scoped selectors only inside rootRef */}</div>;
}
```

**Cleanup:** `useAnimeScope` вызывает `scope.revert()` — как `return () => scope.current.revert()` в docs.

---

## 6. Критерии готовности (Stop Criteria) по фазам

| Фаза | Done when                                                                             |
| ---- | ------------------------------------------------------------------------------------- |
| 1    | Journal chart re-animates on exercise change; typecheck + tests pass; iPhone 390px OK |
| 2    | Calculator chart timeline on calculate; preview on preset change                      |
| 3    | Shared hook; docs updated in `progress.md`                                            |

---

## 7. Риски

| Риск                           | Митигация                                                     |
| ------------------------------ | ------------------------------------------------------------- |
| Двойная анимация CSS + anime   | Убрать `@keyframes ta-period-*` там, где anime берёт enter    |
| Loop как в docs (`loop: true`) | **Запрещено** в продукте (Quiet UI); только functional motion |
| `createDraggable` из примера   | Не использовать в training app                                |
| StrictMode double mount        | `revert()` в cleanup hook (как docs)                          |

---

## 8. Следующая команда Memory Bank

```
/plan  → детализировать фазу 1 в tasks.md
/build → JournalProgressChart redraw (1.1–1.3)
```
