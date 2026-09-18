---
{
  "order": 61,
  "section": "animation",
  "path": "targets",
  "slug": "animation/targets",
  "url": "https://animejs.com/documentation/animation/targets",
  "title": "Targets",
  "breadcrumb": [
    "Animation",
    "Targets"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Animation",
    "slug": "animation"
  },
  "next": {
    "title": "CSS Selector",
    "slug": "animation/targets/css-selector"
  }
}
---

# Targets

> Source: [https://animejs.com/documentation/animation/targets](https://animejs.com/documentation/animation/targets)
> Breadcrumb: Animation → Targets

Animation

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Targets                                              
        

          
        Specify the elements to which property value changes are applied.

Animation targets are defined in the first argument of the `animate()` function.

```js
animate(
┌────────────┐
│ '.square', ├─ Targets
└────────────┘
{
  translateX: 100,
  scale: 2,
  opacity: .5,
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

---

← Prev: **Animation** (`animation`) | Next: **CSS Selector** (`animation/targets/css-selector`) →
