---
{
  "order": 356,
  "section": "utilities",
  "path": "createseededrandom",
  "slug": "utilities/createseededrandom",
  "url": "https://animejs.com/documentation/utilities/createseededrandom",
  "title": "createSeededRandom()",
  "breadcrumb": [
    "Utilities",
    "createSeededRandom()"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "random()",
    "slug": "utilities/random"
  },
  "next": {
    "title": "randomPick()",
    "slug": "utilities/random-pick"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# createSeededRandom()

> Source: [https://animejs.com/documentation/utilities/createseededrandom](https://animejs.com/documentation/utilities/createseededrandom)
> Breadcrumb: Utilities → createSeededRandom()

Utilities

                      

          
                        Since 2.0.0
                      

        
                

## 
          
            createSeededRandom()                                              
        

          
        Returns a pre-seeded pseudo-random function that always return the same suite of `Number` within a specified range, with an optional third parameter determining the number of decimal places.

```js
const seededRandom = utils.createSeededRandom(12345);

const randomValue = seededRandom(min, max, decimalLength);
```

## Parameters

| Name | Accepts |
| --- | --- |
| seed=0 (opt) | `Number` |
| seededMin=0 (opt) | `Number` |
| seededMax=1 (opt) | `Number` |
| seededDecimalLength=0 (opt) | `Number` |

## Returns

A pre-seeded `random()` function

## Related

- [random()](https://animejs.com/documentation/utilities/random)

## Code example (js)

```js
import { utils } from 'animejs';

const seededRandom = utils.createSeededRandom(12345);

utils.set('.square', {
  x: () => seededRandom(2, 18, 2) + 'rem',
  rotate: () => seededRandom(0, 180),
  scale: () => seededRandom(.25, 1.5, 3),
});
```

## Code example (html)

```html
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
```

---

← Prev: **random()** (`utilities/random`) | Next: **randomPick()** (`utilities/random-pick`) →
