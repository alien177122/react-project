---
{
  "order": 358,
  "section": "utilities",
  "path": "damp",
  "slug": "utilities/damp",
  "url": "https://animejs.com/documentation/utilities/damp",
  "title": "damp()",
  "breadcrumb": [
    "Utilities",
    "damp()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "lerp()",
    "slug": "utilities/lerp"
  },
  "next": {
    "title": "roundPad()",
    "slug": "utilities/round-pad"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# damp()

> Source: [https://animejs.com/documentation/utilities/damp](https://animejs.com/documentation/utilities/damp)
> Breadcrumb: Utilities → damp()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            damp()                                              
        

          
        A frame rate independent version of `utils.lerp()` to performs a linear interpolation between two values.

The closer the amount is to `1`, the closer the result is to the *end* value.

```js
const lerped = utils.lerp(start, end, deltaTime, amount);
```

## Parameters

| Name | Accepts |
| --- | --- |
| start | `Number` |
| end | `Number` |
| deltaTime | `Number` (ms) |
| amount | `Number [0-1]` |

## Returns

`Number`

```js
utils.damp(0, 100, 8, 0); // 0
utils.damp(0, 100, 8, 0.5); // 50
utils.damp(0, 100, 8, 1); // 100
```

## Related

- [utils.lerp()](https://animejs.com/documentation/utilities/lerp)

## Code example (js)

```js
import { animate, createTimer, utils } from 'animejs';

const [ $input ] = utils.$('.input');
const [ $lerped ] = utils.$('.lerped');
const [ $lerped15fps ] = utils.$('.lerped-15');

animate($input, {
  rotate: '1000turn',
  modifier: utils.snap(.25),
  duration: 4000000,
  loop: true,
  ease: 'linear',
});

const dampedLoop = createTimer({
  frameRate: 15,
  onUpdate: clock => {
    const sourceRotate = utils.get($input, 'rotate', false);
    const lerpedRotate = utils.get($lerped15fps, 'rotate', false);
    utils.set($lerped15fps, {
      rotate: utils.damp(lerpedRotate, sourceRotate, clock.deltaTime, .075) + 'turn'
    });
  }
});

const lerpedLoop = createTimer({
  frameRate: 15,
  onUpdate: () => {
    const sourceRotate = utils.get($input, 'rotate', false);
    const lerpedRotate = utils.get($lerped, 'rotate', false);
    utils.set($lerped, {
      rotate: utils.lerp(lerpedRotate, sourceRotate, .075) + 'turn'
    });
  }
});
```

## Code example (html)

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock input"></div>
    <div class="label">input</div>
  </div>
  <div class="col">
    <div class="clock lerped-15"></div>
    <div class="label">damped 15fps</div>
  </div>
  <div class="col">
    <div class="clock lerped"></div>
    <div class="label">lerped 15fps</div>
  </div>
</div>
```

---

← Prev: **lerp()** (`utilities/lerp`) | Next: **roundPad()** (`utilities/round-pad`) →
