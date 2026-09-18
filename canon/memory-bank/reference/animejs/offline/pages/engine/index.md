---
{
  "order": 135,
  "section": "engine",
  "path": "(index)",
  "slug": "engine",
  "url": "https://animejs.com/documentation/engine",
  "title": "Engine",
  "breadcrumb": [
    "Engine"
  ],
  "prev": {
    "title": "waapi.convertEase()",
    "slug": "web-animation-api/waapi-convertease"
  },
  "next": {
    "title": "Engine parameters",
    "slug": "engine/engine-parameters"
  }
}
---

# Engine

> Source: [https://animejs.com/documentation/engine](https://animejs.com/documentation/engine)
> Breadcrumb: Engine

## 
          
            Engine                                              
        

          
        

## Drives and synchronises all Animation, Timer, and Timeline instances.

```js
import { engine } from 'animejs';
```

## Execution order

Timers, animations, and timelines are executed in the order they are added to the engine. To control the execution order within the engine tick loop, use the `priority` parameter: instances with lower values are executed first.

```js
animate(targets, { x: 100, priority: 0 }); // Runs first
animate(targets, { y: 100, priority: 2 }); // Runs last
animate(targets, { z: 100 });              // Default priority: 1
```

## Related

- [Animation](https://animejs.com/documentation/animation)
- [Timer](https://animejs.com/documentation/timer)
- [Timeline](https://animejs.com/documentation/timeline)

---

← Prev: **waapi.convertEase()** (`web-animation-api/waapi-convertease`) | Next: **Engine parameters** (`engine/engine-parameters`) →
