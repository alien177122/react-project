---
{
  "order": 35,
  "section": "animation",
  "path": "animation-methods/refresh",
  "slug": "animation/animation-methods/refresh",
  "url": "https://animejs.com/documentation/animation/animation-methods/refresh",
  "title": "refresh()",
  "breadcrumb": [
    "Animation",
    "Animation methods"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "stretch()",
    "slug": "animation/animation-methods/stretch"
  },
  "next": {
    "title": "Animation properties",
    "slug": "animation/animation-properties"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# refresh()

> Source: [https://animejs.com/documentation/animation/animation-methods/refresh](https://animejs.com/documentation/animation/animation-methods/refresh)
> Breadcrumb: Animation → Animation methods

Animation

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            refresh()                                    JS          
        

          
        Re-computes animated properties values defined with a Function based value by updating the *from* values to the current target values, and the *to* values to the newly computed values.

Only the animatable properties values are re-calculated, `duration` and `delay` cannot be refreshed.

## Returns

The animation itself

Can be chained with other animation methods.

## Related

- [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based)

## Code example (js)

```js
import { animate } from 'animejs';

const [ $refreshButton ] = utils.$('.refresh');

const animation = animate('.square', {
  x: () => utils.random(0, 17) + 'rem',
  y: () => utils.random(-1, 1) + 'rem',
  rotate: () => utils.random(-360, 360, 1),
  scale: () => utils.random(.1, 1.5, 2),
  duration: 750,
  loop: true,
  onLoop: self => self.refresh()
});

const refreshAnimation = () => animation.refresh().restart();

$refreshButton.addEventListener('click', refreshAnimation);
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
    <button class="button refresh">Refresh & Restart</button>
  </fieldset>
</div>
```

## Code example (css)

```css
#resize .large.log.row {
  margin-top: 1rem;
}
```

---

← Prev: **stretch()** (`animation/animation-methods/stretch`) | Next: **Animation properties** (`animation/animation-properties`) →
