---
{
  "order": 396,
  "section": "web-animation-api",
  "path": "api-differences-with-native-waapi/direction",
  "slug": "web-animation-api/api-differences-with-native-waapi/direction",
  "url": "https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/direction",
  "title": "direction",
  "breadcrumb": [
    "Web Animation API",
    "API differences with native WAAPI",
    "direction"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "iterations",
    "slug": "web-animation-api/api-differences-with-native-waapi/iterations"
  },
  "next": {
    "title": "easing",
    "slug": "web-animation-api/api-differences-with-native-waapi/easing"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# direction

> Source: [https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/direction](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/direction)
> Breadcrumb: Web Animation API → API differences with native WAAPI → direction

Web Animation API

                          
              
                API differences              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            direction                                              
        

          
        The `direction` parameter is replaced by two separate parameters: `reversed` and `alternate`.

| `direction` | `reversed` | `alternate` | Effect |
| --- | --- | --- | --- |
| `'forward'` | `false` | `false` | Play forward |
| `'reverse'` | `true` | `false` | Play backward |
| `'alternate'` | `false` | `true` | Alternate on loop |
| `'alternate-reverse'` | `true` | `true` | Start in reverse and alternate on loop |

## Syntax comparison

## Anime.js

```js
waapi.animate('.square', {
  x: 100,
  reversed: true,
  alternate: true,
  loop: 3
});
```

## WAAPI equivalent

```js
const targets = document.querySelectorAll('.square');

targets.forEach(($el, i) => {
  $el.animate({
    translate: '100px',
  }, {
    fill: 'forwards',
    duration: 1000,
    direction: 'alternate-reverse',
    iterations: 4
  })
});
```

## Accepts

- `Boolean`

## Code example (js)

```js
import { waapi, stagger } from 'animejs';

waapi.animate('.square', {
  translate: '17rem',
  reversed: true,
  delay: stagger(100)
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
```

---

← Prev: **iterations** (`web-animation-api/api-differences-with-native-waapi/iterations`) | Next: **easing** (`web-animation-api/api-differences-with-native-waapi/easing`) →
