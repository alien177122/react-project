---
{
  "order": 145,
  "section": "engine",
  "path": "engine-parameters/speed",
  "slug": "engine/engine-parameters/speed",
  "url": "https://animejs.com/documentation/engine/engine-parameters/speed",
  "title": "speed",
  "breadcrumb": [
    "Engine",
    "Engine parameters",
    "speed"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "timeUnit (seconds / milliseconds)",
    "slug": "engine/engine-parameters/timeunit-seconds-milliseconds"
  },
  "next": {
    "title": "fps",
    "slug": "engine/engine-parameters/fps"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# speed

> Source: [https://animejs.com/documentation/engine/engine-parameters/speed](https://animejs.com/documentation/engine/engine-parameters/speed)
> Breadcrumb: Engine → Engine parameters → speed

Engine

                          
              
                Parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            speed                                              
        

          
        Controls the global playback rate of all animations managed by the engine.

Values greater than `1` speed up animations, while values between `0` and `1` slow them down.

Adjusting the global playback rate is useful for creating slow-motion or fast-forward effects across all animations simultaneously.

```js
engine.speed = 0.5; // Run all animations at half speed
```

## Accepts

A `Number` greater than or equal to `0`

## Default

`1`

## Code example (js)

```js
import { engine, animate, utils } from 'animejs';

const [ $container ] = utils.$('.container');
const [ $range ] = utils.$('.range');

for (let i = 0; i < 150; i++) {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  $container.appendChild($particle);
  animate($particle, {
    x: utils.random(-10, 10, 2) + 'rem',
    y: utils.random(-3, 3, 2) + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    delay: utils.random(0, 1000),
    loop: true,
  });  
}

function onInput() {
  utils.sync(() => engine.speed = this.value);
}

$range.addEventListener('input', onInput);
```

## Code example (html)

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0.1 max=2 value=1 step=.01 class="range" />
  </fieldset>
</div>
```

---

← Prev: **timeUnit (seconds / milliseconds)** (`engine/engine-parameters/timeunit-seconds-milliseconds`) | Next: **fps** (`engine/engine-parameters/fps`) →
