---
{
  "order": 307,
  "section": "timeline",
  "path": "timeline-methods/sync",
  "slug": "timeline/timeline-methods/sync",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/sync",
  "title": "sync()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "sync()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "set()",
    "slug": "timeline/timeline-methods/set"
  },
  "next": {
    "title": "label()",
    "slug": "timeline/timeline-methods/label"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# sync()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/sync](https://animejs.com/documentation/timeline/timeline-methods/sync)
> Breadcrumb: Timeline → Timeline methods → sync()

Timeline

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            sync()                                              
        

          
        Synchronises a JS animation, WAAPI Animation, timer, timeline or even a native WAAPI Animation to a timeline.

```js
const tlChild = createTimeline().add(target, { x: 100 }).add(target, { y: 100 });

createTimeline().sync(tlChild);
```

Tween value composition is handled when the timeline is created, and won't affect the timeline's existing children when added.

## Parameters

| Name | Accepts |
| --- | --- |
| synced | JSAnimation \| Timer \| Timeline \| Anime.js WAAPIAnimation \| WAAPIAnimation |
| position (opt) | Time position |

## Returns

The timeline itself

Can be chained with other timeline methods.

## Code example (js)

```js
import { createTimeline, animate, waapi } from 'animejs';

const circleAnimation = waapi.animate('.circle', {
  x: '15rem'
});

const tlA = createTimeline()
.sync(circleAnimation)
.add('.triangle', {
  x: '15rem',
  duration: 2000,
})
.add('.square', {
  x: '15rem',
});

const tlB = createTimeline({ defaults: { duration: 2000 } })
.add(['.triangle', '.square'], {
  rotate: 360,
}, 0)
.add('.circle', {
  scale: [1, 1.5, 1],
}, 0);

const tlMain = createTimeline()
.sync(tlA)
.sync(tlB, '-=2000');
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

← Prev: **set()** (`timeline/timeline-methods/set`) | Next: **label()** (`timeline/timeline-methods/label`) →
