---
{
  "order": 60,
  "section": "animation",
  "path": "keyframes/tween-values-keyframes",
  "slug": "animation/keyframes/tween-values-keyframes",
  "url": "https://animejs.com/documentation/animation/keyframes/tween-values-keyframes",
  "title": "Tween values keyframes",
  "breadcrumb": [
    "Animation",
    "Keyframes",
    "Tween values keyframes"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Keyframes",
    "slug": "animation/keyframes"
  },
  "next": {
    "title": "Tween parameters keyframes",
    "slug": "animation/keyframes/tween-parameters-keyframes"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Tween values keyframes

> Source: [https://animejs.com/documentation/animation/keyframes/tween-values-keyframes](https://animejs.com/documentation/animation/keyframes/tween-values-keyframes)
> Breadcrumb: Animation → Keyframes → Tween values keyframes

Animation

                          
              
                Keyframes              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Tween values keyframes                                              
        

          
        Sequences multiple Tween value specific to an Animatable property using an `Array`.

The duration between each keyframe equals the total animation duration divided by the number of transitions between each keyframes.

The first keyframe defines the from value of the tween.

You can use this syntax to quickly set the initial from value value of an animation:

```js
animate(target: { x: [-100, 100] }); // Animate x from -100 to 100
```

## Accepts

An `Array` of valid Tween values

## Related

- [Tween value types](https://animejs.com/documentation/animation/tween-value-types)
- [Animatable properties](https://animejs.com/documentation/animation/animatable-properties)
- [from value](https://animejs.com/documentation/animation/tween-parameters/from)

## Code example (js)

```js
import { animate } from 'animejs';

animate('.square', {
  translateX: ['0rem', 0, 17, 17, 0, 0],
  translateY: ['0rem', -2.5, -2.5, 2.5, 2.5, 0],
  scale: [1, 1, .5, .5, 1, 1],
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

← Prev: **Keyframes** (`animation/keyframes`) | Next: **Tween parameters keyframes** (`animation/keyframes/tween-parameters-keyframes`) →
