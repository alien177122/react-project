---
{
  "order": 293,
  "section": "timeline",
  "path": "timeline-methods/init",
  "slug": "timeline/timeline-methods/init",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/init",
  "title": "init()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "init()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "call()",
    "slug": "timeline/timeline-methods/call"
  },
  "next": {
    "title": "play()",
    "slug": "timeline/timeline-methods/play"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# init()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/init](https://animejs.com/documentation/timeline/timeline-methods/init)
> Breadcrumb: Timeline → Timeline methods → init()

Timeline

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            init()                                              
        

          
        Initialises the initial values of all the elements of a timeline.

Animations with specific initial values added to a timeline are not automatically set to their *from* state like a normal call to `animate()` would, instead, they are initialised when the timeline playhead reaches the element in the timeline.

This is where `.init()` comes in handy, it forces a render of all the children initial state and updates their values.

## Returns

The timeline itself

Can be chained with other timeline methods.

## Code example (js)

```js
import { createTimeline } from 'animejs';

const tl = createTimeline()
.add('.square',   { x: { from: '15rem' } })
.add('.triangle', { x: { from: '15rem' } }, 500)
.add('.circle',   { x: { from: '15rem' } }, 1000)
.init();
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

← Prev: **call()** (`timeline/timeline-methods/call`) | Next: **play()** (`timeline/timeline-methods/play`) →
