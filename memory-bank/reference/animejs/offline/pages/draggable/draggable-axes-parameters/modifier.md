---
{
  "order": 85,
  "section": "draggable",
  "path": "draggable-axes-parameters/modifier",
  "slug": "draggable/draggable-axes-parameters/modifier",
  "url": "https://animejs.com/documentation/draggable/draggable-axes-parameters/modifier",
  "title": "modifier",
  "breadcrumb": [
    "Draggable",
    "Draggable axes parameters",
    "modifier"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "snap",
    "slug": "draggable/draggable-axes-parameters/snap"
  },
  "next": {
    "title": "mapTo",
    "slug": "draggable/draggable-axes-parameters/mapto"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# modifier

> Source: [https://animejs.com/documentation/draggable/draggable-axes-parameters/modifier](https://animejs.com/documentation/draggable/draggable-axes-parameters/modifier)
> Breadcrumb: Draggable → Draggable axes parameters → modifier

Draggable

                          
              
                Axes parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            modifier                                              
        

          
        Defines a Modifier function that alter of modify the value of either both axes or one specific axis.

## Accepts

Modifier function

## Default

`noop`

## Related

- [Modifier function](https://animejs.com/documentation/animation/tween-parameters/modifier)

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

createDraggable('.square', {
  modifier: utils.wrap(-32, 32), // Global to both x and y
  x: { modifier: utils.wrap(-128, 128) }, // Specific to x 
});
```

## Code example (html)

```html
<div class="large grid centered square-grid">
  <div class="square draggable"></div>
</div>
```

---

← Prev: **snap** (`draggable/draggable-axes-parameters/snap`) | Next: **mapTo** (`draggable/draggable-axes-parameters/mapto`) →
