---
{
  "order": 331,
  "section": "timer",
  "path": "timer-methods/complete",
  "slug": "timer/timer-methods/complete",
  "url": "https://animejs.com/documentation/timer/timer-methods/complete",
  "title": "complete()",
  "breadcrumb": [
    "Timer",
    "Timer methods",
    "complete()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "resume()",
    "slug": "timer/timer-methods/resume"
  },
  "next": {
    "title": "reset()",
    "slug": "timer/timer-methods/reset"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# complete()

> Source: [https://animejs.com/documentation/timer/timer-methods/complete](https://animejs.com/documentation/timer/timer-methods/complete)
> Breadcrumb: Timer → Timer methods → complete()

Timer

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            complete()                                              
        

          
        Completes a timer instantly.

## Returns

The timer itself

Can be chained with other timer methods.

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $completeButton ] = utils.$('.complete');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 100000,
  onUpdate: self => $time.innerHTML = self.currentTime
});

const completeTimer = () => timer.complete();

$completeButton.addEventListener('click', completeTimer);
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
    <button class="button complete">Complete</button>
  </fieldset>
</div>
```

---

← Prev: **resume()** (`timer/timer-methods/resume`) | Next: **reset()** (`timer/timer-methods/reset`) →
