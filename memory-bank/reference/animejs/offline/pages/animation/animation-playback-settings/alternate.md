---
{
  "order": 44,
  "section": "animation",
  "path": "animation-playback-settings/alternate",
  "slug": "animation/animation-playback-settings/alternate",
  "url": "https://animejs.com/documentation/animation/animation-playback-settings/alternate",
  "title": "alternate",
  "breadcrumb": [
    "Animation",
    "Animation playback settings",
    "alternate"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "loopDelay",
    "slug": "animation/animation-playback-settings/playback-loopdelay"
  },
  "next": {
    "title": "reversed",
    "slug": "animation/animation-playback-settings/reversed"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# alternate

> Source: [https://animejs.com/documentation/animation/animation-playback-settings/alternate](https://animejs.com/documentation/animation/animation-playback-settings/alternate)
> Breadcrumb: Animation → Animation playback settings → alternate

Animation

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            alternate                                              
        

          
        Defines if the direction of the animation alternates on each iteration when the `loop` parameter is set to `true` or superior to `1`.

## Accepts

`Boolean`

## Default

`false`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.alternate = true;
```

## Related

- [loop](https://animejs.com/documentation/animation/animation-playback-settings/loop)

## Code example (js)

```js
import { animate } from 'animejs';

animate('.dir-normal', {
  x: '17rem',
  alternate: false, // Default
  loop: 1,
});

animate('.dir-alternate', {
  x: '17rem',
  alternate: true,
  loop: 1, // Required to see the second iteration
});

animate('.dir-alternate-reverse', {
  x: '17rem',
  alternate: true,
  reversed: true,
  loop: 1,
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="circle dir-normal"></div>
  <div class="padded label">alternate: false</div>
</div>
<div class="medium row">
  <div class="circle dir-alternate"></div>
  <div class="padded label">alternate: true</div>
</div>
<div class="medium row">
  <div class="circle dir-alternate-reverse"></div>
  <div class="padded label">alternate: true, reversed: true</div>
</div>
```

---

← Prev: **loopDelay** (`animation/animation-playback-settings/playback-loopdelay`) | Next: **reversed** (`animation/animation-playback-settings/reversed`) →
