---
{
  "order": 296,
  "section": "timeline",
  "path": "timeline-methods/play",
  "slug": "timeline/timeline-methods/play",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/play",
  "title": "play()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "play()"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "init()",
    "slug": "timeline/timeline-methods/init"
  },
  "next": {
    "title": "reset()",
    "slug": "timeline/timeline-methods/reset"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# play()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/play](https://animejs.com/documentation/timeline/timeline-methods/play)
> Breadcrumb: Timeline → Timeline methods → play()

Timeline

                          
              
                Methods              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            play()                                              
        

          
        Forces the timeline to play forward.

## Returns

The timeline itself

Can be chained with other timeline methods.

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $playButton ] = utils.$('.play');

const tl = createTimeline({
  autoplay: false
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const playTimeline = () => tl.play();

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
    <button class="button play">Play</button>
  </fieldset>
</div>
```

---

← Prev: **init()** (`timeline/timeline-methods/init`) | Next: **reset()** (`timeline/timeline-methods/reset`) →
