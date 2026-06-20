---
{
  "order": 126,
  "section": "draggable",
  "path": "draggable-settings/trigger",
  "slug": "draggable/draggable-settings/trigger",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/trigger",
  "title": "trigger",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "trigger"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Draggable settings",
    "slug": "draggable/draggable-settings"
  },
  "next": {
    "title": "container",
    "slug": "draggable/draggable-settings/container"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# trigger

> Source: [https://animejs.com/documentation/draggable/draggable-settings/trigger](https://animejs.com/documentation/draggable/draggable-settings/trigger)
> Breadcrumb: Draggable → Draggable settings → trigger

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            trigger                                              
        

          
        Specifies a different element than the defined target to trigger the drag animation.

## Accepts

- CSS Selector

- DOM Element

## Related

- [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector)
- [DOM Element](https://animejs.com/documentation/animation/targets/dom-elements)

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.row', {
  trigger: '.circle',
});
```

## Code example (html)

```html
<div class="large centered row">
  <div class="square"></div>
  <div class="circle draggable"></div>
  <div class="square"></div>
</div>
```

---

← Prev: **Draggable settings** (`draggable/draggable-settings`) | Next: **container** (`draggable/draggable-settings/container`) →
