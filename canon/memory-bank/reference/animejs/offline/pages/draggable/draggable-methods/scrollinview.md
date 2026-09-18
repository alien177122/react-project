---
{
  "order": 105,
  "section": "draggable",
  "path": "draggable-methods/scrollinview",
  "slug": "draggable/draggable-methods/scrollinview",
  "url": "https://animejs.com/documentation/draggable/draggable-methods/scrollinview",
  "title": "scrollInView()",
  "breadcrumb": [
    "Draggable",
    "Draggable methods",
    "scrollInView()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "animateInView()",
    "slug": "draggable/draggable-methods/animateinview"
  },
  "next": {
    "title": "stop()",
    "slug": "draggable/draggable-methods/stop"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# scrollInView()

> Source: [https://animejs.com/documentation/draggable/draggable-methods/scrollinview](https://animejs.com/documentation/draggable/draggable-methods/scrollinview)
> Breadcrumb: Draggable → Draggable methods → scrollInView()

Draggable

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            scrollInView()                                              
        

          
        Animate the scroll position of the container if the draggable  position is outside of the scroll threshold.

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| duration(opt) | `Number` | The duration of the animation (default `350`) |
| gap(opt) | `Boolean` | How much extra distance from the edges of the container the draggable should be animated to |
| ease(opt) | `ease` | The easing function applied to the animation (default `InOutQuad` |

## Returns

The draggable itself

## Code example (js)

```js
import { createDraggable, utils } from 'animejs';

const [ $scrollInView ] = utils.$('.button');

const draggable = createDraggable('.square', {
  container: '.scroll-container',
});

const scrollInView = () => {
  draggable.scrollInView(400, 100);
}

// Set the draggable position outside the scroll viewport
draggable.x = 120;
draggable.y = 200;

$scrollInView.addEventListener('click', scrollInView);
```

## Code example (html)

```html
<div class="scroll-container scroll-x scroll-y">
  <div class="scroll-content">
    <div class="large padded grid square-grid">
      <div class="square draggable"></div>
    </div>
  </div>
</div>
<fieldset class="absolute controls">
  <button class="button">Scroll in view</button>
</fieldset>
```

---

← Prev: **animateInView()** (`draggable/draggable-methods/animateinview`) | Next: **stop()** (`draggable/draggable-methods/stop`) →
