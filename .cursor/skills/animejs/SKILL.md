---
name: animejs
description: >-
  Integrates Anime.js v4 (animate, createScope, spring, subpath imports) in this
  React/Vite monorepo. Use when the user mentions anime.js, animejs, DOM/SVG
  animations, createScope, createDraggable, or migrating from anime v3.
---

# Anime.js v4 (Getting started)

## Before coding

0. **Структура банка:** `memory-bank/reference/animejs/HOW-TO-TRACK.md` (agentmemory → usage → offline).
1. Read **`memory-bank/reference/animejs/USAGE-INDEX.md`** — выбери API (timer / timeline / animate / …).
2. Read matching **`memory-bank/reference/animejs/usage/<module>.md`** — factory, methods, React steps.
3. Read **`IMPLEMENTATIONS.md`** — если задача привязана к экрану проекта (R1–R9).
4. Read **`ALGORITHMS.md`** — если нужна теория stagger/timeline/spring.
5. Read `animejs-getting-started.md` (install, imports).

## Install & import

```bash
npm install animejs
```

```typescript
// Default — bundler tree-shakes unused exports
import {animate, createScope, spring} from 'animejs';

// Granular
import {animate} from 'animejs/animation';
import {createScope} from 'animejs/scope';
import {stagger, random} from 'animejs/utils';
```

## React pattern (required)

```tsx
import {animate, createScope} from 'animejs';
import {useEffect, useRef} from 'react';
import {useReducedMotion} from '../../hooks/useReducedMotion';

export function ScopedAnimation() {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;

    scope.current = createScope({root}).add(self => {
      animate('.target', {opacity: [0, 1], duration: 400, ease: 'out(3)'});
      self.add('pulse', () => {
        animate('.target', {scale: [1, 1.05, 1], duration: 300});
      });
    });

    return () => scope.current?.revert();
  }, [reduced]);

  return (
    <div ref={root}>
      <span className="target">…</span>
    </div>
  );
}
```

**Rules:** scope root ref; cleanup `revert()`; skip animations when `useReducedMotion()` is true.

## Vanilla / hook extraction

Logic-heavy animations → custom hook `useXAnimation(rootRef)` with the same scope/cleanup pattern.

```typescript
import {utils} from 'animejs';
const [el] = utils.$('.selector'); // prefer ref over global query in React
```

## Engine globals (sparingly)

```typescript
import {engine} from 'animejs/engine';
engine.defaults.duration = 400;
engine.pauseOnDocumentHidden = true;
```

## v3 → v4 quick map

- `anime({ targets })` → `animate(targets, params)`
- `easing` → `ease`; `'easeOutQuad'` → `'outQuad'`
- `direction: 'alternate'` → `alternate: true`
- callbacks: `begin/update/complete` → `onBegin/onUpdate/onComplete`

## Project constraints

- Motion: transform + opacity only (`CLAUDE.md`).
- Durations: 150–600ms micro/section; no decorative infinite loops.
- After UI animation changes: iPhone viewport 390px via `cursor-ide-browser`.
- **Journal colors:** `--accent` (#ff6b35) shell UI; `--ta-calc-accent` (#ff9f40) chart line; `--ta-sec-02` (#5ba4ff) volume — see `journal-progress-chart-standard.md` § colors. Do not animate color with raw hex; keep colors in CSS.

## Project module paths

| Path                                              | Role                                                |
| ------------------------------------------------- | --------------------------------------------------- |
| `src/lib/anime/index.ts`                          | Re-exports (`animate`, `createScope`, `stagger`, …) |
| `src/lib/anime/configureAppAnimeEngine.ts`        | Engine defaults; called from `index.tsx`            |
| `src/hooks/useAnimeScope.ts`                      | React scope + `revert()` + `useReducedMotion` guard |
| `src/components/journal/JournalProgressChart.tsx` | First consumer (stat cards enter)                   |

## Reference

Full docs bank (410 pages): [animejs/README.md](../../memory-bank/reference/animejs/README.md) · [SITEMAP.md](../../memory-bank/reference/animejs/SITEMAP.md)
