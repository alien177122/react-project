---
{
  "order": 225,
  "section": "scope",
  "path": "scope-parameters/defaults",
  "slug": "scope/scope-parameters/defaults",
  "url": "https://animejs.com/documentation/scope/scope-parameters/defaults",
  "title": "defaults",
  "breadcrumb": [
    "Scope",
    "Scope parameters",
    "defaults"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "root",
    "slug": "scope/scope-parameters/root"
  },
  "next": {
    "title": "mediaQueries",
    "slug": "scope/scope-parameters/mediaqueries"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# defaults

> Source: [https://animejs.com/documentation/scope/scope-parameters/defaults](https://animejs.com/documentation/scope/scope-parameters/defaults)
> Breadcrumb: Scope → Scope parameters → defaults

Scope

                          
              
                Parameters              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            defaults                                              
        

          
        Defines the Scope defaults properties which are then used for all Timer, Animation and Timeline created within that scope.

## Accepts

An `Object` with the following optional properties:

| Name | Accepts |
| --- | --- |
| playbackEase | Easing name `String` \| Easing `Function` |
| playbackRate | `Number` |
| frameRate | `Number` |
| loop | `Number` \| `Boolean` |
| reversed | `Boolean` |
| alternate | `Boolean` |
| autoplay | `Boolean` |
| duration | `Number` \| `Function` |
| delay | `Number` \| `Function` |
| composition | Composition types `String` \| `Function` |
| ease | Easing name `String` \| Easing `Function` |
| loopDelay | `Number` |
| modifier | Modifier `Function` |
| onBegin | Callback `Function` |
| onUpdate | Callback `Function` |
| onRender | Callback `Function` |
| onLoop | Callback `Function` |
| onComplete | Callback `Function` |

## Related

- [Timer](https://animejs.com/documentation/timer)
- [Animation](https://animejs.com/documentation/animation)
- [Timeline](https://animejs.com/documentation/timeline)

## Code example (js)

```js
import { createScope, animate } from 'animejs';

const rows = utils.$('.row');

rows.forEach(($row, i) => {
  createScope({
    root: $row,
    defaults: { ease: `out(${1 + i})` }
  })
  .add(() => {
    animate('.square', {
      x: '17rem',
      loop: true,
      alternate: true
    });
  });
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">scope 1</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">scope 2</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">scope 3</div>
</div>
```

---

← Prev: **root** (`scope/scope-parameters/root`) | Next: **mediaQueries** (`scope/scope-parameters/mediaqueries`) →
