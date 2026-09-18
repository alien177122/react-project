---
{
  "order": 215,
  "section": "scope",
  "path": "(index)",
  "slug": "scope",
  "url": "https://animejs.com/documentation/scope",
  "title": "Scope",
  "breadcrumb": [
    "Scope"
  ],
  "prev": {
    "title": "Common auto layout gotchas",
    "slug": "layout/common-auto-layout-gotchas"
  },
  "next": {
    "title": "Add constructor function",
    "slug": "scope/add-constructor-function"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Scope

> Source: [https://animejs.com/documentation/scope](https://animejs.com/documentation/scope)
> Breadcrumb: Scope

## 
          
            Scope                                              
        

          
        

## Anime.js instances declared inside a Scope can react to media queries, use custom root elements, share default parameters, and be reverted in batch, streamlining work in responsive and component-based environments.

Scopes are created using the `createScope()` method imported from the main `'animejs'` module:

```js
import { createScope } from 'animejs';

const scope = createScope(parameters);
```

Or imported as a standalone module from the `'animejs/scope'` subpath:

```js
import { createScope } from 'animejs/scope';
```

## Parameters

| Name | Accepts |
| --- | --- |
| parameters (opt) | Scope parameters |

## Returns

`Scope`

## Related

- [subpath](https://animejs.com/documentation/getting-started/module-imports)

## Code example (js)

```js
import { animate, utils, createScope } from 'animejs';

createScope({
  mediaQueries: {
    isSmall: '(max-width: 200px)',
    reduceMotion: '(prefers-reduced-motion)',
  }
})
.add(self => {

  const { isSmall, reduceMotion } = self.matches;
  
  if (isSmall) {
    utils.set('.square', { scale: .5 });
  }
    
  animate('.square', {
    x: isSmall ? 0 : ['-35vw', '35vw'],
    y: isSmall ? ['-40vh', '40vh'] : 0,
    loop: true,
    alternate: true,
    duration: reduceMotion ? 0 : isSmall ? 750 : 1250
  });

});
```

## Code example (html)

```html
<div class="iframe-content resizable">
  <div class="large centered row">
    <div class="col">
      <div class="square"></div>
    </div>
  </div>
</div>
```

---

← Prev: **Common auto layout gotchas** (`layout/common-auto-layout-gotchas`) | Next: **Add constructor function** (`scope/add-constructor-function`) →
