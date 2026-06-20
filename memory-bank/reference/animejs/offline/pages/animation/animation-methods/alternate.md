---
{
  "order": 30,
  "section": "animation",
  "path": "animation-methods/alternate",
  "slug": "animation/animation-methods/alternate",
  "url": "https://animejs.com/documentation/animation/animation-methods/alternate",
  "title": "alternate()",
  "breadcrumb": [
    "Animation",
    "Animation methods",
    "alternate()"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "restart()",
    "slug": "animation/animation-methods/restart"
  },
  "next": {
    "title": "resume()",
    "slug": "animation/animation-methods/resume"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# alternate()

> Source: [https://animejs.com/documentation/animation/animation-methods/alternate](https://animejs.com/documentation/animation/animation-methods/alternate)
> Breadcrumb: Animation → Animation methods → alternate()

Animation

                          
              
                Methods              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            alternate()                                              
        

          
        Toggles the playback direction while adjusting the `currentTime` position to reflect the new time progress.

## Returns

The animation itself

Can be chained with other animation methods.

## Code example (js)

```js
import { animate, utils, stagger } from 'animejs';

const [ $alternateButton ] = utils.$('.button');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const alternateAnimation = () => animation.alternate();

$alternateButton.addEventListener('click', alternateAnimation);
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
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

---

← Prev: **restart()** (`animation/animation-methods/restart`) | Next: **resume()** (`animation/animation-methods/resume`) →
