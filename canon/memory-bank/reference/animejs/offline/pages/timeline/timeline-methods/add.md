---
{
  "order": 288,
  "section": "timeline",
  "path": "timeline-methods/add",
  "slug": "timeline/timeline-methods/add",
  "url": "https://animejs.com/documentation/timeline/timeline-methods/add",
  "title": "add()",
  "breadcrumb": [
    "Timeline",
    "Timeline methods",
    "add()"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Timeline methods",
    "slug": "timeline/timeline-methods"
  },
  "next": {
    "title": "set()",
    "slug": "timeline/timeline-methods/set"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# add()

> Source: [https://animejs.com/documentation/timeline/timeline-methods/add](https://animejs.com/documentation/timeline/timeline-methods/add)
> Breadcrumb: Timeline → Timeline methods → add()

Timeline

                          
              
                Methods              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            add()                                              
        

          
        Creates and adds animations and timers to a timeline.

The type of element added to the timeline depends of the parameters passed to `add()`.

## Add animation

```js
timeline.add(targets, parameters, position);
```

| Parameter | Accepts |
| --- | --- |
| targets | Targets |
| parameters | Animatable properties & Tween parameters & Animation playback settings & Animation callbacks |
| position (opt) | Time position |

## Add timer

```js
timeline.add(timerParameters, position);
```

| Parameter | Type |
| --- | --- |
| timerParameters | Timer playback settings & Timer callbacks |
| position (opt) | Time position |

## Returns

The timeline itself

Can be chained with other timeline methods.

## Related

- [Add animation](https://animejs.com/documentation/timeline/add-animations)
- [Add timer](https://animejs.com/documentation/timeline/add-timers)

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const tl = createTimeline()
// Add labels
.label('start timer 1', 0)
.label('animate circle', 1000)
.label('start timer 2', 2000)
// Add Timer
.add({
  duration: 1000,
  onUpdate: self => $value.innerHTML = self.currentTime,
}, 'start timer 1')
// Add Animation
.add('.circle', {
  duration: 2000,
  x: '16rem',
}, 'animate circle')
// Add Timer
.add({
  duration: 1000,
  onUpdate: self => $value.innerHTML = self.currentTime,
}, 'start timer 2');
```

## Code example (html)

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">value</span>
    <span class="value lcd">0</span>
  </pre>
</div>
```

---

← Prev: **Timeline methods** (`timeline/timeline-methods`) | Next: **set()** (`timeline/timeline-methods/set`) →
