---
{
  "order": 38,
  "section": "animation",
  "path": "animation-methods/resume",
  "slug": "animation/animation-methods/resume",
  "url": "https://animejs.com/documentation/animation/animation-methods/resume",
  "title": "resume()",
  "breadcrumb": [
    "Animation",
    "Animation methods",
    "resume()"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "alternate()",
    "slug": "animation/animation-methods/alternate"
  },
  "next": {
    "title": "complete()",
    "slug": "animation/animation-methods/complete"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# resume()

> Source: [https://animejs.com/documentation/animation/animation-methods/resume](https://animejs.com/documentation/animation/animation-methods/resume)
> Breadcrumb: Animation → Animation methods → resume()

Animation

                          
              
                Methods              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            resume()                                              
        

          
        Resumes the playback of a paused animation in its current direction.

## Returns

The animation itself

Can be chained with other animation methods.

## Code example (js)

```js
import { animate, utils, stagger } from 'animejs';

const [ $pauseButton, $alternateButton, $resumeButton ] = utils.$('.button');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const pauseAnimation = () => animation.pause();
const alternateAnimation = () => animation.alternate();
const resumeAnimation = () => animation.resume();

$pauseButton.addEventListener('click', pauseAnimation);
$alternateButton.addEventListener('click', alternateAnimation);
$resumeButton.addEventListener('click', resumeAnimation);
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
    <button class="button">Pause</button>
    <button class="button">Alternate</button>
    <button class="button">Resume</button>
  </fieldset>
</div>
```

---

← Prev: **alternate()** (`animation/animation-methods/alternate`) | Next: **complete()** (`animation/animation-methods/complete`) →
