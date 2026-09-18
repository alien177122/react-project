---
{
  "order": 94,
  "section": "draggable",
  "path": "draggable-callbacks/onresize",
  "slug": "draggable/draggable-callbacks/onresize",
  "url": "https://animejs.com/documentation/draggable/draggable-callbacks/onresize",
  "title": "onResize",
  "breadcrumb": [
    "Draggable",
    "Draggable callbacks",
    "onResize"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onSettle",
    "slug": "draggable/draggable-callbacks/onsettle"
  },
  "next": {
    "title": "onAfterResize",
    "slug": "draggable/draggable-callbacks/onafterresize"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onResize

> Source: [https://animejs.com/documentation/draggable/draggable-callbacks/onresize](https://animejs.com/documentation/draggable/draggable-callbacks/onresize)
> Breadcrumb: Draggable → Draggable callbacks → onResize

Draggable

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onResize                                              
        

          
        Executes a function when either the container or the dragged target sizes change.

## Accepts

A `Function` whose first argument is the draggable itself

## Default

`noop`

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let resizes = 0;

createDraggable('.square', {
  container: '.grid',
  onResize: self => {
    $value.textContent = ++resizes;
  }
});
```

## Code example (html)

```html
<div class="iframe-content resizable">
  <div class="large padded grid square-grid">
    <pre class="large log row">
      <span class="label">resizes</span>
      <span class="value">0</span>
    </pre>
    <div class="square draggable"></div>
  </div>
</div>
```

---

← Prev: **onSettle** (`draggable/draggable-callbacks/onsettle`) | Next: **onAfterResize** (`draggable/draggable-callbacks/onafterresize`) →
