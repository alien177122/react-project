---
{
  "order": 115,
  "section": "draggable",
  "path": "draggable-settings/dragspeed",
  "slug": "draggable/draggable-settings/dragspeed",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/dragspeed",
  "title": "dragSpeed",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "dragSpeed"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "releaseEase",
    "slug": "draggable/draggable-settings/releaseease"
  },
  "next": {
    "title": "dragThreshold",
    "slug": "draggable/draggable-settings/dragthreshold"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# dragSpeed

> Source: [https://animejs.com/documentation/draggable/draggable-settings/dragspeed](https://animejs.com/documentation/draggable/draggable-settings/dragspeed)
> Breadcrumb: Draggable → Draggable settings → dragSpeed

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            dragSpeed                                              
        

          
        Specifies a value that affects the dragging speed of the element. The higher the value, the faster the element moves. `0` prevents the element from being dragged, and values less than `0` invert the drag movement.

## Accepts

- A `Number`

- A `Function` that returns a `Number`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.

It can also be refreshed manually using the `refresh()` method.

## Default

`1`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  dragSpeed: 2,
});

createDraggable('.circle', {
  container: '.grid',
  dragSpeed: .5,
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

← Prev: **releaseEase** (`draggable/draggable-settings/releaseease`) | Next: **dragThreshold** (`draggable/draggable-settings/dragthreshold`) →
