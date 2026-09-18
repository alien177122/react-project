---
{
  "order": 70,
  "section": "animation",
  "path": "tween-parameters/ease",
  "slug": "animation/tween-parameters/ease",
  "url": "https://animejs.com/documentation/animation/tween-parameters/ease",
  "title": "ease",
  "breadcrumb": [
    "Animation",
    "Tween parameters",
    "ease"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "duration",
    "slug": "animation/tween-parameters/duration"
  },
  "next": {
    "title": "composition",
    "slug": "animation/tween-parameters/composition"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# ease

> Source: [https://animejs.com/documentation/animation/tween-parameters/ease](https://animejs.com/documentation/animation/tween-parameters/ease)
> Breadcrumb: Animation → Tween parameters → ease

Animation

                          
              
                Tween parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            ease                                              
        

          
        Defines the easing function for all animated properties or a specific property.

Easing functions control the rate of change of a property value over time, determining the animation's speed at different points during playback.

All Anime.js built-in easing functions can either be used by passing the easing name `String` or the function accessible on the `eases` object.

## Accepts

- An easing `Function`

- A built-in ease `String`

- A Function based value that returns an easing `Function` or a built-in ease `String`

## Default

`'out(2)'`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.ease = 'outElastic(1, .5)'; // v3 throwback :)
```

## Related

- [easing function](https://animejs.com/documentation/easings)
- [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based)

## Code example (js)

```js
import { animate, waapi, eases, spring } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inQuad',
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: eases.outQuad,
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: {
    to: 360,
    ease: 'out(6)',
  },
  ease: spring({ stiffness: 70 }),
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">all: 'inQuad'</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">all: eases.outQuad</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">x: spring()<br>rotate: 'inQuad'</div>
</div>
```

---

← Prev: **duration** (`animation/tween-parameters/duration`) | Next: **composition** (`animation/tween-parameters/composition`) →
