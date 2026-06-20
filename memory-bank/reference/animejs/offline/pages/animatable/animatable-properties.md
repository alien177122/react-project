---
{
  "order": 6,
  "section": "animatable",
  "path": "animatable-properties",
  "slug": "animatable/animatable-properties",
  "url": "https://animejs.com/documentation/animatable/animatable-properties",
  "title": "Animatable properties",
  "breadcrumb": [
    "Animatable",
    "Animatable properties"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "revert()",
    "slug": "animatable/animatable-methods/revert"
  },
  "next": {
    "title": "Draggable",
    "slug": "draggable"
  }
}
---

# Animatable properties

> Source: [https://animejs.com/documentation/animatable/animatable-properties](https://animejs.com/documentation/animatable/animatable-properties)
> Breadcrumb: Animatable → Animatable properties

Animatable

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Animatable properties                                              
        

          
        Properties available on the `Animatable` instance returned by a `createAnimatable()` function.

```js
const animatable = createAnimatable(targets, parameters);
           ┌───────────┐
animatable.│targets    ├─ Properties
animatable.│animations │
           └───────────┘
```

| Name | Description |
| --- | --- |
| targets | Gets the animatable Targets (`Array`) |
| animations | Gets all animatable Animations (`Object`) |

---

← Prev: **revert()** (`animatable/animatable-methods/revert`) | Next: **Draggable** (`draggable`) →
