---
{
  "order": 383,
  "section": "utilities",
  "path": "stagger/stagger-parameters/stagger-start",
  "slug": "utilities/stagger/stagger-parameters/stagger-start",
  "url": "https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-start",
  "title": "Stagger start",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Stagger parameters",
    "Stagger start"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Stagger parameters",
    "slug": "utilities/stagger/stagger-parameters"
  },
  "next": {
    "title": "Stagger from",
    "slug": "utilities/stagger/stagger-parameters/stagger-from"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Stagger start

> Source: [https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-start](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-start)
> Breadcrumb: Utilities → stagger() → Stagger parameters → Stagger start

Utilities

                          
              
                stagger()              
                          
              
                Parameters              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Stagger start                                              
        

          
        Defines the starting value of the stagger.

## Accepts

`Number` | Timeline time position (Only when used as a timeline position argument)

## Default

`0`

## Related

- [Timeline time position](https://animejs.com/documentation/timeline/time-position)

## Code example (js)

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  x: stagger('1rem', { start: 14 }), // adds 14 to the staggered value
  delay: stagger(100, { start: 500 }), // adds 500 to the staggered value
});
```

## Code example (html)

```html
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 14rem, delay: 500ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 15rem, delay: 600ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 16rem, delay: 700ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 17rem, delay: 700ms</div>
</div>
```

---

← Prev: **Stagger parameters** (`utilities/stagger/stagger-parameters`) | Next: **Stagger from** (`utilities/stagger/stagger-parameters/stagger-from`) →
