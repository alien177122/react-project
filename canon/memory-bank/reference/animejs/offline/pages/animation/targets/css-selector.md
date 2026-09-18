---
{
  "order": 63,
  "section": "animation",
  "path": "targets/css-selector",
  "slug": "animation/targets/css-selector",
  "url": "https://animejs.com/documentation/animation/targets/css-selector",
  "title": "CSS Selector",
  "breadcrumb": [
    "Animation",
    "Targets",
    "CSS Selector"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "Targets",
    "slug": "animation/targets"
  },
  "next": {
    "title": "DOM Elements",
    "slug": "animation/targets/dom-elements"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# CSS Selector

> Source: [https://animejs.com/documentation/animation/targets/css-selector](https://animejs.com/documentation/animation/targets/css-selector)
> Breadcrumb: Animation → Targets → CSS Selector

Animation

                          
              
                Targets              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            CSS Selector                                              
        

          
        Targets one or multiple DOM Elements using a CSS selector.

## Accepts

Any `String` accepted by `document.querySelectorAll()`

## Code example (js)

```js
import { animate } from 'animejs';

animate('.square', { x: '17rem' });
animate('#css-selector-id', { rotate: '1turn' });
animate('.row:nth-child(3) .square', { scale: [1, .5, 1] });
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div id="css-selector-id" class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
```

---

← Prev: **Targets** (`animation/targets`) | Next: **DOM Elements** (`animation/targets/dom-elements`) →
