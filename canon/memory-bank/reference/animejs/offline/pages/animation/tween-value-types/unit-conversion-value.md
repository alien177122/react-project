---
{
  "order": 81,
  "section": "animation",
  "path": "tween-value-types/unit-conversion-value",
  "slug": "animation/tween-value-types/unit-conversion-value",
  "url": "https://animejs.com/documentation/animation/tween-value-types/unit-conversion-value",
  "title": "Unit conversion value",
  "breadcrumb": [
    "Animation",
    "Tween value types",
    "Unit conversion value"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Numerical value",
    "slug": "animation/tween-value-types/numerical-value"
  },
  "next": {
    "title": "Relative value",
    "slug": "animation/tween-value-types/relative-value"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Unit conversion value

> Source: [https://animejs.com/documentation/animation/tween-value-types/unit-conversion-value](https://animejs.com/documentation/animation/tween-value-types/unit-conversion-value)
> Breadcrumb: Animation → Tween value types → Unit conversion value

Animation

                          
              
                Tween value types              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Unit conversion value                                              
        

          
        Converts and animates to a value with a different unit than the default or currently used one.

When using the JS `animate()` method, unit conversions may sometimes produce unexpected results depending on the unit type and animated properties used.

For more predictable results, it's recommended to define the unit outside of the animation using `utils.set()`, and then animate to the current unit.

Or simply use the WAAPI `animate()` method.

## Accepts

`String`

## Related

- [utils.set()](https://animejs.com/documentation/utilities/set)

## Code example (js)

```js
import { animate, utils } from 'animejs';

animate('.square', {
  width: '25%', // from '48px' to '25%',
  x: '15rem', // from '0px' to '15rem',
  rotate: '.75turn', // from `0deg` to '.75turn',
});
```

## Code example (html)

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

← Prev: **Numerical value** (`animation/tween-value-types/numerical-value`) | Next: **Relative value** (`animation/tween-value-types/relative-value`) →
