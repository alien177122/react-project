---
{
  "order": 343,
  "section": "timer",
  "path": "timer-playback-settings/autoplay",
  "slug": "timer/timer-playback-settings/autoplay",
  "url": "https://animejs.com/documentation/timer/timer-playback-settings/autoplay",
  "title": "autoplay",
  "breadcrumb": [
    "Timer",
    "Timer playback settings",
    "autoplay"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "reversed",
    "slug": "timer/timer-playback-settings/reversed"
  },
  "next": {
    "title": "frameRate",
    "slug": "timer/timer-playback-settings/framerate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# autoplay

> Source: [https://animejs.com/documentation/timer/timer-playback-settings/autoplay](https://animejs.com/documentation/timer/timer-playback-settings/autoplay)
> Breadcrumb: Timer → Timer playback settings → autoplay

Timer

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            autoplay                                              
        

          
        Defines the play mode of a timer.

The autoplay parameter has no effect when the timer is added to a timeline, and will be overridden to `false`.

## Accepts

`Boolean` | `onScroll()`

- If set to `true` the timer plays automatically

- If set to `false` the timer has to be manually played

- If set to `onScroll()` the timer will starts when the scroll thresholds conditions are met

## Default

`true`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.autoplay = false;
```

## Related

- [Scroll](https://animejs.com/documentation/events/onscroll)
- [scroll thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds)

## Code example (js)

```js
const [ $time ] = utils.$('.time');
const [ $playButton ] = utils.$('.play');

const timer = createTimer({
  autoplay: false,
  onUpdate: self => $time.innerHTML = self.currentTime
});


const playTimer = () => timer.play();

$playButton.addEventListener('click', playTimer);
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
    <button class="play">Play</button>
  </fieldset>
</div>
```

---

← Prev: **reversed** (`timer/timer-playback-settings/reversed`) | Next: **frameRate** (`timer/timer-playback-settings/framerate`) →
