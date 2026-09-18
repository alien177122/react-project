---
{
  "order": 116,
  "section": "draggable",
  "path": "draggable-settings/dragthreshold",
  "slug": "draggable/draggable-settings/dragthreshold",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/dragthreshold",
  "title": "dragThreshold",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "dragThreshold"
  ],
  "since": "Since 4.2.1",
  "prev": {
    "title": "dragSpeed",
    "slug": "draggable/draggable-settings/dragspeed"
  },
  "next": {
    "title": "scrollThreshold",
    "slug": "draggable/draggable-settings/scrollthreshold"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# dragThreshold

> Source: [https://animejs.com/documentation/draggable/draggable-settings/dragthreshold](https://animejs.com/documentation/draggable/draggable-settings/dragthreshold)
> Breadcrumb: Draggable → Draggable settings → dragThreshold

Draggable

                          
              
                Settings              
                      

          
                        Since 4.2.1
                      

        
                

## 
          
            dragThreshold                                              
        

          
        Specifies the distance in pixels needed to trigger a drag.

The threshold can be specified differently for mouse our touch devices by using an object.

```js
dragThreshold: 3,

// Or

dragThreshold: { mouse: 3, touch: 7 },
```

## Accepts

- `Number`

- `{ mouse: Number, touch: Number }`

- A `Function` that returns a `Number` or `{ mouse: Number, touch: Number }`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.

It can also be refreshed manually using the `refresh()` method.

## Default

`{ mouse: 3, touch: 7 }`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  dragThreshold: 20,
});

createDraggable('.circle', {
  container: '.grid',
  dragThreshold: { mouse: 10, touch: 15 },
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

← Prev: **dragSpeed** (`draggable/draggable-settings/dragspeed`) | Next: **scrollThreshold** (`draggable/draggable-settings/scrollthreshold`) →
