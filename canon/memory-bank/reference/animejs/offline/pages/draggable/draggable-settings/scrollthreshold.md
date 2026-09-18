---
{
  "order": 125,
  "section": "draggable",
  "path": "draggable-settings/scrollthreshold",
  "slug": "draggable/draggable-settings/scrollthreshold",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/scrollthreshold",
  "title": "scrollThreshold",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "scrollThreshold"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "dragThreshold",
    "slug": "draggable/draggable-settings/dragthreshold"
  },
  "next": {
    "title": "scrollSpeed",
    "slug": "draggable/draggable-settings/scrollspeed"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# scrollThreshold

> Source: [https://animejs.com/documentation/draggable/draggable-settings/scrollthreshold](https://animejs.com/documentation/draggable/draggable-settings/scrollthreshold)
> Breadcrumb: Draggable → Draggable settings → scrollThreshold

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            scrollThreshold                                              
        

          
        Specifies the number of pixels the draggable element must cross beyond the area bounds before the container starts scrolling automatically.

## Accepts

- A `Number`

- A `Function` that returns a `Number`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.

It can also be refreshed manually using the `refresh()` method.

## Default

`20`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.scroll-container',
  scrollThreshold: 12,
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

## Code example (css)

```css
#draggable-draggable-settings-scrollthreshold .draggable {
  background-color: rgba(var(--rgb-current), .25);
  border: solid 1px currentColor;
}

#draggable-draggable-settings-scrollthreshold .draggable::after {
  content: "";
  display: block;
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  bottom: 12px;
  background-color: currentColor;
  border-radius: 2px;
}
```

---

← Prev: **dragThreshold** (`draggable/draggable-settings/dragthreshold`) | Next: **scrollSpeed** (`draggable/draggable-settings/scrollspeed`) →
