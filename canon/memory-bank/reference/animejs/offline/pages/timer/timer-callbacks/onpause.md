---
{
  "order": 325,
  "section": "timer",
  "path": "timer-callbacks/onpause",
  "slug": "timer/timer-callbacks/onpause",
  "url": "https://animejs.com/documentation/timer/timer-callbacks/onpause",
  "title": "onPause",
  "breadcrumb": [
    "Timer",
    "Timer callbacks",
    "onPause"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onLoop",
    "slug": "timer/timer-callbacks/onloop"
  },
  "next": {
    "title": "then()",
    "slug": "timer/timer-callbacks/then"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onPause

> Source: [https://animejs.com/documentation/timer/timer-callbacks/onpause](https://animejs.com/documentation/timer/timer-callbacks/onpause)
> Breadcrumb: Timer → Timer callbacks → onPause

Timer

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onPause                                              
        

          
        Executes a function when a running timer is paused.

## Accepts

A `Function` whose first argument is the timer itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onPause = self => console.log(self.id);
```

## Code example (js)

```js
import { createTimer, utils } from 'animejs';

const [ $resumeButton, $pauseButton ] = utils.$('.button');
const [ $paused ] = utils.$('.paused');
const [ $time ] = utils.$('.time');

let paused = 0;

const timer = createTimer({
  onPause: () => $paused.innerHTML = ++paused,
  onUpdate: self => $time.innerHTML = self.currentTime
});

const pauseTimer = () => timer.pause();
const resumeTimer = () => timer.resume();

$resumeButton.addEventListener('click', resumeTimer);
$pauseButton.addEventListener('click', pauseTimer);
```

## Code example (html)

```html
<div class="large row">
  <div class="col">
    <pre class="large log row">
      <span class="label">paused</span>
      <span class="value paused">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">elapsed time</span>
      <span class="time value lcd">0</span>
    </pre>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Resume</button>
    <button class="button">Pause</button>
  </fieldset>
</div>
```

---

← Prev: **onLoop** (`timer/timer-callbacks/onloop`) | Next: **then()** (`timer/timer-callbacks/then`) →
