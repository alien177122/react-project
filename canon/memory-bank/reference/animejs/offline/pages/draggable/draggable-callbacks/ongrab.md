---
{
  "order": 92,
  "section": "draggable",
  "path": "draggable-callbacks/ongrab",
  "slug": "draggable/draggable-callbacks/ongrab",
  "url": "https://animejs.com/documentation/draggable/draggable-callbacks/ongrab",
  "title": "onGrab",
  "breadcrumb": [
    "Draggable",
    "Draggable callbacks",
    "onGrab"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Draggable callbacks",
    "slug": "draggable/draggable-callbacks"
  },
  "next": {
    "title": "onDrag",
    "slug": "draggable/draggable-callbacks/ondrag"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onGrab

> Source: [https://animejs.com/documentation/draggable/draggable-callbacks/ongrab](https://animejs.com/documentation/draggable/draggable-callbacks/ongrab)
> Breadcrumb: Draggable → Draggable callbacks → onGrab

Draggable

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onGrab                                              
        

          
        Executes a function when the element is grabbed.

## Accepts

A `Function` whose first argument is the draggable itself

## Default

`noop`

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let grabs = 0;

createDraggable('.square', {
  container: '.grid',
  onGrab: () => $value.textContent = ++grabs
});
```

## Code example (html)

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">grabs</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

---

← Prev: **Draggable callbacks** (`draggable/draggable-callbacks`) | Next: **onDrag** (`draggable/draggable-callbacks/ondrag`) →
