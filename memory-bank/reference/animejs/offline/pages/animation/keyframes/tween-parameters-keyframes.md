---
{
  "order": 59,
  "section": "animation",
  "path": "keyframes/tween-parameters-keyframes",
  "slug": "animation/keyframes/tween-parameters-keyframes",
  "url": "https://animejs.com/documentation/animation/keyframes/tween-parameters-keyframes",
  "title": "Tween parameters keyframes",
  "breadcrumb": [
    "Animation",
    "Keyframes"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Tween values keyframes",
    "slug": "animation/keyframes/tween-values-keyframes"
  },
  "next": {
    "title": "Duration based keyframes",
    "slug": "animation/keyframes/duration-based-keyframes"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Tween parameters keyframes

> Source: [https://animejs.com/documentation/animation/keyframes/tween-parameters-keyframes](https://animejs.com/documentation/animation/keyframes/tween-parameters-keyframes)
> Breadcrumb: Animation → Keyframes

Animation

                          
              
                Keyframes              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Tween parameters keyframes                                    JS          
        

          
        Sequences multiple Tween parameters specific to an Animatable property.

This syntax allows very fine control over an animation by giving access to `ease`, `delay`, `duration` and `modifier` parameters for each individual keyframes.

The default `duration` of a keyframe equals the total animation duration divided by the total number of keyframes.

## Accepts

An `Array` of Tween parameters

## Related

- [Tween parameters](https://animejs.com/documentation/animation/tween-parameters)
- [Animatable properties](https://animejs.com/documentation/animation/animatable-properties)

## Code example (js)

```js
import { animate } from 'animejs';

animate('.square', {
  x: [
    { to: '17rem', duration: 700, delay: 400 },
    { to: 0, duration: 700, delay: 800 },
  ],
  y: [
    { to: '-2.5rem', ease: 'out', duration: 400 },
    { to: '2.5rem', duration: 800, delay: 700 },
    { to: 0, ease: 'in', duration: 400, delay: 700 },
  ],
  scale: [
    { to: .5, duration: 700, delay: 400 },
    { to: 1, duration: 700, delay: 800 },
  ],
  rotate: { to: 360, ease: 'linear' },
  duration: 3000,
  ease: 'inOut', // ease applied between each keyframes if no ease defined
  playbackEase: 'ouIn(5)', // ease applied accross all keyframes
  loop: true,
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
</div>
```

---

← Prev: **Tween values keyframes** (`animation/keyframes/tween-values-keyframes`) | Next: **Duration based keyframes** (`animation/keyframes/duration-based-keyframes`) →
