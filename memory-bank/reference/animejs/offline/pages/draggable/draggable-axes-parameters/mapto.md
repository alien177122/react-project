---
{
  "order": 84,
  "section": "draggable",
  "path": "draggable-axes-parameters/mapto",
  "slug": "draggable/draggable-axes-parameters/mapto",
  "url": "https://animejs.com/documentation/draggable/draggable-axes-parameters/mapto",
  "title": "mapTo",
  "breadcrumb": [
    "Draggable",
    "Draggable axes parameters",
    "mapTo"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "modifier",
    "slug": "draggable/draggable-axes-parameters/modifier"
  },
  "next": {
    "title": "Draggable settings",
    "slug": "draggable/draggable-settings"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# mapTo

> Source: [https://animejs.com/documentation/draggable/draggable-axes-parameters/mapto](https://animejs.com/documentation/draggable/draggable-axes-parameters/mapto)
> Breadcrumb: Draggable → Draggable axes parameters → mapTo

Draggable

                          
              
                Axes parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            mapTo                                              
        

          
        Maps the axis value to a different property of the element.

## Accepts

`String`

## Default

`null`

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

utils.set('.square', { z: 100 });

createDraggable('.square', {
  x: { mapTo: 'rotateY' },
  y: { mapTo: 'z' },
});
```

## Code example (html)

```html
<div class="large grid centered perspective square-grid">
  <div class="square draggable"></div>
</div>
```

---

← Prev: **modifier** (`draggable/draggable-axes-parameters/modifier`) | Next: **Draggable settings** (`draggable/draggable-settings`) →
