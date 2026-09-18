---
{
  "order": 120,
  "section": "draggable",
  "path": "draggable-settings/releasedamping",
  "slug": "draggable/draggable-settings/releasedamping",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/releasedamping",
  "title": "releaseDamping",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "releaseDamping"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "releaseStiffness",
    "slug": "draggable/draggable-settings/releasestiffness"
  },
  "next": {
    "title": "velocityMultiplier",
    "slug": "draggable/draggable-settings/velocitymultiplier"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# releaseDamping

> Source: [https://animejs.com/documentation/draggable/draggable-settings/releasedamping](https://animejs.com/documentation/draggable/draggable-settings/releasedamping)
> Breadcrumb: Draggable → Draggable settings → releaseDamping

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            releaseDamping                                              
        

          
        Specifies the damping applied to the dragged element after release. Affects the speed, movement distance and bounciness of the dragged element. Lower values increases the bounciness when reaching the bounds of the container.

`releaseDamping` has no effect if a spring is passed to the releaseEase parameter and is overridden by the spring `damping` value.

## Accepts

A `Number` between `0` and `10000`

## Default

`10`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseDamping: 5,
});

createDraggable('.circle', {
  container: '.grid',
  releaseStiffness: 30,
});
```

## Code example (html)

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

← Prev: **releaseStiffness** (`draggable/draggable-settings/releasestiffness`) | Next: **velocityMultiplier** (`draggable/draggable-settings/velocitymultiplier`) →
