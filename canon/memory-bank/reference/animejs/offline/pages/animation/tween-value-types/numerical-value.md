---
{
  "order": 79,
  "section": "animation",
  "path": "tween-value-types/numerical-value",
  "slug": "animation/tween-value-types/numerical-value",
  "url": "https://animejs.com/documentation/animation/tween-value-types/numerical-value",
  "title": "Numerical value",
  "breadcrumb": [
    "Animation",
    "Tween value types",
    "Numerical value"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "Tween value types",
    "slug": "animation/tween-value-types"
  },
  "next": {
    "title": "Unit conversion value",
    "slug": "animation/tween-value-types/unit-conversion-value"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Numerical value

> Source: [https://animejs.com/documentation/animation/tween-value-types/numerical-value](https://animejs.com/documentation/animation/tween-value-types/numerical-value)
> Breadcrumb: Animation → Tween value types → Numerical value

Animation

                          
              
                Tween value types              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            Numerical value                                              
        

          
        Specifies the numerical value of the animated property by passing either a `Number` or a `String` containing at least one `Number`.

If no unit is specified for properties that expect a unit, like `width` for example, the resulting animation will use the default browser unit.

```js
animate(target, { width: 100 }); // Defaults to px
```

## Accepts

- `Number`

- `String`

If a specific unit is already specified, the JS `animate()` method can inherits previously defined units and the next value set without a unit on the same target property inherits the previously defined unit.

```js
animate(target, { width: '50%' }); // Uses '%'
animate(target, { width: 75 });    // Inherits '%' -> '75%'
```

The WAAPI `animate()` method only falls back automatically to `'px'` with the following properties:

```text
- x / translateX
- y / translateY
- z / translateZ
- perspective
- top
- right
- bottom
- left
- width
- height
- margin
- padding
- borderWidth
- borderRadius
- fontSize
```

## Code example (js)

```js
import { waapi } from 'animejs';

waapi.animate('.square', {
  x: 240, //  -> 240px
  width: 75, // -> 75px
  rotate: '.75turn',
});
```

## Code example (html)

```html
<div class="large row">
  <div class="square"></div>
</div>
```

---

← Prev: **Tween value types** (`animation/tween-value-types`) | Next: **Unit conversion value** (`animation/tween-value-types/unit-conversion-value`) →
