---
{
  "order": 74,
  "section": "animation",
  "path": "tween-value-types",
  "slug": "animation/tween-value-types",
  "url": "https://animejs.com/documentation/animation/tween-value-types",
  "title": "Tween value types",
  "breadcrumb": [
    "Animation",
    "Tween value types"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "SVG Attributes",
    "slug": "animation/animatable-properties/svg-attributes"
  },
  "next": {
    "title": "Numerical value",
    "slug": "animation/tween-value-types/numerical-value"
  }
}
---

# Tween value types

> Source: [https://animejs.com/documentation/animation/tween-value-types](https://animejs.com/documentation/animation/tween-value-types)
> Breadcrumb: Animation → Tween value types

Animation

                      

          
                        Since 1.0.0
                      

        
                

## 
          
            Tween value types                                              
        

          
        Specify the *start* and *end* values that define the animation of animatable properties.

Animation values are assigned to Animatable properties and accept a wide range of syntaxes.

```js
animate('.square', {
  x: '6rem', ─────────────────┐
  y: $el => $el.dataset.y, ───┤
  scale: '+=.25', ────────────┼─ Tween Values
  opacity: {                  │
    from: .4, ────────────────┘
  },
});
```

## Related

- [Animatable properties](https://animejs.com/documentation/animation/animatable-properties)

---

← Prev: **SVG Attributes** (`animation/animatable-properties/svg-attributes`) | Next: **Numerical value** (`animation/tween-value-types/numerical-value`) →
