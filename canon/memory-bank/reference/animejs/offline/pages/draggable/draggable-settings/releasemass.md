---
{
  "order": 122,
  "section": "draggable",
  "path": "draggable-settings/releasemass",
  "slug": "draggable/draggable-settings/releasemass",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/releasemass",
  "title": "releaseMass",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "releaseMass"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "releaseContainerFriction",
    "slug": "draggable/draggable-settings/releasecontainerfriction"
  },
  "next": {
    "title": "releaseStiffness",
    "slug": "draggable/draggable-settings/releasestiffness"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# releaseMass

> Source: [https://animejs.com/documentation/draggable/draggable-settings/releasemass](https://animejs.com/documentation/draggable/draggable-settings/releasemass)
> Breadcrumb: Draggable → Draggable settings → releaseMass

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            releaseMass                                              
        

          
        Specifies the mass applied to the dragged element after release. Affects the speed, movement distance and bounciness of the dragged element. Lower values result in faster movement.

`releaseMass` has no effect if a spring is passed to the releaseEase parameter and is overridden by the spring `mass` value.

## Accepts

A `Number` between `0` and `10000`

## Default

`1`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseMass: .1,
});

createDraggable('.circle', {
  container: '.grid',
  releaseMass: 10,
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

← Prev: **releaseContainerFriction** (`draggable/draggable-settings/releasecontainerfriction`) | Next: **releaseStiffness** (`draggable/draggable-settings/releasestiffness`) →
