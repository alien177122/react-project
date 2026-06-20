---
{
  "order": 360,
  "section": "utilities",
  "path": "dollar-sign",
  "slug": "utilities/dollar-sign",
  "url": "https://animejs.com/documentation/utilities/dollar-sign",
  "title": "$()",
  "breadcrumb": [
    "Utilities",
    "$()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Stagger total",
    "slug": "utilities/stagger/stagger-parameters/stagger-total"
  },
  "next": {
    "title": "get()",
    "slug": "utilities/get"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# $()

> Source: [https://animejs.com/documentation/utilities/dollar-sign](https://animejs.com/documentation/utilities/dollar-sign)
> Breadcrumb: Utilities → $()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            $()                                              
        

          
        Converts the provided targets parameter into an `Array` of elements, serving as an alternative to `document.querySelectorAll()`.

When used within a Scope, it uses the Scope's `root` element instead of `document`, effectively calling `root.querySelectorAll()`.

```js
const targetsArray = utils.$(targets);
```

## Parameters

| Name | Accepts |
| --- | --- |
| targets | CSS selector \| DOM Elements |

## Returns

An `Array` of `HTMLElement` or `SVGElement` or `SVGGeometryElement`

## Code example (js)

```js
import { utils, createScope } from 'animejs';

// Targets all the '.square' elements
utils.$('.square').forEach($square => {
  utils.set($square, { scale: .5 });
});

createScope({ root: '.row:nth-child(2)' }).add(() => {
  // Limits the selection to '.row:nth-child(2) .square'
  utils.$('.square').forEach($square => {
    utils.set($square, { rotate: 45 });
  });
});
```

## Code example (html)

```html
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="medium justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="medium justified row">
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

← Prev: **Stagger total** (`utilities/stagger/stagger-parameters/stagger-total`) | Next: **get()** (`utilities/get`) →
