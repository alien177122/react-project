---
name: gsap
description: >-
  Integrates GSAP (Greensock) and @gsap/react (useGSAP, gsap.context) in this
  React/Vite monorepo. Use when the user mentions GSAP, Greensock, timeline,
  stagger, or DOM/SVG animations outside framer-motion.
---

# GSAP (Greensock)

## Before coding

1. Read this skill and `.cursor/rules/gsap.mdc`.
2. **Do not** migrate existing framer-motion (`TabPanel`, Theory, `animations.ts`) without an explicit task.

## Install & import

```bash
bun add gsap @gsap/react
```

```typescript
import {gsap, useGSAP} from '../../lib/gsap/index.ts';
```

App bootstrap: `configureAppGsap()` in `index.tsx` (defaults 0.4s, `power3.out`, pause on tab hidden).

## React pattern (required)

Prefer `useGsapScope` — wraps `useGSAP` with `useReducedMotion` + scoped selectors:

```tsx
import {useRef} from 'react';
import {gsap} from '../../lib/gsap/index.ts';
import {useGsapScope} from '../../hooks/useGsapScope.ts';

export function ScopedAnimation() {
  const root = useRef<HTMLDivElement>(null);

  useGsapScope(root, () => {
    gsap.from('.target', {opacity: 0, y: 8, stagger: 0.08});
  }, [itemCount]);

  return (
    <div ref={root}>
      <span className="target">…</span>
    </div>
  );
}
```

**Rules:** scope via `rootRef`; `revertOnUpdate: true` on deps change; skip when `useReducedMotion()` is true.

For click handlers after mount — wrap with `contextSafe` from `useGSAP` callback args.

## Motion (project)

- transform (`x`, `y`, `scale`, `rotation`) + opacity only — not width/height/margin.
- Durations: 0.15–0.6s; no decorative infinite loops.
- After UI animation changes: iPhone viewport 390px via `cursor-ide-browser`.

## Project module paths

| Path                                              | Role                                        |
| ------------------------------------------------- | ------------------------------------------- |
| `src/lib/gsap/index.ts`                           | Re-exports `gsap`, `useGSAP`, configure     |
| `src/lib/gsap/configureAppGsap.ts`                | Defaults; called from `index.tsx`           |
| `src/hooks/useGsapScope.ts`                       | React scope + revert + reduced-motion guard |
| `src/components/journal/JournalProgressChart.tsx` | First consumer (stat cards enter)           |

## Anime.js → GSAP quick map

| Anime.js v4                       | GSAP                                    |
| --------------------------------- | --------------------------------------- |
| `animate(el, { opacity: [0,1] })` | `gsap.from(el, { opacity: 0 })`         |
| `translateY: [8, 0]`              | `y: 8` in `gsap.from`                   |
| `delay: stagger(80)`              | `stagger: 0.08`                         |
| `ease: 'out(3)'`                  | `ease: 'power3.out'`                    |
| `createScope` + `revert()`        | `useGSAP` / `gsap.context` + `revert()` |
