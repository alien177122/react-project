---
{
  "order": 321,
  "section": "timer",
  "path": "timer-callbacks",
  "slug": "timer/timer-callbacks",
  "url": "https://animejs.com/documentation/timer/timer-callbacks",
  "title": "Timer callbacks",
  "breadcrumb": [
    "Timer",
    "Timer callbacks"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "playbackRate",
    "slug": "timer/timer-playback-settings/playbackrate"
  },
  "next": {
    "title": "onBegin",
    "slug": "timer/timer-callbacks/onbegin"
  }
}
---

# Timer callbacks

> Source: [https://animejs.com/documentation/timer/timer-callbacks](https://animejs.com/documentation/timer/timer-callbacks)
> Breadcrumb: Timer → Timer callbacks

Timer

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Timer callbacks                                              
        

          
        Execute functions at specific points during a timer playback.

Callbacks `Function` are specified directly in the `createTimer()` parameters `Object`.

```js
createTimer({
  duration: 1000,
  frameRate: true,
  loop: true,
┌─────────────────────┐
│ onBegin: () => {},  │
│ onLoop: () => {},   ├─ Callbacks
│ onUpdate: () => {}, │
└─────────────────────┘
});
```

---

← Prev: **playbackRate** (`timer/timer-playback-settings/playbackrate`) | Next: **onBegin** (`timer/timer-callbacks/onbegin`) →
