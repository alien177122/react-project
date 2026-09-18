---
{
  "order": 100,
  "section": "draggable",
  "path": "draggable-methods/disable",
  "slug": "draggable/draggable-methods/disable",
  "url": "https://animejs.com/documentation/draggable/draggable-methods/disable",
  "title": "disable()",
  "breadcrumb": [
    "Draggable",
    "Draggable methods",
    "disable()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Draggable methods",
    "slug": "draggable/draggable-methods"
  },
  "next": {
    "title": "enable()",
    "slug": "draggable/draggable-methods/enable"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# disable()

> Source: [https://animejs.com/documentation/draggable/draggable-methods/disable](https://animejs.com/documentation/draggable/draggable-methods/disable)
> Breadcrumb: Draggable → Draggable methods → disable()

Draggable

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            disable()                                              
        

          
        Deactivates the draggable, rendering it inert.

## Returns

The draggable itself

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $disableButton ] = utils.$('.disable');

const draggable = createDraggable('.square');

const disableDraggable = () => draggable.disable();

$disableButton.addEventListener('click', disableDraggable);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button disable">Disable</button>
  </fieldset>
</div>
```

---

← Prev: **Draggable methods** (`draggable/draggable-methods`) | Next: **enable()** (`draggable/draggable-methods/enable`) →
