---
{
  "order": 66,
  "section": "animation",
  "path": "tween-parameters",
  "slug": "animation/tween-parameters",
  "url": "https://animejs.com/documentation/animation/tween-parameters",
  "title": "Tween parameters",
  "breadcrumb": [
    "Animation",
    "Tween parameters"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "Function based value",
    "slug": "animation/tween-value-types/function-based"
  },
  "next": {
    "title": "to",
    "slug": "animation/tween-parameters/to"
  }
}
---

# Tween parameters

> Source: [https://animejs.com/documentation/animation/tween-parameters](https://animejs.com/documentation/animation/tween-parameters)
> Breadcrumb: Animation → Tween parameters

Animation

                      

          
                        Since 1.0.0
                      

        
                

## 
          
            Tween parameters                                              
        

          
        Configure values, timings, and behaviors of animated properties.

Tween parameters can be specified *globally* for all properties directly with the other animation parameters, or *locally* for a specific property using an `Object`.

All animatable properties inherit the *global* parameters, which can be overridden *locally* for a specific tween.

```js
animate('.square', {
  x: {
┌───────────────────┐
│   to: 100,        │
│   delay: 0,       ├─ Local Tween Parameters
│   ease: 'inOut(4)'│
└───────────────────┘
  },
  scale: 1,
  opacity: .5,
┌───────────────────┐
│ duration: 400,    │
│ delay: 250,       ├─ Global Tween Parameters
│ ease: 'out(3)',   │
└───────────────────┘
  loop: 3,
  alternate: true,
});
```

---

← Prev: **Function based value** (`animation/tween-value-types/function-based`) | Next: **to** (`animation/tween-parameters/to`) →
