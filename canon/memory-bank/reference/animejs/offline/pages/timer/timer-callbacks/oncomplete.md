---
{
  "order": 323,
  "section": "timer",
  "path": "timer-callbacks/oncomplete",
  "slug": "timer/timer-callbacks/oncomplete",
  "url": "https://animejs.com/documentation/timer/timer-callbacks/oncomplete",
  "title": "onComplete",
  "breadcrumb": [
    "Timer",
    "Timer callbacks",
    "onComplete"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onBegin",
    "slug": "timer/timer-callbacks/onbegin"
  },
  "next": {
    "title": "onUpdate",
    "slug": "timer/timer-callbacks/onupdate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onComplete

> Source: [https://animejs.com/documentation/timer/timer-callbacks/oncomplete](https://animejs.com/documentation/timer/timer-callbacks/oncomplete)
> Breadcrumb: Timer → Timer callbacks → onComplete

Timer

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onComplete                                              
        

          
        Executes a function when all the iterations (`loop`) of a timer have finished playing.

## Accepts

A `Function` whose first argument is the timer itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onComplete = self => console.log(self.id);
```

## Related

- [loop](https://animejs.com/documentation/timer/timer-playback-settings/loop)

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $status ] = utils.$('.status');
const [ $time ] = utils.$('.time');

createTimer({
  duration: 2000,
  onComplete: self => $status.innerHTML = 'true',
  onUpdate: self => $time.innerHTML = self.currentTime
});
```

## Code example (html)

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">completed</span>
      <span class="status value">false</span>
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

← Prev: **onBegin** (`timer/timer-callbacks/onbegin`) | Next: **onUpdate** (`timer/timer-callbacks/onupdate`) →
