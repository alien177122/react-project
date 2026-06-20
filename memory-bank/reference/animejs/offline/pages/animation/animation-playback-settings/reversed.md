---
{
  "order": 54,
  "section": "animation",
  "path": "animation-playback-settings/reversed",
  "slug": "animation/animation-playback-settings/reversed",
  "url": "https://animejs.com/documentation/animation/animation-playback-settings/reversed",
  "title": "reversed",
  "breadcrumb": [
    "Animation",
    "Animation playback settings",
    "reversed"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "alternate",
    "slug": "animation/animation-playback-settings/alternate"
  },
  "next": {
    "title": "autoplay",
    "slug": "animation/animation-playback-settings/autoplay"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# reversed

> Source: [https://animejs.com/documentation/animation/animation-playback-settings/reversed](https://animejs.com/documentation/animation/animation-playback-settings/reversed)
> Breadcrumb: Animation → Animation playback settings → reversed

Animation

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            reversed                                              
        

          
        Defines the initial direction of the animation.

## Accepts

`Boolean`

- If set to `true` the animation plays backwards

- If set to `false` the animation plays forwards

## Default

`false`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.reversed = true;
```

## Code example (js)

```js
import { animate } from 'animejs';

animate('.dir-normal', {
  x: '17rem',
  reversed: false, // Default behaviour
  loop: true
});

animate('.dir-reverse', {
  x: '17rem',
  reversed: true,
  loop: true
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="circle dir-normal"></div>
  <div class="padded label">reversed: false</div>
</div>
<div class="medium row">
  <div class="circle dir-reverse"></div>
  <div class="padded label">reversed: true</div>
</div>
```

---

← Prev: **alternate** (`animation/animation-playback-settings/alternate`) | Next: **autoplay** (`animation/animation-playback-settings/autoplay`) →
