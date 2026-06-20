---
{
  "order": 375,
  "section": "utilities",
  "path": "stagger",
  "slug": "utilities/stagger",
  "url": "https://animejs.com/documentation/utilities/stagger",
  "title": "stagger()",
  "breadcrumb": [
    "Utilities",
    "stagger()"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Utilities",
    "slug": "utilities"
  },
  "next": {
    "title": "Time staggering",
    "slug": "utilities/stagger/time-staggering"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# stagger()

> Source: [https://animejs.com/documentation/utilities/stagger](https://animejs.com/documentation/utilities/stagger)
> Breadcrumb: Utilities → stagger()

Utilities

                      

          
                        Since 2.0.0
                      

        
                

## 
          
            stagger()                                              
        

          
        

## Creates sequential effects by distributing values progressively across multiple targets.

Stagger Function based values are created using `stagger()` function.

```js
import { stagger } from 'animejs';

const functionValue = stagger(value, parameters);
```

## Parameters

| Name | Accepts |
| --- | --- |
| value | Stagger value |
| parameters (opt) | Stagger parameters |

## Returns

Function based value

## Related

- [Function based values](https://animejs.com/documentation/animation/tween-value-types/function-based)

## Code example (js)

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  scale: stagger([1, .1]),
  delay: stagger(100),
});
```

## Code example (html)

```html
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
```

---

← Prev: **Utilities** (`utilities`) | Next: **Time staggering** (`utilities/stagger/time-staggering`) →
