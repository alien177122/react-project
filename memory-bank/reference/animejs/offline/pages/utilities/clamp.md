---
{
  "order": 354,
  "section": "utilities",
  "path": "clamp",
  "slug": "utilities/clamp",
  "url": "https://animejs.com/documentation/utilities/clamp",
  "title": "clamp()",
  "breadcrumb": [
    "Utilities",
    "clamp()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "round()",
    "slug": "utilities/round"
  },
  "next": {
    "title": "snap()",
    "slug": "utilities/snap"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# clamp()

> Source: [https://animejs.com/documentation/utilities/clamp](https://animejs.com/documentation/utilities/clamp)
> Breadcrumb: Utilities → clamp()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            clamp()                                              
        

          
        Restricts a `Number` between the specified *min* and *max* values or creates a clamping `Function` with pre-defined *min* and *max* parameters.

```js
const clampedValue = utils.clamp(value, min, max);
const clamperFunction = utils.clamp(min, max);
```

## Parameters

| Name | Accepts |
| --- | --- |
| value (opt) | `Number` |
| min | `Number` |
| max | `Number` |

## Returns

A `Number` if a value is provided, otherwise a chain-able utility `Function` to clamp numbers between the specified *min* and *max* values:

```js
const clampBetween0and100 = utils.clamp(0, 100);
clampBetween0and100(90);  // 90
clampBetween0and100(120); // 100
clampBetween0and100(-15); // 0

const clampAndRound = utils.clamp(0, 100).round(2); // Clamp then round to 2 decimal places
clampAndRound(72.7523); // 72.75
clampAndRound(120.2514); // 100
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

animate('.clamped', {
  rotate: '1turn',
  modifier: utils.clamp(.25, .75), // Used as a function
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
    <div class="clock clamped"></div>
    <div class="label">clamped [.25,.75]</div>
  </div>
</div>
```

---

← Prev: **round()** (`utilities/round`) | Next: **snap()** (`utilities/snap`) →
