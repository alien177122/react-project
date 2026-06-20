---
{
  "order": 388,
  "section": "utilities",
  "path": "stagger/stagger-value-types/range-value",
  "slug": "utilities/stagger/stagger-value-types/range-value",
  "url": "https://animejs.com/documentation/utilities/stagger/stagger-value-types/range-value",
  "title": "Range value",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Stagger value types",
    "Range value"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Numerical value",
    "slug": "utilities/stagger/stagger-value-types/numerical-value"
  },
  "next": {
    "title": "Stagger parameters",
    "slug": "utilities/stagger/stagger-parameters"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Range value

> Source: [https://animejs.com/documentation/utilities/stagger/stagger-value-types/range-value](https://animejs.com/documentation/utilities/stagger/stagger-value-types/range-value)
> Breadcrumb: Utilities → stagger() → Stagger value types → Range value

Utilities

                          
              
                stagger()              
                          
              
                Value types              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Range value                                              
        

          
        Distributes values evenly between two numerical values.

## Accepts

`[Number|String, Number|String]`

## Code example (js)

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  y: stagger(['2.75rem', '-2.75rem']),
  delay: stagger([0, 500]),
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

← Prev: **Numerical value** (`utilities/stagger/stagger-value-types/numerical-value`) | Next: **Stagger parameters** (`utilities/stagger/stagger-parameters`) →
