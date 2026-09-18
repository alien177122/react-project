---
{
  "order": 359,
  "section": "utilities",
  "path": "deg-to-rad",
  "slug": "utilities/deg-to-rad",
  "url": "https://animejs.com/documentation/utilities/deg-to-rad",
  "title": "degToRad()",
  "breadcrumb": [
    "Utilities",
    "degToRad()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "padEnd()",
    "slug": "utilities/pad-end"
  },
  "next": {
    "title": "radToDeg()",
    "slug": "utilities/rad-to-deg"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# degToRad()

> Source: [https://animejs.com/documentation/utilities/deg-to-rad](https://animejs.com/documentation/utilities/deg-to-rad)
> Breadcrumb: Utilities → degToRad()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            degToRad()                                              
        

          
        Converts degrees into radians.

```js
const radians = utils.degToRad(degrees);
```

## Parameters

| Name | Accepts |
| --- | --- |
| degrees (opt) | `Number` |

## Returns

A `Number` if degrees are provided, otherwise a chain-able utility `Function` to convert degrees to radians:

```js
const degToRad = utils.degToRad();
degToRad(360); // 6.283185307179586

const roundDegToRad = utils.degToRad().round(2); // Convert degrees to radians then round to 2 decimal places
roundDegToRad(180); // 3.14
roundDegToRad(90);  // 1.57
```

## Related

- [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions)

## Code example (js)

```js
import { animate, createAnimatable, utils } from 'animejs';

const radAnimatable = createAnimatable('.rad', {
  rotate: { unit: 'rad', duration: 0 },
});

const [ $deg ] = utils.$('.deg');

const degAnimation = animate($deg, {
  rotate: '360deg',
  ease: 'linear',
  loop: true,
  onUpdate: () => {
    const degrees = utils.get($deg, 'rotate', false);
    radAnimatable.rotate(utils.degToRad(degrees));
  }
});
```

## Code example (html)

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock deg"></div>
    <div class="label">degrees</div>
  </div>
  <div class="col">
    <div class="clock rad"></div>
    <div class="label">radians</div>
  </div>
</div>
```

---

← Prev: **padEnd()** (`utilities/pad-end`) | Next: **radToDeg()** (`utilities/rad-to-deg`) →
