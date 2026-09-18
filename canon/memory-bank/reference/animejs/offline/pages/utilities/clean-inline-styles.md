---
{
  "order": 355,
  "section": "utilities",
  "path": "clean-inline-styles",
  "slug": "utilities/clean-inline-styles",
  "url": "https://animejs.com/documentation/utilities/clean-inline-styles",
  "title": "cleanInlineStyles()",
  "breadcrumb": [
    "Utilities",
    "cleanInlineStyles()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "set()",
    "slug": "utilities/set"
  },
  "next": {
    "title": "remove()",
    "slug": "utilities/remove"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# cleanInlineStyles()

> Source: [https://animejs.com/documentation/utilities/clean-inline-styles](https://animejs.com/documentation/utilities/clean-inline-styles)
> Breadcrumb: Utilities → cleanInlineStyles()

Utilities

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            cleanInlineStyles()                                              
        

          
        Removes all CSS inline styles added by the specified instance.

Can be used as a Animation or Timeline `onComplete()` callback.

```js
const cleanedInstance = utils.cleanInlineStyles(instance);
```

## Parameters

| Name | Accepts |
| --- | --- |
| instance | Animation \| Timeline |

## Returns

The passed Animation or Timeline instance.

## Related

- [Animation](https://animejs.com/documentation/animation)
- [Timeline](https://animejs.com/documentation/timeline)

## Code example (js)

```js
import { animate, utils } from 'animejs';

utils.set('.square', { scale: .75 });

animate('.keep-styles', {
  x: '23rem',
  borderRadius: '50%',
});

animate('.clean-styles', {
  x: '23rem',
  borderRadius: '50%',
  // This removes the translateX and borderRadius inline styles
  // But keeps the scale previously added outside of this animation
  onComplete: utils.cleanInlineStyles
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="square keep-styles"></div>
  <div class="padded label">Keep styles (default)</div>
</div>
<div class="medium row">
  <div class="square clean-styles"></div>
  <div class="padded label">Clean translateX and borderRadius</div>
</div>
```

---

← Prev: **set()** (`utilities/set`) | Next: **remove()** (`utilities/remove`) →
