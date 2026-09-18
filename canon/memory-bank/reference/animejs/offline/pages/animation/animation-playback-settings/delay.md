---
{
  "order": 46,
  "section": "animation",
  "path": "animation-playback-settings/delay",
  "slug": "animation/animation-playback-settings/delay",
  "url": "https://animejs.com/documentation/animation/animation-playback-settings/delay",
  "title": "delay",
  "breadcrumb": [
    "Animation",
    "Animation playback settings",
    "delay"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "Animation playback settings",
    "slug": "animation/animation-playback-settings"
  },
  "next": {
    "title": "duration",
    "slug": "animation/animation-playback-settings/duration"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# delay

> Source: [https://animejs.com/documentation/animation/animation-playback-settings/delay](https://animejs.com/documentation/animation/animation-playback-settings/delay)
> Breadcrumb: Animation → Animation playback settings → delay

Animation

                          
              
                Playback settings              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            delay                                              
        

          
        Defines the default delay in milliseconds of the animation tweens.

## Accepts

- A `Number` equal or greater than `0`

- A Function based value that returns a `Number` equal to or greater than `0`

## Default

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.delay = 500;
```

## Related

- [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based)

## Code example (js)

```js
import { animate } from 'animejs';

const playbackDelay = animate('.delay', {
  x: '16rem',
  scale: 1.8,
  delay: 500, // Global delay applied to all properties
  loop: true,
  alternate: true
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="circle delay"></div>
</div>
```

---

← Prev: **Animation playback settings** (`animation/animation-playback-settings`) | Next: **duration** (`animation/animation-playback-settings/duration`) →
