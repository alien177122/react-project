---
{
  "order": 113,
  "section": "draggable",
  "path": "draggable-settings/containerpadding",
  "slug": "draggable/draggable-settings/containerpadding",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/containerpadding",
  "title": "containerPadding",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "containerPadding"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "container",
    "slug": "draggable/draggable-settings/container"
  },
  "next": {
    "title": "containerFriction",
    "slug": "draggable/draggable-settings/containerfriction"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# containerPadding

> Source: [https://animejs.com/documentation/draggable/draggable-settings/containerpadding](https://animejs.com/documentation/draggable/draggable-settings/containerpadding)
> Breadcrumb: Draggable → Draggable settings → containerPadding

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            containerPadding                                              
        

          
        Specifies the container's padding in pixels.

## Accepts

- `Number`

- `Array<Number>` (`[top, right, bottom, left]`)

- A `Function` that returns `Array<Number>` (`[top, right, bottom, left]`)

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.

It can also be refreshed manually using the `refresh()` method.

## Default

`0`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  containerPadding: [ 16, 32, -16, 64], // top, right, bottom, left
  scrollThreshold: 0,
});
```

## Code example (html)

```html
<div class="large centered padded show-bounds grid square-grid">
  <div class="square draggable"></div>
</div>
```

## Code example (css)

```css
.grid.padded.show-bounds::after {
  opacity: 1;
  top: calc(1rem);
  right: calc(2rem - 1px);
  bottom: calc(-1rem - 1px);
  left: calc(4rem);
  border: 1px dashed currentColor;
  box-shadow: none;
}
```

---

← Prev: **container** (`draggable/draggable-settings/container`) | Next: **containerFriction** (`draggable/draggable-settings/containerfriction`) →
