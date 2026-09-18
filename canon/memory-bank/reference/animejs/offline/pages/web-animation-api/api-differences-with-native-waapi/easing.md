---
{
  "order": 397,
  "section": "web-animation-api",
  "path": "api-differences-with-native-waapi/easing",
  "slug": "web-animation-api/api-differences-with-native-waapi/easing",
  "url": "https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/easing",
  "title": "easing",
  "breadcrumb": [
    "Web Animation API",
    "API differences with native WAAPI",
    "easing"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "direction",
    "slug": "web-animation-api/api-differences-with-native-waapi/direction"
  },
  "next": {
    "title": "finished",
    "slug": "web-animation-api/api-differences-with-native-waapi/finished"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# easing

> Source: [https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/easing](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/easing)
> Breadcrumb: Web Animation API → API differences with native WAAPI → easing

Web Animation API

                          
              
                API differences              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            easing                                              
        

          
        The `easing` parameter is replaced by the `ease` parameter and accepts any type of easing `Function` on top of all the native WAAPI easing functions.

The default easing is `'out(2)'` instead of `'linear'`.

## Syntax comparison

## Anime.js

```js
waapi.animate('.square', {
  x: 100,
  ease: 'outElastic(1.25, .1)'
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
    easing: 'linear(0, 0.0874, 0.2047, 0.3429, 0.4929, 0.6464, 0.7961, 0.9357, 1.06, 1.1656, 1.25, 1.3122, 1.3521, 1.371, 1.3706, 1.3536, 1.3227, 1.2812, 1.2323, 1.1793, 1.125, 1.0721, 1.0227, 0.9788, 0.9415, 0.9116, 0.8896, 0.8755, 0.8688, 0.869, 0.875, 0.8859, 0.9006, 0.9179, 0.9366, 0.9558, 0.9745, 0.992, 1.0075, 1.0207, 1.0313, 1.039, 1.044, 1.0464, 1.0463, 1.0442, 1.0403, 1.0351, 1.029, 1.0224, 1.0156, 1.009, 1.0028, 0.9973, 0.9927, 0.989, 0.9862, 0.9844, 0.9836, 0.9844, 0.9857, 0.9876, 0.9897, 0.9921, 0.9945, 0.9968, 0.999, 1.0009, 1.0026, 1.0039, 1.0049, 1.0055, 1.0058, 1.0055, 1.005, 1.0044, 1.0036, 1.0028, 1.002, 1.0011, 1.0004, 0.9997, 0.9991, 0.9986, 0.9983, 0.9981, 0.998, 0.9982, 0.9984, 0.9987, 0.999, 0.9993, 0.9996, 0.9999, 1.0001, 1.0003, 1)'
  })
});
```

## Accepts

- Any valid easing `String` name or `Function`

- Any valid native WAAPI easing functions `String` name

## Code example (js)

```js
import { waapi, stagger } from 'animejs';

waapi.animate('.square', {
  translate: '17rem',
  ease: 'inOut(6)',
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

← Prev: **direction** (`web-animation-api/api-differences-with-native-waapi/direction`) | Next: **finished** (`web-animation-api/api-differences-with-native-waapi/finished`) →
