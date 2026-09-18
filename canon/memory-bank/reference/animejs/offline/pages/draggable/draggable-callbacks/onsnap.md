---
{
  "order": 96,
  "section": "draggable",
  "path": "draggable-callbacks/onsnap",
  "slug": "draggable/draggable-callbacks/onsnap",
  "url": "https://animejs.com/documentation/draggable/draggable-callbacks/onsnap",
  "title": "onSnap",
  "breadcrumb": [
    "Draggable",
    "Draggable callbacks",
    "onSnap"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onRelease",
    "slug": "draggable/draggable-callbacks/onrelease"
  },
  "next": {
    "title": "onSettle",
    "slug": "draggable/draggable-callbacks/onsettle"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onSnap

> Source: [https://animejs.com/documentation/draggable/draggable-callbacks/onsnap](https://animejs.com/documentation/draggable/draggable-callbacks/onsnap)
> Breadcrumb: Draggable → Draggable callbacks → onSnap

Draggable

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onSnap                                              
        

          
        Executes a function every time a snap occurs when the element is being dragged.

## Accepts

A `Function` whose first argument is the draggable itself

## Default

`noop`

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let snaps = 0;

createDraggable('.square', {
  container: '.grid',
  snap: 16,
  modifier: utils.snap(16), // also snap the element while draggin
  onSnap: () => $value.textContent = ++snaps
});
```

## Code example (html)

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">snaps</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

---

← Prev: **onRelease** (`draggable/draggable-callbacks/onrelease`) | Next: **onSettle** (`draggable/draggable-callbacks/onsettle`) →
