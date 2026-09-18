---
{
  "order": 332,
  "section": "timer",
  "path": "timer-methods/pause",
  "slug": "timer/timer-methods/pause",
  "url": "https://animejs.com/documentation/timer/timer-methods/pause",
  "title": "pause()",
  "breadcrumb": [
    "Timer",
    "Timer methods",
    "pause()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "reverse()",
    "slug": "timer/timer-methods/reverse"
  },
  "next": {
    "title": "restart()",
    "slug": "timer/timer-methods/restart"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# pause()

> Source: [https://animejs.com/documentation/timer/timer-methods/pause](https://animejs.com/documentation/timer/timer-methods/pause)
> Breadcrumb: Timer → Timer methods → pause()

Timer

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            pause()                                              
        

          
        Pauses a running timer.

## Returns

The timer itself

Can be chained with other timer methods.

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $pauseButton ] = utils.$('.pause');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime
});

const pauseTimer = () => timer.pause();

$pauseButton.addEventListener('click', pauseTimer);
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
<div class="medium row">
  <fieldset class="controls">
    <button class="button pause">Pause</button>
  </fieldset>
</div>
```

---

← Prev: **reverse()** (`timer/timer-methods/reverse`) | Next: **restart()** (`timer/timer-methods/restart`) →
