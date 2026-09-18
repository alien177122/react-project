---
{
  "order": 357,
  "section": "utilities",
  "path": "createtimekeeper",
  "slug": "utilities/createtimekeeper",
  "url": "https://animejs.com/documentation/utilities/createtimekeeper",
  "title": "keepTime()",
  "breadcrumb": [
    "Utilities",
    "keepTime()"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "sync()",
    "slug": "utilities/sync"
  },
  "next": {
    "title": "random()",
    "slug": "utilities/random"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# keepTime()

> Source: [https://animejs.com/documentation/utilities/createtimekeeper](https://animejs.com/documentation/utilities/createtimekeeper)
> Breadcrumb: Utilities → keepTime()

Utilities

                      

          
                        Since 4.1.0
                      

        
                

## 
          
            keepTime()                                              
        

          
        Returns a `Function` that recreates a `Timer`, `Animation`, or `Timeline` while keeping track of its current time, allowing to seamlessly update an animation's parameters without breaking the playback state.

```js
const trackedAnimate = utils.keepTime(() => animate(target, params));

const tracked = trackedAnimate();
```

## Parameters

| Name | Accepts |
| --- | --- |
| constructor | A `Function` that returns a `Timer`, `Animation`, or `Timeline` |

## Returns

A `Function` that returns the tracked `Timer`, `Animation`, or `Timeline`

## Related

- [Timer](https://animejs.com/documentation/timer)
- [Animation](https://animejs.com/documentation/animation)
- [Timeline](https://animejs.com/documentation/timeline)

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $button ] = utils.$('button');
const clocks = utils.$('.clock');
let targetIndex = 0;

const animateNextTarget = utils.keepTime(() => {
  if (targetIndex > clocks.length - 1) targetIndex = 0;
  return animate(clocks[targetIndex++], {
    color: ['#B7FF54', '#FF4B4B'],
    rotate: 360,
    ease: 'linear',
    duration: 8000,
    loop: true,
  })
});

animateNextTarget();

$button.addEventListener('click', animateNextTarget);
```

## Code example (html)

```html
<div class="large row spaced-evenly">
  <div class="col">
    <div class="clock input"></div>
  </div>
  <div class="col">
    <div class="clock lerped"></div>
  </div>
  <div class="col">
    <div class="clock lerped-15"></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Switch target</button>
  </fieldset>
</div>
```

---

← Prev: **sync()** (`utilities/sync`) | Next: **random()** (`utilities/random`) →
