---
{
  "order": 406,
  "section": "web-animation-api",
  "path": "improvements-to-the-web-animation-api/multi-targets-animation",
  "slug": "web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation",
  "url": "https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation",
  "title": "Multi-targets animation",
  "breadcrumb": [
    "Web Animation API",
    "Improvements to the Web Animation API",
    "Multi-targets animation"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Sensible defaults",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/sensible-defaults"
  },
  "next": {
    "title": "Default units",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/default-units"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Multi-targets animation

> Source: [https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation)
> Breadcrumb: Web Animation API → Improvements to the Web Animation API → Multi-targets animation

Web Animation API

                          
              
                Improvements to WAAPI              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Multi-targets animation                                              
        

          
        Targets one or multiple DOM Elements using a CSS selector, allowing animating multiple targets in one single `animate()` call and support of the `stagger()` method.

## Syntax comparison

## Anime.js

```js
waapi.animate('.circle', {
  translate: '100px',
  delay: stagger(100),
});
```

## WAAPI equivalent

```js
document.querySelectorAll('.circle').forEach(($el, i) => {
  $el.animate({
    translate: '100px',
  }, {
    duration: 1000,
    delay: i * 100,
    easing: 'ease-out',
  }).finished.then(() => {
    $el.style.translate = '100px';
  })
});
```

## Accepts

Any `String` accepted by `document.querySelectorAll()`

## Related

- [`stagger()`](https://animejs.com/documentation/utilities/stagger)

## Code example (js)

```js
import { waapi, stagger } from 'animejs';

waapi.animate('.circle', {
  translate: '17rem',
  delay: stagger(100),
  loop: true,
  alternate: true,
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="circle"></div>
</div>
<div class="medium row">
  <div class="circle"></div>
</div>
<div class="medium row">
  <div class="circle"></div>
</div>
```

---

← Prev: **Sensible defaults** (`web-animation-api/improvements-to-the-web-animation-api/sensible-defaults`) | Next: **Default units** (`web-animation-api/improvements-to-the-web-animation-api/default-units`) →
