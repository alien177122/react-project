---
{
  "order": 402,
  "section": "web-animation-api",
  "path": "improvements-to-the-web-animation-api/default-units",
  "slug": "web-animation-api/improvements-to-the-web-animation-api/default-units",
  "url": "https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/default-units",
  "title": "Default units",
  "breadcrumb": [
    "Web Animation API",
    "Improvements to the Web Animation API",
    "Default units"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Multi-targets animation",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation"
  },
  "next": {
    "title": "Function based values",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/function-based-values"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Default units

> Source: [https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/default-units](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/default-units)
> Breadcrumb: Web Animation API → Improvements to the Web Animation API → Default units

Web Animation API

                          
              
                Improvements to WAAPI              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Default units                                              
        

          
        If no unit is specified for properties that expect a unit, like `width` for example, the resulting animation will use the default browser unit for a set of commonly used properties:

## Syntax comparison

## Anime.js

```js
waapi.animate('.circle', {
  x: 100,
  y: 50,
  width: 150,
  height: 80,
});
```

## WAAPI equivalent

```js
const $el = document.querySelector('.circle');

$el.animate({
  translate: '100px 50px',
  width: '150px',
  height: '80px',
}, {
  duration: 1000,
  easing: 'ease-out',
}).finished.then(() => {
  $el.style.translate = '100px';
});
```

## Properties that automatically adds default units

| Name | Default Unit |
| --- | --- |
| x | `'px'` |
| y | `'px'` |
| z | `'px'` |
| translateX | `'px'` |
| translateY | `'px'` |
| translateZ | `'px'` |
| rotate | `'deg'` |
| rotateX | `'deg'` |
| rotateY | `'deg'` |
| rotateZ | `'deg'` |
| skew | `'deg'` |
| skewX | `'deg'` |
| skewY | `'deg'` |
| perspective | `'px'` |
| width | `'px'` |
| height | `'px'` |
| margin | `'px'` |
| padding | `'px'` |
| top | `'px'` |
| right | `'px'` |
| bottom | `'px'` |
| left | `'px'` |
| borderWidth | `'px'` |
| fontSize | `'px'` |
| borderRadius | `'px'` |

## Code example (js)

```js
import { waapi } from 'animejs';

waapi.animate('.square', {
  opacity: .5,
  x: 250,
  rotate: 45,
  width: 40,
  height: 40,
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

← Prev: **Multi-targets animation** (`web-animation-api/improvements-to-the-web-animation-api/multi-targets-animation`) | Next: **Function based values** (`web-animation-api/improvements-to-the-web-animation-api/function-based-values`) →
