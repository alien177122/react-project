# Anime.js v4 — Documentation Memory Bank

> **Canonical source:** https://animejs.com/documentation  
> **Indexed:** 410 pages (2026-05-31 crawl)  
> **Package in project:** `animejs@^4.4.1` · facade `src/lib/anime/` · hook `src/hooks/useAnimeScope.ts`

## Project docs (this repo)

| Doc                                                                       | Purpose                                                             |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **[HOW-TO-TRACK.md](./HOW-TO-TRACK.md)**                                  | **Как смотреть структуру:** agentmemory (primary) + usage + offline |
| **[USAGE-INDEX.md](./USAGE-INDEX.md)**                                    | **Главный:** нужно X → API → `usage/<module>.md`                    |
| **[usage/](./usage/README.md)**                                           | **Структура:** factory → settings → callbacks → methods → React     |
| **[IMPLEMENTATIONS.md](./IMPLEMENTATIONS.md)**                            | Рецепты R0–R9 под экраны (Journal, Calculator)                      |
| **[ALGORITHMS.md](./ALGORITHMS.md)**                                      | Алгоритмы stagger, timeline, spring, drawable, scope                |
| [**offline/**](./offline/README.md)                                       | 410 pages full text + manifest for scroll                           |
| [animejs-react-integration-plan.md](../animejs-react-integration-plan.md) | React catalog + phased rollout                                      |
| [animejs-getting-started.md](../animejs-getting-started.md)               | Install, imports, migration                                         |
| [PROJECT-MAPPING.md](./PROJECT-MAPPING.md)                                | module → component matrix                                           |
| `.cursor/skills/animejs/SKILL.md`                                         | Agent skill                                                         |
| `.cursor/rules/animejs.mdc`                                               | Agent rule                                                          |

## Import subpaths (tree shaking)

```typescript
import {animate} from 'animejs/animation';
import {createTimeline} from 'animejs/timeline';
import {createTimer} from 'animejs/timer';
import {createAnimatable} from 'animejs/animatable';
import {createDraggable} from 'animejs/draggable';
import {createLayout} from 'animejs/layout';
import {createScope} from 'animejs/scope';
import {engine} from 'animejs/engine';
import * as events from 'animejs/events';
import * as easings from 'animejs/easings';
import * as utils from 'animejs/utils';
import * as svg from 'animejs/svg';
import * as text from 'animejs/text';
import {waapi} from 'animejs/waapi';
```

## Sections (15 modules)

| Section                       | Pages | Primary API                                                   | Memory file                                    |
| ----------------------------- | ----- | ------------------------------------------------------------- | ---------------------------------------------- |
| **Animatable**                | 11    | `createAnimatable(targets, parameters) → Animatable`          | [animatable.md](./animatable.md)               |
| **Animation**                 | 70    | `animate(targets, parameters) → JSAnimation`                  | [animation.md](./animation.md)                 |
| **Draggable**                 | 46    | `createDraggable(target, parameters) → Draggable`             | [draggable.md](./draggable.md)                 |
| **Easings**                   | 7     | `eases, cubicBezier, spring, steps, linear`                   | [easings.md](./easings.md)                     |
| **Engine**                    | 13    | `engine (singleton Clock)`                                    | [engine.md](./engine.md)                       |
| **Events**                    | 33    | `onScroll() → ScrollObserver`                                 | [events.md](./events.md)                       |
| **Getting started**           | 5     | `Installation, module imports, vanilla JS, React createScope` | [getting-started.md](./getting-started.md)     |
| **Layout (Auto Layout)**      | 29    | `createLayout(root, parameters) → AutoLayout`                 | [layout.md](./layout.md)                       |
| **Scope**                     | 14    | `createScope(parameters) → Scope`                             | [scope.md](./scope.md)                         |
| **SVG**                       | 4     | `morphTo, createMotionPath, createDrawable`                   | [svg.md](./svg.md)                             |
| **Text**                      | 38    | `splitText, scrambleText`                                     | [text.md](./text.md)                           |
| **Timeline**                  | 49    | `createTimeline(parameters) → Timeline`                       | [timeline.md](./timeline.md)                   |
| **Timer**                     | 32    | `createTimer(parameters) → Timer`                             | [timer.md](./timer.md)                         |
| **Utilities**                 | 42    | `stagger, $, get, set, clamp, lerp, random, round, …`         | [utilities.md](./utilities.md)                 |
| **Web Animation API (WAAPI)** | 17    | `waapi.animate(targets, parameters) → WAAPIAnimation`         | [web-animation-api.md](./web-animation-api.md) |

**Total:** 410 pages · [Full sitemap](./SITEMAP.md) · [Offline mirror (scroll-ready)](./offline/README.md)

## Offline mirror (scroll-ready)

| Asset                          | Role                                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| `offline/manifest.json`        | Flat ordered list (`order`, `slug`, `prev`, `next`, `file`) — **hook for global scroll** |
| `offline/sections-index.json`  | Pages grouped by module                                                                  |
| `offline/pages/<section>/*.md` | Full page content + JSON frontmatter + code examples                                     |

Regenerate: `npm run docs:animejs:mirror` · retry failed: `npm run docs:animejs:mirror:retry` · verify: `npm run docs:animejs:verify` → `offline/AUDIT.json`

## Quick API map

| Need                         | Module     | Function                                        |
| ---------------------------- | ---------- | ----------------------------------------------- |
| Animate CSS/DOM/SVG props    | animation  | `animate()`                                     |
| Sequence / orchestrate       | timeline   | `createTimeline()`                              |
| Delays / intervals           | timer      | `createTimer()`                                 |
| Mousemove / frequent updates | animatable | `createAnimatable()`                            |
| React / component scope      | scope      | `createScope()`                                 |
| Drag                         | draggable  | `createDraggable()`                             |
| FLIP / layout                | layout     | `createLayout()`                                |
| Global defaults              | engine     | `engine.defaults`                               |
| Scroll trigger               | events     | `onScroll()`                                    |
| Easing / spring              | easings    | `spring()`, `eases`, `cubicBezier`              |
| SVG path / morph             | svg        | `createDrawable`, `createMotionPath`, `morphTo` |
| Text split / scramble        | text       | `splitText`, `scrambleText`                     |
| Stagger / DOM utils          | utilities  | `stagger`, `utils.$`, `clamp`                   |
| Lightweight WAAPI            | waapi      | `waapi.animate()`                               |

## Project integration rules

1. **React:** `useAnimeScope` + cleanup `revert()` (see scope + getting-started React page).
2. **`useReducedMotion()`** — skip all anime when reduce (not in official docs; project mandatory).
3. **Colors in CSS tokens** — animate transform/opacity; not raw hex in animate().
4. **framer-motion** stays for TabPanel / Theory hero unless explicit migration task.
5. **Quiet UI** — no decorative infinite loops from docs demos in production.

## v3 → v4 (reminder)

| v3                     | v4                                                                  |
| ---------------------- | ------------------------------------------------------------------- |
| `anime({ targets })`   | `animate(targets, params)`                                          |
| `easing`               | `ease`                                                              |
| `direction: alternate` | `alternate: true`                                                   |
| `complete`             | `onComplete`                                                        |
| Migration guide        | https://github.com/juliangarnier/anime/wiki/Migrating-from-v3-to-v4 |
