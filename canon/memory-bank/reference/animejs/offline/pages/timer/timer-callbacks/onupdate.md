---
{
  "order": 326,
  "section": "timer",
  "path": "timer-callbacks/onupdate",
  "slug": "timer/timer-callbacks/onupdate",
  "url": "https://animejs.com/documentation/timer/timer-callbacks/onupdate",
  "title": "onUpdate",
  "breadcrumb": [
    "Timer",
    "Timer callbacks",
    "onUpdate"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onComplete",
    "slug": "timer/timer-callbacks/oncomplete"
  },
  "next": {
    "title": "onLoop",
    "slug": "timer/timer-callbacks/onloop"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onUpdate

> Source: [https://animejs.com/documentation/timer/timer-callbacks/onupdate](https://animejs.com/documentation/timer/timer-callbacks/onupdate)
> Breadcrumb: Timer → Timer callbacks → onUpdate

Timer

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onUpdate                                              
        

          
        Executes a function on every frames of a running timer at the specified `frameRate`.

## Accepts

A `Function` whose first argument is the timer itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onUpdate = self => console.log(self.id);
```

## Related

- [frameRate](https://animejs.com/documentation/timer/timer-playback-settings/framerate)

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $updates ] = utils.$('.updates');
const [ $time ] = utils.$('.time');

let updates = 0;

createTimer({
  onUpdate: self => {
    $updates.innerHTML = ++updates;
    $time.innerHTML = self.currentTime;
  }
});
```

## Code example (html)

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">updates</span>
      <span class="updates value">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">current time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
```

---

← Prev: **onComplete** (`timer/timer-callbacks/oncomplete`) | Next: **onLoop** (`timer/timer-callbacks/onloop`) →
