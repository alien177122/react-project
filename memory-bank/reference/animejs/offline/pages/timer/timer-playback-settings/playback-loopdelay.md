---
{
  "order": 348,
  "section": "timer",
  "path": "timer-playback-settings/playback-loopdelay",
  "slug": "timer/timer-playback-settings/playback-loopdelay",
  "url": "https://animejs.com/documentation/timer/timer-playback-settings/playback-loopdelay",
  "title": "loopDelay",
  "breadcrumb": [
    "Timer",
    "Timer playback settings",
    "loopDelay"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "loop",
    "slug": "timer/timer-playback-settings/loop"
  },
  "next": {
    "title": "alternate",
    "slug": "timer/timer-playback-settings/alternate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# loopDelay

> Source: [https://animejs.com/documentation/timer/timer-playback-settings/playback-loopdelay](https://animejs.com/documentation/timer/timer-playback-settings/playback-loopdelay)
> Breadcrumb: Timer → Timer playback settings → loopDelay

Timer

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            loopDelay                                              
        

          
        Defines the delay in milliseconds between loops.

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
import { createTimer, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');
const [ $time ] = utils.$('.time');

let loops = 0;

createTimer({
  loop: true,
  loopDelay: 750,
  duration: 250,
  onLoop: () => $loops.innerHTML = ++loops,
  onUpdate: self => $time.innerHTML = utils.clamp(self.iterationCurrentTime, 0, 250)
});
```

## Code example (html)

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">loops count</span>
      <span class="loops value">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

---

← Prev: **loop** (`timer/timer-playback-settings/loop`) | Next: **alternate** (`timer/timer-playback-settings/alternate`) →
