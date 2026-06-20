---
{
  "order": 108,
  "section": "draggable",
  "path": "draggable-methods/stop",
  "slug": "draggable/draggable-methods/stop",
  "url": "https://animejs.com/documentation/draggable/draggable-methods/stop",
  "title": "stop()",
  "breadcrumb": [
    "Draggable",
    "Draggable methods",
    "stop()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "scrollInView()",
    "slug": "draggable/draggable-methods/scrollinview"
  },
  "next": {
    "title": "reset()",
    "slug": "draggable/draggable-methods/reset"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# stop()

> Source: [https://animejs.com/documentation/draggable/draggable-methods/stop](https://animejs.com/documentation/draggable/draggable-methods/stop)
> Breadcrumb: Draggable → Draggable methods → stop()

Draggable

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            stop()                                              
        

          
        Stop all currently running animations targeting the draggable, the container scroll animation and the draggable release animation.

## Returns

The draggable itself

## Code example (js)

```js
import { createDraggable, animate, utils } from 'animejs';

const [ $stopButton ] = utils.$('.stop');

const draggable = createDraggable('.square');

animate(draggable, {
  x: [-100, 100],
  alternate: true,
  loop: true
});

const stopDraggable = () => draggable.stop();

$stopButton.addEventListener('click', stopDraggable);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button stop">Stop</button>
  </fieldset>
</div>
```

---

← Prev: **scrollInView()** (`draggable/draggable-methods/scrollinview`) | Next: **reset()** (`draggable/draggable-methods/reset`) →
