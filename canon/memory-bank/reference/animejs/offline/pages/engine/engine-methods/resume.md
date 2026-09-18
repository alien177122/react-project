---
{
  "order": 139,
  "section": "engine",
  "path": "engine-methods/resume",
  "slug": "engine/engine-methods/resume",
  "url": "https://animejs.com/documentation/engine/engine-methods/resume",
  "title": "resume()",
  "breadcrumb": [
    "Engine",
    "Engine methods",
    "resume()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "pause()",
    "slug": "engine/engine-methods/pause"
  },
  "next": {
    "title": "Engine properties",
    "slug": "engine/engine-properties"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# resume()

> Source: [https://animejs.com/documentation/engine/engine-methods/resume](https://animejs.com/documentation/engine/engine-methods/resume)
> Breadcrumb: Engine → Engine methods → resume()

Engine

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            resume()                                              
        

          
        Resumes the engine after being either paused with a call to `engine.pause()`.

```js
engine.pause();  // Pauses the engine and all animations
engine.resume(); // Resumes the engine and all animations
```

## Returns

Engine

## Related

- [engine.pause()](https://animejs.com/documentation/engine/engine-methods/pause)
- [Engine](https://animejs.com/documentation/engine)

## Code example (js)

```js
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $pause, $resume ] = utils.$('button');

function addAnimation() {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    loop: true,
    delay: utils.random(0, 1000)
  });
}

for (let i = 0; i < 150; i++) addAnimation();

const resumeEngine = () => engine.resume();
const pauseEngine = () => engine.pause();

$pause.addEventListener('click', pauseEngine);
$resume.addEventListener('click', resumeEngine);
```

## Code example (html)

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <button>Pause</button>
    <button>Resume</button>
  </fieldset>
</div>
```

---

← Prev: **pause()** (`engine/engine-methods/pause`) | Next: **Engine properties** (`engine/engine-properties`) →
