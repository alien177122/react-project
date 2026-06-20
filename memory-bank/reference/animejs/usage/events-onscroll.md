# onScroll — как реализовать (`onScroll`)

> **В проекте:** CSS + `useScrollReveal` — не anime. Reference для scroll-sync анимаций.  
> **Offline:** `offline/pages/events/onscroll/`

---

## Factory

```typescript
import {onScroll} from 'animejs/events';

const observer = onScroll({
  target: '.section',
  container: window,
  axis: 'y',
  onEnter: self => {
    /* link animation */
  },
  onUpdate: self => {
    /* progress 0-1 */
  },
});
```

## Sync modes

`playbackProgress`, `smoothScroll`, `easedScroll` — см. `scrollobserver-synchronisation-modes/`

## Methods

`link()`, `refresh()`, **`revert()`**

## Thresholds

`min`/`max`, positions shorthands, relative values

## When to use vs project CSS

Use anime onScroll when animation **must** scrub with scroll progress. Project uses IntersectionObserver + CSS transitions instead.

## Offline

`events/onscroll/` — 33 pages
