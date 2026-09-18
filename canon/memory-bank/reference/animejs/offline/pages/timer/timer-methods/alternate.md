---
{
  "order": 329,
  "section": "timer",
  "path": "timer-methods/alternate",
  "slug": "timer/timer-methods/alternate",
  "url": "https://animejs.com/documentation/timer/timer-methods/alternate",
  "title": "alternate()",
  "breadcrumb": [
    "Timer",
    "Timer methods",
    "alternate()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "restart()",
    "slug": "timer/timer-methods/restart"
  },
  "next": {
    "title": "resume()",
    "slug": "timer/timer-methods/resume"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# alternate()

> Source: [https://animejs.com/documentation/timer/timer-methods/alternate](https://animejs.com/documentation/timer/timer-methods/alternate)
> Breadcrumb: Timer → Timer methods → alternate()

Timer

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            alternate()                                              
        

          
        Toggles the playback direction while adjusting the `currentTime` position to reflect the new time progress.

Only the `iterationTime` is actually played in reverse since the `currentTime` always starts at `0` and ends at `duration`.

## Returns

The timer itself

Can be chained with other timer methods.

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $alternateButton ] = utils.$('.button');
const [ $iterationTime ] = utils.$('.iteration-time');

const timer = createTimer({
  duration: 10000,
  loop: true,
  onUpdate: self => {
    $iterationTime.innerHTML = self.iterationCurrentTime;
  }
});

const alternateTimer = () => timer.alternate();

$alternateButton.addEventListener('click', alternateTimer);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="iteration-time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

---

← Prev: **restart()** (`timer/timer-methods/restart`) | Next: **resume()** (`timer/timer-methods/resume`) →
