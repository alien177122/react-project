---
{
  "order": 104,
  "section": "draggable",
  "path": "draggable-methods/revert",
  "slug": "draggable/draggable-methods/revert",
  "url": "https://animejs.com/documentation/draggable/draggable-methods/revert",
  "title": "revert()",
  "breadcrumb": [
    "Draggable",
    "Draggable methods",
    "revert()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "reset()",
    "slug": "draggable/draggable-methods/reset"
  },
  "next": {
    "title": "refresh()",
    "slug": "draggable/draggable-methods/refresh"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# revert()

> Source: [https://animejs.com/documentation/draggable/draggable-methods/revert](https://animejs.com/documentation/draggable/draggable-methods/revert)
> Breadcrumb: Draggable → Draggable methods → revert()

Draggable

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            revert()                                              
        

          
        Restores the draggable element to its initial state and deactivates it.

## Returns

The draggable itself

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $revertButton ] = utils.$('.revert');

const draggable = createDraggable('.square');

function revertDraggable() {
  draggable.revert();
  $revertButton.disabled = true;
}

$revertButton.addEventListener('click', revertDraggable);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button revert">Revert</button>
  </fieldset>
</div>
```

---

← Prev: **reset()** (`draggable/draggable-methods/reset`) | Next: **refresh()** (`draggable/draggable-methods/refresh`) →
