---
{
  "order": 56,
  "section": "animation",
  "path": "keyframes",
  "slug": "animation/keyframes",
  "url": "https://animejs.com/documentation/animation/keyframes",
  "title": "Keyframes",
  "breadcrumb": [
    "Animation",
    "Keyframes"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "modifier",
    "slug": "animation/tween-parameters/modifier"
  },
  "next": {
    "title": "Tween values keyframes",
    "slug": "animation/keyframes/tween-values-keyframes"
  }
}
---

# Keyframes

> Source: [https://animejs.com/documentation/animation/keyframes](https://animejs.com/documentation/animation/keyframes)
> Breadcrumb: Animation → Keyframes

Animation

                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Keyframes                                              
        

          
        Create a sequence of animations on the same animatable property.

## Property value keyframes

Specific to an animated property, these keyframes are passed to the property value directly:

```js
animate('.square', {
┌───────────────────┐
│ x: [0, 100, 200], ├─ Tween Values Array
│ y: [0, 100, 200], │
└───────────────────┘
  duration: 3000,
}

animate('.square', {
┌────────────────────────────┐
│ x: [{to: 100}, {to: 200}], ├─ Tween Parameters Array
│ y: [{to: 100}, {to: 200}], │
└────────────────────────────┘
  duration: 3000,
}
```

## Animation keyframes

Defined at the animation level, these keyframes can animate multiple properties per keyframe:

```js
animate('.square', {
┌───────────────────────┐
│ keyframes: [          │
│   { x: 100, y: 100 }, ├─ Duration Based
│   { x: 200, y: 200 }, │
│ ],                    │
└───────────────────────┘
  duration: 3000,
}

animate('.square', {
┌───────────────────────────────┐
│ keyframes: {                  │
│   '0%'  : { x: 0,   y: 0   }, │
│   '50%' : { x: 100, y: 100 }, ├─ Percentage Based
│   '100%': { x: 200, y: 200 }, │
│ },                            │
└───────────────────────────────┘
  duration: 3000,
}
```

---

← Prev: **modifier** (`animation/tween-parameters/modifier`) | Next: **Tween values keyframes** (`animation/keyframes/tween-values-keyframes`) →
