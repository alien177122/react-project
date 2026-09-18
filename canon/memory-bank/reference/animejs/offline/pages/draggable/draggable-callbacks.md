---
{
  "order": 89,
  "section": "draggable",
  "path": "draggable-callbacks",
  "slug": "draggable/draggable-callbacks",
  "url": "https://animejs.com/documentation/draggable/draggable-callbacks",
  "title": "Draggable callbacks",
  "breadcrumb": [
    "Draggable",
    "Draggable callbacks"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "cursor",
    "slug": "draggable/draggable-settings/cursor"
  },
  "next": {
    "title": "onGrab",
    "slug": "draggable/draggable-callbacks/ongrab"
  }
}
---

# Draggable callbacks

> Source: [https://animejs.com/documentation/draggable/draggable-callbacks](https://animejs.com/documentation/draggable/draggable-callbacks)
> Breadcrumb: Draggable → Draggable callbacks

Draggable

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Draggable callbacks                                              
        

          
        Execute functions at specific points while dragging an element.

Draggable callback functions are specified directly in the `createDraggable()` parameters `Object`.

```js
createDraggable('.square', {
  x: { snap: 100 },
  y: { snap: 50 },
  modifier: utils.wrap(-200, 0),
  containerPadding: 10,
  containerStiffness: 40,
  containerEase: 'out(3)',
┌────────────────────────┐
│ onGrab: () => {},      │
│ onDrag: () => {},      ├─ Callbaks
│ onRelease: () => {},   │
└────────────────────────┘
});
```

---

← Prev: **cursor** (`draggable/draggable-settings/cursor`) | Next: **onGrab** (`draggable/draggable-callbacks/ongrab`) →
