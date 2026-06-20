---
{
  "order": 380,
  "section": "utilities",
  "path": "stagger/stagger-parameters/stagger-grid-axis",
  "slug": "utilities/stagger/stagger-parameters/stagger-grid-axis",
  "url": "https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid-axis",
  "title": "Stagger grid axis",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Stagger parameters",
    "Stagger grid axis"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Stagger grid",
    "slug": "utilities/stagger/stagger-parameters/stagger-grid"
  },
  "next": {
    "title": "Stagger modifier",
    "slug": "utilities/stagger/stagger-parameters/stagger-modifier"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Stagger grid axis

> Source: [https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid-axis](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid-axis)
> Breadcrumb: Utilities → stagger() → Stagger parameters → Stagger grid axis

Utilities

                          
              
                stagger()              
                          
              
                Parameters              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Stagger grid axis                                              
        

          
        Defines the direction of a staggered grid effect by restricting which axis of the grid can update.

## Accepts

| Value | Effect |
| --- | --- |
| `'x'` | Restrict the direction to the x axis |
| `'y'` | Restrict the direction to the y axis |

## Code example (js)

```js
import { animate, stagger, utils } from 'animejs';

const grid = [11, 4];
const $squares = utils.$('.square');

function animateGrid() {
  const from = utils.random(0, 11 * 4);
  animate($squares, {
    translateX: [
      { to: stagger('-.75rem', { grid, from, axis: 'x' }) },
      { to: 0, ease: 'inOutQuad', },
    ],
    translateY: [
      { to: stagger('-.75rem', { grid, from, axis: 'y' }) },
      { to: 0, ease: 'inOutQuad' },
    ],
    opacity: [
      { to: .5 },
      { to: 1 }
    ],
    delay: stagger(85, { grid, from }),
    onComplete: animateGrid
  });
}

animateGrid();
```

## Code example (html)

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

← Prev: **Stagger grid** (`utilities/stagger/stagger-parameters/stagger-grid`) | Next: **Stagger modifier** (`utilities/stagger/stagger-parameters/stagger-modifier`) →
