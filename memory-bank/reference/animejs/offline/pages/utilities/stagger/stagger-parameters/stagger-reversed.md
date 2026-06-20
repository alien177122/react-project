---
{
  "order": 382,
  "section": "utilities",
  "path": "stagger/stagger-parameters/stagger-reversed",
  "slug": "utilities/stagger/stagger-parameters/stagger-reversed",
  "url": "https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-reversed",
  "title": "Stagger reversed",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Stagger parameters",
    "Stagger reversed"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Stagger from",
    "slug": "utilities/stagger/stagger-parameters/stagger-from"
  },
  "next": {
    "title": "Stagger ease",
    "slug": "utilities/stagger/stagger-parameters/stagger-ease"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Stagger reversed

> Source: [https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-reversed](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-reversed)
> Breadcrumb: Utilities → stagger() → Stagger parameters → Stagger reversed

Utilities

                          
              
                stagger()              
                          
              
                Parameters              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Stagger reversed                                              
        

          
        Defines if the stagger should operate in reverse.

## Accepts

`Boolean`

## Default

`false`

## Code example (js)

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  translateX: '17rem',
  delay: stagger(100, { reversed: true }),
});
```

## Code example (html)

```html
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 300ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 200ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 100ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 0ms</div>
</div>
```

---

← Prev: **Stagger from** (`utilities/stagger/stagger-parameters/stagger-from`) | Next: **Stagger ease** (`utilities/stagger/stagger-parameters/stagger-ease`) →
