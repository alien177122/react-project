---
{
  "order": 303,
  "section": "timeline",
  "path": "timeline-methods/revert",
  "slug": "timeline/timeline-methods/revert",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/revert",
  "title": "revert()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "revert()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "cancel()",
    "slug": "timeline/timeline-methods/cancel"
  },
  "next": {
    "title": "seek()",
    "slug": "timeline/timeline-methods/seek"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# revert()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/revert](https://animejs.com/documentation/timeline/timeline-methods/revert)
> Breadcrumb: Timeline → Timeline methods → revert()

Timeline

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            revert()                                              
        

          
        Cancels the timeline, reverts all its children's animated values to their original state, cleans up the CSS inline styles, and reverts the linked `onScroll()` instance if necessary.

Use `.revert()` when you want to completely stop and destroy a timeline.

## Returns

The timeline itself

Can be chained with other timeline methods.

## Related

- [Scroll](https://animejs.com/documentation/events/onscroll)

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $revertButton ] = utils.$('.revert');
const [ $restartButton ] = utils.$('.restart');

// Set an initial x value
utils.set(['.circle', '.triangle', '.square'], { x: '15rem' });

const tl = createTimeline({
  loop: true,
  alternate: true,
})
.add('.circle',   { x: 0 })
.add('.triangle', { x: 0 }, 500)
.add('.square',   { x: 0 }, 1000);

const revertTimeline = () => tl.revert();
const restartTimeline = () => tl.restart();

$revertButton.addEventListener('click', revertTimeline);
$restartButton.addEventListener('click', restartTimeline);
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
    <button class="button revert">Revert</button>
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

---

← Prev: **cancel()** (`timeline/timeline-methods/cancel`) | Next: **seek()** (`timeline/timeline-methods/seek`) →
