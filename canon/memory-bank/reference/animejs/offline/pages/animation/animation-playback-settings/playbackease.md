---
{
  "order": 52,
  "section": "animation",
  "path": "animation-playback-settings/playbackease",
  "slug": "animation/animation-playback-settings/playbackease",
  "url": "https://animejs.com/documentation/animation/animation-playback-settings/playbackease",
  "title": "playbackEase",
  "breadcrumb": [
    "Animation",
    "Animation playback settings"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "playbackRate",
    "slug": "animation/animation-playback-settings/playbackrate"
  },
  "next": {
    "title": "persist",
    "slug": "animation/animation-playback-settings/persist"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# playbackEase

> Source: [https://animejs.com/documentation/animation/animation-playback-settings/playbackease](https://animejs.com/documentation/animation/animation-playback-settings/playbackease)
> Breadcrumb: Animation → Animation playback settings

Animation

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            playbackEase                                    JS          
        

          
        Applies and easing function to the entire playback of the animation.

Unlike the tween `ease` parameter that is applied in between every property keyframes like this:

```text
0 ────────────────────────────────› 1
A ──ease──› B ──ease──› C ──ease──› D
```

The `playbackEase` parameter is applied globally like this:

```text
0 ──────────────ease──────────────› 1
A ────────› B ────────› C ────────› D
```

## Accepts

ease

## Default

`null`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.playbackEase = 'inOut';
```

## Related

- [ease](https://animejs.com/documentation/animation/tween-parameters/ease)

## Code example (js)

```js
import { animate } from 'animejs';

animate('.square', {
  keyframes: [
    { y: '-2.5rem', duration: 400 },
    { x: '17rem', rotate: 180, scale: .5 },
    { y: '2.5rem' },
    { x: 0, rotate: 360, scale: 1 },
    { y: 0, duration: 400 }
  ],
  duration: 4000,
  playbackEase: 'inOut(3)', // this ease is applied accross all keyframes
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

← Prev: **playbackRate** (`animation/animation-playback-settings/playbackrate`) | Next: **persist** (`animation/animation-playback-settings/persist`) →
