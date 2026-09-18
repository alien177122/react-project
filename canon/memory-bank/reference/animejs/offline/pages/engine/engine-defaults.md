---
{
  "order": 136,
  "section": "engine",
  "path": "engine-defaults",
  "slug": "engine/engine-defaults",
  "url": "https://animejs.com/documentation/engine/engine-defaults",
  "title": "Engine defaults",
  "breadcrumb": [
    "Engine",
    "Engine defaults"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Engine properties",
    "slug": "engine/engine-properties"
  }
}
---

# Engine defaults

> Source: [https://animejs.com/documentation/engine/engine-defaults](https://animejs.com/documentation/engine/engine-defaults)
> Breadcrumb: Engine → Engine defaults

Engine

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Engine defaults                                              
        

          
        Defines the global defaults properties used by all Timer, Animation and Timeline instances.

All default properties are available on the `defaults` `Object` of `engine`.

```text
import { engine } from 'animejs';

engine.engine.defaults.duration = 500;
```

| Name | Accepts |
| --- | --- |
| playbackEase | Easing name `String` \| Easing `Function` |
| playbackRate | `Number` |
| frameRate | `Number` |
| loop | `Number` \| `Boolean` |
| reversed | `Boolean` |
| alternate | `Boolean` |
| autoplay | `Boolean` |
| duration | `Number` \| `Function` |
| delay | `Number` \| `Function` |
| composition | Composition types `String` \| `Function` |
| ease | Easing name `String` \| Easing `Function` |
| loopDelay | `Number` |
| modifier | Modifier `Function` |
| onBegin | Callback `Function` |
| onUpdate | Callback `Function` |
| onRender | Callback `Function` |
| onLoop | Callback `Function` |
| onComplete | Callback `Function` |
| onPause | Callback `Function` |

## Related

- [Timer](https://animejs.com/documentation/timer)
- [Animation](https://animejs.com/documentation/animation)
- [Timeline](https://animejs.com/documentation/timeline)

---

← Prev: **Engine properties** (`engine/engine-properties`)
