---
{
  "order": 367,
  "section": "utilities",
  "path": "random",
  "slug": "utilities/random",
  "url": "https://animejs.com/documentation/utilities/random",
  "title": "random()",
  "breadcrumb": [
    "Utilities",
    "random()"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "keepTime()",
    "slug": "utilities/createtimekeeper"
  },
  "next": {
    "title": "createSeededRandom()",
    "slug": "utilities/createseededrandom"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# random()

> Source: [https://animejs.com/documentation/utilities/random](https://animejs.com/documentation/utilities/random)
> Breadcrumb: Utilities → random()

Utilities

                      

          
                        Since 2.0.0
                      

        
                

## 
          
            random()                                              
        

          
        Returns a random `Number` within a specified range, with an optional third parameter determining the number of decimal places.

```js
const randomValue = utils.random(min, max, decimalLength);
```

## Parameters

| Name | Accepts |
| --- | --- |
| min | `Number` |
| max | `Number` |
| decimalLength=0 (opt) | `Number` |

## Returns

`Number`

## Code example (js)

```js
import { utils } from 'animejs';

utils.set('.square', {
  x: () => utils.random(2, 18, 2) + 'rem',
  rotate: () => utils.random(0, 180),
  scale: () => utils.random(.25, 1.5, 3),
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

← Prev: **keepTime()** (`utilities/createtimekeeper`) | Next: **createSeededRandom()** (`utilities/createseededrandom`) →
