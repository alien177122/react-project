# Anime.js v4 — Getting started (канон для агента)

> **Полный банк docs (410 страниц):** [`animejs/README.md`](./animejs/README.md) · sitemap [`animejs/SITEMAP.md`](./animejs/SITEMAP.md)  
> **Версия API:** v4 (ESM-first, modular). v3 `anime()` **не использовать** — см. § Migration.  
> **Статус в проекте:** `animejs@^4.4.1` установлен; facade `src/lib/anime/`, hook `src/hooks/useAnimeScope.ts`, первое использование — `JournalProgressChart`. framer-motion остаётся основным для React UI.

---

## Когда применять (WHEN)

| Триггер                                                        | Действие                                                            |
| -------------------------------------------------------------- | ------------------------------------------------------------------- |
| Пользователь просит anime.js / animejs                         | Прочитать этот doc + `.cursor/skills/animejs/SKILL.md`              |
| DOM-анимация вне React tree (SVG path, canvas, vanilla widget) | Anime.js + subpath imports                                          |
| React-компонент с anime.js                                     | `createScope` + `useEffect` cleanup (§ React)                       |
| Любая анимация в проекте                                       | **MUST** `useReducedMotion()` — не запускать `animate` при `reduce` |

**Не заменять** существующий framer-motion в `TabPanel`, Theory, hero без задачи на миграцию.

---

## Установка

```sh
npm install animejs
```

### Bundler (Vite — наш стек)

```typescript
import {animate} from 'animejs';
```

CommonJS: `const { animate } = require('animejs')`

### CDN (ESM)

| CDN          | URL                                         |
| ------------ | ------------------------------------------- |
| esm.sh       | `https://esm.sh/animejs`                    |
| JsDelivr ESM | `https://cdn.jsdelivr.net/npm/animejs/+esm` |

```javascript
import {animate} from 'https://esm.sh/animejs';
```

### CDN (UMD global)

```html
<script src="https://cdn.jsdelivr.net/npm/animejs/dist/bundles/anime.umd.min.js"></script>
<script>
  const {animate} = anime;
</script>
```

### Прямая загрузка (GitHub)

| Файл                            | Тип             |
| ------------------------------- | --------------- |
| `dist/modules/index.js`         | ESM entry       |
| `dist/modules/index.cjs`        | CJS entry       |
| `dist/bundles/anime.esm.js`     | Bundled ESM     |
| `dist/bundles/anime.esm.min.js` | Bundled ESM min |
| `dist/bundles/anime.umd.js`     | UMD             |
| `dist/bundles/anime.umd.min.js` | UMD min         |

---

## Импорты (tree shaking)

### Из главного модуля

```typescript
import {animate, splitText, stagger, random, globals} from 'animejs';

const split = splitText('p');
animate(split.words, {
  opacity: () => random(0, 1, 2),
  delay: stagger(50),
});
```

### Subpaths (только нужные модули)

```typescript
import {animate} from 'animejs/animation';
import {splitText} from 'animejs/text';
import {stagger, random} from 'animejs/utils';
import {createScope} from 'animejs/scope';
import {createDraggable} from 'animejs/draggable';
import {createTimeline} from 'animejs/timeline';
import {createTimer} from 'animejs/timer';
import {createAnimatable} from 'animejs/animatable';
import {createLayout} from 'animejs/layout';
import {engine} from 'animejs/engine';
import * as events from 'animejs/events';
import * as easings from 'animejs/easings';
import * as utils from 'animejs/utils';
import * as svg from 'animejs/svg';
import * as text from 'animejs/text';
import * as waapi from 'animejs/waapi';
```

### Import map (без bundler)

```html
<script type="importmap">
  {
    "imports": {
      "animejs": "/node_modules/animejs/dist/modules/index.js",
      "animejs/animation": "/node_modules/animejs/dist/modules/animation/index.js",
      "animejs/timer": "/node_modules/animejs/dist/modules/timer/index.js",
      "animejs/timeline": "/node_modules/animejs/dist/modules/timeline/index.js",
      "animejs/animatable": "/node_modules/animejs/dist/modules/animatable/index.js",
      "animejs/draggable": "/node_modules/animejs/dist/modules/draggable/index.js",
      "animejs/layout": "/node_modules/animejs/dist/modules/layout/index.js",
      "animejs/scope": "/node_modules/animejs/dist/modules/scope/index.js",
      "animejs/engine": "/node_modules/animejs/dist/modules/engine/index.js",
      "animejs/events": "/node_modules/animejs/dist/modules/events/index.js",
      "animejs/easings": "/node_modules/animejs/dist/modules/easings/index.js",
      "animejs/utils": "/node_modules/animejs/dist/modules/utils/index.js",
      "animejs/svg": "/node_modules/animejs/dist/modules/svg/index.js",
      "animejs/text": "/node_modules/animejs/dist/modules/text/index.js",
      "animejs/waapi": "/node_modules/animejs/dist/modules/waapi/index.js"
    }
  }
</script>
```

---

## Vanilla JS (базовый паттерн)

```typescript
import {animate, utils, createDraggable, spring} from 'animejs';

const [$logo] = utils.$('.logo.js');
const [$button] = utils.$('button');
let rotations = 0;

animate('.logo.js', {
  scale: [
    {to: 1.25, ease: 'inOut(3)', duration: 200},
    {to: 1, ease: spring({bounce: 0.7})},
  ],
  loop: true,
  loopDelay: 250,
});

createDraggable('.logo.js', {
  container: [0, 0, 0, 0],
  releaseEase: spring({bounce: 0.7}),
});

const rotateLogo = () => {
  rotations++;
  $button.innerText = `rotations: ${rotations}`;
  animate($logo, {
    rotate: rotations * 360,
    ease: 'out(4)',
    duration: 1500,
  });
};

$button.addEventListener('click', rotateLogo);
```

**Ключевые API:** `animate(targets, params)`, `utils.$(selector)`, `spring({ bounce })`, `createDraggable`.

---

## React (обязательный паттерн)

> **Полный каталог API/JSX со страницы docs + phased rollout:** `memory-bank/reference/animejs-react-integration-plan.md`

Anime.js + React = **`useEffect` + `createScope` + cleanup `revert()`**.

```tsx
import {animate, createScope, spring, createDraggable} from 'animejs';
import {useEffect, useRef, useState} from 'react';

function AnimatedBlock() {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const [rotations, setRotations] = useState(0);

  useEffect(() => {
    if (!root.current) return;

    scope.current = createScope({root}).add(self => {
      // Все селекторы scoped к root
      animate('.logo', {
        scale: [
          {to: 1.25, ease: 'inOut(3)', duration: 200},
          {to: 1, ease: spring({bounce: 0.7})},
        ],
        loop: true,
        loopDelay: 250,
      });

      createDraggable('.logo', {
        container: [0, 0, 0, 0],
        releaseEase: spring({bounce: 0.7}),
      });

      self.add('rotateLogo', (i: number) => {
        animate('.logo', {
          rotate: i * 360,
          ease: 'out(4)',
          duration: 1500,
        });
      });
    });

    return () => scope.current?.revert();
  }, []);

  const handleClick = () => {
    setRotations(prev => {
      const next = prev + 1;
      scope.current?.methods.rotateLogo(next);
      return next;
    });
  };

  return (
    <div ref={root}>
      <img src="/logo.svg" className="logo" alt="" />
      <button type="button" onClick={handleClick}>
        rotations: {rotations}
      </button>
    </div>
  );
}
```

### React checklist

- [ ] `root` ref на контейнер scope
- [ ] `createScope({ root })` внутри `useEffect`
- [ ] Cleanup: `return () => scope.current?.revert()`
- [ ] Методы наружу — через `self.add('name', fn)` → `scope.current.methods.name()`
- [ ] `useReducedMotion()` — при `true` не вызывать `animate` / `createDraggable`
- [ ] Анимируй **transform и opacity** (см. `CLAUDE.md` § Motion)

---

## Engine (глобальные настройки)

```typescript
import {engine} from 'animejs';

// Defaults для всех Timer / Animation / Timeline
engine.defaults.duration = 500;
```

### Свойства engine

| Свойство                | Описание                           |
| ----------------------- | ---------------------------------- |
| `timeUnit`              | `'ms'` \| `'s'` для duration/delay |
| `currentTime`           | Текущее время движка               |
| `deltaTime`             | Δ с прошлого кадра                 |
| `precision`             | Округление строковых значений      |
| `speed`                 | Глобальный playback rate           |
| `fps`                   | Глобальный frame rate              |
| `useDefaultMainLoop`    | Свой rAF loop                      |
| `pauseOnDocumentHidden` | Пауза при скрытой вкладке          |

### Defaults (на `engine.defaults`)

| Свойство                                                             | Тип                |
| -------------------------------------------------------------------- | ------------------ |
| `playbackEase`                                                       | string \| function |
| `playbackRate`                                                       | number             |
| `frameRate`                                                          | number             |
| `loop`                                                               | number \| boolean  |
| `reversed`                                                           | boolean            |
| `alternate`                                                          | boolean            |
| `autoplay`                                                           | boolean            |
| `duration`                                                           | number \| function |
| `delay`                                                              | number \| function |
| `composition`                                                        | string \| function |
| `ease`                                                               | string \| function |
| `loopDelay`                                                          | number             |
| `modifier`                                                           | function           |
| `onBegin`, `onUpdate`, `onRender`, `onLoop`, `onComplete`, `onPause` | callbacks          |

---

## v3 → v4 (краткая миграция)

| v3                               | v4                                           |
| -------------------------------- | -------------------------------------------- |
| `import anime from 'animejs'`    | `import { animate } from 'animejs'`          |
| `anime({ targets: 'div', ... })` | `animate('div', { ... })`                    |
| `easing: 'easeOutExpo'`          | `ease: 'outExpo'`                            |
| `easing: 'spring(...)'`          | `ease: spring({ ... })` или `createSpring()` |
| `direction: 'reverse'`           | `reversed: true`                             |
| `direction: 'alternate'`         | `alternate: true`                            |
| `loop: 1` (один цикл)            | `loop: 0`                                    |
| `begin`, `update`, `complete`    | `onBegin`, `onUpdate`, `onComplete`          |
| `change`                         | `onRender`                                   |
| `animation.finished`             | `animation.then()`                           |
| `round: 100`                     | `modifier: utils.round(2)`                   |

Полный migration guide: [GitHub v4 migration](https://github.com/juliangarnier/anime/wiki/Migrating-from-v3-to-v4).

---

## Интеграция с проектом Training Calculator

| Правило проекта           | Применение с Anime.js                                 |
| ------------------------- | ----------------------------------------------------- |
| `useReducedMotion()`      | Guard перед любым `animate`                           |
| `CLAUDE.md` Motion        | transform/opacity; 150–600ms; без width/height/margin |
| `src/theme/animations.ts` | Тайминги framer-motion — ориентир для duration/ease   |
| iPhone web                | Проверка 390px после UI-анимаций                      |
| Quiet UI                  | Без декоративных loop без функции                     |

### JournalTab — цвета для анимаций

Эталон: `journal-progress-chart-standard.md` § «Цветовая гамма».

| Контекст                     | CSS token                        | Hex                   |
| ---------------------------- | -------------------------------- | --------------------- |
| Shell UI, дельта «+N кг»     | `--accent`                       | `#ff6b35`             |
| e1RM line/points, active tab | `--ta-calc-accent`               | `#ff9f40`             |
| Volume bars                  | `--ta-sec-02`                    | `#5ba4ff`             |
| Surfaces                     | `--surface` / `--surface-raised` | `#141415` / `#1d1d1d` |

**Правило:** anime.js — transform/opacity; **цвет в CSS** через tokens, не raw hex в `animate()`.

---

## Связанные инструменты агента

| Инструмент       | Путь                              |
| ---------------- | --------------------------------- |
| Skill            | `.cursor/skills/animejs/SKILL.md` |
| Rule             | `.cursor/rules/animejs.mdc`       |
| Официальная docs | https://animejs.com/documentation |
