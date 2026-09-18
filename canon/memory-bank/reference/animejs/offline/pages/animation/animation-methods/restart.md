---
{
  "order": 37,
  "section": "animation",
  "path": "animation-methods/restart",
  "slug": "animation/animation-methods/restart",
  "url": "https://animejs.com/documentation/animation/animation-methods/restart",
  "title": "restart()",
  "breadcrumb": [
    "Animation",
    "Animation methods",
    "restart()"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "pause()",
    "slug": "animation/animation-methods/pause"
  },
  "next": {
    "title": "alternate()",
    "slug": "animation/animation-methods/alternate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# restart()

> Source: [https://animejs.com/documentation/animation/animation-methods/restart](https://animejs.com/documentation/animation/animation-methods/restart)
> Breadcrumb: Animation → Animation methods → restart()

Animation

                          
              
                Methods              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            restart()                                              
        

          
        Resets all properties and set the `currentTime` of an animation to `0`.

If the `autoplay` is set to `true`, the animation plays automatically.

## Returns

The animation itself

Can be chained with other animation methods.

## Related

- [autoplay](https://animejs.com/documentation/animation/animation-playback-settings/autoplay)

## Code example (js)

```js
import { animate, utils, stagger } from 'animejs';

const [ $restartButton ] = utils.$('.restart');

const animation = animate('.square', {
  x: '17rem',
  direction: 'alternate',
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100)
});

const restartAnimation = () => animation.restart();

$restartButton.addEventListener('click', restartAnimation);
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

---

← Prev: **pause()** (`animation/animation-methods/pause`) | Next: **alternate()** (`animation/animation-methods/alternate`) →
