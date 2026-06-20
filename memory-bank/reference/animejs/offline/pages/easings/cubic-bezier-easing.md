---
{
  "order": 130,
  "section": "easings",
  "path": "cubic-bezier-easing",
  "slug": "easings/cubic-bezier-easing",
  "url": "https://animejs.com/documentation/easings/cubic-bezier-easing",
  "title": "Cubic Bézier easing",
  "breadcrumb": [
    "Easings",
    "Cubic Bézier easing"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Built-in eases",
    "slug": "easings/built-in-eases"
  },
  "next": {
    "title": "Linear easing",
    "slug": "easings/linear-easing"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Cubic Bézier easing

> Source: [https://animejs.com/documentation/easings/cubic-bezier-easing](https://animejs.com/documentation/easings/cubic-bezier-easing)
> Breadcrumb: Easings → Cubic Bézier easing

Easings

                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Cubic Bézier easing                                              
        

          
        A cubic bezier easing defines the pace of an animation using a Bézier curve.

## For JavaScript

The `cubicBezier()` function must be imported for the js `animate()`: 

```js
import { animate, cubicBezier } from 'animejs';

animate(target, { x: 100, ease: cubicBezier(0, 0, 0.58, 1) });
```

## For WAAPI

The waapi `animate()` function uses the browser native cubic bezier timing function and can be specified as a `String` directly in the `ease` parameter:

```js
import { waapi } from 'animejs';

waapi.animate(target, { x: 100, ease: 'cubic-bezier(0, 0, 0.58, 1)' });

// Or

waapi.animate(target, { x: 100, ease: 'cubicBezier(0, 0, 0.58, 1)' });
```

## Parameters

The cubic bezier function takes 4 parameters `cubicBezier(x1, y1, x2, y2)`:

| Name | Type | Info |
| --- | --- | --- |
| x1 | `Number` | X coordinate of the first control point. Must be between 0 and 1. |
| y1 | `Number` | Y coordinate of the first control point. Can be any value (negative creates anticipation, >1 creates overshoot). |
| x2 | `Number` | X coordinate of the second control point. Must be between 0 and 1. |
| y2 | `Number` | Y coordinate of the second control point. Can be any value (negative creates anticipation, >1 creates overshoot). |

## Examples

| Name | Editor link |
| --- | --- |
| In cubic bezier curve | Open in editor |
| Out cubic bezier curve | Open in editor |
| InOut cubic bezier curve | Open in editor |
| OutIn cubic bezier curve | Open in editor |

## Related

- [`animate()`](https://animejs.com/documentation/animation)
- [ease](https://animejs.com/documentation/animation/tween-parameters/ease)

## Code example (js)

```js
import { animate, waapi, cubicBezier } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  ease: cubicBezier(0.5, 0, 0.9, 0.3)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  ease: cubicBezier(0.1, 0.7, 0.5, 1)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  ease: 'cubicBezier(0.7, 0.1, 0.5, 0.9)'
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">cubicBezier(0.5, 0, 0.9, 0.3)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">cubicBezier(0.1, 0.7, 0.5, 1)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">cubicBezier(0.7, 0.1, 0.5, 0.9)</div>
</div>
```

---

← Prev: **Built-in eases** (`easings/built-in-eases`) | Next: **Linear easing** (`easings/linear-easing`) →
