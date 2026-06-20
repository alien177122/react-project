---
{
  "order": 391,
  "section": "utilities",
  "path": "stagger/values-staggering",
  "slug": "utilities/stagger/values-staggering",
  "url": "https://animejs.com/documentation/utilities/stagger/values-staggering",
  "title": "Values staggering",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Values staggering"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Time staggering",
    "slug": "utilities/stagger/time-staggering"
  },
  "next": {
    "title": "Timeline positions staggering",
    "slug": "utilities/stagger/timeline-positions-staggering"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Values staggering

> Source: [https://animejs.com/documentation/utilities/stagger/values-staggering](https://animejs.com/documentation/utilities/stagger/values-staggering)
> Breadcrumb: Utilities → stagger() → Values staggering

Utilities

                          
              
                stagger()              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Values staggering                                              
        

          
        All tweens animatable properties accept function-based values, enabling the use of the stagger function returned by the `stagger()` method in multi-target animations.

This results in each target having a staggered value, increasing by a set number for each subsequent target.

## Code example (js)

```js
import { animate, stagger } from 'animejs';

const animation = animate('.square', {
  y: stagger(['-2.75rem', '2.75rem']),
  rotate: { from: stagger('-.125turn') },
  loop: true,
  alternate: true
});
```

## Code example (html)

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

---

← Prev: **Time staggering** (`utilities/stagger/time-staggering`) | Next: **Timeline positions staggering** (`utilities/stagger/timeline-positions-staggering`) →
