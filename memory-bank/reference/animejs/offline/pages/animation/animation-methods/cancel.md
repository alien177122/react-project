---
{
  "order": 31,
  "section": "animation",
  "path": "animation-methods/cancel",
  "slug": "animation/animation-methods/cancel",
  "url": "https://animejs.com/documentation/animation/animation-methods/cancel",
  "title": "cancel()",
  "breadcrumb": [
    "Animation",
    "Animation methods",
    "cancel()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "complete()",
    "slug": "animation/animation-methods/complete"
  },
  "next": {
    "title": "revert()",
    "slug": "animation/animation-methods/revert"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# cancel()

> Source: [https://animejs.com/documentation/animation/animation-methods/cancel](https://animejs.com/documentation/animation/animation-methods/cancel)
> Breadcrumb: Animation → Animation methods → cancel()

Animation

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            cancel()                                              
        

          
        Pauses the animation, removes it from the engine's main loop, and frees up memory.

## Returns

The animation itself

Can be chained with other animation methods.

## Code example (js)

```js
import { animate, utils, stagger } from 'animejs';

const [ $cancelButton ] = utils.$('.cancel');
const [ $playButton ] = utils.$('.play');

const animation = animate('.square', {
  x: '17rem',
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const cancelAnimation = () => animation.cancel();
const playAnimation = () => animation.play();

$cancelButton.addEventListener('click', cancelAnimation);
$playButton.addEventListener('click', playAnimation);
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
    <button class="button cancel">Cancel</button>
    <button class="button play">Play</button>
  </fieldset>
</div>
```

---

← Prev: **complete()** (`animation/animation-methods/complete`) | Next: **revert()** (`animation/animation-methods/revert`) →
