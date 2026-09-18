---
{
  "order": 399,
  "section": "web-animation-api",
  "path": "api-differences-with-native-waapi/iterations",
  "slug": "web-animation-api/api-differences-with-native-waapi/iterations",
  "url": "https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/iterations",
  "title": "iterations",
  "breadcrumb": [
    "Web Animation API",
    "API differences with native WAAPI",
    "iterations"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "API differences with native WAAPI",
    "slug": "web-animation-api/api-differences-with-native-waapi"
  },
  "next": {
    "title": "direction",
    "slug": "web-animation-api/api-differences-with-native-waapi/direction"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# iterations

> Source: [https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/iterations](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/iterations)
> Breadcrumb: Web Animation API → API differences with native WAAPI → iterations

Web Animation API

                          
              
                API differences              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            iterations                                              
        

          
        The `iterations` parameter is replaced by the `loop` parameter and determines how many times the animation will repeat instead of the total number of iterations.

| `iterations` | `loop` | Effect |
| --- | --- | --- |
| `1` | `0` | No repeat |
| `3` | `2` | Repeat twice |
| `Infinity` | `Infinity` \| `true` \| -1 | Repeat indefinitely |

## Syntax comparison

## Anime.js

```js
waapi.animate('.square', {
  x: 100,
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
    iterations: 4
  })
});
```

## Accepts

- A `Number` `[0, Infinity]`

- A `Boolean` where `true` is equivalent to `Infinity` and `false` doesn't loop

## Code example (js)

```js
import { waapi, stagger } from 'animejs';

waapi.animate('.square', {
  translate: '17rem',
  loop: 3,
  alternate: true,
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

← Prev: **API differences with native WAAPI** (`web-animation-api/api-differences-with-native-waapi`) | Next: **direction** (`web-animation-api/api-differences-with-native-waapi/direction`) →
