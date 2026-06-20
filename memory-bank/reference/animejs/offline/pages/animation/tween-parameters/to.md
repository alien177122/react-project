---
{
  "order": 73,
  "section": "animation",
  "path": "tween-parameters/to",
  "slug": "animation/tween-parameters/to",
  "url": "https://animejs.com/documentation/animation/tween-parameters/to",
  "title": "to",
  "breadcrumb": [
    "Animation",
    "Tween parameters",
    "to"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Tween parameters",
    "slug": "animation/tween-parameters"
  },
  "next": {
    "title": "from",
    "slug": "animation/tween-parameters/from"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# to

> Source: [https://animejs.com/documentation/animation/tween-parameters/to](https://animejs.com/documentation/animation/tween-parameters/to)
> Breadcrumb: Animation → Tween parameters → to

Animation

                          
              
                Tween parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            to                                              
        

          
        Animates *to* a specified value from the current target value.

Must be defined inside a local tween parameter `Object`.

## Required

Only if no from property is defined

## Accepts

- Any valid Tween value types

- An `Array` of two Tween value keyframes (`[fromValue, toValue]`)

## Default

The current target value is used if only a from property is defined

## Related

- [from](https://animejs.com/documentation/animation/tween-parameters/from)
- [Tween value types](https://animejs.com/documentation/animation/tween-value-types)
- [Tween value keyframes](https://animejs.com/documentation/animation/keyframes/tween-values-keyframes)

## Code example (js)

```js
import { animate } from 'animejs';

animate('.square', {
  x: {
    to: '16rem', // From 0px to 16rem
    ease: 'outCubic',
  },
  rotate: {
    to: '.75turn', // From 0turn to .75turn
    ease: 'inOutQuad'
  },
});
```

## Code example (html)

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

← Prev: **Tween parameters** (`animation/tween-parameters`) | Next: **from** (`animation/tween-parameters/from`) →
