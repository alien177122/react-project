---
{
  "order": 408,
  "section": "web-animation-api",
  "path": "improvements-to-the-web-animation-api/spring-and-custom-easings",
  "slug": "web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings",
  "url": "https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings",
  "title": "Spring and custom easings",
  "breadcrumb": [
    "Web Animation API",
    "Improvements to the Web Animation API",
    "Spring and custom easings"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Individual property parameters",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters"
  },
  "next": {
    "title": "API differences with native WAAPI",
    "slug": "web-animation-api/api-differences-with-native-waapi"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Spring and custom easings

> Source: [https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings)
> Breadcrumb: Web Animation API → Improvements to the Web Animation API → Spring and custom easings

Web Animation API

                          
              
                Improvements to WAAPI              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Spring and custom easings                                              
        

          
        Uses any spring and custom JavaScript easing function.

All Anime.js built-in easing functions can be used by passing the function accessible on the `eases` object.

```js
import { eases } from 'animejs';

const { linear, outExpo, cubicBezier } = eases;
```

The `spring()` easing function must be imported separately.

```js
import { spring } from 'animejs';
```

## Built-in eases

| Built-in string | Function | Parameters |
| --- | --- | --- |
| `'linear'``'linear(0, .5 75%, 1)'` | `linear()` | coords (`0, '.5 75%', 1`) |
| `'steps'``'steps(10)'` | `steps()` | steps = `10` |
| `'cubicBezier'``'cubicBezier(.5,0,.5,1)'` | `cubicBezier()` | x1 = `.5`, y1 = `0`, x2 = `.5`, y2 = `1` |
| `'in'``'in(1.675)'` | `in()` | power = `1.675` |
| `'out'``'out(1.675)'` | `out()` | power = `1.675` |
| `'inOut'``'inOut(1.675)'` | `inOut()` | power = `1.675` |

## Default

`'out(2)'`

## Code example (js)

```js
import { waapi, utils, stagger, spring } from 'animejs';

waapi.animate('.circle', {
  y: [0, -30, 0],
  ease: spring({ stiffness: 150, damping: 5 }),
  delay: stagger(75),
  loop: true,
});
```

## Code example (html)

```html
<div class="large row">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
```

---

← Prev: **Individual property parameters** (`web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters`) | Next: **API differences with native WAAPI** (`web-animation-api/api-differences-with-native-waapi`) →
