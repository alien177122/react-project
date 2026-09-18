---
{
  "order": 93,
  "section": "draggable",
  "path": "draggable-callbacks/onrelease",
  "slug": "draggable/draggable-callbacks/onrelease",
  "url": "https://animejs.com/documentation/draggable/draggable-callbacks/onrelease",
  "title": "onRelease",
  "breadcrumb": [
    "Draggable",
    "Draggable callbacks",
    "onRelease"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onUpdate",
    "slug": "draggable/draggable-callbacks/onupdate"
  },
  "next": {
    "title": "onSnap",
    "slug": "draggable/draggable-callbacks/onsnap"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onRelease

> Source: [https://animejs.com/documentation/draggable/draggable-callbacks/onrelease](https://animejs.com/documentation/draggable/draggable-callbacks/onrelease)
> Breadcrumb: Draggable → Draggable callbacks → onRelease

Draggable

                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onRelease                                              
        

          
        Executes a function when the element is released after a grab.

## Accepts

A `Function` whose first argument is the draggable itself

## Default

`noop`

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let releases = 0;

createDraggable('.square', {
  container: '.grid',
  onRelease: () => $value.textContent = ++releases
});
```

## Code example (html)

```html
<div class="large padded grid square-grid">
  <pre class="large log row">
    <span class="label">releases</span>
    <span class="value">0</span>
  </pre>
  <div class="square draggable"></div>
</div>
```

---

← Prev: **onUpdate** (`draggable/draggable-callbacks/onupdate`) | Next: **onSnap** (`draggable/draggable-callbacks/onsnap`) →
