---
{
  "order": 384,
  "section": "utilities",
  "path": "stagger/stagger-parameters/stagger-total",
  "slug": "utilities/stagger/stagger-parameters/stagger-total",
  "url": "https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-total",
  "title": "Stagger total",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Stagger parameters",
    "Stagger total"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "Stagger use",
    "slug": "utilities/stagger/stagger-parameters/stagger-use"
  },
  "next": {
    "title": "$()",
    "slug": "utilities/dollar-sign"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Stagger total

> Source: [https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-total](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-total)
> Breadcrumb: Utilities → stagger() → Stagger parameters → Stagger total

Utilities

                          
              
                stagger()              
                          
              
                Parameters              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            Stagger total                                              
        

          
        Defines a custom staggering length instead of using the actual total length of the staggered targets.

This is useful if the max value of the custom order defined using the `use` parameter is lower than the actual number of staggered targets when using the `from`, `reversed` or `ease` parameters.

## Accepts

`Number`

## Default

`null`

## Code example (js)

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  rotate: 90,
  delay: stagger(250, { use: 'data-index', total: 2, reversed: true }),
});
```

## Code example (html)

```html
<div class="small row">
  <div class="square" data-index="0"></div>
  <div class="padded label">data-index="0"</div>
</div>
<div class="small row">
  <div class="square" data-index="0"></div>
  <div class="padded label">data-index="0"</div>
</div>
<div class="small row">
  <div class="square" data-index="1"></div>
  <div class="padded label">data-index="1"</div>
</div>
<div class="small row">
  <div class="square" data-index="1"></div>
  <div class="padded label">data-index="1"</div>
</div>
```

---

← Prev: **Stagger use** (`utilities/stagger/stagger-parameters/stagger-use`) | Next: **$()** (`utilities/dollar-sign`) →
