---
{
  "order": 97,
  "section": "draggable",
  "path": "draggable-callbacks/onupdate",
  "slug": "draggable/draggable-callbacks/onupdate",
  "url": "https://animejs.com/documentation/draggable/draggable-callbacks/onupdate",
  "title": "onUpdate",
  "breadcrumb": [
    "Draggable",
    "Draggable callbacks",
    "onUpdate"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onDrag",
    "slug": "draggable/draggable-callbacks/ondrag"
  },
  "next": {
    "title": "onRelease",
    "slug": "draggable/draggable-callbacks/onrelease"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onUpdate

> Source: [https://animejs.com/documentation/draggable/draggable-callbacks/onupdate](https://animejs.com/documentation/draggable/draggable-callbacks/onupdate)
> Breadcrumb: Draggable → Draggable callbacks → onUpdate

Draggable

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onUpdate                                              
        

          
        Executes a function every time the position of the dragged element changes.

## Accepts

A `Function` whose first argument is the draggable itself

## Default

`noop`

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let updates = 0;

createDraggable('.square', {
  container: '.grid',
  onUpdate: () => $value.textContent = ++updates
});
```

## Code example (html)

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">updates</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

---

← Prev: **onDrag** (`draggable/draggable-callbacks/ondrag`) | Next: **onRelease** (`draggable/draggable-callbacks/onrelease`) →
