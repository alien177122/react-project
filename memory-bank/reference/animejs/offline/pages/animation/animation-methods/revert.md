---
{
  "order": 40,
  "section": "animation",
  "path": "animation-methods/revert",
  "slug": "animation/animation-methods/revert",
  "url": "https://animejs.com/documentation/animation/animation-methods/revert",
  "title": "revert()",
  "breadcrumb": [
    "Animation",
    "Animation methods",
    "revert()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "cancel()",
    "slug": "animation/animation-methods/cancel"
  },
  "next": {
    "title": "reset()",
    "slug": "animation/animation-methods/reset"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# revert()

> Source: [https://animejs.com/documentation/animation/animation-methods/revert](https://animejs.com/documentation/animation/animation-methods/revert)
> Breadcrumb: Animation → Animation methods → revert()

Animation

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            revert()                                              
        

          
        Cancels the animation, reverts all its animated values to their original state, cleanup the CSS inline styles, and reverts the linked `onScroll()` instance if necessary.

Use `revert()` when you want to completely stop and destroy an animation.

## Returns

The animation itself

Can be chained with other animation methods.

## Related

- [Scroll](https://animejs.com/documentation/events/onscroll)

## Code example (js)

```js
import { animate, utils, stagger } from 'animejs';

const [ $revertButton ] = utils.$('.revert');
const [ $restartButton ] = utils.$('.restart');

// Set an initial translateX value
utils.set('.square', { x: '17rem' });

const animation = animate('.square', {
  x: 0,
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const revertAnimation = () => animation.revert();
const restartAnimation = () => animation.restart();

$revertButton.addEventListener('click', revertAnimation);
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
    <button class="button revert">Revert</button>
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

---

← Prev: **cancel()** (`animation/animation-methods/cancel`) | Next: **reset()** (`animation/animation-methods/reset`) →
