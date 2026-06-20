---
{
  "order": 400,
  "section": "web-animation-api",
  "path": "hardware-accelerated-animations",
  "slug": "web-animation-api/hardware-accelerated-animations",
  "url": "https://animejs.com/documentation/web-animation-api/hardware-accelerated-animations",
  "title": "Hardware-accelerated animations",
  "breadcrumb": [
    "Web Animation API",
    "Hardware-accelerated animations"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "When to use WAAPI",
    "slug": "web-animation-api/when-to-use-waapi"
  },
  "next": {
    "title": "Improvements to the Web Animation API",
    "slug": "web-animation-api/improvements-to-the-web-animation-api"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Hardware-accelerated animations

> Source: [https://animejs.com/documentation/web-animation-api/hardware-accelerated-animations](https://animejs.com/documentation/web-animation-api/hardware-accelerated-animations)
> Breadcrumb: Web Animation API → Hardware-accelerated animations

Web Animation API

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Hardware-accelerated animations                                              
        

          
        One of the biggest advantages of WAAPI over `requestAnimationFrame` powered animations is the ability to run animations off the main thread, leading to smoother animations when the CPU is busy while consuming less power, which can improve battery life.

The catch is that not all properties can be hardware-accelerated, there are currently only a few that can create a new compositor layer and run off the main thread on every browser.

**Hardware-accelerated properties in every major browsers:**

- opacity

- transform

- translate

- scale

- rotate

**Hardware-accelerated properties in some browsers:**

- clip-path

- filter

Safari (desktop and mobile) currently won't trigger hardware acceleration if the animation is using a custom `'linear()'` easing. This mean that custom power eases like: `'out(3)'`, `'in(3)'`, `'inOut(3)'`, and every JavaScript easing passed to `waapi.animate()` prevents the animation to be hardware accelerated, even if the property supports it.

## Code example (js)

```js
import { animate, waapi, createTimer, utils, cubicBezier } from 'animejs';

const [ $block ] = utils.$('.button');

const waapiAnim = waapi.animate('.waapi.square', {
  translate: 270,
  rotate: 180,
  alternate: true,
  loop: true,
  ease: 'cubic-bezier(0, 0, .58, 1)',
});

const jsAnim = animate('.js.square', {
  x: 270,
  rotate: 180,
  ease: cubicBezier(0, 0, .58, 1),
  alternate: true,
  loop: true,
});

const blockCPUTimer = createTimer({
  onUpdate: () => {
    const end = Date.now() + 100;
    while(Date.now() < end) {
      Math.random() * Math.random();
    }
  },
  autoplay: false
});

let isBusy = false;

const toggleCPU = () => {
  blockCPUTimer[isBusy ? 'pause' : 'play']();
  $block.innerText = (isBusy ? 'block' : 'free') + ' CPU';
  isBusy = !isBusy;
}

$block.addEventListener('click', toggleCPU);
```

## Code example (html)

```html
<div class="medium row">
  <div class="waapi square"></div>
  <span class="padded label">WAAPI</span>
</div>
<div class="medium row">
  <div class="js square"></div>
  <span class="padded label">JS</span>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Block CPU</button>
  </fieldset>
</div>
```

---

← Prev: **When to use WAAPI** (`web-animation-api/when-to-use-waapi`) | Next: **Improvements to the Web Animation API** (`web-animation-api/improvements-to-the-web-animation-api`) →
