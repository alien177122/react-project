---
{
  "order": 87,
  "section": "draggable",
  "path": "draggable-axes-parameters/x",
  "slug": "draggable/draggable-axes-parameters/x",
  "url": "https://animejs.com/documentation/draggable/draggable-axes-parameters/x",
  "title": "x",
  "breadcrumb": [
    "Draggable",
    "Draggable axes parameters",
    "x"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Draggable axes parameters",
    "slug": "draggable/draggable-axes-parameters"
  },
  "next": {
    "title": "y",
    "slug": "draggable/draggable-axes-parameters/y"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# x

> Source: [https://animejs.com/documentation/draggable/draggable-axes-parameters/x](https://animejs.com/documentation/draggable/draggable-axes-parameters/x)
> Breadcrumb: Draggable → Draggable axes parameters → x

Draggable

                          
              
                Axes parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            x                                              
        

          
        Defines the behaviour of the x-axis by either passing an object of parameters or disabling it by setting the value to `false`.

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
  x: true
});

createDraggable('.square.disabled', {
  x: false
});
```

## Code example (html)

```html
<div class="large spaced-evenly row">
  <div class="square enabled draggable"></div>
  <div class="square disabled draggable"></div>
</div>
<div class="large spaced-evenly row">
  <div class="label">x enabled</div>
  <div class="label">x disabled</div>
</div>
```

---

← Prev: **Draggable axes parameters** (`draggable/draggable-axes-parameters`) | Next: **y** (`draggable/draggable-axes-parameters/y`) →
