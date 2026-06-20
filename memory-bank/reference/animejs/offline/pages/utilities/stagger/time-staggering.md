---
{
  "order": 389,
  "section": "utilities",
  "path": "stagger/time-staggering",
  "slug": "utilities/stagger/time-staggering",
  "url": "https://animejs.com/documentation/utilities/stagger/time-staggering",
  "title": "Time staggering",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Time staggering"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "stagger()",
    "slug": "utilities/stagger"
  },
  "next": {
    "title": "Values staggering",
    "slug": "utilities/stagger/values-staggering"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Time staggering

> Source: [https://animejs.com/documentation/utilities/stagger/time-staggering](https://animejs.com/documentation/utilities/stagger/time-staggering)
> Breadcrumb: Utilities → stagger() → Time staggering

Utilities

                          
              
                stagger()              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Time staggering                                              
        

          
        Tween's time related properties like `delay` and `duration` accepts Function-based values, enabling the use of the stagger function returned by the `stagger()` method in multi-target animations.

This results in each target tween having different timings, increasing by a set number of milliseconds for each subsequent target.

## Code example (js)

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  delay: stagger(100),
  duration: stagger(200, { start: 500 }),
  loop: true,
  alternate: true
});
```

## Code example (html)

```html
<div class="small row">
  <div class="square"></div>
  <div class="padded label">delay: 0ms;&nbsp;&nbsp;&nbsp;duration: 500ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">delay: 100ms; duration: 700ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">delay: 200ms; duration: 900ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">delay: 300ms; duration: 1100ms</div>
</div>
```

---

← Prev: **stagger()** (`utilities/stagger`) | Next: **Values staggering** (`utilities/stagger/values-staggering`) →
