---
{
  "order": 99,
  "section": "draggable",
  "path": "draggable-methods/animateinview",
  "slug": "draggable/draggable-methods/animateinview",
  "url": "https://animejs.com/documentation/draggable/draggable-methods/animateinview",
  "title": "animateInView()",
  "breadcrumb": [
    "Draggable",
    "Draggable methods",
    "animateInView()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "setY()",
    "slug": "draggable/draggable-methods/sety"
  },
  "next": {
    "title": "scrollInView()",
    "slug": "draggable/draggable-methods/scrollinview"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# animateInView()

> Source: [https://animejs.com/documentation/draggable/draggable-methods/animateinview](https://animejs.com/documentation/draggable/draggable-methods/animateinview)
> Breadcrumb: Draggable → Draggable methods → animateInView()

Draggable

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            animateInView()                                              
        

          
        Animate the draggable inside the viewport if positioned outside of the container. 

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

const [ $animateInView ] = utils.$('.animate-button');

const draggable = createDraggable('.square', {
  container: '.grid',
});

const animateInView = () => {
  draggable.animateInView(400, 16);
}

// Set the draggable position outside the container
draggable.x = -24;
draggable.y = 72;

$animateInView.addEventListener('click', animateInView);
```

## Code example (html)

```html
<div class="medium padded show-bounds grid square-grid animate-in-view">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button animate-button">Animate in view</button>
  </fieldset>
</div>
```

## Code example (css)

```css
.show-bounds.grid.square-grid.animate-in-view::after {
  opacity: 1;
  top: calc(1rem);
  right: calc(1rem - 1px);
  bottom: calc(1rem - 1px);
  left: calc(1rem);
  border: 1px dashed currentColor;
  box-shadow: none;
}
```

---

← Prev: **setY()** (`draggable/draggable-methods/sety`) | Next: **scrollInView()** (`draggable/draggable-methods/scrollinview`) →
