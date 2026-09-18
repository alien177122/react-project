---
{
  "order": 71,
  "section": "animation",
  "path": "tween-parameters/from",
  "slug": "animation/tween-parameters/from",
  "url": "https://animejs.com/documentation/animation/tween-parameters/from",
  "title": "from",
  "breadcrumb": [
    "Animation",
    "Tween parameters",
    "from"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "to",
    "slug": "animation/tween-parameters/to"
  },
  "next": {
    "title": "delay",
    "slug": "animation/tween-parameters/delay"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# from

> Source: [https://animejs.com/documentation/animation/tween-parameters/from](https://animejs.com/documentation/animation/tween-parameters/from)
> Breadcrumb: Animation → Tween parameters → from

Animation

                          
              
                Tween parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            from                                              
        

          
        Animates *from* a specified value to the current target value.

Must be defined inside a local tween parameter `Object`.

## Required

Only if no to property is defined

## Accepts

- Any valid Tween value types

## Default

The current target value is used if only a to property is defined

## Related

- [to](https://animejs.com/documentation/animation/tween-parameters/to)
- [Tween value types](https://animejs.com/documentation/animation/tween-value-types)

## Code example (js)

```js
import { animate } from 'animejs';

animate('.square', {
  opacity: { from: .5 }, // Animate from .5 opacity to 1 opacity
  translateX: { from: '16rem' }, // From 16rem to 0rem
  rotate: {
    from: '-.75turn', // From -.75turn to 0turn
    ease: 'inOutQuad',
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

← Prev: **to** (`animation/tween-parameters/to`) | Next: **delay** (`animation/tween-parameters/delay`) →
