---
{
  "order": 1,
  "section": "animatable",
  "path": "(index)",
  "slug": "animatable",
  "url": "https://animejs.com/documentation/animatable",
  "title": "Animatable",
  "breadcrumb": [
    "Animatable"
  ],
  "prev": {
    "title": "Timeline properties",
    "slug": "timeline/timeline-properties"
  },
  "next": {
    "title": "Animatable settings",
    "slug": "animatable/animatable-settings"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Animatable

> Source: [https://animejs.com/documentation/animatable](https://animejs.com/documentation/animatable)
> Breadcrumb: Animatable

## 
          
            Animatable                                              
        

          
        

## Efficiently animates target properties, making it an ideal replacement for `animate()` and `utils.set()` in situations where values change frequently, such as cursor events or animation loops.

Animatable are created using the `createAnimatable()` method imported from the main `'animejs'` module:

```js
import { createAnimatable } from 'animejs';

const animatable = createAnimatable(targets, parameters);
```

Or imported as a standalone module from the `'animejs/animatable'` subpath:

```js
import { createAnimatable } from 'animejs/animatable';
```

## Parameters

| Name | Accepts |
| --- | --- |
| targets | Targets |
| parameters | An `Object` of Animatable settings |

## Returns

`Animatable`

An `Animatable` instance exposes animatable property functions to get and set values.

```js
animatable.propertyName(value, duration, ease); // Triggers an animation
animatable.propertyName(); // Returns the current value
```

For performance reasons, only `Number` or `Array<Number>` can be passed to an animatable property function.

## Related

- [subpath](https://animejs.com/documentation/getting-started/module-imports)
- [get](https://animejs.com/documentation/animatable/animatable-methods/getters)
- [set](https://animejs.com/documentation/animatable/animatable-methods/setters)

## Code example (js)

```js
import { createAnimatable, utils } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const $demo = document.querySelector('.docs-demo.is-active');

let bounds = $demo.getBoundingClientRect();
const refreshBounds = () => bounds = $demo.getBoundingClientRect();

const animatableSquare = createAnimatable('.square', {
  x: 500, // Define the x duration to be 500ms
  y: 500, // Define the y duration to be 500ms
  ease: 'out(3)',
});

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const hw = width / 2;
  const hh = height / 2;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
  animatableSquare.x(x); // Animate the x value in 500ms
  animatableSquare.y(y); // Animate the y value in 500ms
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="col">
    <div class="square"></div>
  </div>
</div>
<div class="small centered row">
  <span class="label">Move cursor around</span>
</div>
```

---

← Prev: **Timeline properties** (`timeline/timeline-properties`) | Next: **Animatable settings** (`animatable/animatable-settings`) →
