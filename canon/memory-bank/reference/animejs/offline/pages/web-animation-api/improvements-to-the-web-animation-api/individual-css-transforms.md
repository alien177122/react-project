---
{
  "order": 404,
  "section": "web-animation-api",
  "path": "improvements-to-the-web-animation-api/individual-css-transforms",
  "slug": "web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms",
  "url": "https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms",
  "title": "Individual CSS transforms",
  "breadcrumb": [
    "Web Animation API",
    "Improvements to the Web Animation API",
    "Individual CSS transforms"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Function based values",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/function-based-values"
  },
  "next": {
    "title": "Individual property parameters",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Individual CSS transforms

> Source: [https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms)
> Breadcrumb: Web Animation API → Improvements to the Web Animation API → Individual CSS transforms

Web Animation API

                          
              
                Improvements to WAAPI              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Individual CSS transforms                                              
        

          
        Unlike CSS animations or native WAAPI, the CSS `transform` property can be animated by specifying individual properties.

This allows a greater level of control over how to animate individual transform properties.

Individual transforms with WAAPI only works for browsers that support `CSS.registerProperty(propertyDefinition)`, and fallback to no animations.

Individual transforms cannot be hardware-accelerated.

## Valid individual CSS transforms properties

| Name | Shorthand | Default Value | Default Unit |
| --- | --- | --- | --- |
| translateX | x | `'0px'` | `'px'` |
| translateY | y | `'0px'` | `'px'` |
| translateZ | z | `'0px'` | `'px'` |
| rotate | — | `'0deg'` | `'deg'` |
| rotateX | — | `'0deg'` | `'deg'` |
| rotateY | — | `'0deg'` | `'deg'` |
| rotateZ | — | `'0deg'` | `'deg'` |
| scale | — | `'1'` | — |
| scaleX | — | `'1'` | — |
| scaleY | — | `'1'` | — |
| scaleZ | — | `'1'` | — |
| skew | — | `'0deg'` | `'deg'` |
| skewX | — | `'0deg'` | `'deg'` |
| skewY | — | `'0deg'` | `'deg'` |

## Related

- [hardware-accelerated](https://animejs.com/documentation/web-animation-api/hardware-accelerated-animations)

## Code example (js)

```js
import { waapi, utils } from 'animejs';

const $squares = utils.$('.square');

const animateSquares = () => {
  waapi.animate($squares, {
    x: () => utils.random(0, 17) + 'rem',
    y: () => utils.random(-1, 1) + 'rem',
    rotateX: () => utils.random(-90, 90),
    rotateY: () => utils.random(-90, 90),
    onComplete: () => animateSquares()
  });
}

animateSquares();
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

← Prev: **Function based values** (`web-animation-api/improvements-to-the-web-animation-api/function-based-values`) | Next: **Individual property parameters** (`web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters`) →
