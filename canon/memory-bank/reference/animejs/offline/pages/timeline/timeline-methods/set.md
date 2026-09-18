---
{
  "order": 305,
  "section": "timeline",
  "path": "timeline-methods/set",
  "slug": "timeline/timeline-methods/set",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/set",
  "title": "set()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "set()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "add()",
    "slug": "timeline/timeline-methods/add"
  },
  "next": {
    "title": "sync()",
    "slug": "timeline/timeline-methods/sync"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# set()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/set](https://animejs.com/documentation/timeline/timeline-methods/set)
> Breadcrumb: Timeline → Timeline methods → set()

Timeline

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            set()                                              
        

          
        Instantly sets targets property values at a specific time of the timeline.

```js
timeline.set(targets, parameters, position);
```

## Parameters

| Name | Accepts |
| --- | --- |
| targets | Targets |
| parameters | Animatable properties |
| position (opt) | Time position |

## Returns

The timeline itself

Can be chained with other timeline methods.

## Code example (js)

```js
import { createTimeline } from 'animejs';

const tl = createTimeline()
.set('.circle', { x: '15rem' })
.set('.triangle', { x: '15rem' }, 500)
.set('.square', { x: '15rem' }, 1000);
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

← Prev: **add()** (`timeline/timeline-methods/add`) | Next: **sync()** (`timeline/timeline-methods/sync`) →
