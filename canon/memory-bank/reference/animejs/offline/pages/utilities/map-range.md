---
{
  "order": 363,
  "section": "utilities",
  "path": "map-range",
  "slug": "utilities/map-range",
  "url": "https://animejs.com/documentation/utilities/map-range",
  "title": "mapRange()",
  "breadcrumb": [
    "Utilities",
    "mapRange()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "wrap()",
    "slug": "utilities/wrap"
  },
  "next": {
    "title": "lerp()",
    "slug": "utilities/lerp"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# mapRange()

> Source: [https://animejs.com/documentation/utilities/map-range](https://animejs.com/documentation/utilities/map-range)
> Breadcrumb: Utilities → mapRange()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            mapRange()                                              
        

          
        Maps a `Number` from one range to another or creates a mapping `Function` with pre-defined ranges parameters.

```js
const mappedValue = utils.mapRange(value, fromLow, fromHigh, toLow, toHigh);
const mapperFunction = utils.mapRange(fromLow, fromHigh, toLow, toHigh);
```

## Parameters

| Name | Accepts |
| --- | --- |
| value (opt) | `Number` |
| fromLow | `Number` |
| fromHigh | `Number` |
| toLow | `Number` |
| toHigh | `Number` |

## Returns

A `Number` if a value is provided, otherwise a chain-able utility `Function` to map numbers from one range to another:

```js
const mapFrom0and100to0and200 = utils.mapRange(0, 100, 0, 200);
mapFrom0and100to0and200(45);  // 90
mapFrom0and100to0and200(120); // 240
mapFrom0and100to0and200(-15); // -30

const normalizeAndClamp = utils.mapRange(-100, 100, 0, 1).clamp(0, 1); // Normalize then clamp between 0 and 1
normalizeAndClamp(50);  // 0.75
normalizeAndClamp(120); // 1
```

## Related

- [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions)

## Code example (js)

```js
import { animate, utils } from 'animejs';

animate('.normal', {
  rotate: '12turn',
  duration: 12000,
  loop: true,
  ease: 'inOut',
});

animate('.mapped', {
  rotate: '12turn',
  modifier: utils.mapRange(0, 12, 0, 1), // Used as a modifier
  duration: 12000,
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
    <div class="clock mapped"></div>
    <div class="label">mapped [0,12] [0,1]</div>
  </div>
</div>
```

---

← Prev: **wrap()** (`utilities/wrap`) | Next: **lerp()** (`utilities/lerp`) →
