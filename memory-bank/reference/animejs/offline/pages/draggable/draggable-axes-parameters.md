---
{
  "order": 83,
  "section": "draggable",
  "path": "draggable-axes-parameters",
  "slug": "draggable/draggable-axes-parameters",
  "url": "https://animejs.com/documentation/draggable/draggable-axes-parameters",
  "title": "Draggable axes parameters",
  "breadcrumb": [
    "Draggable",
    "Draggable axes parameters"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Draggable",
    "slug": "draggable"
  },
  "next": {
    "title": "x",
    "slug": "draggable/draggable-axes-parameters/x"
  }
}
---

# Draggable axes parameters

> Source: [https://animejs.com/documentation/draggable/draggable-axes-parameters](https://animejs.com/documentation/draggable/draggable-axes-parameters)
> Breadcrumb: Draggable → Draggable axes parameters

Draggable

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Draggable axes parameters                                              
        

          
        Axes parameters are specified globally to all axes on the parameters object, or specifically to an axis by passing it an object.

```js
createDraggable('.square', {
┌───────────────────────────────┐
│ x: { snap: 100 },             │
│ y: { snap: 50 },              ├─ Axes Parameters
│ modifier: utils.wrap(-200, 0),│
└───────────────────────────────┘
  containerPadding: 10,
  releaseStiffness: 40,
  releaseEase: 'out(3)',
  onGrab: () => {},
  onDrag: () => {},
  onRelease: () => {},
});
```

---

← Prev: **Draggable** (`draggable`) | Next: **x** (`draggable/draggable-axes-parameters/x`) →
