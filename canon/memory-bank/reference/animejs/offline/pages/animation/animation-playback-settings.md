---
{
  "order": 43,
  "section": "animation",
  "path": "animation-playback-settings",
  "slug": "animation/animation-playback-settings",
  "url": "https://animejs.com/documentation/animation/animation-playback-settings",
  "title": "Animation playback settings",
  "breadcrumb": [
    "Animation",
    "Animation playback settings"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "Percentage based keyframes",
    "slug": "animation/keyframes/percentage-based-keyframes"
  },
  "next": {
    "title": "delay",
    "slug": "animation/animation-playback-settings/delay"
  }
}
---

# Animation playback settings

> Source: [https://animejs.com/documentation/animation/animation-playback-settings](https://animejs.com/documentation/animation/animation-playback-settings)
> Breadcrumb: Animation → Animation playback settings

Animation

                      

          
                        Since 1.0.0
                      

        
                

## 
          
            Animation playback settings                                              
        

          
        Specify the timings and behaviours of an animation.

Playback settings properties are defined directly in the `animate()` parameters `Object`.

```js
animate('.square', {
  translateX: 100,
  scale: 2,
  opacity: .5,
  duration: 400,
  delay: 250,
  ease: 'out(3)',
┌───────────────────┐
│ loop: 3,          │
│ alternate: true,  ├─ Playback Settings
│ autoplay: false,  │
└───────────────────┘
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

---

← Prev: **Percentage based keyframes** (`animation/keyframes/percentage-based-keyframes`) | Next: **delay** (`animation/animation-playback-settings/delay`) →
