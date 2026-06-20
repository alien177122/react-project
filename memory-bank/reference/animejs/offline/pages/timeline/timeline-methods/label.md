---
{
  "order": 294,
  "section": "timeline",
  "path": "timeline-methods/label",
  "slug": "timeline/timeline-methods/label",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/label",
  "title": "label()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "label()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "sync()",
    "slug": "timeline/timeline-methods/sync"
  },
  "next": {
    "title": "remove()",
    "slug": "timeline/timeline-methods/remove"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# label()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/label](https://animejs.com/documentation/timeline/timeline-methods/label)
> Breadcrumb: Timeline → Timeline methods → label()

Timeline

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            label()                                              
        

          
        Associate specific time positions with label names for easy reference within the timeline.

Once added to a timeline, a label can be used as a Time position.

```js
timeline.label(labelName, position);
```

## Parameters

| Name | Accepts |
| --- | --- |
| labelName | `String` |
| position (opt) | Time position |

## Returns

The timeline itself

Can be chained with other timeline methods.

## Related

- [Time position](https://animejs.com/documentation/timeline/time-position)

## Code example (js)

```js
import { createTimeline } from 'animejs';

const tl = createTimeline()
.label('circle', 0)
.label('square', 500)
.label('triangle', 1000)
.add('.square', {
  x: '17rem',
  duration: 500,
}, 'square')
.add('.circle', {
  x: '13rem',
  duration: 1000,
}, 'circle')
.add('.triangle', {
  x: '15rem',
  rotate: '1turn',
  duration: 500,
}, 'triangle');
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

← Prev: **sync()** (`timeline/timeline-methods/sync`) | Next: **remove()** (`timeline/timeline-methods/remove`) →
