---
{
  "order": 295,
  "section": "timeline",
  "path": "timeline-methods/pause",
  "slug": "timeline/timeline-methods/pause",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/pause",
  "title": "pause()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "pause()"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "reverse()",
    "slug": "timeline/timeline-methods/reverse"
  },
  "next": {
    "title": "restart()",
    "slug": "timeline/timeline-methods/restart"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# pause()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/pause](https://animejs.com/documentation/timeline/timeline-methods/pause)
> Breadcrumb: Timeline → Timeline methods → pause()

Timeline

                          
              
                Methods              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            pause()                                              
        

          
        Pauses a running timeline.

## Returns

The timeline itself

Can be chained with other timeline methods.

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $pauseButton ] = utils.$('.pause');

const tl = createTimeline({
  loop: true,
  alternate: true,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const pauseTimeline = () => tl.pause();

$pauseButton.addEventListener('click', pauseTimeline);
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
    <button class="button pause">Pause</button>
  </fieldset>
</div>
```

---

← Prev: **reverse()** (`timeline/timeline-methods/reverse`) | Next: **restart()** (`timeline/timeline-methods/restart`) →
