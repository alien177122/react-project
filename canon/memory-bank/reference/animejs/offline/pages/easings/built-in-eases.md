---
{
  "order": 129,
  "section": "easings",
  "path": "built-in-eases",
  "slug": "easings/built-in-eases",
  "url": "https://animejs.com/documentation/easings/built-in-eases",
  "title": "Built-in eases",
  "breadcrumb": [
    "Easings",
    "Built-in eases"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "Easings",
    "slug": "easings"
  },
  "next": {
    "title": "Cubic Bézier easing",
    "slug": "easings/cubic-bezier-easing"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Built-in eases

> Source: [https://animejs.com/documentation/easings/built-in-eases](https://animejs.com/documentation/easings/built-in-eases)
> Breadcrumb: Easings → Built-in eases

Easings

                      

          
                        Since 1.0.0
                      

        
                

## 
          
            Built-in eases                                              
        

          
        Both the js and waapi `animate()` functions include a collection of built-in easing functions that can be specified by name directly in the `ease` parameter:

```js
animate(target, { x: 100, ease: 'outQuad' });
animate(target, { x: 100, ease: 'outExpo' });
animate(target, { x: 100, ease: 'outElastic(.8, 1.2)' });
```

All built-in easing functions are also accessible through the imported `eases` object:

```js
import { eases } from 'animejs';

eases.outQuad;
eases.outExpo;
eases.outElastic(.8, 1.2);
```

## List of built-in easing functions

| Type | Parameters | Variants (click the links to open in the editor) |
| --- | --- | --- |
| Linear | -- | `'linear'` |
| Power | power = `1.675` | `'in'`, `'out'`, `'inOut'`, `'outIn'` |
| Quad | -- | `'inQuad'`, `'outQuad'`, `'inOutQuad'`, `'outInQuad'` |
| Cubic | -- | `'inCubic'`, `'outCubic'`, `'inOutCubic'`, `'outInCubic'` |
| Quart | -- | `'inQuart'`, `'outQuart'`, `'inOutQuart'`, `'outInQuart'` |
| Quint | -- | `'inQuint'`, `'outQuint'`, `'inOutQuint'`, `'outInQuint'` |
| Sine | -- | `'inSine'`, `'outSine'`, `'inOutSine'`, `'outInSine'` |
| Exponential | -- | `'inExpo'`, `'outExpo'`, `'inOutExpo'`, `'outInExpo'` |
| Circular | -- | `'inCirc'`, `'outCirc'`, `'inOutCirc'`, `'outInCirc'` |
| Bounce | -- | `'inBounce'`, `'outBounce'`, `'inOutBounce'`, `'outInBounce'` |
| Back | overshoot = `1.70158` | `'inBack'`, `'outBack'`, `'inOutBack'`, `'outInBack'` |
| Elastic | amplitude = `1`, period = `.3` | `'inElastic'`, `'outElastic'`, `'inOutElastic'`, `'outInElastic'` |

## Related

- [`animate()`](https://animejs.com/documentation/animation)
- [ease](https://animejs.com/documentation/animation/tween-parameters/ease)

## Code example (js)

```js
import { animate, waapi } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inOut',
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inOut(3)',
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'inOutExpo',
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'inOut'</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'inOut(3)'</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'inOutExpo'</div>
</div>
```

---

← Prev: **Easings** (`easings`) | Next: **Cubic Bézier easing** (`easings/cubic-bezier-easing`) →
