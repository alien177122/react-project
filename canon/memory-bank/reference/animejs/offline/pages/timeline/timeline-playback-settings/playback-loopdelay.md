---
{
  "order": 315,
  "section": "timeline",
  "path": "timeline-playback-settings/playback-loopdelay",
  "slug": "timeline/timeline-playback-settings/playback-loopdelay",
  "url": "https://animejs.com/documentation/timeline/timeline-playback-settings/playback-loopdelay",
  "title": "loopDelay",
  "breadcrumb": [
    "Timeline",
    "Timeline playback settings",
    "loopDelay"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "loop",
    "slug": "timeline/timeline-playback-settings/loop"
  },
  "next": {
    "title": "alternate",
    "slug": "timeline/timeline-playback-settings/alternate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# loopDelay

> Source: [https://animejs.com/documentation/timeline/timeline-playback-settings/playback-loopdelay](https://animejs.com/documentation/timeline/timeline-playback-settings/playback-loopdelay)
> Breadcrumb: Timeline → Timeline playback settings → loopDelay

Timeline

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            loopDelay                                              
        

          
        Defines the delay in milliseconds between each loops.

## Accepts

A `Number` equal to or greater than `0`

## Default

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.loopDelay = 500;
```

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');

const tl = createTimeline({
  loopDelay: 500,
  loop: true,
  onLoop: self => $loops.innerHTML = self._currentIteration,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');
```

## Code example (html)

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">loops</span>
    <span class="loops value">0</span>
  </pre>
</div>
```

---

← Prev: **loop** (`timeline/timeline-playback-settings/loop`) | Next: **alternate** (`timeline/timeline-playback-settings/alternate`) →
