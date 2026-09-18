---
{
  "order": 362,
  "section": "utilities",
  "path": "lerp",
  "slug": "utilities/lerp",
  "url": "https://animejs.com/documentation/utilities/lerp",
  "title": "lerp()",
  "breadcrumb": [
    "Utilities",
    "lerp()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "mapRange()",
    "slug": "utilities/map-range"
  },
  "next": {
    "title": "damp()",
    "slug": "utilities/damp"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# lerp()

> Source: [https://animejs.com/documentation/utilities/lerp](https://animejs.com/documentation/utilities/lerp)
> Breadcrumb: Utilities → lerp()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            lerp()                                              
        

          
        Interpolates a value between two numbers based on a given *progress* or creates an interpolation `Function` with pre-defined *start* and *end* parameters.

```js
const interpolatedValue = utils.lerp(start, end, progress);
const interpolatorFunction = utils.lerp(start, end);
```

## Parameters

| Name | Accepts |
| --- | --- |
| start | `Number` |
| end | `Number` |
| progress (opt) | `Number` (`[0 - 1]`) |

## Returns

A `Number` if a progress value is provided, otherwise a chain-able utility `Function` to interpolate between the specified *start* and *end* values:

```js
const interpolateBetween0and100 = utils.lerp(0, 100);
interpolateBetween0and100(0.5);  // 50
interpolateBetween0and100(0.75); // 75
interpolateBetween0and100(0.25); // 25

const interpolateAndRound = utils.lerp(0, 100).round(2); // Interpolate then round to 2 decimal places
interpolateAndRound(0.677523); // 67.75
interpolateAndRound(1.202514); // 100
```

## Related

- [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions)

## Code example (js)

```js
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '1turn',
  duration: 3000,
  loop: true,
  ease: 'inOut',
});

animate('.interpolated', {
  rotate: '1turn',
  modifier: utils.lerp(0, 12), // Interpolates 0 to 12 by passing the rotate progress value 0 to 1
  duration: 3000,
  loop: true,
  ease: 'inOut',
});
```

## Code example (html)

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock normal"></div>
    <div class="label">normal</div>
  </div>
  <div class="col">
    <div class="clock interpolated"></div>
    <div class="label">interpolated [0,12]</div>
  </div>
</div>
```

---

← Prev: **mapRange()** (`utilities/map-range`) | Next: **damp()** (`utilities/damp`) →
