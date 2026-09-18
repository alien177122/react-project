---
{
  "order": 106,
  "section": "draggable",
  "path": "draggable-methods/setx",
  "slug": "draggable/draggable-methods/setx",
  "url": "https://animejs.com/documentation/draggable/draggable-methods/setx",
  "title": "setX()",
  "breadcrumb": [
    "Draggable",
    "Draggable methods",
    "setX()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "enable()",
    "slug": "draggable/draggable-methods/enable"
  },
  "next": {
    "title": "setY()",
    "slug": "draggable/draggable-methods/sety"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# setX()

> Source: [https://animejs.com/documentation/draggable/draggable-methods/setx](https://animejs.com/documentation/draggable/draggable-methods/setx)
> Breadcrumb: Draggable → Draggable methods → setX()

Draggable

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            setX()                                              
        

          
        Manually set the `x` position of the draggable target.

Is equivalent updating `draggable.x` directly when no `muteCallback` parameter is defined.

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| x | `Number` | The new x value |
| muteCallback(opt) | `Boolean` | If `true`, prevents the `onUpdate` callback to fire (default `false`) |

## Returns

The draggable itself

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $setButton ] = utils.$('.set');

const draggable = createDraggable('.square');

const setRandomX = () => draggable.setX(utils.random(-100, 100));

$setButton.addEventListener('click', setRandomX);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button set">Set random x</button>
  </fieldset>
</div>
```

---

← Prev: **enable()** (`draggable/draggable-methods/enable`) | Next: **setY()** (`draggable/draggable-methods/sety`) →
