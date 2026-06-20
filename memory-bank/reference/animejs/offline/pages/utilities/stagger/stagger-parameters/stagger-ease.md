---
{
  "order": 377,
  "section": "utilities",
  "path": "stagger/stagger-parameters/stagger-ease",
  "slug": "utilities/stagger/stagger-parameters/stagger-ease",
  "url": "https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease",
  "title": "Stagger ease",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Stagger parameters",
    "Stagger ease"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Stagger reversed",
    "slug": "utilities/stagger/stagger-parameters/stagger-reversed"
  },
  "next": {
    "title": "Stagger grid",
    "slug": "utilities/stagger/stagger-parameters/stagger-grid"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Stagger ease

> Source: [https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease)
> Breadcrumb: Utilities → stagger() → Stagger parameters → Stagger ease

Utilities

                          
              
                stagger()              
                          
              
                Parameters              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Stagger ease                                              
        

          
        Defines an easing applied to the staggered values distribution.

## Accept

ease

## Default

`'linear'`

## Related

- [ease](https://animejs.com/documentation/animation/tween-parameters/ease)

## Code example (js)

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  y: stagger(['2.75rem', '-2.75rem'], { ease: 'inOut(3)' }),
  delay: stagger(100, { ease: 'inOut(3)' }),
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

← Prev: **Stagger reversed** (`utilities/stagger/stagger-parameters/stagger-reversed`) | Next: **Stagger grid** (`utilities/stagger/stagger-parameters/stagger-grid`) →
