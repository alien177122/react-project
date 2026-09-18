---
{
  "order": 341,
  "section": "timer",
  "path": "timer-playback-settings",
  "slug": "timer/timer-playback-settings",
  "url": "https://animejs.com/documentation/timer/timer-playback-settings",
  "title": "Timer playback settings",
  "breadcrumb": [
    "Timer",
    "Timer playback settings"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Timer",
    "slug": "timer"
  },
  "next": {
    "title": "delay",
    "slug": "timer/timer-playback-settings/delay"
  }
}
---

# Timer playback settings

> Source: [https://animejs.com/documentation/timer/timer-playback-settings](https://animejs.com/documentation/timer/timer-playback-settings)
> Breadcrumb: Timer → Timer playback settings

Timer

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Timer playback settings                                              
        

          
        Specify the timings and behaviours of a timer.

Playback settings properties are defined directly in the `createTimer()` parameters `Object`.

```js
createTimer({
┌───────────────────┐
│ duration: 1000,   │
│ frameRate: true,  ├─ Playback Settings
│ loop: true,       │
└───────────────────┘
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

---

← Prev: **Timer** (`timer`) | Next: **delay** (`timer/timer-playback-settings/delay`) →
