---
{
  "order": 47,
  "section": "animation",
  "path": "animation-playback-settings/duration",
  "slug": "animation/animation-playback-settings/duration",
  "url": "https://animejs.com/documentation/animation/animation-playback-settings/duration",
  "title": "duration",
  "breadcrumb": [
    "Animation",
    "Animation playback settings",
    "duration"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "delay",
    "slug": "animation/animation-playback-settings/delay"
  },
  "next": {
    "title": "loop",
    "slug": "animation/animation-playback-settings/loop"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# duration

> Source: [https://animejs.com/documentation/animation/animation-playback-settings/duration](https://animejs.com/documentation/animation/animation-playback-settings/duration)
> Breadcrumb: Animation → Animation playback settings → duration

Animation

                          
              
                Playback settings              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            duration                                              
        

          
        Defines the default duration in milliseconds of all animation tweens.

Setting `0` to a duration completes the animation instantly upon play.

## Accepts

- A `Number` equal or greater than `0`

- A Function based value that returns a `Number` equal to or greater than `0`

Duration values higher than `1e12` are clamped internally to `1e12` (Or approximatively 32 years).

## Default

`1000`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.duration = 500;
```

## Related

- [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based)

## Code example (js)

```js
import { animate } from 'animejs';

animate('.dur-0', {
  x: '17rem',
  duration: 0,
});

animate('.dur-500', {
  x: '17rem',
  duration: 500,
});

animate('.dur-2000', {
  x: '17rem',
  duration: 2000
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="circle dur-0"></div>
  <div class="padded label">duration: 0</div>
</div>
<div class="medium row">
  <div class="circle dur-500"></div>
  <div class="padded label">duration: 500</div>
</div>
<div class="medium row">
  <div class="circle dur-2000"></div>
  <div class="padded label">duration: 2000</div>
</div>
```

---

← Prev: **delay** (`animation/animation-playback-settings/delay`) | Next: **loop** (`animation/animation-playback-settings/loop`) →
