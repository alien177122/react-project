---
{
  "order": 202,
  "section": "layout",
  "path": "states-parameters",
  "slug": "layout/states-parameters",
  "url": "https://animejs.com/documentation/layout/states-parameters",
  "title": "States parameters",
  "breadcrumb": [
    "Layout",
    "States parameters"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "properties",
    "slug": "layout/layout-settings/properties"
  },
  "next": {
    "title": "enterFrom",
    "slug": "layout/states-parameters/enterFrom"
  }
}
---

# States parameters

> Source: [https://animejs.com/documentation/layout/states-parameters](https://animejs.com/documentation/layout/states-parameters)
> Breadcrumb: Layout → States parameters

Layout

                      

          
                        Since 4.3.0
                      

        
                

## 
          
            States parameters                                              
        

          
        Defines properties applied to elements during specific transition phases: entering the layout, leaving the layout, or swapping position.

```js
import { createLayout } from 'animejs';

createLayout('.layout-container', {
  children: '.item',
  duration: 350,
  delay: 0,
  ease: 'inOut(3.5)',
  properties: ['boxShadow'],
┌─────────────────────────────┐
│ enterFrom: { opacity: 0 },  │
│ leaveTo: { opacity: 0 },    ├─ State Parameters
│ swapAt: { opacity: 0 },     │
└─────────────────────────────┘
  onBegin: () => {},
  onUpdate: () => {},
  onComplete: () => {},
}).then(() => {});
```

Each parameter accepts an `Object` of CSS properties with optional `delay`, `duration`, and `ease` overrides.

After calling `layout.update()` or `layout.animate()`, corresponding element arrays are available on the layout instance:

| Array | Contains |
| --- | --- |
| `layout.entering` | Elements that appeared in the layout |
| `layout.leaving` | Elements that disappeared from the layout |
| `layout.swapping` | Non-animated children during transitions |

These arrays are cleared and repopulated on each `.animate()` call.

---

← Prev: **properties** (`layout/layout-settings/properties`) | Next: **enterFrom** (`layout/states-parameters/enterFrom`) →
