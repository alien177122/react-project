---
{
  "order": 340,
  "section": "timer",
  "path": "timer-methods/stretch",
  "slug": "timer/timer-methods/stretch",
  "url": "https://animejs.com/documentation/timer/timer-methods/stretch",
  "title": "stretch()",
  "breadcrumb": [
    "Timer",
    "Timer methods",
    "stretch()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "seek()",
    "slug": "timer/timer-methods/seek"
  },
  "next": {
    "title": "Timer properties",
    "slug": "timer/timer-properties"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# stretch()

> Source: [https://animejs.com/documentation/timer/timer-methods/stretch](https://animejs.com/documentation/timer/timer-methods/stretch)
> Breadcrumb: Timer → Timer methods → stretch()

Timer

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            stretch()                                              
        

          
        Changes the total duration of a timer to fit a specific time.

The total duration is equal to the duration of an iteration multiplied with the total number of iterations. So if a timer has a duration of 1000ms and loops twice (3 iterations in total), the total duration is 3000ms (1000 * 3).

```js
timer.stretch(duration);
```

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| duration | `Number` | The new total duration in ms of the timer |

## Returns

The timer itself

Can be chained with other timer methods.

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $duration ] = utils.$('.duration');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  duration: 2000,
  onUpdate: self => $time.innerHTML = self.currentTime
});

const stretchTimer = () => {
  timer.stretch(+$range.value);
  $duration.innerHTML = timer.duration;
  timer.restart();
}

$range.addEventListener('input', stretchTimer);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">duration</span>
      <span class="duration value">2000</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>

<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=4000 value=2000 step=100 class="range" />
  </fieldset>
</div>
```

---

← Prev: **seek()** (`timer/timer-methods/seek`) | Next: **Timer properties** (`timer/timer-properties`) →
