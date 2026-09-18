---
{
  "order": 91,
  "section": "draggable",
  "path": "draggable-callbacks/ondrag",
  "slug": "draggable/draggable-callbacks/ondrag",
  "url": "https://animejs.com/documentation/draggable/draggable-callbacks/ondrag",
  "title": "onDrag",
  "breadcrumb": [
    "Draggable",
    "Draggable callbacks",
    "onDrag"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onGrab",
    "slug": "draggable/draggable-callbacks/ongrab"
  },
  "next": {
    "title": "onUpdate",
    "slug": "draggable/draggable-callbacks/onupdate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onDrag

> Source: [https://animejs.com/documentation/draggable/draggable-callbacks/ondrag](https://animejs.com/documentation/draggable/draggable-callbacks/ondrag)
> Breadcrumb: Draggable → Draggable callbacks → onDrag

Draggable

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onDrag                                              
        

          
        Executes a function when the element is being dragged.

## Accepts

A `Function` whose first argument is the draggable itself

## Default

`noop`

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let drags = 0;

createDraggable('.square', {
  container: '.grid',
  onDrag: () => $value.textContent = ++drags
});
```

## Code example (html)

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">drags</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

---

← Prev: **onGrab** (`draggable/draggable-callbacks/ongrab`) | Next: **onUpdate** (`draggable/draggable-callbacks/onupdate`) →
