---
{
  "order": 127,
  "section": "draggable",
  "path": "draggable-settings/velocitymultiplier",
  "slug": "draggable/draggable-settings/velocitymultiplier",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/velocitymultiplier",
  "title": "velocityMultiplier",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "velocityMultiplier"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "releaseDamping",
    "slug": "draggable/draggable-settings/releasedamping"
  },
  "next": {
    "title": "minVelocity",
    "slug": "draggable/draggable-settings/minvelocity"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# velocityMultiplier

> Source: [https://animejs.com/documentation/draggable/draggable-settings/velocitymultiplier](https://animejs.com/documentation/draggable/draggable-settings/velocitymultiplier)
> Breadcrumb: Draggable → Draggable settings → velocityMultiplier

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            velocityMultiplier                                              
        

          
        Specifies a multiplier to modify the velocity applied to the dragged element after release, where `0` means no velocity at all, `1` is normal velocity and `2` double the velocity.

## Accepts

- A `Number` greater than or equal to `0`

- A `Function` that returns a `Number` greater than or equal to `0`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.

It can also be refreshed manually using the `refresh()` method.

## Default

`1`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  velocityMultiplier: 0,
});

createDraggable('.circle', {
  container: '.grid',
  velocityMultiplier: 5,
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

← Prev: **releaseDamping** (`draggable/draggable-settings/releasedamping`) | Next: **minVelocity** (`draggable/draggable-settings/minvelocity`) →
