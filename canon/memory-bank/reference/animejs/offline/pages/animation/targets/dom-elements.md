---
{
  "order": 64,
  "section": "animation",
  "path": "targets/dom-elements",
  "slug": "animation/targets/dom-elements",
  "url": "https://animejs.com/documentation/animation/targets/dom-elements",
  "title": "DOM Elements",
  "breadcrumb": [
    "Animation",
    "Targets",
    "DOM Elements"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "CSS Selector",
    "slug": "animation/targets/css-selector"
  },
  "next": {
    "title": "JavaScript Objects",
    "slug": "animation/targets/javascript-objects"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# DOM Elements

> Source: [https://animejs.com/documentation/animation/targets/dom-elements](https://animejs.com/documentation/animation/targets/dom-elements)
> Breadcrumb: Animation → Targets → DOM Elements

Animation

                          
              
                Targets              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            DOM Elements                                              
        

          
        Targets one or multiple DOM Elements.

## Accepts

- `HTMLElement`

- `SVGElement`

- `SVGGeometryElement`

- `NodeList`

## Code example (js)

```js
import { animate } from 'animejs';

const $demo = document.querySelector('#selector-demo');
const $squares = $demo.querySelectorAll('.square');

animate($demo, { scale: .75 });
animate($squares, { x: '23rem' });
```

## Code example (html)

```html
<div id="selector-demo">
  <div class="medium row">
    <div class="square"></div>
  </div>
  <div class="medium row">
    <div class="square"></div>
  </div>
  <div class="medium row">
    <div class="square"></div>
  </div>
</div>
```

---

← Prev: **CSS Selector** (`animation/targets/css-selector`) | Next: **JavaScript Objects** (`animation/targets/javascript-objects`) →
