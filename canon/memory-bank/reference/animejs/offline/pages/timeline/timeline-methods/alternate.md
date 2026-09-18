---
{
  "order": 289,
  "section": "timeline",
  "path": "timeline-methods/alternate",
  "slug": "timeline/timeline-methods/alternate",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/alternate",
  "title": "alternate()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "alternate()"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "restart()",
    "slug": "timeline/timeline-methods/restart"
  },
  "next": {
    "title": "resume()",
    "slug": "timeline/timeline-methods/resume"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# alternate()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/alternate](https://animejs.com/documentation/timeline/timeline-methods/alternate)
> Breadcrumb: Timeline → Timeline methods → alternate()

Timeline

                          
              
                Methods              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            alternate()                                              
        

          
        Toggles the playback direction while adjusting the `currentTime` position to reflect the new time progress.

## Returns

The timeline itself

Can be chained with other timeline methods.

## Code example (js)

```js
import { creatTimeline, utils } from 'animejs';

const [ $alternateButton ] = utils.$('.button');

const tl = createTimeline({ loop: true })
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const pauseTimeline = () => tl.pause();
const playTimeline = () => tl.play();
const alternateTimeline = () => tl.alternate();

$alternateButton.addEventListener('click', alternateTimeline);
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
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

---

← Prev: **restart()** (`timeline/timeline-methods/restart`) | Next: **resume()** (`timeline/timeline-methods/resume`) →
