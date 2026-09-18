---
{
  "order": 407,
  "section": "web-animation-api",
  "path": "improvements-to-the-web-animation-api/sensible-defaults",
  "slug": "web-animation-api/improvements-to-the-web-animation-api/sensible-defaults",
  "url": "https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/sensible-defaults",
  "title": "Sensible defaults",
  "breadcrumb": [
    "Web Animation API",
    "Improvements to the Web Animation API",
    "Sensible defaults"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Improvements to the Web Animation API",
    "slug": "web-animation-api/improvements-to-the-web-animation-api"
  },
  "next": {
    "title": "Multi-targets animation",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Sensible defaults

> Source: [https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/sensible-defaults](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/sensible-defaults)
> Breadcrumb: Web Animation API → Improvements to the Web Animation API → Sensible defaults

Web Animation API

                          
              
                Improvements to WAAPI              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Sensible defaults                                              
        

          
        By default, a native WAAPI animation requires a duration to be set, won't have any easing applied, and more annoyingly, won't persist its final value, letting the user to take care of setting the final styles manually after the animation completes.

Anime.js simplifies all that by making sure the animation state is preserved after the animation completes, and uses the same default duration and delay as the JS `animate()` method.

## Syntax comparison

## Anime.js

```js
waapi.animate('.circle', { translate: '100px' });
```

## WAAPI equivalent

```js
const $el = document.querySelector('.circle');

$el.animate({ translate: '100px' }, {
  duration: 1000,
  easing: 'ease-out',
}).finished.then(() => {
  $el.style.translate = '100px';
});
```

## Code example (js)

```js
import { waapi } from 'animejs';

waapi.animate('.circle', { translate: '16rem' });
```

## Code example (html)

```html
<div class="large row">
  <div class="circle"></div>
</div>
```

---

← Prev: **Improvements to the Web Animation API** (`web-animation-api/improvements-to-the-web-animation-api`) | Next: **Multi-targets animation** (`web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation`) →
