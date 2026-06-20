---
{
  "order": 42,
  "section": "animation",
  "path": "animation-methods/stretch",
  "slug": "animation/animation-methods/stretch",
  "url": "https://animejs.com/documentation/animation/animation-methods/stretch",
  "title": "stretch()",
  "breadcrumb": [
    "Animation",
    "Animation methods"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "seek()",
    "slug": "animation/animation-methods/seek"
  },
  "next": {
    "title": "refresh()",
    "slug": "animation/animation-methods/refresh"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# stretch()

> Source: [https://animejs.com/documentation/animation/animation-methods/stretch](https://animejs.com/documentation/animation/animation-methods/stretch)
> Breadcrumb: Animation → Animation methods

Animation

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            stretch()                                    JS          
        

          
        Changes the total duration of an animation and its tweens duration to fit a specific time.

The total duration is equal to the duration of an iteration multiplied with the total number of iterations. So if an animation is 1000ms and loops twice (3 iterations in total), the total duration will be 3000ms (1000 * 3).

```js
animation.stretch(duration);
```

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| duration | `Number` | The new total duration in ms of the animation |

Stretching an animation to `0` will also set all its tweens' durations to `0`, which will make them all the same length on subsequent calls to `stretch()`.

## Returns

The animation itself

Can be chained with other animation methods.

## Code example (js)

```js
import { animate, utils, stagger } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $totalDuration ] = utils.$('.value');

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  delay: stagger(200),
});

const stretchAnimation = () => {
  const newDuration = +$range.value;
  $totalDuration.textContent = newDuration;
  animation.stretch(newDuration).restart();
}

stretchAnimation();

$range.addEventListener('input', stretchAnimation);
```

## Code example (html)

```html
<pre class="large log row">
  <span class="label">total duration</span>
  <span class="value">0</span>
</pre>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium centered row">
  <fieldset class="controls">
    <input type="range" min=100 max=2000 value=1000 step=100 class="seek range" />
  </fieldset>
</div>
```

---

← Prev: **seek()** (`animation/animation-methods/seek`) | Next: **refresh()** (`animation/animation-methods/refresh`) →
