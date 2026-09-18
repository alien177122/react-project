---
{
  "order": 11,
  "section": "animatable",
  "path": "animatable-settings/unit",
  "slug": "animatable/animatable-settings/unit",
  "url": "https://animejs.com/documentation/animatable/animatable-settings/unit",
  "title": "unit",
  "breadcrumb": [
    "Animatable",
    "Animatable settings",
    "unit"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Animatable settings",
    "slug": "animatable/animatable-settings"
  },
  "next": {
    "title": "duration",
    "slug": "animatable/animatable-settings/duration"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# unit

> Source: [https://animejs.com/documentation/animatable/animatable-settings/unit](https://animejs.com/documentation/animatable/animatable-settings/unit)
> Breadcrumb: Animatable → Animatable settings → unit

Animatable

                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            unit                                              
        

          
        Defines the unit for the animated value of the property.

## Accepts

A `String` containing a valid CSS unit

## Code example (js)

```js
import { createAnimatable, utils } from 'animejs';

const $demos = document.querySelector('#docs-demos');
const [ $clock ] = utils.$('.clock');
let bounds = $clock.getBoundingClientRect();
const refreshBounds = () => bounds = $clock.getBoundingClientRect();

const clock = createAnimatable($clock, {
  rotate: { unit: 'rad' }, // Set the unit to 'rad'
  duration: 400,
});

const { PI } = Math;
let lastAngle = 0
let angle = PI / 2;

const onMouseMove = e => {
  const { width, height, left, top } = bounds;
  const x = e.clientX - left - width / 2;
  const y = e.clientY - top - height / 2;
  const currentAngle = Math.atan2(y, x);
  const diff = currentAngle - lastAngle;
  angle += diff > PI ? diff - 2 * PI : diff < -PI ? diff + 2 * PI : diff;
  lastAngle = currentAngle;
  clock.rotate(angle); // Pass the new angle value in rad
}

window.addEventListener('mousemove', onMouseMove);
$demos.addEventListener('scroll', refreshBounds);
```

## Code example (html)

```html
<div class="large centered row">
  <div class="col">
    <div class="clock"></div>
  </div>
</div>
<div class="small centered row">
  <span class="label">Move cursor around</span>
</div>
```

---

← Prev: **Animatable settings** (`animatable/animatable-settings`) | Next: **duration** (`animatable/animatable-settings/duration`) →
