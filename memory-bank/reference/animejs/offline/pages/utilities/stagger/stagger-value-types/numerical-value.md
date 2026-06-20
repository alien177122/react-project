---
{
  "order": 387,
  "section": "utilities",
  "path": "stagger/stagger-value-types/numerical-value",
  "slug": "utilities/stagger/stagger-value-types/numerical-value",
  "url": "https://animejs.com/documentation/utilities/stagger/stagger-value-types/numerical-value",
  "title": "Numerical value",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Stagger value types",
    "Numerical value"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Stagger value types",
    "slug": "utilities/stagger/stagger-value-types"
  },
  "next": {
    "title": "Range value",
    "slug": "utilities/stagger/stagger-value-types/range-value"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Numerical value

> Source: [https://animejs.com/documentation/utilities/stagger/stagger-value-types/numerical-value](https://animejs.com/documentation/utilities/stagger/stagger-value-types/numerical-value)
> Breadcrumb: Utilities → stagger() → Stagger value types → Numerical value

Utilities

                          
              
                stagger()              
                          
              
                Value types              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Numerical value                                              
        

          
        Represents by how much each staggered value is incremented by.

## Accepts

- `Number`

- `String` containing at least one `Number`

## Code example (js)

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  // Increase translateX by 5.75rem for each elements
  x: stagger('5.75rem'),
  // Increase delay by 100ms for each elements
  delay: stagger(100)
});
```

## Code example (html)

```html
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 0rem      delay: 0ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 5.75rem   delay: 100ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 11.5rem   delay: 200ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 17.25rem  delay: 300ms</div>
</div>
```

---

← Prev: **Stagger value types** (`utilities/stagger/stagger-value-types`) | Next: **Range value** (`utilities/stagger/stagger-value-types/range-value`) →
