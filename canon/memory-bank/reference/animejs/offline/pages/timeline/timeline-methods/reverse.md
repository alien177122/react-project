---
{
  "order": 302,
  "section": "timeline",
  "path": "timeline-methods/reverse",
  "slug": "timeline/timeline-methods/reverse",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/reverse",
  "title": "reverse()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "reverse()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "reset()",
    "slug": "timeline/timeline-methods/reset"
  },
  "next": {
    "title": "pause()",
    "slug": "timeline/timeline-methods/pause"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# reverse()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/reverse](https://animejs.com/documentation/timeline/timeline-methods/reverse)
> Breadcrumb: Timeline → Timeline methods → reverse()

Timeline

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            reverse()                                              
        

          
        Forces the timeline to play backward.

## Returns

The timeline itself

Can be chained with other timeline methods.

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $reverseButton ] = utils.$('.reverse');

const tl = createTimeline()
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const reverseTimeline = () => tl.reverse();

$reverseButton.addEventListener('click', reverseTimeline);
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
    <button class="button reverse">Reverse</button>
  </fieldset>
</div>
```

---

← Prev: **reset()** (`timeline/timeline-methods/reset`) | Next: **pause()** (`timeline/timeline-methods/pause`) →
