# WAAPI — как реализовать (`waapi.animate`)

> **Не в продукте** — single `animate()` stack preferred.  
> **Offline:** `offline/pages/web-animation-api/`

---

## Factory

```typescript
import {waapi} from 'animejs/waapi';

const animation = waapi.animate(targets, parameters);
```

## When (docs)

Hardware-accelerated simple transforms; lighter than JS engine for basic cases.

## Limitations vs JS animate

No spring custom easings same way; `finished` behavior differs — см. `api-differences-with-native-waapi/`

## Timeline sync

`timeline.sync(waapiAnimation, position)` — `timeline/sync-waapi-animations.md`

## Project rule

Use `animate()` from `animejs/animation` unless explicit WAAPI task.

## Offline

`web-animation-api/index.md` · improvements · differences
