---
{
  "order": 198,
  "section": "layout",
  "path": "layout-settings/delay",
  "slug": "layout/layout-settings/delay",
  "url": "https://animejs.com/documentation/layout/layout-settings/delay",
  "title": "delay",
  "breadcrumb": [
    "Layout",
    "Settings",
    "delay"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "children",
    "slug": "layout/layout-settings/children"
  },
  "next": {
    "title": "duration",
    "slug": "layout/layout-settings/duration"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# delay

> Source: [https://animejs.com/documentation/layout/layout-settings/delay](https://animejs.com/documentation/layout/layout-settings/delay)
> Breadcrumb: Layout → Settings → delay

Layout

                          
              
                Settings              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            delay                                              
        

          
        Defines the default delay in milliseconds of all animated layout animations.

Compatible with the `stagger()` utility function.

## Accepts

- `Number`

- Function based value that returns a `Number` equal to or greater than `0`

## Default

`0`

## Related

- [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based)

## Code example (js)

```js
import { createLayout, utils, stagger } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  delay: 500 // Delays the transition by 500ms
});

function animateLayout(delay) {
  // You can override the layout delay in the update() method too
  layout.update(({ root }) => root.classList.toggle('row'), { delay });
}

const animateWith500MsDelay = () => animateLayout();
const animateWithStaggerDelay = () => animateLayout(stagger(150));

$buttonA.addEventListener('click', animateWith500MsDelay);
$buttonB.addEventListener('click', animateWithStaggerDelay);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
    <div class="item col">Item 3</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">500 ms delay</button>
    <button class="button">Staggered delay</button>
  </fieldset>
</div>
```

---

← Prev: **children** (`layout/layout-settings/children`) | Next: **duration** (`layout/layout-settings/duration`) →
