---
{
  "order": 123,
  "section": "draggable",
  "path": "draggable-settings/releasestiffness",
  "slug": "draggable/draggable-settings/releasestiffness",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/releasestiffness",
  "title": "releaseStiffness",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "releaseStiffness"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "releaseMass",
    "slug": "draggable/draggable-settings/releasemass"
  },
  "next": {
    "title": "releaseDamping",
    "slug": "draggable/draggable-settings/releasedamping"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# releaseStiffness

> Source: [https://animejs.com/documentation/draggable/draggable-settings/releasestiffness](https://animejs.com/documentation/draggable/draggable-settings/releasestiffness)
> Breadcrumb: Draggable → Draggable settings → releaseStiffness

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            releaseStiffness                                              
        

          
        Specifies the stiffness applied to the dragged element after release. Affects the speed, movement distance and bounciness of the dragged element. Lower values result in slower movement.

`releaseStiffness` has no effect if a spring is passed to the releaseEase parameter and is overridden by the spring `stiffness` value.

## Accepts

A `Number` between `0` and `10000`

## Default

`80`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseStiffness: 20,
});

createDraggable('.circle', {
  container: '.grid',
  releaseStiffness: 300,
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

← Prev: **releaseMass** (`draggable/draggable-settings/releasemass`) | Next: **releaseDamping** (`draggable/draggable-settings/releasedamping`) →
