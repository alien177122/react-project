---
{
  "order": 121,
  "section": "draggable",
  "path": "draggable-settings/releaseease",
  "slug": "draggable/draggable-settings/releaseease",
  "url": "https://animejs.com/documentation/draggable/draggable-settings/releaseease",
  "title": "releaseEase",
  "breadcrumb": [
    "Draggable",
    "Draggable settings",
    "releaseEase"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "maxVelocity",
    "slug": "draggable/draggable-settings/maxvelocity"
  },
  "next": {
    "title": "dragSpeed",
    "slug": "draggable/draggable-settings/dragspeed"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# releaseEase

> Source: [https://animejs.com/documentation/draggable/draggable-settings/releaseease](https://animejs.com/documentation/draggable/draggable-settings/releaseease)
> Breadcrumb: Draggable → Draggable settings → releaseEase

Draggable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            releaseEase                                              
        

          
        Specifies a custom easing applied to the dragged element after release, a snap event, or repositioning when dragged out of bounds.

## Accepts

ease

Passing `spring()` overrides the draggable `releaseMass`, `releaseStiffness` and `releaseDamping` parameters. The `velocity` parameter of `spring()` has no effect and is replaced with the actual velocity of the dragged element.

## Default

`eases.outQuint`

## Related

- [ease](https://animejs.com/documentation/animation/tween-parameters/ease)

## Code example (js)

```js
import { createDraggable, spring } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseEase: 'outElastic',
});

createDraggable('.circle', {
  container: '.grid',
  releaseEase: spring({
    stiffness: 150,
    damping: 15,
  })
});
```

## Code example (html)

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

---

← Prev: **maxVelocity** (`draggable/draggable-settings/maxvelocity`) | Next: **dragSpeed** (`draggable/draggable-settings/dragspeed`) →
