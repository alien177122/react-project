---
{
  "order": 349,
  "section": "timer",
  "path": "timer-playback-settings/playbackrate",
  "slug": "timer/timer-playback-settings/playbackrate",
  "url": "https://animejs.com/documentation/timer/timer-playback-settings/playbackrate",
  "title": "playbackRate",
  "breadcrumb": [
    "Timer",
    "Timer playback settings",
    "playbackRate"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "frameRate",
    "slug": "timer/timer-playback-settings/framerate"
  },
  "next": {
    "title": "Timer callbacks",
    "slug": "timer/timer-callbacks"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# playbackRate

> Source: [https://animejs.com/documentation/timer/timer-playback-settings/playbackrate](https://animejs.com/documentation/timer/timer-playback-settings/playbackrate)
> Breadcrumb: Timer → Timer playback settings → playbackRate

Timer

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            playbackRate                                              
        

          
        Defines a speed multiplier to speed up or slow down a timer playback (`1.0` is normal speed).

This value can be modified later with `timer.speed = .5`.

## Accepts

A `Number` greater than or equal to `0`

If set to `0` the timer won't play.

## Default

`1`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.playbackRate = .75;
```

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $speed ] = utils.$('.speed');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  playbackRate: 2,
  onUpdate: self => $time.innerHTML = utils.round(self.currentTime, 0),
});

const updateSpeed = () => {
  const speed = utils.roundPad(+$range.value, 1);
  $speed.innerHTML = speed;
  utils.sync(() => timer.speed = speed);
}

$range.addEventListener('input', updateSpeed);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">speed</span>
      <span class="speed value">2.0</span>
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
    <input type="range" min=0 max=10 value=2 step=.1 class="range" />
  </fieldset>
</div>
```

---

← Prev: **frameRate** (`timer/timer-playback-settings/framerate`) | Next: **Timer callbacks** (`timer/timer-callbacks`) →
