---
{
  "order": 51,
  "section": "animation",
  "path": "animation-playback-settings/playback-loopdelay",
  "slug": "animation/animation-playback-settings/playback-loopdelay",
  "url": "https://animejs.com/documentation/animation/animation-playback-settings/playback-loopdelay",
  "title": "loopDelay",
  "breadcrumb": [
    "Animation",
    "Animation playback settings"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "loop",
    "slug": "animation/animation-playback-settings/loop"
  },
  "next": {
    "title": "alternate",
    "slug": "animation/animation-playback-settings/alternate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# loopDelay

> Source: [https://animejs.com/documentation/animation/animation-playback-settings/playback-loopdelay](https://animejs.com/documentation/animation/animation-playback-settings/playback-loopdelay)
> Breadcrumb: Animation → Animation playback settings

Animation

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            loopDelay                                    JS          
        

          
        Defines the delay in milliseconds between loops.

## Accepts

A `Number` that is equal to or greater than `0`

## Default

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.loopDelay = 500;
```

## Code example (js)

```js
import { animate } from 'animejs';

const loopDelayAnimation = animate('.circle', {
  x: '16rem',
  scale: {
    to: 1.8,
    delay: 500,
    duration: 500,
  },
  loopDelay: 1000,
  loop: true,
  alternate: true,
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="circle"></div>
</div>
```

---

← Prev: **loop** (`animation/animation-playback-settings/loop`) | Next: **alternate** (`animation/animation-playback-settings/alternate`) →
