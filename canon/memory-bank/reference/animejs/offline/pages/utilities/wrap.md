---
{
  "order": 393,
  "section": "utilities",
  "path": "wrap",
  "slug": "utilities/wrap",
  "url": "https://animejs.com/documentation/utilities/wrap",
  "title": "wrap()",
  "breadcrumb": [
    "Utilities",
    "wrap()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "snap()",
    "slug": "utilities/snap"
  },
  "next": {
    "title": "mapRange()",
    "slug": "utilities/map-range"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# wrap()

> Source: [https://animejs.com/documentation/utilities/wrap](https://animejs.com/documentation/utilities/wrap)
> Breadcrumb: Utilities → wrap()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            wrap()                                              
        

          
        Wraps a `Number` between a range defined with *min* and *max* values or creates a wrapping `Function` with pre-defined *min* and *max* parameters.

```js
const wrappedValue = utils.wrap(value, min, max);
const wrapperFunction = utils.wrap(min, max);
```

## Parameters

| Name | Accepts |
| --- | --- |
| value (opt) | `Number` |
| min | `Number` |
| max | `Number` |

## Returns

A `Number` if a value is provided, otherwise a chain-able utility `Function` to wrap numbers between the specified *min* and *max* values:

```js
const wrapBetween0and100 = utils.wrap(0, 100);
wrapBetween0and100(105); // 5
wrapBetween0and100(220); // 20
wrapBetween0and100(-15); // 85

const wrapAndRound = utils.wrap(0, 100).round(2); // Wrap then round to 2 decimal places
wrapAndRound(105.7523); // 5.75
wrapAndRound(220.2514); // 20.25
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

animate('.wrapped', {
  rotate: '1turn',
  modifier: utils.wrap(-.25, .25), // Used as a modifier
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
    <div class="clock wrapped"></div>
    <div class="label">wrapped [-.25,.25]</div>
  </div>
</div>
```

---

← Prev: **snap()** (`utilities/snap`) | Next: **mapRange()** (`utilities/map-range`) →
