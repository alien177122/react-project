---
{
  "order": 188,
  "section": "layout",
  "path": "layout-callbacks",
  "slug": "layout/layout-callbacks",
  "url": "https://animejs.com/documentation/layout/layout-callbacks",
  "title": "Layout callbacks",
  "breadcrumb": [
    "Layout",
    "Layout callbacks"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "Layout id attribute",
    "slug": "layout/layout-id-attribute"
  },
  "next": {
    "title": "Layout properties",
    "slug": "layout/layout-properties"
  }
}
---

# Layout callbacks

> Source: [https://animejs.com/documentation/layout/layout-callbacks](https://animejs.com/documentation/layout/layout-callbacks)
> Breadcrumb: Layout → Layout callbacks

Layout

                      

          
                        Since 4.3.0
                      

        
                

## 
          
            Layout callbacks                                              
        

          
        Layout animations inherit all Timeline callbacks, allowing you to execute functions at specific points during playback like you would with a regular Timeline.

```js
import { createLayout } from 'animejs';

createLayout(root, {
  children: '.item',
  duration: 350,
  delay: 0,
  ease: 'inOut(3.5)',
  properties: ['boxShadow'],
  enterFrom: { opacity: 0 },
  leaveTo: { opacity: 0 },
  swapAt: { opacity: 0 },
┌───────────────────────────┐
│ onBegin: () => {},        │
│ onUpdate: () => {},       ├─ Callbacks
│ onComplete: () => {},     │
}).then(() => {});          │
└───────────────────────────┘
```

The `.then()` method is also available on the `Timeline` returned by `.update()` or `.animate()`.

## Related

- [Timeline callbacks](https://animejs.com/documentation/timeline/timeline-callbacks)

---

← Prev: **Layout id attribute** (`layout/layout-id-attribute`) | Next: **Layout properties** (`layout/layout-properties`) →
