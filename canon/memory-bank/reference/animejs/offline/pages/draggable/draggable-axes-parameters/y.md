---
{
  "order": 88,
  "section": "draggable",
  "path": "draggable-axes-parameters/y",
  "slug": "draggable/draggable-axes-parameters/y",
  "url": "https://animejs.com/documentation/draggable/draggable-axes-parameters/y",
  "title": "y",
  "breadcrumb": [
    "Draggable",
    "Draggable axes parameters",
    "y"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "x",
    "slug": "draggable/draggable-axes-parameters/x"
  },
  "next": {
    "title": "snap",
    "slug": "draggable/draggable-axes-parameters/snap"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# y

> Source: [https://animejs.com/documentation/draggable/draggable-axes-parameters/y](https://animejs.com/documentation/draggable/draggable-axes-parameters/y)
> Breadcrumb: Draggable → Draggable axes parameters → y

Draggable

                          
              
                Axes parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            y                                              
        

          
        Defines the behaviour of the y-axis by either passing an object of parameters or disabling it by setting the value to `false`.

## Accepts

- `Boolean`

- Draggable axes parameters `Object`

## Default

`true`

## Related

- [Draggable axes parameters](https://animejs.com/documentation/draggable/draggable-axes-parameters)

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square.enabled', {
  y: true
});

createDraggable('.square.disabled', {
  y: false
});
```

## Code example (html)

```html
<div class="large spaced-evenly row">
  <div class="square enabled draggable"></div>
  <div class="square disabled draggable"></div>
</div>
<div class="large spaced-evenly row">
  <div class="label">y enabled</div>
  <div class="label">y disabled</div>
</div>
```

---

← Prev: **x** (`draggable/draggable-axes-parameters/x`) | Next: **snap** (`draggable/draggable-axes-parameters/snap`) →
