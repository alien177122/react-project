---
{
  "order": 75,
  "section": "animation",
  "path": "tween-value-types/color-function-value",
  "slug": "animation/tween-value-types/color-function-value",
  "url": "https://animejs.com/documentation/animation/tween-value-types/color-function-value",
  "title": "Color function value",
  "breadcrumb": [
    "Animation",
    "Tween value types"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Color value",
    "slug": "animation/tween-value-types/color-value"
  },
  "next": {
    "title": "CSS variable",
    "slug": "animation/tween-value-types/css-variable"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# Color function value

> Source: [https://animejs.com/documentation/animation/tween-value-types/color-function-value](https://animejs.com/documentation/animation/tween-value-types/color-function-value)
> Breadcrumb: Animation → Tween value types

Animation

                          
              
                Tween value types              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Color function value                        WAAPI                      
        

          
        The CSS `color()` function can be animated with the WAAPI `animate()` method.

## Accepts

Any valid CSS color space syntax is supported

## Code example (js)

```js
import { waapi } from 'animejs';

waapi.animate('.circle',  {
  backgroundColor: 'color(display-p3 1.0 0.267 0.267 / 1.0)',
});
```

## Code example (html)

```html
<div class="large justified row">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
```

## Code example (css)

```css
.is-active > #animation-tween-value-types-color-function-value .docs-demo-template { opacity: 0 }
.is-active > #animation-tween-value-types-color-function-value .circle { background-color: color(display-p3 1.000000 0.780392 0.188235 / 1.000000) }
```

---

← Prev: **Color value** (`animation/tween-value-types/color-value`) | Next: **CSS variable** (`animation/tween-value-types/css-variable`) →
