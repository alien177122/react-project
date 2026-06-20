---
{
  "order": 95,
  "section": "draggable",
  "path": "draggable-callbacks/onsettle",
  "slug": "draggable/draggable-callbacks/onsettle",
  "url": "https://animejs.com/documentation/draggable/draggable-callbacks/onsettle",
  "title": "onSettle",
  "breadcrumb": [
    "Draggable",
    "Draggable callbacks",
    "onSettle"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onSnap",
    "slug": "draggable/draggable-callbacks/onsnap"
  },
  "next": {
    "title": "onResize",
    "slug": "draggable/draggable-callbacks/onresize"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onSettle

> Source: [https://animejs.com/documentation/draggable/draggable-callbacks/onsettle](https://animejs.com/documentation/draggable/draggable-callbacks/onsettle)
> Breadcrumb: Draggable → Draggable callbacks → onSettle

Draggable

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onSettle                                              
        

          
        Executes a function when the dragged target has completely stopped moving when released after a grab.

## Accepts

A `Function` whose first argument is the draggable itself

## Default

`noop`

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let stops = 0;

createDraggable('.square', {
  container: '.grid',
  onSettle: () => $value.textContent = ++stops
});
```

## Code example (html)

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">stops</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

---

← Prev: **onSnap** (`draggable/draggable-callbacks/onsnap`) | Next: **onResize** (`draggable/draggable-callbacks/onresize`) →
