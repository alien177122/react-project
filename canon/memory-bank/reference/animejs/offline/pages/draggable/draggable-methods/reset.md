---
{
  "order": 103,
  "section": "draggable",
  "path": "draggable-methods/reset",
  "slug": "draggable/draggable-methods/reset",
  "url": "https://animejs.com/documentation/draggable/draggable-methods/reset",
  "title": "reset()",
  "breadcrumb": [
    "Draggable",
    "Draggable methods",
    "reset()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "stop()",
    "slug": "draggable/draggable-methods/stop"
  },
  "next": {
    "title": "revert()",
    "slug": "draggable/draggable-methods/revert"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# reset()

> Source: [https://animejs.com/documentation/draggable/draggable-methods/reset](https://animejs.com/documentation/draggable/draggable-methods/reset)
> Breadcrumb: Draggable → Draggable methods → reset()

Draggable

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            reset()                                              
        

          
        Restores the draggable element to its initial position.

## Returns

The draggable itself

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $resetButton ] = utils.$('.reset');

const draggable = createDraggable('.square');

const resetDraggable = () => draggable.reset();

$resetButton.addEventListener('click', resetDraggable);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button reset">Reset</button>
  </fieldset>
</div>
```

---

← Prev: **stop()** (`draggable/draggable-methods/stop`) | Next: **revert()** (`draggable/draggable-methods/revert`) →
