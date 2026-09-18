---
{
  "order": 33,
  "section": "animation",
  "path": "animation-methods/pause",
  "slug": "animation/animation-methods/pause",
  "url": "https://animejs.com/documentation/animation/animation-methods/pause",
  "title": "pause()",
  "breadcrumb": [
    "Animation",
    "Animation methods",
    "pause()"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "reverse()",
    "slug": "animation/animation-methods/reverse"
  },
  "next": {
    "title": "restart()",
    "slug": "animation/animation-methods/restart"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# pause()

> Source: [https://animejs.com/documentation/animation/animation-methods/pause](https://animejs.com/documentation/animation/animation-methods/pause)
> Breadcrumb: Animation → Animation methods → pause()

Animation

                          
              
                Methods              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            pause()                                              
        

          
        Pauses a running animation.

## Returns

The animation itself

Can be chained with other animation methods.

## Code example (js)

```js
import { animate, utils, stagger } from 'animejs';

const [ $pauseButton ] = utils.$('.pause');

const animation = animate('.square', {
  x: '17rem',
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const pauseAnimation = () => animation.pause();

$pauseButton.addEventListener('click', pauseAnimation);
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
    <button class="button pause">Pause</button>
  </fieldset>
</div>
```

---

← Prev: **reverse()** (`animation/animation-methods/reverse`) | Next: **restart()** (`animation/animation-methods/restart`) →
