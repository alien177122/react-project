---
{
  "order": 117,
  "section": "draggable",
  "path": "draggable-settings/maxvelocity",
  "slug": "draggable/draggable-settings/maxvelocity",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/maxvelocity",
  "title": "maxVelocity",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "maxVelocity"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "minVelocity",
    "slug": "draggable/draggable-settings/minvelocity"
  },
  "next": {
    "title": "releaseEase",
    "slug": "draggable/draggable-settings/releaseease"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# maxVelocity

> Source: [https://animejs.com/documentation/draggable/draggable-settings/maxvelocity](https://animejs.com/documentation/draggable/draggable-settings/maxvelocity)
> Breadcrumb: Draggable → Draggable settings → maxVelocity

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            maxVelocity                                              
        

          
        Specifies the maximum velocity to apply to the dragged element after release.

## Accepts

- A `Number` greater than or equal to `0`

- A `Function` that returns a `Number` greater than or equal to `0`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.

It can also be refreshed manually using the `refresh()` method.

## Default

`50`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  maxVelocity: 0,
});

createDraggable('.circle', {
  container: '.grid',
  maxVelocity: 100,
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

← Prev: **minVelocity** (`draggable/draggable-settings/minvelocity`) | Next: **releaseEase** (`draggable/draggable-settings/releaseease`) →
