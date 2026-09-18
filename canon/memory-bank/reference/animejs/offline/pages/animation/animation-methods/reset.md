---
{
  "order": 36,
  "section": "animation",
  "path": "animation-methods/reset",
  "slug": "animation/animation-methods/reset",
  "url": "https://animejs.com/documentation/animation/animation-methods/reset",
  "title": "reset()",
  "breadcrumb": [
    "Animation",
    "Animation methods"
  ],
  "since": "Since 3.0.0",
  "prev": {
    "title": "revert()",
    "slug": "animation/animation-methods/revert"
  },
  "next": {
    "title": "seek()",
    "slug": "animation/animation-methods/seek"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# reset()

> Source: [https://animejs.com/documentation/animation/animation-methods/reset](https://animejs.com/documentation/animation/animation-methods/reset)
> Breadcrumb: Animation → Animation methods

Animation

                          
              
                Methods              
                      

          
                        Since 3.0.0
                      

        
                

## 
          
            reset()                                    JS          
        

          
        Pauses and resets `currentTime`, `progress`, `reversed`, `began`, `completed` properties to their default values.

```js
animation.reset(softReset);
```

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| softReset=false (opt) | `Boolean` | If `true`, only reset the internal values without causing a visual render |

## Returns

The animation itself

Can be chained with other animation methods.

## Code example (js)

```js
import { animate, utils, stagger } from 'animejs';

const [ $hardReset, $softReset ] = utils.$('.button');

const animation = animate('.square', {
  x: '17rem',
  alternate: true,
  ease: 'inOutSine',
  loop: true,
  delay: stagger(100),
});

const hardReset = () => animation.reset();
const softReset = () => animation.reset(true);

$hardReset.addEventListener('click', hardReset);
$softReset.addEventListener('click', softReset);
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
    <button class="button">Hard reset</button>
    <button class="button">Soft reset</button>
  </fieldset>
</div>
```

---

← Prev: **revert()** (`animation/animation-methods/revert`) | Next: **seek()** (`animation/animation-methods/seek`) →
