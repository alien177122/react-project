---
{
  "order": 319,
  "section": "timeline",
  "path": "timeline-properties",
  "slug": "timeline/timeline-properties",
  "url": "https://animejs.com/documentation/timeline/timeline-properties",
  "title": "Timeline properties",
  "breadcrumb": [
    "Timeline",
    "Timeline properties"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "refresh()",
    "slug": "timeline/timeline-methods/refresh"
  },
  "next": {
    "title": "Animatable",
    "slug": "animatable"
  }
}
---

# Timeline properties

> Source: [https://animejs.com/documentation/timeline/timeline-properties](https://animejs.com/documentation/timeline/timeline-properties)
> Breadcrumb: Timeline → Timeline properties

Timeline

                      

          
                        Since 2.0.0
                      

        
                

## 
          
            Timeline properties                                              
        

          
        Properties available on the `Timeline` instance returned by a `createTimeline()` function.

```js
const timeline = createTimeline(parameters);
         ┌────────────┐
timeline.│labels      │
timeline.│currentTime ├─ Properties
timeline.│duration    │
         └────────────┘
```

| Name | Description |
| --- | --- |
| id | Gets and sets the ID of the timeline (`String` \| `Number`) |
| labels | Gets and sets the map of time position labels of the timeline (`Object`) |
| currentTime | Gets and sets the global current time in ms of the timeline (`Number`) |
| iterationCurrentTime | Gets and sets the current iteration time in ms (`Number`) |
| deltaTime | Gets the time in ms elapsed between the current and previous frame (`Number`) |
| progress | Gets and sets the overall progress of the timeline from `0` to `1` (`Number`) |
| iterationProgress | Gets and sets the progress of the current iteration from `0` to `1` (`Number`) |
| currentIteration | Gets and sets the current iteration count (`Number`) |
| duration | Gets the total duration in ms of the timeline (`Number`) |
| speed | Gets and sets the speed multiplier of the timeline (`Number`) |
| fps | Gets and sets the fps of the timeline (`Number`) |
| paused | Gets and sets whether the timeline is paused (`Boolean`) |
| began | Gets and sets whether the timeline has started (`Boolean`) |
| completed | Gets and sets whether the timeline has completed (`Boolean`) |
| reversed | Gets and sets whether the timeline is reversed (`Boolean`) |
| backwards | Gets whether the timeline is currently playing backwards (`Boolean`) |

---

← Prev: **refresh()** (`timeline/timeline-methods/refresh`) | Next: **Animatable** (`animatable`) →
