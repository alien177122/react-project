---
{
  "order": 345,
  "section": "timer",
  "path": "timer-playback-settings/duration",
  "slug": "timer/timer-playback-settings/duration",
  "url": "https://animejs.com/documentation/timer/timer-playback-settings/duration",
  "title": "duration",
  "breadcrumb": [
    "Timer",
    "Timer playback settings",
    "duration"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "delay",
    "slug": "timer/timer-playback-settings/delay"
  },
  "next": {
    "title": "loop",
    "slug": "timer/timer-playback-settings/loop"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# duration

> Source: [https://animejs.com/documentation/timer/timer-playback-settings/duration](https://animejs.com/documentation/timer/timer-playback-settings/duration)
> Breadcrumb: Timer → Timer playback settings → duration

Timer

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            duration                                              
        

          
        Defines the duration in milliseconds of the timer.

Setting `0` to a duration completes the timer instantly upon play.

## Accepts

A `Number` equal to or greater than `0`

Duration values higher than `1e12` are clamped internally to `1e12` (Or approximatively 32 years).

## Default

`Infinity`

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $time ] = utils.$('.time');

createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.currentTime
});
```

## Code example (html)

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

---

← Prev: **delay** (`timer/timer-playback-settings/delay`) | Next: **loop** (`timer/timer-playback-settings/loop`) →
