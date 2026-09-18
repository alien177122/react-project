---
{
  "order": 34,
  "section": "animation",
  "path": "animation-methods/play",
  "slug": "animation/animation-methods/play",
  "url": "https://animejs.com/documentation/animation/animation-methods/play",
  "title": "play()",
  "breadcrumb": [
    "Animation",
    "Animation methods",
    "play()"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "Animation methods",
    "slug": "animation/animation-methods"
  },
  "next": {
    "title": "reverse()",
    "slug": "animation/animation-methods/reverse"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# play()

> Source: [https://animejs.com/documentation/animation/animation-methods/play](https://animejs.com/documentation/animation/animation-methods/play)
> Breadcrumb: Animation → Animation methods → play()

Animation

                          
              
                Methods              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            play()                                              
        

          
        Forces the animation to play forward.

## Returns

The animation itself

Can be chained with other animation methods.

## Code example (js)

```js
import { animate, utils, stagger } from 'animejs';

const [ $playButton ] = utils.$('.play');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  delay: stagger(100),
  autoplay: false, // The animation is paused by default
});

const playAnimation = () => animation.play();

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
    <button class="button play">Play</button>
  </fieldset>
</div>
```

---

← Prev: **Animation methods** (`animation/animation-methods`) | Next: **reverse()** (`animation/animation-methods/reverse`) →
