---
{
  "order": 147,
  "section": "engine",
  "path": "engine-properties",
  "slug": "engine/engine-properties",
  "url": "https://animejs.com/documentation/engine/engine-properties",
  "title": "Engine properties",
  "breadcrumb": [
    "Engine",
    "Engine properties"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "resume()",
    "slug": "engine/engine-methods/resume"
  },
  "next": {
    "title": "Engine defaults",
    "slug": "engine/engine-defaults"
  }
}
---

# Engine properties

> Source: [https://animejs.com/documentation/engine/engine-properties](https://animejs.com/documentation/engine/engine-properties)
> Breadcrumb: Engine → Engine properties

Engine

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Engine properties                                              
        

          
        

```js
import { engine } from 'animejs';
       ┌───────────────────────┐
engine.│deltaTime              │
engine.│useDefaultMainLoop     ├─ Properties
engine.│pauseOnDocumentHidden  │
       └───────────────────────┘
```

| Name | Description |
| --- | --- |
| timeUnit | Gets and sets the unit of time to use for time-related values like `duration` and `delay` (`'ms' \| 's'`) |
| currentTime | Gets the current time of the engine (`Number`) |
| deltaTime | Gets the time elapsed since the last frame (`Number`) |
| precision | Gets and sets how many decimal places to round string values to during an animation (`Number`) |
| speed | Gets or sets the global playback rate for all animations (`Number`) |
| fps | Gets or sets the global frame rate for all animations (`Number`) |
| useDefaultMainLoop | Gets or sets whether the engine uses its default main loop (`Boolean`) |
| pauseOnDocumentHidden | Gets or sets whether the engine pauses when the tab is hidden (`Boolean`) |

---

← Prev: **resume()** (`engine/engine-methods/resume`) | Next: **Engine defaults** (`engine/engine-defaults`) →
