---
{
  "order": 32,
  "section": "animation",
  "path": "animation-methods/complete",
  "slug": "animation/animation-methods/complete",
  "url": "https://animejs.com/documentation/animation/animation-methods/complete",
  "title": "complete()",
  "breadcrumb": [
    "Animation",
    "Animation methods",
    "complete()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "resume()",
    "slug": "animation/animation-methods/resume"
  },
  "next": {
    "title": "cancel()",
    "slug": "animation/animation-methods/cancel"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# complete()

> Source: [https://animejs.com/documentation/animation/animation-methods/complete](https://animejs.com/documentation/animation/animation-methods/complete)
> Breadcrumb: Animation → Animation methods → complete()

Animation

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            complete()                                              
        

          
        Completes the animation instantly.

## Returns

The animation itself

Can be chained with other animation methods.

## Code example (js)

```js
import { animate, utils, stagger } from 'animejs';

const [ $completeButton ] = utils.$('.complete');

const animation = animate('.square', {
  x: '17rem',
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const completeAnimation = () => animation.complete();

$completeButton.addEventListener('click', completeAnimation);
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
    <button class="button complete">Complete</button>
  </fieldset>
</div>
```

---

← Prev: **resume()** (`animation/animation-methods/resume`) | Next: **cancel()** (`animation/animation-methods/cancel`) →
