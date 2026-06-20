---
{
  "order": 8,
  "section": "animatable",
  "path": "animatable-settings/duration",
  "slug": "animatable/animatable-settings/duration",
  "url": "https://animejs.com/documentation/animatable/animatable-settings/duration",
  "title": "duration",
  "breadcrumb": [
    "Animatable",
    "Animatable settings",
    "duration"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "unit",
    "slug": "animatable/animatable-settings/unit"
  },
  "next": {
    "title": "ease",
    "slug": "animatable/animatable-settings/ease"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# duration

> Source: [https://animejs.com/documentation/animatable/animatable-settings/duration](https://animejs.com/documentation/animatable/animatable-settings/duration)
> Breadcrumb: Animatable → Animatable settings → duration

Animatable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            duration                                              
        

          
        Specifies the duration in milliseconds for the transition to the animated value of the property.

## Accepts

- A `Number` equal to or greater than `0`

- A Function based value that returns a `Number` equal to or greater than `0`

## Default

`1000`

## Related

- [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based)

## Code example (js)

```js
import { createAnimatable, utils, stagger } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const $demo = document.querySelector('.docs-demo.is-active');
let bounds = $demo.getBoundingClientRect();
const refreshBounds = () => bounds = $demo.getBoundingClientRect();

const circles = createAnimatable('.circle', {
  x: 0, // Imediatly set the value without animation
  y: stagger(200, { from: 'center', start: 200 }),
  ease: 'out(4)',
});

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const hw = width / 2;
  const hh = height / 2;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
  circles.x(x).y(y);
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

## Code example (html)

```html
<div class="medium centered row">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
<div class="small centered row">
  <span class="label"><br><br><br>Move cursor around</span>
</div>
```

---

← Prev: **unit** (`animatable/animatable-settings/unit`) | Next: **ease** (`animatable/animatable-settings/ease`) →
