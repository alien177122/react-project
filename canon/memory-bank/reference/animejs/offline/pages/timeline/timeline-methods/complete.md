---
{
  "order": 292,
  "section": "timeline",
  "path": "timeline-methods/complete",
  "slug": "timeline/timeline-methods/complete",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/complete",
  "title": "complete()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "complete()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "resume()",
    "slug": "timeline/timeline-methods/resume"
  },
  "next": {
    "title": "cancel()",
    "slug": "timeline/timeline-methods/cancel"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# complete()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/complete](https://animejs.com/documentation/timeline/timeline-methods/complete)
> Breadcrumb: Timeline → Timeline methods → complete()

Timeline

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            complete()                                              
        

          
        Completes the timeline instantly.

## Returns

The timeline itself

Can be chained with other timeline methods.

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $completeButton ] = utils.$('.complete');

const tl = createTimeline({
  loop: true,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const completeTimeline = () => tl.complete();

$completeButton.addEventListener('click', completeTimeline);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button complete">Complete</button>
  </fieldset>
</div>
```

---

← Prev: **resume()** (`timeline/timeline-methods/resume`) | Next: **cancel()** (`timeline/timeline-methods/cancel`) →
