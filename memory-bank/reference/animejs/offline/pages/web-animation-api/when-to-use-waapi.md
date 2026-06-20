---
{
  "order": 410,
  "section": "web-animation-api",
  "path": "when-to-use-waapi",
  "slug": "web-animation-api/when-to-use-waapi",
  "url": "https://animejs.com/documentation/web-animation-api/when-to-use-waapi",
  "title": "When to use WAAPI",
  "breadcrumb": [
    "Web Animation API",
    "When to use WAAPI"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Web Animation API",
    "slug": "web-animation-api"
  },
  "next": {
    "title": "Hardware-accelerated animations",
    "slug": "web-animation-api/hardware-accelerated-animations"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# When to use WAAPI

> Source: [https://animejs.com/documentation/web-animation-api/when-to-use-waapi](https://animejs.com/documentation/web-animation-api/when-to-use-waapi)
> Breadcrumb: Web Animation API → When to use WAAPI

Web Animation API

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            When to use WAAPI                                              
        

          
        The Web Animations API (WAAPI) offers a lot of advantages over JavaScript `requestAnimationFrame` (RAF) powered animations, but both have their strengths and downsides, and depending on the type of animation or the context in which an animation is created, it's not always possible or even recommended to use WAAPI over RAF.

## Prioritize `waapi.animate()` when:

- Animating during CPU/network load (see the hardware-accelerated animations section)

- Initial page load time is critical and every KB counts (3KB gzip vs 10KB for the JavaScript version)

- Animating complex CSS values not correctly handled by the JavaScript version, like CSS transform matrixes or CSS color functions.

## Use `animate()` when:

- Animating a large amount of targets (> 500)

- Animating JS/canvas/WebGL/WebGPU

- Animating SVG, DOM attributes or CSS properties not handled by the Web Animation API

- Animating complex timelines and keyframes

- You need more control methods

- You need more advanced callback functions

## Related

- [control methods](https://animejs.com/documentation/animation/animation-methods)
- [callback functions](https://animejs.com/documentation/animation/animation-callbacks)

## Code example (js)

```js
import { animate, waapi, utils } from 'animejs';

// WAAPI Animation

waapi.animate('.waapi.square', {
  x: '17rem',
  rotate: 180,
  loop: 3,
  alternate: true,
});

// JS Animation

const data = { x: '0rem', rotate: '0deg' }
const [ $log ] = utils.$('code');

animate(data, {
  x: 17,
  rotate: 180,
  modifier: utils.round(0),
  loop: 3,
  alternate: true,
  onRender: () => $log.innerHTML = JSON.stringify(data)
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square waapi"></div>
</div>
<div class="small row"></div>
<pre class="medium centered row">
  <code>{"x": '0rem',"rotate":"0deg"}</code>
</pre>
```

---

← Prev: **Web Animation API** (`web-animation-api`) | Next: **Hardware-accelerated animations** (`web-animation-api/hardware-accelerated-animations`) →
