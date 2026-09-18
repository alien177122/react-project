---
{
  "order": 352,
  "section": "utilities",
  "path": "(index)",
  "slug": "utilities",
  "url": "https://animejs.com/documentation/utilities",
  "title": "Utilities",
  "breadcrumb": [
    "Utilities"
  ],
  "prev": {
    "title": "onChange",
    "slug": "text/scrambletext/scrambletext-callbacks/onchange"
  },
  "next": {
    "title": "stagger()",
    "slug": "utilities/stagger"
  }
}
---

# Utilities

> Source: [https://animejs.com/documentation/utilities](https://animejs.com/documentation/utilities)
> Breadcrumb: Utilities

## 
          
            Utilities                                              
        

          
        

## A collection of utility functions for common animation tasks that can also serve as modifier functions.

All utility functions are available on the `utils` object imported from the main `'animejs'` module:

```text
import { utils } from 'animejs';

utils.stagger();
utils.$();
utils.get();
utils.set();
// Other functions
```

Or imported directly from the main `'animejs'` module:

```js
import {
  stagger,
  $,
  get,
  set,
  // Other functions
} from 'animejs';
```

Or imported as a standalone module from the `'animejs/utils'` subpath:

```js
import {
  stagger,
  $,
  get,
  set,
  // Other functions
} from 'animejs/utils';
```

## Related

- [Animation modifier functions](https://animejs.com/documentation/animation/tween-parameters/modifier)
- [subpath](https://animejs.com/documentation/getting-started/module-imports)

---

← Prev: **onChange** (`text/scrambletext/scrambletext-callbacks/onchange`) | Next: **stagger()** (`utilities/stagger`) →
