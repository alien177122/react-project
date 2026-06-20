---
{
  "order": 196,
  "section": "layout",
  "path": "layout-settings",
  "slug": "layout/layout-settings",
  "url": "https://animejs.com/documentation/layout/layout-settings",
  "title": "Settings",
  "breadcrumb": [
    "Layout",
    "Settings"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "Modal dialog animation",
    "slug": "layout/usage/animate-modal-dialog"
  },
  "next": {
    "title": "children",
    "slug": "layout/layout-settings/children"
  }
}
---

# Settings

> Source: [https://animejs.com/documentation/layout/layout-settings](https://animejs.com/documentation/layout/layout-settings)
> Breadcrumb: Layout → Settings

Layout

                      

          
                        Since 4.3.0
                      

        
                

## 
          
            Settings                                              
        

          
        Layout settings are defined directly in the `createLayout()` parameters `Object`.

```js
import { createLayout } from 'animejs';

createLayout('.layout-container', {
┌─────────────────────────────┐
│ children: '.item',          │
│ duration: 350,              │
│ delay: 0,                   ├─ Settings
│ ease: 'inOut(3.5)',         │
│ properties: ['boxShadow'],  │
└─────────────────────────────┘
  enterFrom: { opacity: 0 },
  leaveTo: { opacity: 0 },
  swapAt: { opacity: 0 },
  onBegin: () => {},
  onUpdate: () => {},
  onComplete: () => {},
}).then(() => {});
```

---

← Prev: **Modal dialog animation** (`layout/usage/animate-modal-dialog`) | Next: **children** (`layout/layout-settings/children`) →
