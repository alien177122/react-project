---
{
  "order": 124,
  "section": "draggable",
  "path": "draggable-settings/scrollspeed",
  "slug": "draggable/draggable-settings/scrollspeed",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/scrollspeed",
  "title": "scrollSpeed",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "scrollSpeed"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "scrollThreshold",
    "slug": "draggable/draggable-settings/scrollthreshold"
  },
  "next": {
    "title": "cursor",
    "slug": "draggable/draggable-settings/cursor"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# scrollSpeed

> Source: [https://animejs.com/documentation/draggable/draggable-settings/scrollspeed](https://animejs.com/documentation/draggable/draggable-settings/scrollspeed)
> Breadcrumb: Draggable → Draggable settings → scrollSpeed

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            scrollSpeed                                              
        

          
        Specifies a value that affects the automatic scrolling speed of the container. The higher the value, the faster the scroll goes and `0` prevents the container from scrolling.

## Accepts

- A `Number`

- A `Function` that returns a `Number`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.

It can also be refreshed manually using the `refresh()` method.

## Default

`1.5`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.scroll-container',
  scrollSpeed: 2,
});
```

## Code example (html)

```html
<div class="scroll-container scroll-x scroll-y">
  <div class="scroll-content">
    <div class="large padded grid square-grid">
      <div class="square draggable"></div>
    </div>
  </div>
</div>
```

---

← Prev: **scrollThreshold** (`draggable/draggable-settings/scrollthreshold`) | Next: **cursor** (`draggable/draggable-settings/cursor`) →
