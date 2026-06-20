---
{
  "order": 336,
  "section": "timer",
  "path": "timer-methods/resume",
  "slug": "timer/timer-methods/resume",
  "url": "https://animejs.com/documentation/timer/timer-methods/resume",
  "title": "resume()",
  "breadcrumb": [
    "Timer",
    "Timer methods",
    "resume()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "alternate()",
    "slug": "timer/timer-methods/alternate"
  },
  "next": {
    "title": "complete()",
    "slug": "timer/timer-methods/complete"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# resume()

> Source: [https://animejs.com/documentation/timer/timer-methods/resume](https://animejs.com/documentation/timer/timer-methods/resume)
> Breadcrumb: Timer → Timer methods → resume()

Timer

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            resume()                                              
        

          
        Resumes the playback of a paused timer in its current direction.

## Returns

The timer itself

Can be chained with other timer methods.

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $resumeButton, $pauseButton, $alternateButton ] = utils.$('.button');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime,
  loop: true,
});

const resumeTimer = () => timer.resume();
const pauseTimer = () => timer.pause();
const alternateTimer = () => timer.alternate();

$resumeButton.addEventListener('click', resumeTimer);
$pauseButton.addEventListener('click', pauseTimer);
$alternateButton.addEventListener('click', alternateTimer);
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
    <button class="button">Resume</button>
    <button class="button">Pause</button>
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

---

← Prev: **alternate()** (`timer/timer-methods/alternate`) | Next: **complete()** (`timer/timer-methods/complete`) →
