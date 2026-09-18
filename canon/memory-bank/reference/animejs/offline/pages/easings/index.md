---
{
  "order": 128,
  "section": "easings",
  "path": "(index)",
  "slug": "easings",
  "url": "https://animejs.com/documentation/easings",
  "title": "Easings",
  "breadcrumb": [
    "Easings"
  ],
  "prev": {
    "title": "Chain-able utility functions",
    "slug": "utilities/chain-able-utility-functions"
  },
  "next": {
    "title": "Built-in eases",
    "slug": "easings/built-in-eases"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Easings

> Source: [https://animejs.com/documentation/easings](https://animejs.com/documentation/easings)
> Breadcrumb: Easings

## 
          
            Easings                                              
        

          
        

## A collection of easing functions and a physics-based spring generator

Use the **Easing Functions Editor** to visualize, create and customize easing functions.

All easing functions are available on the `easings` object imported from the main `'animejs'` module:

```js
import { easings } from 'animejs';

easings.eases.inOut(3);
easings.cubicBezier(.7, .1, .5, .9);
easings.spring({ bounce: .35 });
```

Or imported directly from the main `'animejs'` module:

```js
import { eases, cubicBezier, spring } from 'animejs';

eases.inOut(3);
cubicBezier(.7, .1, .5, .9);
spring({ bounce: .35 });
```

Or imported as a standalone module from the `'animejs/easings'` subpath:

```js
import { eases, cubicBezier, spring } from 'animejs/easings';
```

Easing and spring functions can be passed to the `ease` and `playbackEase` parameters of the `animate()` method or the `ease` parameter of the `stagger()` function.

```js
import { cubicBezier, linear, spring } from 'animejs';

animate(target, { x: 100, ease: 'inOut(3)' });
animate(target, { x: 100, ease: cubicBezier(.7, .1, .5, .9) });
animate(target, { x: 100, ease: spring({ bounce: .35 }) });
```

## Related

- [subpath](https://animejs.com/documentation/getting-started/module-imports)
- [ease](https://animejs.com/documentation/animation/tween-parameters/ease)
- [animate()](https://animejs.com/documentation/animation)

## Code example (js)

```js
import { animate, waapi, cubicBezier, spring } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'out(3)', // Built-in ease
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: cubicBezier(.7, .1, .5, .9), // Custom cubic Bezier curves
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: spring({ bounce: .35 }), // Spring physics
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'inQuad'</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">cubicBezier(.7, .1, .5, .9)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">spring({ bounce: 1.25 })</div>
</div>
```

---

← Prev: **Chain-able utility functions** (`utilities/chain-able-utility-functions`) | Next: **Built-in eases** (`easings/built-in-eases`) →
