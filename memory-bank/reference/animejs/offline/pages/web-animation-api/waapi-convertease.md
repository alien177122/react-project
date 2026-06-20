---
{
  "order": 409,
  "section": "web-animation-api",
  "path": "waapi-convertease",
  "slug": "web-animation-api/waapi-convertease",
  "url": "https://animejs.com/documentation/web-animation-api/waapi-convertease",
  "title": "waapi.convertEase()",
  "breadcrumb": [
    "Web Animation API",
    "waapi.convertEase()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "finished",
    "slug": "web-animation-api/api-differences-with-native-waapi/finished"
  },
  "next": {
    "title": "Engine",
    "slug": "engine"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# waapi.convertEase()

> Source: [https://animejs.com/documentation/web-animation-api/waapi-convertease](https://animejs.com/documentation/web-animation-api/waapi-convertease)
> Breadcrumb: Web Animation API → waapi.convertEase()

Web Animation API

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            waapi.convertEase()                                              
        

          
        Converts any JavaScript easing functions into a compatible WAAPI  linear easing.

```js
import { waapi, spring } from 'animejs';

const spring = spring({ stiffness: 12 });

const linearEasing = waapi.convertEase(spring.ease);
```

## Code example (js)

```js
import { waapi, spring } from 'animejs';

const springs = [
  spring({ stiffness: 100 }),
  spring({ stiffness: 150 }),
  spring({ stiffness: 200 })
]

document.querySelectorAll('#web-animation-api-waapi-convertease .demo .square').forEach(($el, i) => {
  $el.animate({
    translate: '17rem',
    rotate: '1turn',
  }, {
    easing: waapi.convertEase(springs[i].ease),
    delay: i * 250,
    duration: springs[i].duration,
    fill: 'forwards'
  });
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">stiffness: 100</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">stiffness: 150</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">stiffness: 200</div>
</div>
```

---

← Prev: **finished** (`web-animation-api/api-differences-with-native-waapi/finished`) | Next: **Engine** (`engine`) →
