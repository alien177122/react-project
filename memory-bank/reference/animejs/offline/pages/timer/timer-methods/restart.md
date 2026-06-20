---
{
  "order": 335,
  "section": "timer",
  "path": "timer-methods/restart",
  "slug": "timer/timer-methods/restart",
  "url": "https://animejs.com/documentation/timer/timer-methods/restart",
  "title": "restart()",
  "breadcrumb": [
    "Timer",
    "Timer methods",
    "restart()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "pause()",
    "slug": "timer/timer-methods/pause"
  },
  "next": {
    "title": "alternate()",
    "slug": "timer/timer-methods/alternate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# restart()

> Source: [https://animejs.com/documentation/timer/timer-methods/restart](https://animejs.com/documentation/timer/timer-methods/restart)
> Breadcrumb: Timer → Timer methods → restart()

Timer

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            restart()                                              
        

          
        Resets all properties and set the `currentTime` of a timer to `0`.

If the `autoplay` is set to `true`, the timer plays automatically.

## Returns

The timer itself

Can be chained with other timer methods.

## Related

- [autoplay](https://animejs.com/documentation/timer/timer-playback-settings/autoplay)

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $restartButton ] = utils.$('.restart');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime
});

const restartTimer = () => timer.restart();

$restartButton.addEventListener('click', restartTimer);
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
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

---

← Prev: **pause()** (`timer/timer-methods/pause`) | Next: **alternate()** (`timer/timer-methods/alternate`) →
