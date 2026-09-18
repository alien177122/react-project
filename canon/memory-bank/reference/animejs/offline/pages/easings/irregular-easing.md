---
{
  "order": 131,
  "section": "easings",
  "path": "irregular-easing",
  "slug": "easings/irregular-easing",
  "url": "https://animejs.com/documentation/easings/irregular-easing",
  "title": "Irregular easing",
  "breadcrumb": [
    "Easings",
    "Irregular easing"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Steps easing",
    "slug": "easings/steps-easing"
  },
  "next": {
    "title": "Spring",
    "slug": "easings/spring"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Irregular easing

> Source: [https://animejs.com/documentation/easings/irregular-easing](https://animejs.com/documentation/easings/irregular-easing)
> Breadcrumb: Easings → Irregular easing

Easings

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Irregular easing                                              
        

          
        An irregular easing defines the pace of an animation using linear interpolation between randomized points.

```js
import { animate, irregular } from 'animejs';

animate(target, { x: 100, ease: irregular(10, 1.5);
```

## Parameters

The irregular function takes up to 2 parameters `irregular(steps, randomness)`:

| Name | Type | Info |
| --- | --- | --- |
| steps | `Number` | Represents the number of random steps to generate. Must be a positive integer. |
| randomness (opt) | `Number` | Controls the amplitude of random variations. Higher values create more dramatic jumps between steps (default: `1`). |

## Examples

| Name | Editor link |
| --- | --- |
| Light irregular easing | Open in editor |
| Heavy irregular easing | Open in editor |

## Code example (js)

```js
import { animate, waapi, irregular } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: irregular(10, .5)
});

animate('.row:nth-child(2) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: irregular(10, 1)
});

waapi.animate('.row:nth-child(3) .square', {
  x: '17rem',
  rotate: 360,
  duration: 2000,
  ease: irregular(10, 2)
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">irregular(10, .5)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">irregular(10, 1)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">irregular(10, 2)</div>
</div>
```

---

← Prev: **Steps easing** (`easings/steps-easing`) | Next: **Spring** (`easings/spring`) →
