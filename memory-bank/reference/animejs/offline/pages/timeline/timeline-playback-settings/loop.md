---
{
  "order": 314,
  "section": "timeline",
  "path": "timeline-playback-settings/loop",
  "slug": "timeline/timeline-playback-settings/loop",
  "url": "https://animejs.com/documentation/timeline/timeline-playback-settings/loop",
  "title": "loop",
  "breadcrumb": [
    "Timeline",
    "Timeline playback settings",
    "loop"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "delay",
    "slug": "timeline/timeline-playback-settings/delay"
  },
  "next": {
    "title": "loopDelay",
    "slug": "timeline/timeline-playback-settings/playback-loopdelay"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# loop

> Source: [https://animejs.com/documentation/timeline/timeline-playback-settings/loop](https://animejs.com/documentation/timeline/timeline-playback-settings/loop)
> Breadcrumb: Timeline → Timeline playback settings → loop

Timeline

                          
              
                Playback settings              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            loop                                              
        

          
        Defines how many times a timeline repeats.

## Accepts

| Value | Effect |
| --- | --- |
| `Number` | The number of loops in the range `[0, Infinity]` |
| `Infinity` | Loop indefinitely |
| `true` | Equivalent to `Infinity` |
| `-1` | Equivalent to `Infinity` |

## Default

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.loop = true;
```

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');

let loops = 0;

const tl = createTimeline({
  loop: true,
  onLoop: self => $loops.innerHTML = ++loops,
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

← Prev: **delay** (`timeline/timeline-playback-settings/delay`) | Next: **loopDelay** (`timeline/timeline-playback-settings/playback-loopdelay`) →
