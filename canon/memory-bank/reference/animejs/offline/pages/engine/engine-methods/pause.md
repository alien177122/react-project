---
{
  "order": 138,
  "section": "engine",
  "path": "engine-methods/pause",
  "slug": "engine/engine-methods/pause",
  "url": "https://animejs.com/documentation/engine/engine-methods/pause",
  "title": "pause()",
  "breadcrumb": [
    "Engine",
    "Engine methods",
    "pause()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "update()",
    "slug": "engine/engine-methods/update"
  },
  "next": {
    "title": "resume()",
    "slug": "engine/engine-methods/resume"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# pause()

> Source: [https://animejs.com/documentation/engine/engine-methods/pause](https://animejs.com/documentation/engine/engine-methods/pause)
> Breadcrumb: Engine → Engine methods → pause()

Engine

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            pause()                                              
        

          
        Pauses the engine's main loop, pausing all active Timer, Animation, and Timeline instances. Use `engine.resume()` to restart the animations from where they paused.

```js
engine.pause();  // Stops all animations
engine.resume(); // Resumes all animations
```

Timer, Animation, or Timeline can still be added when the engine is paused, but won't play until the engine is started again.

## Returns

Engine

## Related

- [Timer](https://animejs.com/documentation/timer)
- [Animation](https://animejs.com/documentation/animation)
- [Timeline](https://animejs.com/documentation/timeline)
- [engine.resume()](https://animejs.com/documentation/engine/engine-methods/resume)
- [Engine](https://animejs.com/documentation/engine)

## Code example (js)

```js
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $add, $pause ] = utils.$('button');

function addAnimation() {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    loop: true,
  });
}

let timeout = 3;
let interval;

function pauseEngine() {
  engine.pause();
  $pause.setAttribute('disabled', 'true');
  $pause.innerHTML = `Resume in ${timeout--} seconds`;
  interval = setInterval(() => {
    if (timeout <= 0) {
      clearInterval(interval);
      engine.resume();
      $pause.removeAttribute('disabled');
      $pause.innerHTML = 'Pause for 3 seconds';
      timeout = 3;    
    } else {
      $pause.innerHTML = `Resume in ${timeout--} seconds`;
    }
  }, 1000);
}

$add.addEventListener('click', addAnimation);
$pause.addEventListener('click', pauseEngine);
```

## Code example (html)

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <button>Add animation</button>
    <button>Pause for 3 seconds</button>
  </fieldset>
</div>
```

---

← Prev: **update()** (`engine/engine-methods/update`) | Next: **resume()** (`engine/engine-methods/resume`) →
