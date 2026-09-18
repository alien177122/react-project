---
{
  "order": 227,
  "section": "scope",
  "path": "scope-parameters/root",
  "slug": "scope/scope-parameters/root",
  "url": "https://animejs.com/documentation/scope/scope-parameters/root",
  "title": "root",
  "breadcrumb": [
    "Scope",
    "Scope parameters",
    "root"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Scope parameters",
    "slug": "scope/scope-parameters"
  },
  "next": {
    "title": "defaults",
    "slug": "scope/scope-parameters/defaults"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# root

> Source: [https://animejs.com/documentation/scope/scope-parameters/root](https://animejs.com/documentation/scope/scope-parameters/root)
> Breadcrumb: Scope → Scope parameters → root

Scope

                          
              
                Parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            root                                              
        

          
        Defines a root element limiting all DOM queries within that Scope to descendants of the specified `HTMLElement`. This is particularly useful for creating self-contained animation environments in component-based architectures like React applications.

## Accepts

- CSS Selector

- DOM Element

## Related

- [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector)
- [DOM Element](https://animejs.com/documentation/animation/targets/dom-elements)

## Code example (js)

```js
import { createScope, animate } from 'animejs';

createScope({ root: '.row:nth-child(2)' })
.add(() => {
  animate('.square', {
    x: '17rem',
    loop: true,
    alternate: true
  });
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">outside scope</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">inside scope</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">outside scope</div>
</div>
```

---

← Prev: **Scope parameters** (`scope/scope-parameters`) | Next: **defaults** (`scope/scope-parameters/defaults`) →
