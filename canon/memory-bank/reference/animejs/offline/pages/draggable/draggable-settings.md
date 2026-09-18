---
{
  "order": 110,
  "section": "draggable",
  "path": "draggable-settings",
  "slug": "draggable/draggable-settings",
  "url": "https://animejs.com/documentation/draggable/draggable-settings",
  "title": "Draggable settings",
  "breadcrumb": [
    "Draggable",
    "Draggable settings"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "mapTo",
    "slug": "draggable/draggable-axes-parameters/mapto"
  },
  "next": {
    "title": "trigger",
    "slug": "draggable/draggable-settings/trigger"
  }
}
---

# Draggable settings

> Source: [https://animejs.com/documentation/draggable/draggable-settings](https://animejs.com/documentation/draggable/draggable-settings)
> Breadcrumb: Draggable → Draggable settings

Draggable

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Draggable settings                                              
        

          
        Draggable settings are defined directly in the `createDraggable()` parameters `Object`.

```js
createDraggable('.square', {
  x: { snap: 100 },
  y: { snap: 50 },
  modifier: utils.wrap(-200, 0),
┌───────────────────────┐
│ containerPadding: 10, │
│ releaseStiffness: 40, ├─ Settings
│ releaseEase: 'out(3)',│
└───────────────────────┘
  onGrab: () => {},
  onDrag: () => {},
  onRelease: () => {},
});
```

---

← Prev: **mapTo** (`draggable/draggable-axes-parameters/mapto`) | Next: **trigger** (`draggable/draggable-settings/trigger`) →
