---
{
  "order": 199,
  "section": "layout",
  "path": "layout-settings/duration",
  "slug": "layout/layout-settings/duration",
  "url": "https://animejs.com/documentation/layout/layout-settings/duration",
  "title": "duration",
  "breadcrumb": [
    "Layout",
    "Settings",
    "duration"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "delay",
    "slug": "layout/layout-settings/delay"
  },
  "next": {
    "title": "ease",
    "slug": "layout/layout-settings/ease"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# duration

> Source: [https://animejs.com/documentation/layout/layout-settings/duration](https://animejs.com/documentation/layout/layout-settings/duration)
> Breadcrumb: Layout → Settings → duration

Layout

                          
              
                Settings              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            duration                                              
        

          
        Defines the duration in milliseconds of all animated layout elements.

Compatible with the `stagger()` utility function.

## Accepts

- `Number` equal to or greater than `0`

- Function based value that returns a `Number` equal to or greater than `0`

## Default

`350`

## Related

- [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based)

## Code example (js)

```js
import { createLayout, utils } from 'animejs';

const [ $rootA, $rootB ] = utils.$('.layout-container');
const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layoutA = createLayout($rootA);
const layoutB = createLayout($rootB, { duration: 1000 });

function animateLayoutA() {
  layoutA.update(({ root }) => root.classList.toggle('row'));
}

function animateLayoutB() {
  layoutB.update(({ root }) => root.classList.toggle('row'));
}

$buttonA.addEventListener('click', animateLayoutA);
$buttonB.addEventListener('click', animateLayoutB);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">default</div>
    <div class="item col">duration</div>
  </div>
  <div class="layout-container col grid-layout row">
    <div class="item col">1000ms</div>
    <div class="item col">duration</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate default</button>
    <button class="button">Animate 1000ms</button>
  </fieldset>
</div>
```

---

← Prev: **delay** (`layout/layout-settings/delay`) | Next: **ease** (`layout/layout-settings/ease`) →
