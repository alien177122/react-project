---
{
  "order": 299,
  "section": "timeline",
  "path": "timeline-methods/reset",
  "slug": "timeline/timeline-methods/reset",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/reset",
  "title": "reset()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "reset()"
  ],
  "since": "Since 3.0.0",
  "prev": {
    "title": "play()",
    "slug": "timeline/timeline-methods/play"
  },
  "next": {
    "title": "reverse()",
    "slug": "timeline/timeline-methods/reverse"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# reset()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/reset](https://animejs.com/documentation/timeline/timeline-methods/reset)
> Breadcrumb: Timeline → Timeline methods → reset()

Timeline

                          
              
                Methods              
                      

          
                        Since 3.0.0
                      

        
                

## 
          
            reset()                                              
        

          
        Pauses and resets `currentTime`, `progress`, `reversed`, `began`, `completed` properties to their default values.

```js
timeline.reset(softReset);
```

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| softReset=false (opt) | `Boolean` | If `true`, only reset the internal values without causing a visual render |

## Returns

The timeline itself

Can be chained with other timer methods.

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $reset ] = utils.$('.button');

const tl = createTimeline({
  loop: true,
  alternate: true
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const resetTimeline = () => {
  tl.reset();
  $time.innerHTML = timer.currentTime;
}

$reset.addEventListener('click', resetTimeline);
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
    <button class="button">Reset</button>
  </fieldset>
</div>
```

---

← Prev: **play()** (`timeline/timeline-methods/play`) | Next: **reverse()** (`timeline/timeline-methods/reverse`) →
