---
{
  "order": 278,
  "section": "timeline",
  "path": "timeline-callbacks",
  "slug": "timeline/timeline-callbacks",
  "url": "https://animejs.com/documentation/timeline/timeline-callbacks",
  "title": "Timeline callbacks",
  "breadcrumb": [
    "Timeline",
    "Timeline callbacks"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "playbackEase",
    "slug": "timeline/timeline-playback-settings/playbackease"
  },
  "next": {
    "title": "onBegin",
    "slug": "timeline/timeline-callbacks/onbegin"
  }
}
---

# Timeline callbacks

> Source: [https://animejs.com/documentation/timeline/timeline-callbacks](https://animejs.com/documentation/timeline/timeline-callbacks)
> Breadcrumb: Timeline → Timeline callbacks

Timeline

                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Timeline callbacks                                              
        

          
        Execute functions at specific points during a timeline playback.

Timeline callbacks functions are defined directly in the `createTimeline()` parameters `Object`.

```js
createTimeline({
  defaults: {
    ease: 'out(3)',
    duration: 500,
  },
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

← Prev: **playbackEase** (`timeline/timeline-playback-settings/playbackease`) | Next: **onBegin** (`timeline/timeline-callbacks/onbegin`) →
