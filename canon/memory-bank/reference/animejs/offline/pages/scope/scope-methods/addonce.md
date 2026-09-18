---
{
  "order": 220,
  "section": "scope",
  "path": "scope-methods/addonce",
  "slug": "scope/scope-methods/addonce",
  "url": "https://animejs.com/documentation/scope/scope-methods/addonce",
  "title": "addOnce()",
  "breadcrumb": [
    "Scope",
    "Scope methods",
    "addOnce()"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "add()",
    "slug": "scope/scope-methods/add"
  },
  "next": {
    "title": "keepTime()",
    "slug": "scope/scope-methods/keeptime"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# addOnce()

> Source: [https://animejs.com/documentation/scope/scope-methods/addonce](https://animejs.com/documentation/scope/scope-methods/addonce)
> Breadcrumb: Scope → Scope methods → addOnce()

Scope

                          
              
                Methods              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            addOnce()                                              
        

          
        Adds a constructor to a Scope that is only called once, allowing you to execute code once and add scoped animations that won't be reverted between media query changes.

```js
scope.addOnce(constructor);
```

| Name | Accepts |
| --- | --- |
| constructor | A constructor `Function` |

## Returns

The `Scope` itself

`scope.addOnce()` calls cannot be conditional, as it defeats the purpose and will mess with keeping track of which callbacks have already been executed or not.

```js
// Don't do this
if (scope.matches.small) {
  scope.addOnce(() => { animate(target, params) });
}
// Do this
scope.addOnce() => { animate(target, params) });
```

## Code example (js)

```js
import { createScope, createTimeline, utils, stagger } from 'animejs';

const scope = createScope({
  mediaQueries: {
    isSmall: '(max-width: 200px)',
  }
})
.add(self => {
 
  self.addOnce(() => {
    /* Animations declared here won't be reverted between mediaqueries changes */
    createTimeline().add('.circle', {
      backgroundColor: [
        $el => utils.get($el, `--hex-red-1`),
        $el => utils.get($el, `--hex-citrus-1`),
      ],
      loop: true,
      alternate: true,
      duration: 2000,
    }, stagger(100));
  });
 
  self.add(() => {
    createTimeline().add('.circle', {
      x: self.matches.isSmall ? [-30, 30] : [-70, 70],
      scale: [.5, 1.1],
      loop: true,
      alternate: true,
    }, stagger(100)).init();
  });
      
});
```

## Code example (html)

```html
<div class="iframe-content resizable">
  <div class="scopped small centered">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

← Prev: **add()** (`scope/scope-methods/add`) | Next: **keepTime()** (`scope/scope-methods/keeptime`) →
