---
{
  "order": 49,
  "section": "animation",
  "path": "animation-playback-settings/loop",
  "slug": "animation/animation-playback-settings/loop",
  "url": "https://animejs.com/documentation/animation/animation-playback-settings/loop",
  "title": "loop",
  "breadcrumb": [
    "Animation",
    "Animation playback settings",
    "loop"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "duration",
    "slug": "animation/animation-playback-settings/duration"
  },
  "next": {
    "title": "loopDelay",
    "slug": "animation/animation-playback-settings/playback-loopdelay"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# loop

> Source: [https://animejs.com/documentation/animation/animation-playback-settings/loop](https://animejs.com/documentation/animation/animation-playback-settings/loop)
> Breadcrumb: Animation → Animation playback settings → loop

Animation

                          
              
                Playback settings              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            loop                                              
        

          
        Defines how many times an animation repeats.

## Accepts

| Value | Effect |
| --- | --- |
| `Number` | The number of loops in the range `[0, Infinity]` |
| `Infinity` | Loop indefinitely |
| `true` | Equivalent to `Infinity` |
| `-1` | Equivalent to `Infinity` |

## Default

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.loop = true;
```

## Code example (js)

```js
import { animate } from 'animejs';

animate('.loop', {
  x: '17.5rem',
  loop: 3,
});

animate('.loop-alternate', {
  x: '17.5rem',
  loop: 3,
  alternate: true,
});

animate('.loop-reverse', {
  x: '17.5rem',
  loop: 3,
  reversed: true,
});

animate('.loop-infinity', {
  x: '17.5rem',
  loop: true, // Or Infinity
});
```

## Code example (html)

```html
<div class="small row">
  <div class="circle loop"></div>
  <div class="padded label">loop: 3</div>
</div>
<div class="small row">
  <div class="circle loop-alternate"></div>
  <div class="padded label">loop: 3, alternate: true</div>
</div>
<div class="small row">
  <div class="circle loop-reverse"></div>
  <div class="padded label">loop: 3, reversed: true</div>
</div>
<div class="small row">
  <div class="circle loop-infinity"></div>
  <div class="padded label">loop: true</div>
</div>
```

---

← Prev: **duration** (`animation/animation-playback-settings/duration`) | Next: **loopDelay** (`animation/animation-playback-settings/playback-loopdelay`) →
