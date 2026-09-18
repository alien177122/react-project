---
{
  "order": 342,
  "section": "timer",
  "path": "timer-playback-settings/alternate",
  "slug": "timer/timer-playback-settings/alternate",
  "url": "https://animejs.com/documentation/timer/timer-playback-settings/alternate",
  "title": "alternate",
  "breadcrumb": [
    "Timer",
    "Timer playback settings",
    "alternate"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "loopDelay",
    "slug": "timer/timer-playback-settings/playback-loopdelay"
  },
  "next": {
    "title": "reversed",
    "slug": "timer/timer-playback-settings/reversed"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# alternate

> Source: [https://animejs.com/documentation/timer/timer-playback-settings/alternate](https://animejs.com/documentation/timer/timer-playback-settings/alternate)
> Breadcrumb: Timer → Timer playback settings → alternate

Timer

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            alternate                                              
        

          
        Defines if the direction of the timer alternates on each iteration when the `loop` is set to `true` or superior to `1`.

## Accepts

`Boolean`

## Default

`false`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.alternate = true;
```

## Related

- [loop](https://animejs.com/documentation/timer/timer-playback-settings/loop)

## Code example (js)

```js
import { animate } from 'animejs';

const [ $loops ] = utils.$('.loops');
const [ $time ] = utils.$('.time');

let loops = 0;

createTimer({
  loop: true,
  duration: 1000,
  alternate: true,
  onLoop: () => $loops.innerHTML = ++loops,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime
});
```

## Code example (html)

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">loops count</span>
      <span class="loops value">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">iteration time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

---

← Prev: **loopDelay** (`timer/timer-playback-settings/playback-loopdelay`) | Next: **reversed** (`timer/timer-playback-settings/reversed`) →
