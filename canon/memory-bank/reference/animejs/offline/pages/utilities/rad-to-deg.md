---
{
  "order": 366,
  "section": "utilities",
  "path": "rad-to-deg",
  "slug": "utilities/rad-to-deg",
  "url": "https://animejs.com/documentation/utilities/rad-to-deg",
  "title": "radToDeg()",
  "breadcrumb": [
    "Utilities",
    "radToDeg()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "degToRad()",
    "slug": "utilities/deg-to-rad"
  },
  "next": {
    "title": "Chain-able utility functions",
    "slug": "utilities/chain-able-utility-functions"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# radToDeg()

> Source: [https://animejs.com/documentation/utilities/rad-to-deg](https://animejs.com/documentation/utilities/rad-to-deg)
> Breadcrumb: Utilities → radToDeg()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            radToDeg()                                              
        

          
        Converts radians into degrees.

```js
const degrees = utils.radToDeg(radians);
```

## Parameters

| Name | Accepts |
| --- | --- |
| radians (opt) | `Number` |

## Returns

A `Number` if radians are provided, otherwise a chain-able utility `Function` to convert radians to degrees:

```js
const radToDeg = utils.radToDeg();
radToDeg(1.7453292519943295); // 100
radToDeg(Math.PI);            // 180

const roundRadToDeg = utils.radToDeg().round(2); // Convert radians to degrees then round to 2 decimal places
roundRadToDeg(Math.PI / 7);  // 25.71
```

## Related

- [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions)

## Code example (js)

```js
import { animate, createAnimatable, utils } from 'animejs';

const degAnimatable = createAnimatable('.deg', {
  rotate: { unit: 'deg', duration: 0 }
});

const [ $rad ] = utils.$('.rad');

const degAnimation = animate($rad, {
  rotate: (Math.PI * 2) + 'rad',
  ease: 'linear',
  loop: true,
  onUpdate: () => {
    const radians = utils.get($rad, 'rotate', false);
    degAnimatable.rotate(utils.radToDeg(radians));
  }
});
```

## Code example (html)

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock rad"></div>
    <div class="label">radians</div>
  </div>
  <div class="col">
    <div class="clock deg"></div>
    <div class="label">degrees</div>
  </div>
</div>
```

---

← Prev: **degToRad()** (`utilities/deg-to-rad`) | Next: **Chain-able utility functions** (`utilities/chain-able-utility-functions`) →
