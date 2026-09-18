---
{
  "order": 132,
  "section": "easings",
  "path": "linear-easing",
  "slug": "easings/linear-easing",
  "url": "https://animejs.com/documentation/easings/linear-easing",
  "title": "Linear easing",
  "breadcrumb": [
    "Easings",
    "Linear easing"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Cubic Bézier easing",
    "slug": "easings/cubic-bezier-easing"
  },
  "next": {
    "title": "Steps easing",
    "slug": "easings/steps-easing"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Linear easing

> Source: [https://animejs.com/documentation/easings/linear-easing](https://animejs.com/documentation/easings/linear-easing)
> Breadcrumb: Easings → Linear easing

Easings

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Linear easing                                              
        

          
        A linear easing defines the pace of an animation using linear interpolation between specified points.

## For JavaScript

The `linear()` function must be imported for the js `animate()`: 

```js
import { animate, linear } from 'animejs';

animate(target, { x: 100, ease: linear(0, '0.5 50%', '0.3 75%', 1) });
```

## For WAAPI

The waapi `animate()` function uses the browser native linear timing function:

```js
import { waapi } from 'animejs';

waapi.animate(target, { x: 100, ease: 'linear(0, 0.5 50%, 0.3 75%, 1)' });
```

## Parameters

The linear function takes a list of stops `linear(stop1, stop2, ...stopN)`:

| Name | Type | Info |
| --- | --- | --- |
| number | `Number` | Represents the output value at a point during the animation. At least two values must be specified. The value 0 represents the start, and 1 represents the end. Values outside 0-1 create overshoot effects. |
| percentage (opt) | `String` | Optional timing position as a string: `'value percentage'`. Indicates when the value is reached during the animation. Cannot be used on first or last stops. If omitted, stops are distributed evenly. |

## Related

- [`animate()`](https://animejs.com/documentation/animation)

## Code example (js)

```js
import { animate, waapi, linear } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: linear(0, 0, 0.5, 0.5, 1, 1)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: linear(0, '1 25%', 0, 1)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: 'linear(1, 0 25%, 1, 0)'
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">linear(0, 0, 0.5, 0.5, 1, 1)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">linear(0, '1 25%', 0, 1)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'linear(1, 0 25%, 1, 0)'</div>
</div>
```

---

← Prev: **Cubic Bézier easing** (`easings/cubic-bezier-easing`) | Next: **Steps easing** (`easings/steps-easing`) →
