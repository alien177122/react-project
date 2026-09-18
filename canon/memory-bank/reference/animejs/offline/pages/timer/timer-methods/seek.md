---
{
  "order": 339,
  "section": "timer",
  "path": "timer-methods/seek",
  "slug": "timer/timer-methods/seek",
  "url": "https://animejs.com/documentation/timer/timer-methods/seek",
  "title": "seek()",
  "breadcrumb": [
    "Timer",
    "Timer methods",
    "seek()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "revert()",
    "slug": "timer/timer-methods/revert"
  },
  "next": {
    "title": "stretch()",
    "slug": "timer/timer-methods/stretch"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# seek()

> Source: [https://animejs.com/documentation/timer/timer-methods/seek](https://animejs.com/documentation/timer/timer-methods/seek)
> Breadcrumb: Timer → Timer methods → seek()

Timer

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            seek()                                              
        

          
        Updates the `currentTime` of the timer and advances it to a specific time.

```js
timer.seek(time, muteCallbacks);
```

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| time | `Number` | The new `currentTime` in ms of the timer |
| muteCallbacks=false (opt) | `Boolean` | If `true`, prevent the callbacks from being fired |

## Returns

The timer itself

Can be chained with other timer methods.

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $playPauseButton ] = utils.$('.play-pause');
const [ $time ] = utils.$('.time');

const updateButtonLabel = timer => {
  $playPauseButton.textContent = timer.paused ? 'Play' : 'Pause';
}

const timer = createTimer({
  duration: 2000,
  autoplay: false,
  onUpdate: self => {
    $range.value = self.currentTime;
    $time.innerHTML = self.currentTime;
    updateButtonLabel(self);
  },
  onComplete: updateButtonLabel,
});


const seekTimer = () => timer.seek(+$range.value);

const playPauseTimer = () => {
  if (timer.paused) {
    timer.play();
  } else {
    timer.pause();
    updateButtonLabel(timer);
  }
}

$range.addEventListener('input', seekTimer);
$playPauseButton.addEventListener('click', playPauseTimer);
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
<div class="medium centered row">
  <fieldset class="controls">
    <input type="range" min=0 max=2000 value=0 class="range" />
    <button style="flex: 0.25;" class="button play-pause">Play</button>
  </fieldset>
</div>
```

---

← Prev: **revert()** (`timer/timer-methods/revert`) | Next: **stretch()** (`timer/timer-methods/stretch`) →
