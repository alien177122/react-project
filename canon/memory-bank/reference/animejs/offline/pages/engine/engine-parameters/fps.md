---
{
  "order": 142,
  "section": "engine",
  "path": "engine-parameters/fps",
  "slug": "engine/engine-parameters/fps",
  "url": "https://animejs.com/documentation/engine/engine-parameters/fps",
  "title": "fps",
  "breadcrumb": [
    "Engine",
    "Engine parameters",
    "fps"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "speed",
    "slug": "engine/engine-parameters/speed"
  },
  "next": {
    "title": "precision",
    "slug": "engine/engine-parameters/precision"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# fps

> Source: [https://animejs.com/documentation/engine/engine-parameters/fps](https://animejs.com/documentation/engine/engine-parameters/fps)
> Breadcrumb: Engine → Engine parameters → fps

Engine

                          
              
                Parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            fps                                              
        

          
        Controls the global frame rate at which animations are updated and rendered.

Adjusting the frame rate can help optimize performance on lower-end devices or when running many complex animations simultaneously. However, it may affect the perceived smoothness of animations.

```js
engine.fps = 30; // Set all animations to update at 30 fps
```

## Accepts

A `Number` greater than `0`

## Default

`120`

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
  engine.fps = this.value;
}

$range.addEventListener('input', onInput);
```

## Code example (html)

```html
<div class="large row container"></div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=240 value=60 step=1 class="range" />
  </fieldset>
</div>
```

---

← Prev: **speed** (`engine/engine-parameters/speed`) | Next: **precision** (`engine/engine-parameters/precision`) →
