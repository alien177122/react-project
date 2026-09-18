---
{
  "order": 403,
  "section": "web-animation-api",
  "path": "improvements-to-the-web-animation-api/function-based-values",
  "slug": "web-animation-api/improvements-to-the-web-animation-api/function-based-values",
  "url": "https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/function-based-values",
  "title": "Function based values",
  "breadcrumb": [
    "Web Animation API",
    "Improvements to the Web Animation API",
    "Function based values"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Default units",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/default-units"
  },
  "next": {
    "title": "Individual CSS transforms",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Function based values

> Source: [https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/function-based-values](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/function-based-values)
> Breadcrumb: Web Animation API → Improvements to the Web Animation API → Function based values

Web Animation API

                          
              
                Improvements to WAAPI              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Function based values                                              
        

          
        Adds Function based value support to WAAPI animations, allowing passing different values pert targets.

## Syntax comparison

## Anime.js

```js
waapi.animate('.square', {
  translate: () => `${utils.random(10, 17)}rem`,
  rotate: () => utils.random(-180, 180),
  scale: (_, i) => .25 + (i * .25),
  delay: stagger(100)
});
```

## WAAPI equivalent

```js
document.querySelectorAll('.square').forEach(($el, i) => {
  $el.animate({
    translate: `${utils.random(10, 17)}rem`,
    rotate: utils.random(-180, 180),
    scale: .25 + (i * .25),
  }, {
    duration: 1000,
    delay: i * 100,
    easing: 'ease-out',
  }).finished.then(() => {
    $el.style.translate = '100px';
  })
});
```

## Related

- [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based)

## Code example (js)

```js
import { waapi, utils, stagger } from 'animejs';

waapi.animate('.square', {
  translate: () => `${utils.random(10, 17)}rem`,
  rotate: () => utils.random(-180, 180),
  scale: (_, i) => .25 + (i * .25),
  duration: $el => $el.dataset.duration,
  delay: stagger(100)
});
```

## Code example (html)

```html
<div class="small row">
  <div data-duration="400" class="square"></div>
</div>
<div class="small row">
  <div data-duration="600" class="square"></div>
</div>
<div class="small row">
  <div data-duration="800" class="square"></div>
</div>
<div class="small row">
  <div data-duration="1000" class="square"></div>
</div>
```

---

← Prev: **Default units** (`web-animation-api/improvements-to-the-web-animation-api/default-units`) | Next: **Individual CSS transforms** (`web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms`) →
