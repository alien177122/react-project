# Anime.js → Training Calculator (project mapping)

> Companion to [README.md](./README.md). Which anime.js modules apply to which app surfaces.  
> **Рецепты кода:** [IMPLEMENTATIONS.md](./IMPLEMENTATIONS.md) · **Алгоритмы:** [ALGORITHMS.md](./ALGORITHMS.md)

## High-value modules for this app

| Anime.js module                 | Project use case                          | Target component / area                                                 | Recipe        |
| ------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- | ------------- |
| **animation** `animate()`       | SVG line draw, bar stagger, stat enter    | `JournalProgressChart`, `PeriodizationChart`, `ProgressionPreviewChart` | R1–R5, R7–R9  |
| **timeline** `createTimeline()` | Calculate → phases → line → bars sequence | Calculator sec 02 progression                                           | R6            |
| **scope** `createScope()`       | React isolation + cleanup                 | All anime in React via `useAnimeScope`                                  | R0–R9         |
| **easings** `spring()`          | Delta pulse, release easing               | Journal delta                                                           | R3            |
| **utilities** `stagger()`       | List/card stagger                         | Chart bars, stat cards, result chips                                    | R1, R2, R6–R8 |
| **svg** `createDrawable()`      | e1RM line stroke-dashoffset               | Journal / periodization SVG paths                                       | R5, R6        |
| **engine**                      | Global 400ms defaults                     | `configureAppAnimeEngine()` in `index.tsx`                              | R0            |

## Low / no priority for this app

| Module                               | Reason                                    |
| ------------------------------------ | ----------------------------------------- |
| **draggable**                        | No drag UX in product                     |
| **layout** `createLayout()`          | No FLIP/reorder UI yet; Split grid static |
| **text** `splitText`, `scrambleText` | Quiet UI; Theory uses framer-motion       |
| **events** `onScroll()`              | `useScrollReveal` + CSS sufficient        |
| **animatable**                       | No cursor-follow widgets                  |
| **timer**                            | React/state timers enough                 |
| **waapi**                            | Single stack (`animate`) preferred        |
| **timer**                            | Rare; engine sync if needed               |

## Explicit exclude (keep existing stack)

| Area             | Keep                            |
| ---------------- | ------------------------------- |
| Tab switches     | framer-motion `AnimatePresence` |
| Theory hero      | framer-motion variants          |
| Auth             | framer-motion                   |
| TabNav indicator | CSS + `useSlidingIndicator`     |
| Button micro     | CSS `:active`                   |

## Rollout phases

See [animejs-react-integration-plan.md](../animejs-react-integration-plan.md).

---

Index: [README.md](./README.md) · [IMPLEMENTATIONS.md](./IMPLEMENTATIONS.md) · [ALGORITHMS.md](./ALGORITHMS.md) · Sitemap: [SITEMAP.md](./SITEMAP.md)
