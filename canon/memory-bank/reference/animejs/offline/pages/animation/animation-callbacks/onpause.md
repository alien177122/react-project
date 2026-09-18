---
{
  "order": 25,
  "section": "animation",
  "path": "animation-callbacks/onpause",
  "slug": "animation/animation-callbacks/onpause",
  "url": "https://animejs.com/documentation/animation/animation-callbacks/onpause",
  "title": "onPause",
  "breadcrumb": [
    "Animation",
    "Animation callbacks"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onLoop",
    "slug": "animation/animation-callbacks/onloop"
  },
  "next": {
    "title": "then()",
    "slug": "animation/animation-callbacks/then"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onPause

> Source: [https://animejs.com/documentation/animation/animation-callbacks/onpause](https://animejs.com/documentation/animation/animation-callbacks/onpause)
> Breadcrumb: Animation → Animation callbacks

Animation

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onPause                                    JS          
        

          
        Executes a function when a running animation is paused, either manually or automatically.

An animation pauses when any of the following occurs during playback:

- The `.pause()` method is called

- The `.cancel()` method is called

- The `.revert()` method is called

- All animation tweens are overlapped by another animation with `composition: 'replace'`

- All animation targets have been removed

## Accepts

A `Function` whose first argument is the animation itself

## Default

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onPause = self => console.log(self.id);
```

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $animateButton, $pauseButton, $removeButton ] = utils.$('.button');
const [ $value ] = utils.$('.value');
const [ $circle ] = utils.$('.circle');

let paused = 0;
let alternate = 0;
let animation;

const animateX = () => {
  alternate = !alternate;
  animation = animate($circle, {
    x: () => (alternate ? 16 : 0) + 'rem',
    duration: 2000,
    onPause: () => $value.innerHTML = ++paused,
  });
}

const pauseAnimation = () => {
  if (animation) animation.pause();
}

const removeTarget = () => {
  utils.remove($circle);
}

animateX();

$animateButton.addEventListener('click', animateX);
$pauseButton.addEventListener('click', pauseAnimation);
$removeButton.addEventListener('click', removeTarget);
```

## Code example (html)

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">paused</span>
    <span class="value">0</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate x</button>
    <button class="button">Pause anim</button>
    <button class="button">Remove target</button>
  </fieldset>
</div>
```

---

← Prev: **onLoop** (`animation/animation-callbacks/onloop`) | Next: **then()** (`animation/animation-callbacks/then`) →
