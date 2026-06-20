---
{
  "order": 337,
  "section": "timer",
  "path": "timer-methods/reverse",
  "slug": "timer/timer-methods/reverse",
  "url": "https://animejs.com/documentation/timer/timer-methods/reverse",
  "title": "reverse()",
  "breadcrumb": [
    "Timer",
    "Timer methods",
    "reverse()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "play()",
    "slug": "timer/timer-methods/play"
  },
  "next": {
    "title": "pause()",
    "slug": "timer/timer-methods/pause"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# reverse()

> Source: [https://animejs.com/documentation/timer/timer-methods/reverse](https://animejs.com/documentation/timer/timer-methods/reverse)
> Breadcrumb: Timer → Timer methods → reverse()

Timer

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            reverse()                                              
        

          
        Forces the timer to play backward.

## Returns

The timer itself

Can be chained with other timer methods.

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $reverseButton ] = utils.$('.reverse');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime,
});

const reverseTimer = () => timer.reverse();

$reverseButton.addEventListener('click', reverseTimer);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="half col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button reverse">Reverse</button>
  </fieldset>
</div>
```

---

← Prev: **play()** (`timer/timer-methods/play`) | Next: **pause()** (`timer/timer-methods/pause`) →
