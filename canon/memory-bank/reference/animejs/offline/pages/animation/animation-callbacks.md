---
{
  "order": 20,
  "section": "animation",
  "path": "animation-callbacks",
  "slug": "animation/animation-callbacks",
  "url": "https://animejs.com/documentation/animation/animation-callbacks",
  "title": "Animation callbacks",
  "breadcrumb": [
    "Animation",
    "Animation callbacks"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "persist",
    "slug": "animation/animation-playback-settings/persist"
  },
  "next": {
    "title": "onBegin",
    "slug": "animation/animation-callbacks/onbegin"
  }
}
---

# Animation callbacks

> Source: [https://animejs.com/documentation/animation/animation-callbacks](https://animejs.com/documentation/animation/animation-callbacks)
> Breadcrumb: Animation → Animation callbacks

Animation

                      

          
                        Since 1.0.0
                      

        
                

## 
          
            Animation callbacks                                              
        

          
        Execute functions at specific points during an animation playback.

Callbacks `Function` are specified directly in the `animate()` parameters `Object`.

```js
animate('.square', {
  translateX: 100,
  scale: 2,
  opacity: .5,
  duration: 400,
  delay: 250,
  ease: 'out(3)',
  loop: 3,
  alternate: true,
  autoplay: false,
┌─────────────────────┐
│ onBegin: () => {},  │
│ onLoop: () => {},   ├─ Callbacks
│ onUpdate: () => {}, │
└─────────────────────┘
});
```

---

← Prev: **persist** (`animation/animation-playback-settings/persist`) | Next: **onBegin** (`animation/animation-callbacks/onbegin`) →
