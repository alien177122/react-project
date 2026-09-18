---
{
  "order": 379,
  "section": "utilities",
  "path": "stagger/stagger-parameters/stagger-grid",
  "slug": "utilities/stagger/stagger-parameters/stagger-grid",
  "url": "https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid",
  "title": "Stagger grid",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Stagger parameters",
    "Stagger grid"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Stagger ease",
    "slug": "utilities/stagger/stagger-parameters/stagger-ease"
  },
  "next": {
    "title": "Stagger grid axis",
    "slug": "utilities/stagger/stagger-parameters/stagger-grid-axis"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Stagger grid

> Source: [https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid)
> Breadcrumb: Utilities → stagger() → Stagger parameters → Stagger grid

Utilities

                          
              
                stagger()              
                          
              
                Parameters              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Stagger grid                                              
        

          
        Distributes values on a 2d `Array`.

## Accepts

| Value | Description |
| --- | --- |
| `[, ]` | Explicit grid dimensions as `[columns, rows]` |
| `true` | Auto-grid mode: computes a 2D layout from element positions or JS object coordinates (`{x, y}`) |

## Default

`null`

Since version 4.4.0, `grid: true` auto-grid mode automatically computes grid dimensions from element positions instead of requiring explicit `[columns, rows]` dimensions.

## Code example (js)

```js
import { animate, stagger } from 'animejs';

const $squares = utils.$('.square');

function animateGrid() {
  animate($squares, {
    scale: [
      { to: [0, 1.25] },
      { to: 0 }
    ],
    boxShadow: [
      { to: '0 0 1rem 0 currentColor' },
      { to: '0 0 0rem 0 currentColor' }
    ],
    delay: stagger(100, {
      grid: [11, 4],
      from: utils.random(0, 11 * 4)
    }),
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

← Prev: **Stagger ease** (`utilities/stagger/stagger-parameters/stagger-ease`) | Next: **Stagger grid axis** (`utilities/stagger/stagger-parameters/stagger-grid-axis`) →
