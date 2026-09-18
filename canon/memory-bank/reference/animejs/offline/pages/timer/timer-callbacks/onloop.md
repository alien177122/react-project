---
{
  "order": 324,
  "section": "timer",
  "path": "timer-callbacks/onloop",
  "slug": "timer/timer-callbacks/onloop",
  "url": "https://animejs.com/documentation/timer/timer-callbacks/onloop",
  "title": "onLoop",
  "breadcrumb": [
    "Timer",
    "Timer callbacks",
    "onLoop"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onUpdate",
    "slug": "timer/timer-callbacks/onupdate"
  },
  "next": {
    "title": "onPause",
    "slug": "timer/timer-callbacks/onpause"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onLoop

> Source: [https://animejs.com/documentation/timer/timer-callbacks/onloop](https://animejs.com/documentation/timer/timer-callbacks/onloop)
> Breadcrumb: Timer → Timer callbacks → onLoop

Timer

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onLoop                                              
        

          
        Executes a function every time a timer iteration completes.

## Accepts

A `Function` whose first argument is the timer itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onLoop = self => console.log(self.id);
```

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');
const [ $time ] = utils.$('.time');

let loops = 0;

createTimer({
  loop: true,
  duration: 1000,
  onLoop: self => $loops.innerHTML = ++loops,
  onUpdate: self => $time.innerHTML = self.iterationCurrentTime,
});
```

## Code example (html)

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">loops</span>
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

← Prev: **onUpdate** (`timer/timer-callbacks/onupdate`) | Next: **onPause** (`timer/timer-callbacks/onpause`) →
