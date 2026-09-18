---
{
  "order": 385,
  "section": "utilities",
  "path": "stagger/stagger-parameters/stagger-use",
  "slug": "utilities/stagger/stagger-parameters/stagger-use",
  "url": "https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-use",
  "title": "Stagger use",
  "breadcrumb": [
    "Utilities",
    "stagger()",
    "Stagger parameters",
    "Stagger use"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "Stagger modifier",
    "slug": "utilities/stagger/stagger-parameters/stagger-modifier"
  },
  "next": {
    "title": "Stagger total",
    "slug": "utilities/stagger/stagger-parameters/stagger-total"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Stagger use

> Source: [https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-use](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-use)
> Breadcrumb: Utilities → stagger() → Stagger parameters → Stagger use

Utilities

                          
              
                stagger()              
                          
              
                Parameters              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            Stagger use                                              
        

          
        Defines a custom staggering order instead of using the natural targets order by using an attribute or property of the targets.

The properties or attributes must contain a suite of number, starting at `0`.

A custom `total` parameter value must be defined if the highest custom index is lower than the actual total length of staggered targets when also using the `from`, `reversed` or `ease` parameters.

## Accepts

`String` of a valid property or attribute name

## Default

`null`

## Related

- [total](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-total)
- [from](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-from)
- [reversed](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-reversed)
- [text](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease)

## Code example (js)

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  rotate: 90,
  delay: stagger(250, { use: 'data-index' }),
});
```

## Code example (html)

```html
<div class="small row">
  <div class="square" data-index="2"></div>
  <div class="padded label">data-index="2"</div>
</div>
<div class="small row">
  <div class="square" data-index="0"></div>
  <div class="padded label">data-index="0"</div>
</div>
<div class="small row">
  <div class="square" data-index="3"></div>
  <div class="padded label">data-index="3"</div>
</div>
<div class="small row">
  <div class="square" data-index="1"></div>
  <div class="padded label">data-index="1"</div>
</div>
```

---

← Prev: **Stagger modifier** (`utilities/stagger/stagger-parameters/stagger-modifier`) | Next: **Stagger total** (`utilities/stagger/stagger-parameters/stagger-total`) →
