---
{
  "order": 334,
  "section": "timer",
  "path": "timer-methods/reset",
  "slug": "timer/timer-methods/reset",
  "url": "https://animejs.com/documentation/timer/timer-methods/reset",
  "title": "reset()",
  "breadcrumb": [
    "Timer",
    "Timer methods",
    "reset()"
  ],
  "since": "Since 3.0.0",
  "prev": {
    "title": "complete()",
    "slug": "timer/timer-methods/complete"
  },
  "next": {
    "title": "cancel()",
    "slug": "timer/timer-methods/cancel"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# reset()

> Source: [https://animejs.com/documentation/timer/timer-methods/reset](https://animejs.com/documentation/timer/timer-methods/reset)
> Breadcrumb: Timer → Timer methods → reset()

Timer

                          
              
                Methods              
                      

          
                        Since 3.0.0
                      

        
                

## 
          
            reset()                                              
        

          
        Pauses and resets `currentTime`, `progress`, `reversed`, `began`, `completed` properties to their default values.

```js
timer.reset(softReset);
```

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| softReset=false (opt) | `Boolean` | If `true`, only reset the internal values without causing a visual render |

## Returns

The timer itself

Can be chained with other timer methods.

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $time ] = utils.$('.time');
const [ $reset ] = utils.$('.button');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime,
});

const resetTimer = () => {
  timer.reset();
  $time.innerHTML = timer.currentTime;
}

$reset.addEventListener('click', resetTimer);
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
    <button class="button">Reset</button>
  </fieldset>
</div>
```

---

← Prev: **complete()** (`timer/timer-methods/complete`) | Next: **cancel()** (`timer/timer-methods/cancel`) →
