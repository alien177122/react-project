---
{
  "order": 346,
  "section": "timer",
  "path": "timer-playback-settings/framerate",
  "slug": "timer/timer-playback-settings/framerate",
  "url": "https://animejs.com/documentation/timer/timer-playback-settings/framerate",
  "title": "frameRate",
  "breadcrumb": [
    "Timer",
    "Timer playback settings",
    "frameRate"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "autoplay",
    "slug": "timer/timer-playback-settings/autoplay"
  },
  "next": {
    "title": "playbackRate",
    "slug": "timer/timer-playback-settings/playbackrate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# frameRate

> Source: [https://animejs.com/documentation/timer/timer-playback-settings/framerate](https://animejs.com/documentation/timer/timer-playback-settings/framerate)
> Breadcrumb: Timer → Timer playback settings → frameRate

Timer

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            frameRate                                              
        

          
        Determines the frames per second (fps) at which a timer runs.

This value can be modified later with `timer.fps = 30`.

## Accepts

A `Number` greater than `0`

The frame rate is capped to the monitor refresh rate or in some cases by the browser itself.

## Default

`120`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.frameRate = 30;
```

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $fps ] = utils.$('.fps');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  frameRate: 60,
  onUpdate: self => $time.innerHTML = self.currentTime,
});

const updateFps = () => {
  const { value } = $range;
  $fps.innerHTML = value;
  timer.fps = value;
}

$range.addEventListener('input', updateFps);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">fps</span>
      <span class="fps value">60</span>
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
    <input type="range" min=0 max=120 value=60 step=1 class="range" />
  </fieldset>
</div>
```

---

← Prev: **autoplay** (`timer/timer-playback-settings/autoplay`) | Next: **playbackRate** (`timer/timer-playback-settings/playbackrate`) →
