---
{
  "order": 186,
  "section": "layout",
  "path": "(index)",
  "slug": "layout",
  "url": "https://animejs.com/documentation/layout",
  "title": "Layout",
  "breadcrumb": [
    "Layout"
  ],
  "prev": {
    "title": "Draggable properties",
    "slug": "draggable/draggable-properties"
  },
  "next": {
    "title": "Usage",
    "slug": "layout/usage"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# Layout

> Source: [https://animejs.com/documentation/layout](https://animejs.com/documentation/layout)
> Breadcrumb: Layout

## 
          
            Layout                                              
        

          
        

## Automatically animates between two HTML layout states, allowing you to easily animate properties that are normally impossible or hard to animate like CSS display, flex direction, grid settings, and DOM order.

## Examples

Explore the Auto Layout examples CodePen collection.

## Creating a layout

Layout instances are created with the `createLayout()` method exported by the main `'animejs'` entry point:

```js
import { createLayout } from 'animejs';

const layout = createLayout(root, parameters);
```

Or imported as a standalone module from the `'animejs/layout'` subpath:

```js
import { createLayout } from 'animejs/layout';
```

## Parameters

| Name | Accepts |
| --- | --- |
| root | CSS selector \| DOM element |
| parameters (opt) | `Object` of Layout settings & Layout states parameters |

## Returns

`AutoLayout`

## Animating a layout

Layout animations are triggered either by calling `layout.record()` and `layout.animate()` before and after updating the layout, or by simply calling `layout.update(cb)` with the layout changes inside the callback:

```js
// Toggle between list and grid view
layout.update(({ root }) => root.classList.toggle('grid'));
```

## Related

- [subpath](https://animejs.com/documentation/getting-started/module-imports)

## Code example (js)

```js
import { createLayout, utils, stagger } from 'animejs';

const layout = createLayout('.layout-container');

let i = 0;

function animateLayout() {
  return layout.update(({ root }) => {
    root.dataset.grid = (++i % 4) + 1;
  }, {
    duration: 1000,
    delay: stagger(150),
    onComplete: () => animateLayout()
  });
}

const layoutAnimation = animateLayout();
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout" data-grid="1">
    <div class="item">Item A</div>
    <div class="item">Item B</div>
    <div class="item">Item C</div>
    <div class="item">Item D</div>
  </div>
</div>
```

## Code example (css)

```css
#layout .grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

/* grid-1 */
#layout [data-grid="1"] .item:nth-child(1) { grid-column: 1; grid-row: 1 / 3; }
#layout [data-grid="1"] .item:nth-child(2) { grid-column: 2; grid-row: 1; }
#layout [data-grid="1"] .item:nth-child(3) { grid-column: 1; grid-row: 3; }
#layout [data-grid="1"] .item:nth-child(4) { grid-column: 2; grid-row: 2 / 4; }

#layout [data-grid="2"] { grid-template-columns: repeat(3, 1fr); grid-template-rows: 1fr 1fr; }
#layout [data-grid="2"] .item:nth-child(1),
#layout [data-grid="2"] .item:nth-child(4) { grid-row: 1 / 3; }

#layout [data-grid="3"] .item:nth-child(4) { grid-column: 1; grid-row: 1; }
#layout [data-grid="3"] .item:nth-child(3) { grid-column: 2; grid-row: 1 / 3; }
#layout [data-grid="3"] .item:nth-child(2) { grid-column: 1; grid-row: 2 / 4; }
#layout [data-grid="3"] .item:nth-child(1) { grid-column: 2; grid-row: 3; }

#layout [data-grid="4"] { grid-template-columns: repeat(3, 1fr); grid-template-rows: 1fr 1fr; }
#layout [data-grid="4"] .item:nth-child(1) { grid-column: 1; grid-row: 1; }
#layout [data-grid="4"] .item:nth-child(2) { grid-column: 1; grid-row: 2; }
#layout [data-grid="4"] .item:nth-child(3),
#layout [data-grid="4"] .item:nth-child(4) { grid-row: 1 / 3; }
```

---

← Prev: **Draggable properties** (`draggable/draggable-properties`) | Next: **Usage** (`layout/usage`) →
