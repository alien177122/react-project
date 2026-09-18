---
{
  "order": 312,
  "section": "timeline",
  "path": "timeline-playback-settings/delay",
  "slug": "timeline/timeline-playback-settings/delay",
  "url": "https://animejs.com/documentation/timeline/timeline-playback-settings/delay",
  "title": "delay",
  "breadcrumb": [
    "Timeline",
    "Timeline playback settings",
    "delay"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "defaults",
    "slug": "timeline/timeline-playback-settings/defaults"
  },
  "next": {
    "title": "loop",
    "slug": "timeline/timeline-playback-settings/loop"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# delay

> Source: [https://animejs.com/documentation/timeline/timeline-playback-settings/delay](https://animejs.com/documentation/timeline/timeline-playback-settings/delay)
> Breadcrumb: Timeline → Timeline playback settings → delay

Timeline

                          
              
                Playback settings              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            delay                                              
        

          
        Defines the delay, in milliseconds, before the timeline starts.

## Accepts

A `Number` equal to or greater than `0`

## Default

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.delay = 500;
```

## Code example (js)

```js
import { createTimeline, createTimer, utils } from 'animejs';

const tl = createTimeline({
  delay: 2000,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');

// For logging delayed time only

const [ $time ] = utils.$('.time');

createTimer({
  duration: 2000 + tl.duration,
  onUpdate: self => $time.innerHTML = (2000 - self.currentTime) * -1,
});
```

## Code example (html)

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">current time</span>
    <span class="time value lcd">0</span>
  </pre>
</div>
```

---

← Prev: **defaults** (`timeline/timeline-playback-settings/defaults`) | Next: **loop** (`timeline/timeline-playback-settings/loop`) →
