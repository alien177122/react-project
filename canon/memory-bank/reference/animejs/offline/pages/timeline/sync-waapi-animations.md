---
{
  "order": 276,
  "section": "timeline",
  "path": "sync-waapi-animations",
  "slug": "timeline/sync-waapi-animations",
  "url": "https://animejs.com/documentation/timeline/sync-waapi-animations",
  "title": "Sync WAAPI animations",
  "breadcrumb": [
    "Timeline",
    "Sync WAAPI animations"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Add animations",
    "slug": "timeline/add-animations"
  },
  "next": {
    "title": "Sync timelines",
    "slug": "timeline/sync-timelines"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Sync WAAPI animations

> Source: [https://animejs.com/documentation/timeline/sync-waapi-animations](https://animejs.com/documentation/timeline/sync-waapi-animations)
> Breadcrumb: Timeline → Sync WAAPI animations

Timeline

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Sync WAAPI animations                                              
        

          
        WAAPI animations can be synchronised to a timeline using the `sync()` method.

```js
timeline.sync(animation, position);
```

## Parameters

| Name | Accepts |
| --- | --- |
| synced | Animation \| Timer \| Timeline |
| position (opt) | Time position |

## Returns

The timeline itself

Can be chained with other timeline methods.

## Related

- [sync()](https://animejs.com/documentation/timeline/timeline-methods/sync)

## Code example (js)

```js
import { createTimeline, waapi } from 'animejs';

const circle = waapi.animate('.circle', {
  x: '15rem',
});

const triangle = waapi.animate('.triangle', {
  x: '15rem',
  y: [0, '-1.5rem', 0],
  ease: 'out(4)',
  duration: 750,
});

const square = waapi.animate('.square', {
  x: '15rem',
  rotateZ: 360,
});


const tl = createTimeline()
.sync(circle, 0)
.sync(triangle, 350)
.sync(square, 250);
```

## Code example (html)

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

← Prev: **Add animations** (`timeline/add-animations`) | Next: **Sync timelines** (`timeline/sync-timelines`) →
