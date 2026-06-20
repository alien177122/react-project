---
{
  "order": 271,
  "section": "timeline",
  "path": "(index)",
  "slug": "timeline",
  "url": "https://animejs.com/documentation/timeline",
  "title": "Timeline",
  "breadcrumb": [
    "Timeline"
  ],
  "prev": {
    "title": "Animation properties",
    "slug": "animation/animation-properties"
  },
  "next": {
    "title": "Add timers",
    "slug": "timeline/add-timers"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Timeline

> Source: [https://animejs.com/documentation/timeline](https://animejs.com/documentation/timeline)
> Breadcrumb: Timeline

## 
          
            Timeline                                              
        

          
        

## Synchronises animations, timers, and callbacks together.

Timelines are created using the `createTimeline()` method imported from the main `'animejs'` module:

```js
import { createTimeline } from 'animejs';

const timeline = createTimeline(parameters);
```

Or imported as a standalone module from the `'animejs/timeline'` subpath:

```js
import { createTimeline } from 'animejs/timeline';
```

## Parameters

| Name | Accepts |
| --- | --- |
| parameters (opt) | An `Object` of Timeline playback settings and Timeline callbacks |

## Returns

`Timeline`

A `Timeline` instance exposes methods used to add animations, timers, callbacks and labels to it.

```js
timeline.add(target, animationParameters, position);
timeline.add(timerParameters, position);
timeline.sync(timelineB, position);
timeline.call(callbackFunction, position);
timeline.label(labelName, position);
```

## Related

- [subpath](https://animejs.com/documentation/getting-started/module-imports)
- [timeline methods](https://animejs.com/documentation/animation/animation-methods)

## Code example (js)

```js
import { createTimeline } from 'animejs';

const tl = createTimeline({ defaults: { duration: 750 } });

tl.label('start')
  .add('.square', { x: '15rem' }, 500)
  .add('.circle', { x: '15rem' }, 'start')
  .add('.triangle', { x: '15rem', rotate: '1turn' }, '<-=500');
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

← Prev: **Animation properties** (`animation/animation-properties`) | Next: **Add timers** (`timeline/add-timers`) →
