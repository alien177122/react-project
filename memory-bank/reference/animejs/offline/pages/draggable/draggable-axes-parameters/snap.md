---
{
  "order": 86,
  "section": "draggable",
  "path": "draggable-axes-parameters/snap",
  "slug": "draggable/draggable-axes-parameters/snap",
  "url": "https://animejs.com/documentation/draggable/draggable-axes-parameters/snap",
  "title": "snap",
  "breadcrumb": [
    "Draggable",
    "Draggable axes parameters",
    "snap"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "y",
    "slug": "draggable/draggable-axes-parameters/y"
  },
  "next": {
    "title": "modifier",
    "slug": "draggable/draggable-axes-parameters/modifier"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# snap

> Source: [https://animejs.com/documentation/draggable/draggable-axes-parameters/snap](https://animejs.com/documentation/draggable/draggable-axes-parameters/snap)
> Breadcrumb: Draggable → Draggable axes parameters → snap

Draggable

                          
              
                Axes parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            snap                                              
        

          
        Rounds the final value of either both axes or one specific axis to the nearest specified increment.

If an `Array` is provided as the increment, it selects the closest value from the array.

## Accepts

- `Number`

- `Array<Number>`

- A `Function` that returns any if the above

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.

It can also be refreshed manually using the `refresh()` method.

## Default

`0`

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  snap: 56, // Global to both x and y
  x: { snap: [0, 200] }, // Specific to x 
});
```

## Code example (html)

```html
<div class="large grid square-grid">
  <div class="square draggable"></div>
</div>
```

## Code example (css)

```css
#draggable-draggable-axes-parameters-snap .demo {
  width: 300px;
}

#draggable-draggable-axes-parameters-snap .grid::before {
  background-size: 100px 56px;
}

#draggable-draggable-axes-parameters-snap .grid::after {
  content: "";
  display: block;
  position: absolute;
  top: 1px;
  left: 100px;
  width: 100px;
  height: calc(100% - 1px);
  background-image: repeating-linear-gradient(
    45deg,
    currentColor 0,
    currentColor 1px,
    transparent 1px,
    transparent 6px
  );
  background-size: 8px 8px;
}

#draggable-draggable-axes-parameters-snap .square {
  width: 100px;
  height: 56px;
}
```

---

← Prev: **y** (`draggable/draggable-axes-parameters/y`) | Next: **modifier** (`draggable/draggable-axes-parameters/modifier`) →
