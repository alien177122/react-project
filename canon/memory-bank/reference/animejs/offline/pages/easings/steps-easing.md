---
{
  "order": 134,
  "section": "easings",
  "path": "steps-easing",
  "slug": "easings/steps-easing",
  "url": "https://animejs.com/documentation/easings/steps-easing",
  "title": "Steps easing",
  "breadcrumb": [
    "Easings",
    "Steps easing"
  ],
  "since": "Since 3.0.0",
  "prev": {
    "title": "Linear easing",
    "slug": "easings/linear-easing"
  },
  "next": {
    "title": "Irregular easing",
    "slug": "easings/irregular-easing"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Steps easing

> Source: [https://animejs.com/documentation/easings/steps-easing](https://animejs.com/documentation/easings/steps-easing)
> Breadcrumb: Easings → Steps easing

Easings

                      

          
                        Since 3.0.0
                      

        
                

## 
          
            Steps easing                                              
        

          
        A steps easing creates a stepped animation that jumps between values at discrete intervals.

## For JavaScript

The `steps()` function must be imported for the js `animate()`: 

```js
import { animate, steps } from 'animejs';

animate(target, { x: 100, ease: steps(5) });
// Or with fromStart
animate(target, { x: 100, ease: steps(5, true) });
```

## For WAAPI

The waapi `animate()` function uses the browser native steps timing function:

```js
import { waapi } from 'animejs';

waapi.animate(target, { x: 100, ease: 'steps(5)' });
// Or with jump-start
waapi.animate(target, { x: 100, ease: 'steps(5, start)' });
```

## Parameters

The steps function takes up to 2 parameters `steps(n, fromStart)`:

| Name | Type | Info |
| --- | --- | --- |
| steps | `Number` | Represents the number of equal steps to divide the animation into. Must be a positive integer. |
| fromStart (opt) | `Boolean` | When `true`, the change happens at the start of each step. When `false`, the change happens at the end of each step (default: `false`). |

## Examples

| Name | Editor link |
| --- | --- |
| Steps start easing | Open in editor |
| Steps end easing | Open in editor |

## Related

- [`animate()`](https://animejs.com/documentation/animation)

## Code example (js)

```js
import { animate, waapi, cubicBezier } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: steps(4)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: steps(4, true)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'steps(8, end)'
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">steps(4)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">steps(4, true)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">'steps(8, end)'</div>
</div>
```

---

← Prev: **Linear easing** (`easings/linear-easing`) | Next: **Irregular easing** (`easings/irregular-easing`) →
