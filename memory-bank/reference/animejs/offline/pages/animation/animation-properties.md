---
{
  "order": 55,
  "section": "animation",
  "path": "animation-properties",
  "slug": "animation/animation-properties",
  "url": "https://animejs.com/documentation/animation/animation-properties",
  "title": "Animation properties",
  "breadcrumb": [
    "Animation",
    "Animation properties"
  ],
  "prev": {
    "title": "refresh()",
    "slug": "animation/animation-methods/refresh"
  },
  "next": {
    "title": "Timeline",
    "slug": "timeline"
  }
}
---

# Animation properties

> Source: [https://animejs.com/documentation/animation/animation-properties](https://animejs.com/documentation/animation/animation-properties)
> Breadcrumb: Animation → Animation properties

Animation

                      

          
                      

        
                

## 
          
            Animation properties                                              
        

          
        Properties available on the `Animation` instance returned by the `animate()` and `waapi.animate()` functions.

```js
const animation = animate(targets, parameters);
          ┌────────────┐
animation.│targets     │
animation.│currentTime ├─ Properties
animation.│duration    │
          └────────────┘
```

Properties exclusive to the JS version of `animate()` are marked with a JS badge.

| Name | Description |
| --- | --- |
| id JS | Gets and sets the ID of the animation (`String` \| `Number`) |
| targets | Gets the current animation targets (`Array`) |
| currentTime | Gets and sets the global current time in ms of the animation (`Number`) |
| iterationCurrentTime JS | Gets and sets the current iteration time in ms (`Number`) |
| deltaTime JS | Gets the time in ms elapsed between the current and previous frame (`Number`) |
| progress | Gets and sets the overall progress of the animation from `0` to `1` (`Number`) |
| iterationProgress JS | Gets and sets the progress of the current iteration from `0` to `1` (`Number`) |
| currentIteration JS | Gets and sets the current iteration count (`Number`) |
| duration | Gets the total duration in ms of the animation (`Number`) |
| speed | Gets and sets the speed multiplier of the animation (`Number`) |
| fps JS | Gets and sets the fps of the animation (`Number`) |
| paused | Gets and sets whether the animation is paused (`Boolean`) |
| began JS | Gets and sets whether the animation has started (`Boolean`) |
| completed | Gets and sets whether the animation has completed (`Boolean`) |
| reversed JS | Gets and sets whether the animation is reversed (`Boolean`) |
| backwards JS | Gets whether the animation is currently playing backwards (`Boolean`) |

---

← Prev: **refresh()** (`animation/animation-methods/refresh`) | Next: **Timeline** (`timeline`) →
