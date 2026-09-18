---
{
  "order": 381,
  "section": "utilities",
  "path": "stagger/stagger-parameters/stagger-modifier",
  "slug": "utilities/stagger/stagger-parameters/stagger-modifier",
  "url": "https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-modifier",
  "title": "Stagger modifier",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Stagger parameters",
    "Stagger modifier"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Stagger grid axis",
    "slug": "utilities/stagger/stagger-parameters/stagger-grid-axis"
  },
  "next": {
    "title": "Stagger use",
    "slug": "utilities/stagger/stagger-parameters/stagger-use"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Stagger modifier

> Source: [https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-modifier](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-modifier)
> Breadcrumb: Utilities → stagger() → Stagger parameters → Stagger modifier

Utilities

                          
              
                stagger()              
                          
              
                Parameters              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Stagger modifier                                              
        

          
        Defines a function that modify the returned staggered value.

## Accepts

A `Function` with the following parameters:

## Parameters

| Names | Description |
| --- | --- |
| `value` | The current animated numerical value |

## Must returns

`Number` | `String`

## Code example (js)

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  boxShadow: [
    { to: stagger([1, .25], {
        modifier: v => `0 0 ${v * 30}px ${v * 20}px currentColor`,
        from: 'center'
      })
    },
    { to: 0 },
  ],
  delay: stagger(100, { from: 'center' }),
  loop: true
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

← Prev: **Stagger grid axis** (`utilities/stagger/stagger-parameters/stagger-grid-axis`) | Next: **Stagger use** (`utilities/stagger/stagger-parameters/stagger-use`) →
