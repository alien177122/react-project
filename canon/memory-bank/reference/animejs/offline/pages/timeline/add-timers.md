---
{
  "order": 273,
  "section": "timeline",
  "path": "add-timers",
  "slug": "timeline/add-timers",
  "url": "https://animejs.com/documentation/timeline/add-timers",
  "title": "Add timers",
  "breadcrumb": [
    "Timeline",
    "Add timers"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Timeline",
    "slug": "timeline"
  },
  "next": {
    "title": "Add animations",
    "slug": "timeline/add-animations"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Add timers

> Source: [https://animejs.com/documentation/timeline/add-timers](https://animejs.com/documentation/timeline/add-timers)
> Breadcrumb: Timeline → Add timers

Timeline

                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Add timers                                              
        

          
        Timers can be added to a timeline using the `add()` method or the `sync()` method.

## Timer creation

Creates and adds a timer directly to the timeline using the `add()` method.

```js
timeline.add(parameters, position);
```

## Parameters

| Name | Accepts |
| --- | --- |
| parameters | An `Object` of Timer playback settings and Timer callbacks |
| position (opt) | Time position |

## Timer synchronisation

Synchronises an existing timer with the `sync()` method.

```js
timeline.sync(timer, position);
```

## Parameters

| Name | Accepts |
| --- | --- |
| timer | Timer |
| position (opt) | Time position |

## Returns

The timeline itself

Can be chained with other timeline methods.

## Related

- [add()](https://animejs.com/documentation/timeline/timeline-methods/add)
- [sync()](https://animejs.com/documentation/timeline/timeline-methods/sync)

## Code example (js)

```js
import { createTimeline, createTimer, utils } from 'animejs';

const [ $timer01, $timer02, $timer03 ] = utils.$('.timer');

const timer1 = createTimer({
  duration: 1500,
  onUpdate: self => $timer01.innerHTML = self.currentTime,
});

const tl = createTimeline()
.sync(timer1)
.add({
  duration: 500,
  onUpdate: self => $timer02.innerHTML = self.currentTime,
})
.add({
  onUpdate: self => $timer03.innerHTML = self.currentTime,
  duration: 1000
});
```

## Code example (html)

```html
<div class="large centered row">
  <div class="col">
    <pre class="large log row">
      <span class="label">timer 01</span>
      <span class="timer value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">timer 02</span>
      <span class="timer value lcd">0</span>
    </pre>
  </div>
  <div class="col">
    <pre class="large log row">
      <span class="label">timer 03</span>
      <span class="timer value lcd">0</span>
    </pre>
  </div>
</div>
```

---

← Prev: **Timeline** (`timeline`) | Next: **Add animations** (`timeline/add-animations`) →
