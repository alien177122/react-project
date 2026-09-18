---
{
  "order": 82,
  "section": "draggable",
  "path": "(index)",
  "slug": "draggable",
  "url": "https://animejs.com/documentation/draggable",
  "title": "Draggable",
  "breadcrumb": [
    "Draggable"
  ],
  "prev": {
    "title": "Animatable properties",
    "slug": "animatable/animatable-properties"
  },
  "next": {
    "title": "Draggable axes parameters",
    "slug": "draggable/draggable-axes-parameters"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Draggable

> Source: [https://animejs.com/documentation/draggable](https://animejs.com/documentation/draggable)
> Breadcrumb: Draggable

## 
          
            Draggable                                              
        

          
        

## Adds draggable capabilities to DOM Elements.

Draggables are created using the `createDraggable()` method imported from the main `'animejs'` module:

```js
import { createDraggable } from 'animejs';

const draggable = createDraggable(target, parameters);
```

Or imported as a standalone module from the `'animejs/draggable'` subpath:

```js
import { createDraggable } from 'animejs/draggable';
```

## Parameters

| Name | Accepts |
| --- | --- |
| target | CSS Selector \| DOM Element |
| parameters (opt) | An `Object` of Draggable axes parameters, Draggable settings and Draggable callbacks |

## Returns

`Draggable`

## Related

- [subpath](https://animejs.com/documentation/getting-started/module-imports)

## Code example (js)

```js
import { createDraggable } from 'animejs';

createDraggable('.square');
```

## Code example (html)

```html
<div class="large row centered">
  <div class="square draggable"></div>
</div>
```

---

← Prev: **Animatable properties** (`animatable/animatable-properties`) | Next: **Draggable axes parameters** (`draggable/draggable-axes-parameters`) →
