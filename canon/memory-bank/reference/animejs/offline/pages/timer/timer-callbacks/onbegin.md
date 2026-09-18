---
{
  "order": 322,
  "section": "timer",
  "path": "timer-callbacks/onbegin",
  "slug": "timer/timer-callbacks/onbegin",
  "url": "https://animejs.com/documentation/timer/timer-callbacks/onbegin",
  "title": "onBegin",
  "breadcrumb": [
    "Timer",
    "Timer callbacks",
    "onBegin"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Timer callbacks",
    "slug": "timer/timer-callbacks"
  },
  "next": {
    "title": "onComplete",
    "slug": "timer/timer-callbacks/oncomplete"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onBegin

> Source: [https://animejs.com/documentation/timer/timer-callbacks/onbegin](https://animejs.com/documentation/timer/timer-callbacks/onbegin)
> Breadcrumb: Timer → Timer callbacks → onBegin

Timer

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onBegin                                              
        

          
        Executes a function when a timer starts.

## Accepts

A `Function` whose first argument is the timer itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onBegin = self => console.log(self.id);
```

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $status ] = utils.$('.status');
const [ $time ] = utils.$('.time');

const timer = createTimer({
  delay: 2000,
  duration: 2000,
  onBegin: self => $status.innerHTML = 'true'
});

const logTimer = createTimer({
  duration: 4000,
  onUpdate: self => $time.innerHTML = timer.currentTime
});
```

## Code example (html)

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">began</span>
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

← Prev: **Timer callbacks** (`timer/timer-callbacks`) | Next: **onComplete** (`timer/timer-callbacks/oncomplete`) →
