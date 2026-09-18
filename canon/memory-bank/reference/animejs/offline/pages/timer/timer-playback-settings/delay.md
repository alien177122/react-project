---
{
  "order": 344,
  "section": "timer",
  "path": "timer-playback-settings/delay",
  "slug": "timer/timer-playback-settings/delay",
  "url": "https://animejs.com/documentation/timer/timer-playback-settings/delay",
  "title": "delay",
  "breadcrumb": [
    "Timer",
    "Timer playback settings",
    "delay"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Timer playback settings",
    "slug": "timer/timer-playback-settings"
  },
  "next": {
    "title": "duration",
    "slug": "timer/timer-playback-settings/duration"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# delay

> Source: [https://animejs.com/documentation/timer/timer-playback-settings/delay](https://animejs.com/documentation/timer/timer-playback-settings/delay)
> Breadcrumb: Timer → Timer playback settings → delay

Timer

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            delay                                              
        

          
        Defines the time in milliseconds before the timer starts.

## Accepts

A `Number` equal to or greater than `0`

## Default

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.delay = 500;
```

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $time ] = utils.$('.time');

createTimer({
  delay: 2000,
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

← Prev: **Timer playback settings** (`timer/timer-playback-settings`) | Next: **duration** (`timer/timer-playback-settings/duration`) →
