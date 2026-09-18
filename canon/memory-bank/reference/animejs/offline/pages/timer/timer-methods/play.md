---
{
  "order": 333,
  "section": "timer",
  "path": "timer-methods/play",
  "slug": "timer/timer-methods/play",
  "url": "https://animejs.com/documentation/timer/timer-methods/play",
  "title": "play()",
  "breadcrumb": [
    "Timer",
    "Timer methods",
    "play()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Timer methods",
    "slug": "timer/timer-methods"
  },
  "next": {
    "title": "reverse()",
    "slug": "timer/timer-methods/reverse"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# play()

> Source: [https://animejs.com/documentation/timer/timer-methods/play](https://animejs.com/documentation/timer/timer-methods/play)
> Breadcrumb: Timer → Timer methods → play()

Timer

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            play()                                              
        

          
        Forces the timer to play forward.

## Returns

The timer itself

Can be chained with other timer methods.

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $playButton ] = utils.$('.play');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 2000,
  autoplay: false,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime,
});

const playTimer = () => timer.play();

$playButton.addEventListener('click', playTimer);
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
    <button class="button play">Play</button>
  </fieldset>
</div>
```

---

← Prev: **Timer methods** (`timer/timer-methods`) | Next: **reverse()** (`timer/timer-methods/reverse`) →
