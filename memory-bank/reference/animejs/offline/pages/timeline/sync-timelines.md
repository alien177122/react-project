---
{
  "order": 275,
  "section": "timeline",
  "path": "sync-timelines",
  "slug": "timeline/sync-timelines",
  "url": "https://animejs.com/documentation/timeline/sync-timelines",
  "title": "Sync timelines",
  "breadcrumb": [
    "Timeline",
    "Sync timelines"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Sync WAAPI animations",
    "slug": "timeline/sync-waapi-animations"
  },
  "next": {
    "title": "Call functions",
    "slug": "timeline/call-functions"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Sync timelines

> Source: [https://animejs.com/documentation/timeline/sync-timelines](https://animejs.com/documentation/timeline/sync-timelines)
> Breadcrumb: Timeline → Sync timelines

Timeline

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Sync timelines                                              
        

          
        Timelines can be synchronised to an other timeline using the `sync()` method.

```js
timelineA.sync(timelineB, position);
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
import { createTimeline, animate } from 'animejs';

const circleAnimation = animate('.circle', {
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

← Prev: **Sync WAAPI animations** (`timeline/sync-waapi-animations`) | Next: **Call functions** (`timeline/call-functions`) →
