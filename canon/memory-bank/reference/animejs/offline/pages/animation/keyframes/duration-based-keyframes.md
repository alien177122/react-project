---
{
  "order": 57,
  "section": "animation",
  "path": "keyframes/duration-based-keyframes",
  "slug": "animation/keyframes/duration-based-keyframes",
  "url": "https://animejs.com/documentation/animation/keyframes/duration-based-keyframes",
  "title": "Duration based keyframes",
  "breadcrumb": [
    "Animation",
    "Keyframes"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Tween parameters keyframes",
    "slug": "animation/keyframes/tween-parameters-keyframes"
  },
  "next": {
    "title": "Percentage based keyframes",
    "slug": "animation/keyframes/percentage-based-keyframes"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Duration based keyframes

> Source: [https://animejs.com/documentation/animation/keyframes/duration-based-keyframes](https://animejs.com/documentation/animation/keyframes/duration-based-keyframes)
> Breadcrumb: Animation → Keyframes

Animation

                          
              
                Keyframes              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Duration based keyframes                                    JS          
        

          
        Sequences multiple Animatable property one after another.

This syntax allows very fine control over an animation by giving access to `ease`, `delay`, `duration` and `modifier` parameters for each individual keyframes.

The default duration of a keyframe equals the total animation duration divided by the total number of keyframes.

```js
keyframes: [
  { y: 50, ease: 'out', duration: 400 },
  { x: 75, scale: .5, duration: 800 },
]
```

## Accepts

An `Array` of `Object` containing one Animatable property and Tween parameters

## Related

- [Animatable properties](https://animejs.com/documentation/animation/animatable-properties)
- [Tween parameters](https://animejs.com/documentation/animation/tween-parameters)

## Code example (js)

```js
import { animate } from 'animejs';

animate('.square', {
  keyframes: [
    { y: '-2.5rem', ease: 'out', duration: 400 },
    { x: '17rem', scale: .5, duration: 800 },
    { y: '2.5rem' }, // The duration here is 3000 / 5 = 600ms
    { x: 0, scale: 1, duration: 800 },
    { y: 0, ease: 'in', duration: 400 }
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

← Prev: **Tween parameters keyframes** (`animation/keyframes/tween-parameters-keyframes`) | Next: **Percentage based keyframes** (`animation/keyframes/percentage-based-keyframes`) →
