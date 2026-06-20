---
{
  "order": 114,
  "section": "draggable",
  "path": "draggable-settings/cursor",
  "slug": "draggable/draggable-settings/cursor",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/cursor",
  "title": "cursor",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "cursor"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "scrollSpeed",
    "slug": "draggable/draggable-settings/scrollspeed"
  },
  "next": {
    "title": "Draggable callbacks",
    "slug": "draggable/draggable-callbacks"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# cursor

> Source: [https://animejs.com/documentation/draggable/draggable-settings/cursor](https://animejs.com/documentation/draggable/draggable-settings/cursor)
> Breadcrumb: Draggable → Draggable settings → cursor

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            cursor                                              
        

          
        Specifies custom CSS cursor style properties for the hovered and grabbed states on devices that match the media query `'(pointer:fine)'`. 

## Accepts

- `Boolean` (`false` disable custom styling)

- `{ onHover: 'grab', onGrab: 'grabbing' }`

- A `Function` that returns an of the above

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.

It can also be refreshed manually using the `refresh()` method.

## Default

`{ onHover: 'grab', onGrab: 'grabbing' }`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  cursor: false
});

createDraggable('.circle', {
  cursor: {
    onHover: 'move',
    onGrab: 'wait'
  }
});
```

## Code example (html)

```html
<div class="large centered row">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

← Prev: **scrollSpeed** (`draggable/draggable-settings/scrollspeed`) | Next: **Draggable callbacks** (`draggable/draggable-callbacks`) →
