---
{
  "order": 15,
  "section": "animation",
  "path": "animatable-properties/css-transforms",
  "slug": "animation/animatable-properties/css-transforms",
  "url": "https://animejs.com/documentation/animation/animatable-properties/css-transforms",
  "title": "CSS transforms",
  "breadcrumb": [
    "Animation",
    "Animatable properties",
    "CSS transforms"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "CSS Properties",
    "slug": "animation/animatable-properties/css-properties"
  },
  "next": {
    "title": "CSS Variables",
    "slug": "animation/animatable-properties/css-variables"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# CSS transforms

> Source: [https://animejs.com/documentation/animation/animatable-properties/css-transforms](https://animejs.com/documentation/animation/animatable-properties/css-transforms)
> Breadcrumb: Animation → Animatable properties → CSS transforms

Animation

                          
              
                Animatable properties              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            CSS transforms                                              
        

          
        The CSS `transform` property can be animated by specifying individual properties directly in the parameter object with both JS and WAAPI `animate()` versions.

This allows a greater level of control over how to animate individual transform properties, giving you more flexibility than CSS animations or native WAAPI.

Transforms follow a fixed render order: `perspective` → `translate` → `rotate` → `scale` → `skew`, regardless of the order they are defined in animation parameters. Adjacent axis properties are automatically grouped into CSS shorthand (e.g. `translateX` + `translateY` → `translate(x, y)`).

The JS `animate()` method doesn't parse transforms declared from a CSS style declaration and transforms properties must be set directly in the inline styles of the element. You can use the built-in `utils.set()` function to independently set your transform values before animating an element.

In order to animate the `transform` property directly, it's recommended to use the WAAPI powered `waapi.animate()` method.

Since version 4.4.0, transforms follow a fixed render order and `matrix` / `matrix3d` can no longer be animated directly (they are still preserved when read from inline styles).

Individual transforms with WAAPI only works for browsers that support `CSS.registerProperty(propertyDefinition)`, and fallback to no animations.

## Valid individual CSS transforms properties

| Name | Shorthand | Default Value | Default Unit |
| --- | --- | --- | --- |
| translateX | x | `'0px'` | `'px'` |
| translateY | y | `'0px'` | `'px'` |
| translateZ | z | `'0px'` | `'px'` |
| rotate | — | `'0deg'` | `'deg'` |
| rotateX | — | `'0deg'` | `'deg'` |
| rotateY | — | `'0deg'` | `'deg'` |
| rotateZ | — | `'0deg'` | `'deg'` |
| scale | — | `'1'` | — |
| scaleX | — | `'1'` | — |
| scaleY | — | `'1'` | — |
| scaleZ | — | `'1'` | — |
| skew | — | `'0deg'` | `'deg'` |
| skewX | — | `'0deg'` | `'deg'` |
| skewY | — | `'0deg'` | `'deg'` |
| perspective | — | `'0px'` | `'px'` |

## Related

- [utils.set()](https://animejs.com/documentation/utilities/set)

## Code example (js)

```js
import { animate, waapi } from 'animejs';

animate('.square', {
  x: '15rem', // TranslateX shorthand
  scale: 1.25,
  skew: -45,
  rotate: '1turn',
});

// the WAAPI version is recommanded if you want to animate the transform property directly
waapi.animate('.square', {
  transform: 'translateX(15rem) scale(1.25) skew(-45deg) rotate(1turn)',
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
  <span class="padded label">JS / WAAPI</span>
</div>
<div class="medium row">
  <div class="square"></div>
  <span class="padded label">WAAPI</span>
</div>
```

---

← Prev: **CSS Properties** (`animation/animatable-properties/css-properties`) | Next: **CSS Variables** (`animation/animatable-properties/css-variables`) →
