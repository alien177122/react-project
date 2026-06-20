---
{
  "order": 300,
  "section": "timeline",
  "path": "timeline-methods/restart",
  "slug": "timeline/timeline-methods/restart",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/restart",
  "title": "restart()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "restart()"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "pause()",
    "slug": "timeline/timeline-methods/pause"
  },
  "next": {
    "title": "alternate()",
    "slug": "timeline/timeline-methods/alternate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# restart()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/restart](https://animejs.com/documentation/timeline/timeline-methods/restart)
> Breadcrumb: Timeline → Timeline methods → restart()

Timeline

                          
              
                Methods              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            restart()                                              
        

          
        Sets the `currentTime` of a timeline to `0` and reset all properties of the elements to their initial state.

If the `autoplay` parameter is set to `true`, the timeline plays automatically.

## Returns

The timeline itself

Can be chained with other timeline methods.

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $restartButton ] = utils.$('.restart');

const tl = createTimeline({
  loop: true,
  alternate: true,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const restartTimeline = () => tl.restart();

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
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

---

← Prev: **pause()** (`timeline/timeline-methods/pause`) | Next: **alternate()** (`timeline/timeline-methods/alternate`) →
