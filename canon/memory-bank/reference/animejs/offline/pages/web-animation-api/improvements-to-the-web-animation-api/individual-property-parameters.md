---
{
  "order": 405,
  "section": "web-animation-api",
  "path": "improvements-to-the-web-animation-api/individual-property-parameters",
  "slug": "web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters",
  "url": "https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters",
  "title": "Individual property parameters",
  "breadcrumb": [
    "Web Animation API",
    "Improvements to the Web Animation API",
    "Individual property parameters"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Individual CSS transforms",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms"
  },
  "next": {
    "title": "Spring and custom easings",
    "slug": "web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Individual property parameters

> Source: [https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api/individual-property-parameters)
> Breadcrumb: Web Animation API → Improvements to the Web Animation API → Individual property parameters

Web Animation API

                          
              
                Improvements to WAAPI              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Individual property parameters                                              
        

          
        Each property can have specific `delay`, `duration` and `ease` parameters by passing an `Object` with at least one `to` or `from` properties as value.

## Related

- [`to`](https://animejs.com/documentation/animation/tween-parameters/to)
- [`from`](https://animejs.com/documentation/animation/tween-parameters/from)

## Code example (js)

```js
import { waapi, utils, stagger } from 'animejs';

waapi.animate('.square', {
  y: {
    to: [0, -30, 0],
    ease: 'out(4)',
    duration: 1000,
  },
  rotate: { from: -180, to: 0, ease: 'out(3)' },
  scale: { to: [.65, 1, .65], ease: 'inOut(3)' },
  duration: 500,
  delay: stagger(75),
  loop: true,
});
```

## Code example (html)

```html
<div class="large row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

← Prev: **Individual CSS transforms** (`web-animation-api/improvements-to-the-web-animation-api/individual-css-transforms`) | Next: **Spring and custom easings** (`web-animation-api/improvements-to-the-web-animation-api/spring-and-custom-easings`) →
