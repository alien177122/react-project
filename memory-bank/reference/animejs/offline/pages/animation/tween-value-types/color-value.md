---
{
  "order": 76,
  "section": "animation",
  "path": "tween-value-types/color-value",
  "slug": "animation/tween-value-types/color-value",
  "url": "https://animejs.com/documentation/animation/tween-value-types/color-value",
  "title": "Color value",
  "breadcrumb": [
    "Animation",
    "Tween value types",
    "Color value"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "Relative value",
    "slug": "animation/tween-value-types/relative-value"
  },
  "next": {
    "title": "Color function value",
    "slug": "animation/tween-value-types/color-function-value"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# Color value

> Source: [https://animejs.com/documentation/animation/tween-value-types/color-value](https://animejs.com/documentation/animation/tween-value-types/color-value)
> Breadcrumb: Animation → Tween value types → Color value

Animation

                          
              
                Tween value types              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            Color value                                              
        

          
        Color values in the following formats can be parsed and used as values for animatable color properties.

## Accepts

| Format | Syntax |
| --- | --- |
| HEX | `'#F44'` \| `'#FF4444'` |
| HEXA | `'#F443'` \| `'#FF444433'` |
| RGB | `'rgb(255, 168, 40)'` |
| RGBA | `'rgba(255, 168, 40, .2)'` |
| HSL | `'hsl(255, 168, 40)'` |
| HSLA | `'hsla(255, 168, 40, .2)'` |
| String name WAAPI | `'red'` \| `'aqua'` |

## Code example (js)

```js
import { animate } from 'animejs';

animate('.hex',  {
  background: '#FF4B4B',
});

animate('.rgb',  {
  background: 'rgb(255, 168, 40)',
});

animate('.hsl',  {
  background: 'hsl(44, 100%, 59%)',
});

animate('.hexa', {
  background: '#FF4B4B33',
});

animate('.rgba', {
  background: 'rgba(255, 168, 40, .2)',
});

animate('.hsla', {
  background: 'hsla(44, 100%, 59%, .2)',
});
```

## Code example (html)

```html
<div class="large justified row">
  <div class="circle hex"></div>
  <div class="circle rgb"></div>
  <div class="circle hsl"></div>
  <div class="circle hexa"></div>
  <div class="circle rgba"></div>
  <div class="circle hsla"></div>
</div>
```

## Code example (css)

```css
#colors .docs-demo-template { opacity: 0 }
```

---

← Prev: **Relative value** (`animation/tween-value-types/relative-value`) | Next: **Color function value** (`animation/tween-value-types/color-function-value`) →
