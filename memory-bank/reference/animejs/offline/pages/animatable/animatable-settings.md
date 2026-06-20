---
{
  "order": 7,
  "section": "animatable",
  "path": "animatable-settings",
  "slug": "animatable/animatable-settings",
  "url": "https://animejs.com/documentation/animatable/animatable-settings",
  "title": "Animatable settings",
  "breadcrumb": [
    "Animatable",
    "Animatable settings"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Animatable",
    "slug": "animatable"
  },
  "next": {
    "title": "unit",
    "slug": "animatable/animatable-settings/unit"
  }
}
---

# Animatable settings

> Source: [https://animejs.com/documentation/animatable/animatable-settings](https://animejs.com/documentation/animatable/animatable-settings)
> Breadcrumb: Animatable → Animatable settings

Animatable

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Animatable settings                                              
        

          
        Animatables properties settings are specified globally to all properties on the parameters object, or specifically to a property by passing an object.

```js
createAnimatable(targets, {
  x: {
┌──────────────────┐
│   unit: 'rem',   │
│   duration: 400, ├─ Specific Property Settings
│   ease: 'out(4)' │
└──────────────────┘
  },
  y: 200,
  rotate: 1000,
┌──────────────────┐
│ ease: 'out(2)',  ├─ Global Properties Settings
└──────────────────┘
});
```

---

← Prev: **Animatable** (`animatable`) | Next: **unit** (`animatable/animatable-settings/unit`) →
