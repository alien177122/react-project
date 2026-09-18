---
{
  "order": 291,
  "section": "timeline",
  "path": "timeline-methods/cancel",
  "slug": "timeline/timeline-methods/cancel",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/cancel",
  "title": "cancel()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "cancel()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "complete()",
    "slug": "timeline/timeline-methods/complete"
  },
  "next": {
    "title": "revert()",
    "slug": "timeline/timeline-methods/revert"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# cancel()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/cancel](https://animejs.com/documentation/timeline/timeline-methods/cancel)
> Breadcrumb: Timeline → Timeline methods → cancel()

Timeline

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            cancel()                                              
        

          
        Pauses the timeline, removes it from the engine's main loop, and frees up memory.

## Returns

The timeline itself

Can be chained with other timeline methods.

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $cancelButton ] = utils.$('.cancel');
const [ $playButton ] = utils.$('.play');

const tl = createTimeline({
  loop: true,
  alternate: true,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const cancelTimeline = () => tl.cancel();
const playTimeline = () => tl.play();

$cancelButton.addEventListener('click', cancelTimeline);
$playButton.addEventListener('click', playTimeline);
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
    <button class="button cancel">Cancel</button>
    <button class="button play">Play</button>
  </fieldset>
</div>
```

---

← Prev: **complete()** (`timeline/timeline-methods/complete`) | Next: **revert()** (`timeline/timeline-methods/revert`) →
