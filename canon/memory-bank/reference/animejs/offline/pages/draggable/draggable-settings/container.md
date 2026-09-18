---
{
  "order": 111,
  "section": "draggable",
  "path": "draggable-settings/container",
  "slug": "draggable/draggable-settings/container",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/container",
  "title": "container",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "container"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "trigger",
    "slug": "draggable/draggable-settings/trigger"
  },
  "next": {
    "title": "containerPadding",
    "slug": "draggable/draggable-settings/containerpadding"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# container

> Source: [https://animejs.com/documentation/draggable/draggable-settings/container](https://animejs.com/documentation/draggable/draggable-settings/container)
> Breadcrumb: Draggable → Draggable settings → container

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            container                                              
        

          
        Specifies the container of the draggable element, preventing it from being dragged outside of the defined boundaries.

## Accepts

- CSS Selector `String` to target an `HTMLElement`

- `HTMLElement`

- `Array<Number>` (`[top, right, bottom, left]`)

- A `Function` that returns `Array<Number>` (`[top, right, bottom, left]`)

When defined using a `Function`, the value will be automatically refreshed every time the window or target element is resized.

It can also be refreshed manually using the `refresh()` method.

## Default

`null`

## Related

- [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector)

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
});

createDraggable('.circle', {
  container: [-16, 80, 16, 0],
});
```

## Code example (html)

```html
<div class="large centered grid square-grid array-container">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

## Code example (css)

```css
.grid.array-container::after {
  opacity: 1;
  top: calc(1rem);
  right: calc(1rem - 1px);
  bottom: calc(1rem - 1px);
  left: calc(10rem);
  border: 1px dotted currentColor;
  box-shadow: none;
}
```

---

← Prev: **trigger** (`draggable/draggable-settings/trigger`) | Next: **containerPadding** (`draggable/draggable-settings/containerpadding`) →
