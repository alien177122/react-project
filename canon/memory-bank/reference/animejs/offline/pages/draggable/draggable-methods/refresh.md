---
{
  "order": 102,
  "section": "draggable",
  "path": "draggable-methods/refresh",
  "slug": "draggable/draggable-methods/refresh",
  "url": "https://animejs.com/documentation/draggable/draggable-methods/refresh",
  "title": "refresh()",
  "breadcrumb": [
    "Draggable",
    "Draggable methods",
    "refresh()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "revert()",
    "slug": "draggable/draggable-methods/revert"
  },
  "next": {
    "title": "Draggable properties",
    "slug": "draggable/draggable-properties"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# refresh()

> Source: [https://animejs.com/documentation/draggable/draggable-methods/refresh](https://animejs.com/documentation/draggable/draggable-methods/refresh)
> Breadcrumb: Draggable → Draggable methods → refresh()

Draggable

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            refresh()                                              
        

          
        Re-compute every parameter defined using a function and re-calculate all internal values.

## Refreshable parameters

- `snap`

- `container`

- `containerPadding`

- `containerFriction`

- `dragSpeed`

- `scrollSpeed`

- `scrollThreshold`

- `minVelocity`

- `maxVelocity`

- `velocityMultiplier`

## Returns

The draggable itself

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $refreshButton ] = utils.$('.refresh');

const draggable = createDraggable('.square', {
  snap: () => utils.random(0, 32, 0),
  dragSpeed: () => utils.random(.5, 1.5, 1),
});

const refreshDraggable = () => draggable.refresh();

$refreshButton.addEventListener('click', refreshDraggable);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button refresh">Refresh</button>
  </fieldset>
</div>
```

---

← Prev: **revert()** (`draggable/draggable-methods/revert`) | Next: **Draggable properties** (`draggable/draggable-properties`) →
