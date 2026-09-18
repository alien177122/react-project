---
{
  "order": 107,
  "section": "draggable",
  "path": "draggable-methods/sety",
  "slug": "draggable/draggable-methods/sety",
  "url": "https://animejs.com/documentation/draggable/draggable-methods/sety",
  "title": "setY()",
  "breadcrumb": [
    "Draggable",
    "Draggable methods",
    "setY()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "setX()",
    "slug": "draggable/draggable-methods/setx"
  },
  "next": {
    "title": "animateInView()",
    "slug": "draggable/draggable-methods/animateinview"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# setY()

> Source: [https://animejs.com/documentation/draggable/draggable-methods/sety](https://animejs.com/documentation/draggable/draggable-methods/sety)
> Breadcrumb: Draggable → Draggable methods → setY()

Draggable

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            setY()                                              
        

          
        Manually set the `y` position of the draggable target.

Is equivalent updating `draggable.y` directly when no `muteCallback` parameter is defined.

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| y | `Number` | The new y value |
| muteCallback(opt) | `Boolean` | If `true`, prevents the `onUpdate` callback to fire (default `false`) |

## Returns

The draggable itself

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $setButton ] = utils.$('.set');

const draggable = createDraggable('.square');

const setRandomY = () => draggable.setY(utils.random(-40, 40));

$setButton.addEventListener('click', setRandomY);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button set">Set random y</button>
  </fieldset>
</div>
```

---

← Prev: **setX()** (`draggable/draggable-methods/setx`) | Next: **animateInView()** (`draggable/draggable-methods/animateinview`) →
