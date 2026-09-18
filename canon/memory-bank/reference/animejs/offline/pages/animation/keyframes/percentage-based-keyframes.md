---
{
  "order": 58,
  "section": "animation",
  "path": "keyframes/percentage-based-keyframes",
  "slug": "animation/keyframes/percentage-based-keyframes",
  "url": "https://animejs.com/documentation/animation/keyframes/percentage-based-keyframes",
  "title": "Percentage based keyframes",
  "breadcrumb": [
    "Animation",
    "Keyframes"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Duration based keyframes",
    "slug": "animation/keyframes/duration-based-keyframes"
  },
  "next": {
    "title": "Animation playback settings",
    "slug": "animation/animation-playback-settings"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Percentage based keyframes

> Source: [https://animejs.com/documentation/animation/keyframes/percentage-based-keyframes](https://animejs.com/documentation/animation/keyframes/percentage-based-keyframes)
> Breadcrumb: Animation → Keyframes

Animation

                          
              
                Keyframes              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Percentage based keyframes                                    JS          
        

          
        Sequences multiple Animatable properties with positions defined from a percentage of the animation total duration.

This syntax is very similar to the CSS `@keyframes` syntax and only exposes control over the `ease` parameter for each individual keyframes.

The first keyframe defines the from value of the tween.

```js
keyframes: {
  '25%' : { x: 100, y: 50, ease: 'out' },
  '50%' : { x: 200, y: 75, },
}
```

## Accepts

An `Object` where

- `keys` are `String` representing the percentages

- `values` are an `Object` containing at least one Animatable properties and an optional `ease` parameter.

## Related

- [Animatable properties](https://animejs.com/documentation/animation/animatable-properties)
- [ease](https://animejs.com/documentation/animation/tween-parameters/ease)
- [from value](https://animejs.com/documentation/animation/tween-parameters/from)

## Code example (js)

```js
import { animate } from 'animejs';

animate('.square', {
  keyframes: {
    '0%'  : { x: '0rem', y: '0rem', ease: 'out' },
    '13%' : { x: '0rem', y: '-2.5rem', },
    '37%' : { x: '17rem', y: '-2.5rem', scale: .5 },
    '63%' : { x: '17rem', y: '2.5rem', scale: .5 },
    '87%' : { x: '0rem', y: '2.5rem', scale: 1 },
    '100%': { y: '0rem', ease: 'in' }
  },
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

← Prev: **Duration based keyframes** (`animation/keyframes/duration-based-keyframes`) | Next: **Animation playback settings** (`animation/animation-playback-settings`) →
