---
{
  "order": 330,
  "section": "timer",
  "path": "timer-methods/cancel",
  "slug": "timer/timer-methods/cancel",
  "url": "https://animejs.com/documentation/timer/timer-methods/cancel",
  "title": "cancel()",
  "breadcrumb": [
    "Timer",
    "Timer methods",
    "cancel()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "reset()",
    "slug": "timer/timer-methods/reset"
  },
  "next": {
    "title": "revert()",
    "slug": "timer/timer-methods/revert"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# cancel()

> Source: [https://animejs.com/documentation/timer/timer-methods/cancel](https://animejs.com/documentation/timer/timer-methods/cancel)
> Breadcrumb: Timer → Timer methods → cancel()

Timer

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            cancel()                                              
        

          
        Pauses the timer, removes it from the engine's main loop, and frees up memory.

## Returns

The timer itself

Can be chained with other timer methods.

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $playButton ] = utils.$('.play');
const [ $cancelButton ] = utils.$('.cancel');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime
});

const playTimer = () => timer.play();
const cancelTimer = () => timer.cancel();

$playButton.addEventListener('click', playTimer);
$cancelButton.addEventListener('click', cancelTimer);
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
    <button class="button play">Play</button>
    <button class="button cancel">Cancel</button>
  </fieldset>
</div>
```

---

← Prev: **reset()** (`timer/timer-methods/reset`) | Next: **revert()** (`timer/timer-methods/revert`) →
