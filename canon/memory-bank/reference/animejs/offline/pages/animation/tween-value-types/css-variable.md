---
{
  "order": 77,
  "section": "animation",
  "path": "tween-value-types/css-variable",
  "slug": "animation/tween-value-types/css-variable",
  "url": "https://animejs.com/documentation/animation/tween-value-types/css-variable",
  "title": "CSS variable",
  "breadcrumb": [
    "Animation",
    "Tween value types",
    "CSS variable"
  ],
  "since": "Since 4.2.0",
  "prev": {
    "title": "Color function value",
    "slug": "animation/tween-value-types/color-function-value"
  },
  "next": {
    "title": "Function based value",
    "slug": "animation/tween-value-types/function-based"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# CSS variable

> Source: [https://animejs.com/documentation/animation/tween-value-types/css-variable](https://animejs.com/documentation/animation/tween-value-types/css-variable)
> Breadcrumb: Animation → Tween value types → CSS variable

Animation

                          
              
                Tween value types              
                      

          
                        Since 4.2.0
                      

        
                

## 
          
            CSS variable                                              
        

          
        CSS variables can be used as animation values by simply passing the variable name with the `'var(--my-value)'` syntax.

The JS `animate()` version needs to compute the variable in order to animate its value. This means the animation won't reflect the new value if the variable is updated separately. To update a CSS variable in a JS Animation, you can call `.refresh()`.

```js
target.style.setProperty('--x', '100px');
// Animate x to 100px
const anim = animate(target, { x: 'var(--x)' });
target.style.setProperty('--x', '200px');
// Restart, and refresh the value to animate x to 200px
anim.restart().refresh()
```

## Accepts

CSS variable `String`

## Related

- [.refresh()](https://animejs.com/documentation/animation/animation-methods/refresh)

## Code example (js)

```js
import { waapi, animate, stagger } from 'animejs';

waapi.animate('.square',  {
  rotate: 'var(--rotation)',
  borderColor: ['var(--hex-orange-1)', 'var(--hex-red-1)'],
  duration: 500,
  delay: stagger(100),
  loop: true,
});

animate('.square',  {
  scale: 'var(--scale)',
  background: ['var(--hex-red-1)', 'var(--hex-orange-1)'],
  duration: 500,
  delay: stagger(100),
  loop: true,
  alternate: true,
});
```

## Code example (html)

```html
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

## Code example (css)

```css
#animation-tween-value-types-css-variable .docs-demo-template { opacity: 0 }
#animation-tween-value-types-css-variable .square { --rotation: 90deg; --scale: 1.5; border: 10px solid currentColor }
```

---

← Prev: **Color function value** (`animation/tween-value-types/color-function-value`) | Next: **Function based value** (`animation/tween-value-types/function-based`) →
