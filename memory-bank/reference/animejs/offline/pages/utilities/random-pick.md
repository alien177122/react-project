---
{
  "order": 368,
  "section": "utilities",
  "path": "random-pick",
  "slug": "utilities/random-pick",
  "url": "https://animejs.com/documentation/utilities/random-pick",
  "title": "randomPick()",
  "breadcrumb": [
    "Utilities",
    "randomPick()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "createSeededRandom()",
    "slug": "utilities/createseededrandom"
  },
  "next": {
    "title": "shuffle()",
    "slug": "utilities/shuffle"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# randomPick()

> Source: [https://animejs.com/documentation/utilities/random-pick](https://animejs.com/documentation/utilities/random-pick)
> Breadcrumb: Utilities → randomPick()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            randomPick()                                              
        

          
        Returns a random element from a collection.

```js
const ramdomElement = utils.randomPick(collection);
```

## Parameters

| Name | Accepts |
| --- | --- |
| collection | `Array` \| `NodeList` \| `String` |

## Returns

An random element from the collection

## Code example (js)

```js
import { utils } from 'animejs';

utils.set('.letter', {
  x: () => utils.randomPick([5, 9, 13, 17]) + 'rem',
  scale: () => utils.randomPick([1, 1.25, 1.5, 1.75]),
  color: () => `var(--hex-${utils.randomPick(['red', 'orange', 'yellow'])}-1)`,
  innerHTML: () => utils.randomPick('ABCD'),
});
```

## Code example (html)

```html
<div class="small row">
  <div class="letter">A</div>
</div>
<div class="small row">
  <div class="letter">B</div>
</div>
<div class="small row">
  <div class="letter">C</div>
</div>
<div class="small row">
  <div class="letter">D</div>
</div>
```

---

← Prev: **createSeededRandom()** (`utilities/createseededrandom`) | Next: **shuffle()** (`utilities/shuffle`) →
