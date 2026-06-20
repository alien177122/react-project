---
{
  "order": 370,
  "section": "utilities",
  "path": "round",
  "slug": "utilities/round",
  "url": "https://animejs.com/documentation/utilities/round",
  "title": "round()",
  "breadcrumb": [
    "Utilities",
    "round()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "shuffle()",
    "slug": "utilities/shuffle"
  },
  "next": {
    "title": "clamp()",
    "slug": "utilities/clamp"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# round()

> Source: [https://animejs.com/documentation/utilities/round](https://animejs.com/documentation/utilities/round)
> Breadcrumb: Utilities → round()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            round()                                              
        

          
        Rounds a `Number` to a specified number of decimal places or creates a rounding `Function` with a pre-defined *decimalLength* parameter.

```js
const roundedValue = utils.round(value, decimalLength);
const roundingFunction = utils.round(decimalLength);
```

## Parameters

| Name | Accepts |
| --- | --- |
| value (opt) | `Number` |
| decimalLength | `Number` |

## Returns

A `Number` if a value is provided, otherwise a chain-able utility `Function` to round numbers with the specified decimal length:

```js
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
});

animate('.rounded', {
  rotate: '1turn',
  modifier: utils.round(1), // Used as a function
  duration: 3000,
  loop: true,
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
    <div class="clock rounded"></div>
    <div class="label">rounded (.1)</div>
  </div>
</div>
```

---

← Prev: **shuffle()** (`utilities/shuffle`) | Next: **clamp()** (`utilities/clamp`) →
