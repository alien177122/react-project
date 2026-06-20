---
{
  "order": 13,
  "section": "animation",
  "path": "animatable-properties",
  "slug": "animation/animatable-properties",
  "url": "https://animejs.com/documentation/animation/animatable-properties",
  "title": "Animatable properties",
  "breadcrumb": [
    "Animation",
    "Animatable properties"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "Array of targets",
    "slug": "animation/targets/array-of-targets"
  },
  "next": {
    "title": "CSS Properties",
    "slug": "animation/animatable-properties/css-properties"
  }
}
---

# Animatable properties

> Source: [https://animejs.com/documentation/animation/animatable-properties](https://animejs.com/documentation/animation/animatable-properties)
> Breadcrumb: Animation → Animatable properties

Animation

                      

          
                        Since 1.0.0
                      

        
                

## 
          
            Animatable properties                                              
        

          
        Define which properties of the Targets can be animated.

Animatable properties are defined in the parameters `Object` of the `animate()` function.

```js
animate('.square', {
┌──────────────────┐
│ translateX: 100, │
│ scale: 2,        ├─ Animatable Properties
│ opacity: .5,     │
└──────────────────┘
  duration: 400,
  delay: 250,
  ease: 'out(3)',
  loop: 3,
  alternate: true,
  autoplay: false,
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

## Related

- [Targets](https://animejs.com/documentation/animation/targets)

---

← Prev: **Array of targets** (`animation/targets/array-of-targets`) | Next: **CSS Properties** (`animation/animatable-properties/css-properties`) →
