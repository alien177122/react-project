---
{
  "order": 101,
  "section": "draggable",
  "path": "draggable-methods/enable",
  "slug": "draggable/draggable-methods/enable",
  "url": "https://animejs.com/documentation/draggable/draggable-methods/enable",
  "title": "enable()",
  "breadcrumb": [
    "Draggable",
    "Draggable methods",
    "enable()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "disable()",
    "slug": "draggable/draggable-methods/disable"
  },
  "next": {
    "title": "setX()",
    "slug": "draggable/draggable-methods/setx"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# enable()

> Source: [https://animejs.com/documentation/draggable/draggable-methods/enable](https://animejs.com/documentation/draggable/draggable-methods/enable)
> Breadcrumb: Draggable → Draggable methods → enable()

Draggable

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            enable()                                              
        

          
        Reactivates a previously disabled draggable, making it interactive again.

## Returns

The draggable itself

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $enableButton ] = utils.$('.enable');

const draggable = createDraggable('.square');

draggable.disable();

const enableDraggable = () => draggable.enable();

$enableButton.addEventListener('click', enableDraggable);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button enable">Enable</button>
  </fieldset>
</div>
```

---

← Prev: **disable()** (`draggable/draggable-methods/disable`) | Next: **setX()** (`draggable/draggable-methods/setx`) →
