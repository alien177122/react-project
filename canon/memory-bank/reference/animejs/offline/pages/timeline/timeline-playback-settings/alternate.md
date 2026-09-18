---
{
  "order": 309,
  "section": "timeline",
  "path": "timeline-playback-settings/alternate",
  "slug": "timeline/timeline-playback-settings/alternate",
  "url": "https://animejs.com/documentation/timeline/timeline-playback-settings/alternate",
  "title": "alternate",
  "breadcrumb": [
    "Timeline",
    "Timeline playback settings",
    "alternate"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "loopDelay",
    "slug": "timeline/timeline-playback-settings/playback-loopdelay"
  },
  "next": {
    "title": "reversed",
    "slug": "timeline/timeline-playback-settings/reversed"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# alternate

> Source: [https://animejs.com/documentation/timeline/timeline-playback-settings/alternate](https://animejs.com/documentation/timeline/timeline-playback-settings/alternate)
> Breadcrumb: Timeline → Timeline playback settings → alternate

Timeline

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            alternate                                              
        

          
        Defines if the direction of the timeline alternates on each iteration when the loop parameter is set to `true` or superior to `1`.

## Accepts

`Boolean`

## Default

`false`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.alternate = true;
```

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');

let loops = 0;

const tl = createTimeline({
  loop: true,
  alternate: true,
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

← Prev: **loopDelay** (`timeline/timeline-playback-settings/playback-loopdelay`) | Next: **reversed** (`timeline/timeline-playback-settings/reversed`) →
