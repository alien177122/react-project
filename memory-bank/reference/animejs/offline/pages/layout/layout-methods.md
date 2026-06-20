---
{
  "order": 190,
  "section": "layout",
  "path": "layout-methods",
  "slug": "layout/layout-methods",
  "url": "https://animejs.com/documentation/layout/layout-methods",
  "title": "Layout methods",
  "breadcrumb": [
    "Layout",
    "Layout methods"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "swapAt",
    "slug": "layout/states-parameters/swapAt"
  },
  "next": {
    "title": "record()",
    "slug": "layout/layout-methods/record"
  }
}
---

# Layout methods

> Source: [https://animejs.com/documentation/layout/layout-methods](https://animejs.com/documentation/layout/layout-methods)
> Breadcrumb: Layout → Layout methods

Layout

                      

          
                        Since 4.3.0
                      

        
                

## 
          
            Layout methods                                              
        

          
        Methods available on the `AutoLayout` instance returned by `createLayout()`, to record, animate, and revert layout states.

```js
const layout = createLayout(root, parameters);
       ┌───────────┐
layout.│record()   │
layout.│animate()  ├─ Methods
layout.│update()   │
layout.│revert()   │
       └───────────┘
```

---

← Prev: **swapAt** (`layout/states-parameters/swapAt`) | Next: **record()** (`layout/layout-methods/record`) →
