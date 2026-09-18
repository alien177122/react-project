---
{
  "order": 350,
  "section": "timer",
  "path": "timer-playback-settings/reversed",
  "slug": "timer/timer-playback-settings/reversed",
  "url": "https://animejs.com/documentation/timer/timer-playback-settings/reversed",
  "title": "reversed",
  "breadcrumb": [
    "Timer",
    "Timer playback settings",
    "reversed"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "alternate",
    "slug": "timer/timer-playback-settings/alternate"
  },
  "next": {
    "title": "autoplay",
    "slug": "timer/timer-playback-settings/autoplay"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# reversed

> Source: [https://animejs.com/documentation/timer/timer-playback-settings/reversed](https://animejs.com/documentation/timer/timer-playback-settings/reversed)
> Breadcrumb: Timer → Timer playback settings → reversed

Timer

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            reversed                                              
        

          
        Sets the initial direction of the timer.

The timer `currentTime` always progresses from `0` to `duration`.

Only the `iterationTime` property is actually reversed.

## Accepts

`Boolean`

- If set to `true` the timer's first iteration runs in reverse

- If set to `false` the timer's first iteration runs normally

## Default

`false`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.reversed = true;
```

## Code example (js)

```js
import { animate } from 'animejs';

const [ $iterationTime ] = utils.$('.iteration-time');
const [ $currentTime ] = utils.$('.current-time');

createTimer({
  duration: 10000,
  reversed: true,
  onUpdate: self => {
    $iterationTime.innerHTML = self.iterationCurrentTime;
    $currentTime.innerHTML = self.currentTime;
  }
});
```

## Code example (html)

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="iteration-time value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="current-time value lcd">0</span>
    </pre>
  </div>
</div>
```

---

← Prev: **alternate** (`timer/timer-playback-settings/alternate`) | Next: **autoplay** (`timer/timer-playback-settings/autoplay`) →
