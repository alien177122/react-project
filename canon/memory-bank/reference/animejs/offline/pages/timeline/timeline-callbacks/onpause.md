---
{
  "order": 283,
  "section": "timeline",
  "path": "timeline-callbacks/onpause",
  "slug": "timeline/timeline-callbacks/onpause",
  "url": "https://animejs.com/documentation/timeline/timeline-callbacks/onpause",
  "title": "onPause",
  "breadcrumb": [
    "Timeline",
    "Timeline callbacks",
    "onPause"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onLoop",
    "slug": "timeline/timeline-callbacks/onloop"
  },
  "next": {
    "title": "then()",
    "slug": "timeline/timeline-callbacks/then"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onPause

> Source: [https://animejs.com/documentation/timeline/timeline-callbacks/onpause](https://animejs.com/documentation/timeline/timeline-callbacks/onpause)
> Breadcrumb: Timeline → Timeline callbacks → onPause

Timeline

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onPause                                              
        

          
        Executes a function when a running timeline is paused, either manually or automatically.

A timeline pauses when any of the following occurs during playback:

- The `.pause()` method is called

- The `.cancel()` method is called

- The `.revert()` method is called

- All child animations tweens are overlapped by another timeline or animation with `composition: 'replace'`

- All child animations targets have been removed and no other timers are active

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
import { createTimeline, utils } from 'animejs';

const [ $animateButton, $pauseButton, $removeButton ] = utils.$('.button');
const [ $value ] = utils.$('.value');
const shapes = utils.$('.shape');
const [ $triangle, $square, $circle ] = shapes;

let paused = 0;
let alternate = 0;
let tl;

const animateShapes = () => {
  alternate = !alternate;
  const x = (alternate ? 15 : 0) + 'rem';
  const rotate = (alternate ? 360 : -360);
  tl = createTimeline({
    defaults: { duration: 2000 },
    onPause: () => $value.textContent = ++paused
  })
  .add($circle, { x }, 0)
  .add($triangle, { x }, 0)
  .add($square, { x }, 0)
  .add(shapes, { rotate }, 0);
}

const pauseTL = () => {
  if (tl) tl.pause();
}

const removeTargets = () => {
  utils.remove(shapes);
}

animateShapes();

$animateButton.addEventListener('click', animateShapes);
$pauseButton.addEventListener('click', pauseTL);
$removeButton.addEventListener('click', removeTargets);
```

## Code example (html)

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="shape triangle"></div>
    <div class="shape square"></div>
    <div class="shape circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">paused</span>
    <span class="value">0</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Create TL</button>
    <button class="button">Pause TL</button>
    <button class="button">Remove shapes</button>
  </fieldset>
</div>
```

---

← Prev: **onLoop** (`timeline/timeline-callbacks/onloop`) | Next: **then()** (`timeline/timeline-callbacks/then`) →
