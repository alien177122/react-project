---
{
  "order": 118,
  "section": "draggable",
  "path": "draggable-settings/minvelocity",
  "slug": "draggable/draggable-settings/minvelocity",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/minvelocity",
  "title": "minVelocity",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "minVelocity"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "velocityMultiplier",
    "slug": "draggable/draggable-settings/velocitymultiplier"
  },
  "next": {
    "title": "maxVelocity",
    "slug": "draggable/draggable-settings/maxvelocity"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# minVelocity

> Source: [https://animejs.com/documentation/draggable/draggable-settings/minvelocity](https://animejs.com/documentation/draggable/draggable-settings/minvelocity)
> Breadcrumb: Draggable → Draggable settings → minVelocity

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            minVelocity                                              
        

          
        Specifies the minimum velocity to apply to the dragged element after release.

## Accepts

- A `Number` greater than or equal to `0`

- A `Function` that returns a `Number` greater than or equal to `0`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.

It can also be refreshed manually using the `refresh()` method.

## Default

`0`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  minVelocity: 0,
});

createDraggable('.circle', {
  container: '.grid',
  minVelocity: 10,
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

← Prev: **velocityMultiplier** (`draggable/draggable-settings/velocitymultiplier`) | Next: **maxVelocity** (`draggable/draggable-settings/maxvelocity`) →
