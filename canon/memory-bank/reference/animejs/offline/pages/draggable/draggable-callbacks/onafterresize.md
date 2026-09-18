---
{
  "order": 90,
  "section": "draggable",
  "path": "draggable-callbacks/onafterresize",
  "slug": "draggable/draggable-callbacks/onafterresize",
  "url": "https://animejs.com/documentation/draggable/draggable-callbacks/onafterresize",
  "title": "onAfterResize",
  "breadcrumb": [
    "Draggable",
    "Draggable callbacks",
    "onAfterResize"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onResize",
    "slug": "draggable/draggable-callbacks/onresize"
  },
  "next": {
    "title": "Draggable methods",
    "slug": "draggable/draggable-methods"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onAfterResize

> Source: [https://animejs.com/documentation/draggable/draggable-callbacks/onafterresize](https://animejs.com/documentation/draggable/draggable-callbacks/onafterresize)
> Breadcrumb: Draggable → Draggable callbacks → onAfterResize

Draggable

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onAfterResize                                              
        

          
        Executes a function after either the container or the dragged target sizes change and the draggable values have been updated.

This can be used to update the position of the dragged element if the container size has changed.

## Accepts

A `Function` whose first argument is the draggable itself

## Default

`noop`

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let resizes = 0;

const draggable = createDraggable('.square', {
  container: '.grid',
  onAfterResize: self => {
    $value.textContent = ++resizes;
    self.animateInView(1000, 30);
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

← Prev: **onResize** (`draggable/draggable-callbacks/onresize`) | Next: **Draggable methods** (`draggable/draggable-methods`) →
