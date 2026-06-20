---
{
  "order": 119,
  "section": "draggable",
  "path": "draggable-settings/releasecontainerfriction",
  "slug": "draggable/draggable-settings/releasecontainerfriction",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/releasecontainerfriction",
  "title": "releaseContainerFriction",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "releaseContainerFriction"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "containerFriction",
    "slug": "draggable/draggable-settings/containerfriction"
  },
  "next": {
    "title": "releaseMass",
    "slug": "draggable/draggable-settings/releasemass"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# releaseContainerFriction

> Source: [https://animejs.com/documentation/draggable/draggable-settings/releasecontainerfriction](https://animejs.com/documentation/draggable/draggable-settings/releasecontainerfriction)
> Breadcrumb: Draggable → Draggable settings → releaseContainerFriction

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            releaseContainerFriction                                              
        

          
        Overrides the `containerFriction` applied to the dragged element when threw out of bounds on release, where `0` means no friction at all and `1` prevents the element from going past the container bounds.

## Accepts

- A `Number` greater than or equal to `0` and lower than or equal to `1`

- A `Function` that returns a `Number` greater than or equal to `0` and lower than or equal to `1`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.

It can also be refreshed manually using the `refresh()` method.

## Default

The `containerFriction` value

## Related

- [containerFriction](https://animejs.com/documentation/draggable/draggable-settings/containerfriction)

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseContainerFriction: 0,
});

createDraggable('.circle', {
  container: '.grid',
  releaseContainerFriction: 1,
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

← Prev: **containerFriction** (`draggable/draggable-settings/containerfriction`) | Next: **releaseMass** (`draggable/draggable-settings/releasemass`) →
