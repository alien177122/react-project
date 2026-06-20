---
{
  "order": 39,
  "section": "animation",
  "path": "animation-methods/reverse",
  "slug": "animation/animation-methods/reverse",
  "url": "https://animejs.com/documentation/animation/animation-methods/reverse",
  "title": "reverse()",
  "breadcrumb": [
    "Animation",
    "Animation methods",
    "reverse()"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "play()",
    "slug": "animation/animation-methods/play"
  },
  "next": {
    "title": "pause()",
    "slug": "animation/animation-methods/pause"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# reverse()

> Source: [https://animejs.com/documentation/animation/animation-methods/reverse](https://animejs.com/documentation/animation/animation-methods/reverse)
> Breadcrumb: Animation → Animation methods → reverse()

Animation

                          
              
                Methods              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            reverse()                                              
        

          
        Forces the animation to play backward.

## Returns

The animation itself

Can be chained with other animation methods.

## Code example (js)

```js
import { animate, utils, stagger } from 'animejs';

const [ $reverseButton ] = utils.$('.reverse');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  delay: stagger(100),
});

const reverseAnimation = () => animation.reverse();

$reverseButton.addEventListener('click', reverseAnimation);
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
    <button class="button reverse">Reverse</button>
  </fieldset>
</div>
```

---

← Prev: **play()** (`animation/animation-methods/play`) | Next: **pause()** (`animation/animation-methods/pause`) →
