---
{
  "order": 5,
  "section": "animatable",
  "path": "animatable-methods/setters",
  "slug": "animatable/animatable-methods/setters",
  "url": "https://animejs.com/documentation/animatable/animatable-methods/setters",
  "title": "Setters",
  "breadcrumb": [
    "Animatable",
    "Animatable methods",
    "Setters"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Getters",
    "slug": "animatable/animatable-methods/getters"
  },
  "next": {
    "title": "revert()",
    "slug": "animatable/animatable-methods/revert"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Setters

> Source: [https://animejs.com/documentation/animatable/animatable-methods/setters](https://animejs.com/documentation/animatable/animatable-methods/setters)
> Breadcrumb: Animatable → Animatable methods → Setters

Animatable

                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Setters                                              
        

          
        Every animatable properties defined in the animatable parameters are transformed into methods and accessible on the animatable object.

When calling a method with at least one argument, the method acts as a setter, and returns the animatable instance, allowing chaining methods calls.

```js
animatable.property(value, duration, easing);
```

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| value | `Number` \|`Array` | Defines the new value of the animatable to animate to |
| duration (opt) | `Number` | Optional new transition duration in ms |
| easing (opt) | ease | Optional new easing function of the animation |

## Returns

The animatable object itself, allowing for chaining of multiple property setter calls:

```js
animatable.x(100).y(200); // Animate x to 100 and y to 200 in 500ms
```

## Code example (js)

```js
import { createAnimatable, utils } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const $demo = document.querySelector('.docs-demo.is-active');
let bounds = $demo.getBoundingClientRect();
const refreshBounds = () => bounds = $demo.getBoundingClientRect();

const circle = createAnimatable('.circle', {
  x: 0,
  y: 0,
  backgroundColor: 0,
  ease: 'outExpo',
});

const rgb = [164, 255, 79];

// Sets new durations and easings
circle.x(0, 500, 'out(2)');
circle.y(0, 500, 'out(3)');
circle.backgroundColor(rgb, 250);

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const hw = width / 2;
  const hh = height / 2;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
  rgb[0] = utils.mapRange(x, -hw, hw, 0, 164);
  rgb[2] = utils.mapRange(x, -hw, hw, 79, 255);
  circle.x(x).y(y).backgroundColor(rgb); // Update values
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="circle"></div>
</div>
<div class="medium centered row">
  <span class="label">Move cursor around</span>
</div>
```

---

← Prev: **Getters** (`animatable/animatable-methods/getters`) | Next: **revert()** (`animatable/animatable-methods/revert`) →
