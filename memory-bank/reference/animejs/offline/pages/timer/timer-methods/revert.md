---
{
  "order": 338,
  "section": "timer",
  "path": "timer-methods/revert",
  "slug": "timer/timer-methods/revert",
  "url": "https://animejs.com/documentation/timer/timer-methods/revert",
  "title": "revert()",
  "breadcrumb": [
    "Timer",
    "Timer methods",
    "revert()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "cancel()",
    "slug": "timer/timer-methods/cancel"
  },
  "next": {
    "title": "seek()",
    "slug": "timer/timer-methods/seek"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# revert()

> Source: [https://animejs.com/documentation/timer/timer-methods/revert](https://animejs.com/documentation/timer/timer-methods/revert)
> Breadcrumb: Timer → Timer methods → revert()

Timer

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            revert()                                              
        

          
        Cancels the timer, and reverts the linked `onScroll()` instance if necessary.

Use `.revert()` when you want to completely stop and destroy and timer its attached ScrollObserver.

## Returns

The timer itself

Can be chained with other timer methods.

## Related

- [Scroll](https://animejs.com/documentation/events/onscroll)

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $revertButton ] = utils.$('.revert');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  onUpdate: self => $time.innerHTML = self.currentTime
});

const revertTimer = () => {
  timer.revert();
  $time.innerHTML = timer.currentTime
}

$revertButton.addEventListener('click', revertTimer);
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
    <button class="button revert">Revert</button>
  </fieldset>
</div>
```

---

← Prev: **cancel()** (`timer/timer-methods/cancel`) | Next: **seek()** (`timer/timer-methods/seek`) →
