---
{
  "order": 221,
  "section": "scope",
  "path": "scope-methods/keeptime",
  "slug": "scope/scope-methods/keeptime",
  "url": "https://animejs.com/documentation/scope/scope-methods/keeptime",
  "title": "keepTime()",
  "breadcrumb": [
    "Scope",
    "Scope methods",
    "keepTime()"
  ],
  "since": "Since 4.1.0",
  "prev": {
    "title": "addOnce()",
    "slug": "scope/scope-methods/addonce"
  },
  "next": {
    "title": "revert()",
    "slug": "scope/scope-methods/revert"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# keepTime()

> Source: [https://animejs.com/documentation/scope/scope-methods/keeptime](https://animejs.com/documentation/scope/scope-methods/keeptime)
> Breadcrumb: Scope → Scope methods → keepTime()

Scope

                          
              
                Methods              
                      

          
                        Since 4.1.0
                      

        
                

## 
          
            keepTime()                                              
        

          
        Adds a constructor `Function` that recreates a `Timer`, `Animation`, or `Timeline` between media query changes while keeping track of its current time, allowing to seamlessly update an animation's parameters without breaking the playback state.

```js
scope.keepTime(() => animate(target, parameters));
```

## Parameters

| Name | Accepts |
| --- | --- |
| constructor | A `Function` that returns a `Timer`, `Animation`, or `Timeline` |

## Returns

The `Timer`, `Animation`, or `Timeline` returned by the constructor

`scope.keepTime()` calls cannot be conditional, as it defeats the purpose and will mess with keeping track of which callbacks have already been executed or not.

```js
// Don't do this
if (scope.matches.small) {
  scope.keepTime(() => animate(target, params));
}
// Do this
scope.keepTime(() => animate(target, params));
```

## Related

- [Timer](https://animejs.com/documentation/timer)
- [Animation](https://animejs.com/documentation/animation)
- [Timeline](https://animejs.com/documentation/timeline)

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
 
  self.keepTime(() => createTimeline().add('.circle', {
    x: self.matches.isSmall ? [-30, 30] : [-70, 70],
    scale: [.5, 1.1],
    loop: true,
    alternate: true,
  }, stagger(100)).init());
      
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

← Prev: **addOnce()** (`scope/scope-methods/addonce`) | Next: **revert()** (`scope/scope-methods/revert`) →
