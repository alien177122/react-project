---
{
  "order": 78,
  "section": "animation",
  "path": "tween-value-types/function-based",
  "slug": "animation/tween-value-types/function-based",
  "url": "https://animejs.com/documentation/animation/tween-value-types/function-based",
  "title": "Function based value",
  "breadcrumb": [
    "Animation",
    "Tween value types",
    "Function based value"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "CSS variable",
    "slug": "animation/tween-value-types/css-variable"
  },
  "next": {
    "title": "Tween parameters",
    "slug": "animation/tween-parameters"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Function based value

> Source: [https://animejs.com/documentation/animation/tween-value-types/function-based](https://animejs.com/documentation/animation/tween-value-types/function-based)
> Breadcrumb: Animation → Tween value types → Function based value

Animation

                          
              
                Tween value types              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            Function based value                                              
        

          
        Sets different values for each target of a multi-target animation by using a `Function` as the value.

Function-based values can be re-calculated without creating a new animation using the `animation.refresh()` method.

## Accepts

A `Function` with the following parameters:

```js
animate(targets, {
  x: (target, index, targets) => target.dataset.value * (targets.length - index),
});
```

## Parameters

| Name | Description |
| --- | --- |
| target | The current animated target element |
| index | The index of current targeted element |
| targets | The `Array` of all animated targets of the animation |
| prevTween | The previous sibling tween's computed end value for the same target and property |

Since version 4.4.0, the third argument of function-based value callbacks changed from `total` (`Number`) to `targets` (`Array`). To migrate, replace `total` with `targets.length`.

## Must return

- Tween value 

- Tween parameters

## Related

- [animation.refresh()](https://animejs.com/documentation/animation/animation-methods/refresh)
- [Tween value](https://animejs.com/documentation/animation/tween-value-types)
- [Tween parameters](https://animejs.com/documentation/animation/tween-parameters)

## Code example (js)

```js
import { animate, utils } from 'animejs';

animate('.square', {
  x: $el => /** @type {HTMLElement} */($el).getAttribute('data-x'),
  y: (_, i) => 50 + (-50 * i),
  scale: (_, i, t) => (t.length - i) * .75,
  rotate: () => utils.random(-360, 360),
  borderRadius: () => `+=${utils.random(0, 8)}`,
  duration: () => utils.random(1200, 1800),
  delay: () => utils.random(0, 400),
  ease: 'outElastic(1, .5)',
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square" data-x="170"></div>
</div>
<div class="medium row">
  <div class="square" data-x="80"></div>
</div>
<div class="medium row">
  <div class="square" data-x="270"></div>
</div>
```

---

← Prev: **CSS variable** (`animation/tween-value-types/css-variable`) | Next: **Tween parameters** (`animation/tween-parameters`) →
