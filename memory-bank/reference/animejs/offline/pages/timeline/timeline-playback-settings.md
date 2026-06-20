---
{
  "order": 308,
  "section": "timeline",
  "path": "timeline-playback-settings",
  "slug": "timeline/timeline-playback-settings",
  "url": "https://animejs.com/documentation/timeline/timeline-playback-settings",
  "title": "Timeline playback settings",
  "breadcrumb": [
    "Timeline",
    "Timeline playback settings"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Time position",
    "slug": "timeline/time-position"
  },
  "next": {
    "title": "defaults",
    "slug": "timeline/timeline-playback-settings/defaults"
  }
}
---

# Timeline playback settings

> Source: [https://animejs.com/documentation/timeline/timeline-playback-settings](https://animejs.com/documentation/timeline/timeline-playback-settings)
> Breadcrumb: Timeline → Timeline playback settings

Timeline

                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Timeline playback settings                                              
        

          
        Specify the timings and behaviours of a timeline.

Timeline playback settings are defined directly in the `createTimeline()` parameters `Object`.

```js
createTimeline({
┌───────────────────┐
│ defaults: {       │
│   ease: 'out(3)', │
│   duration: 500,  │
│ },                ├─ Playback Settings
│ loop: 3,          │
│ alternate: true,  │
│ autoplay: false,  │
└───────────────────┘
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

---

← Prev: **Time position** (`timeline/time-position`) | Next: **defaults** (`timeline/timeline-playback-settings/defaults`) →
