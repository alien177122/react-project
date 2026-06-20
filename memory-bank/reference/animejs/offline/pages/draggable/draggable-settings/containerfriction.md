---
{
  "order": 112,
  "section": "draggable",
  "path": "draggable-settings/containerfriction",
  "slug": "draggable/draggable-settings/containerfriction",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/containerfriction",
  "title": "containerFriction",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "containerFriction"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "containerPadding",
    "slug": "draggable/draggable-settings/containerpadding"
  },
  "next": {
    "title": "releaseContainerFriction",
    "slug": "draggable/draggable-settings/releasecontainerfriction"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# containerFriction

> Source: [https://animejs.com/documentation/draggable/draggable-settings/containerfriction](https://animejs.com/documentation/draggable/draggable-settings/containerfriction)
> Breadcrumb: Draggable → Draggable settings → containerFriction

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            containerFriction                                              
        

          
        Specifies the friction applied to the dragged element when going out of bounds, where `0` means no friction at all and `1` prevents the element from going past the container bounds.

## Accepts

- A `Number` greater than or equal to `0` and lower than or equal to `1`

- A `Function` that returns a `Number` greater than or equal to `0` and lower than or equal to `1`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.

It can also be refreshed manually using the `refresh()` method.

## Default

`0.8`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  containerFriction: 0,
});

createDraggable('.circle', {
  container: '.grid',
  containerFriction: 1,
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

← Prev: **containerPadding** (`draggable/draggable-settings/containerpadding`) | Next: **releaseContainerFriction** (`draggable/draggable-settings/releasecontainerfriction`) →
