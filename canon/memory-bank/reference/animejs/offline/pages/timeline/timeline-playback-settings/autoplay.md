---
{
  "order": 310,
  "section": "timeline",
  "path": "timeline-playback-settings/autoplay",
  "slug": "timeline/timeline-playback-settings/autoplay",
  "url": "https://animejs.com/documentation/timeline/timeline-playback-settings/autoplay",
  "title": "autoplay",
  "breadcrumb": [
    "Timeline",
    "Timeline playback settings",
    "autoplay"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "reversed",
    "slug": "timeline/timeline-playback-settings/reversed"
  },
  "next": {
    "title": "frameRate",
    "slug": "timeline/timeline-playback-settings/framerate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# autoplay

> Source: [https://animejs.com/documentation/timeline/timeline-playback-settings/autoplay](https://animejs.com/documentation/timeline/timeline-playback-settings/autoplay)
> Breadcrumb: Timeline → Timeline playback settings → autoplay

Timeline

                          
              
                Playback settings              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            autoplay                                              
        

          
        Defines the play mode of a timeline.

## Accepts

`Boolean` | `onScroll()`

- If set to `true` the timeline plays automatically

- If set to `false` the timeline has to be manually played

- If set to `onScroll()` the timeline will starts when the scroll thresholds conditions are met

## Default

`true`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.autoplay = false;
```

## Related

- [Scroll](https://animejs.com/documentation/events/onscroll)
- [scroll thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds)

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $paused ] = utils.$('.paused');
const [ $play ] = utils.$('.play');

const tl = createTimeline({
  autoplay: false,
  onUpdate: self => $paused.innerHTML = !!self.paused,
  onComplete: self => $paused.innerHTML = !!self.paused
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');

const playTl = () => tl.paused ? tl.restart() : tl.play();

$play.addEventListener('click', playTl);
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
    <span class="label">paused</span>
    <span class="paused value">true</span>
  </pre>
</div>
<div class="large row controls">
  <button class="play">Play</button>
</div>
```

---

← Prev: **reversed** (`timeline/timeline-playback-settings/reversed`) | Next: **frameRate** (`timeline/timeline-playback-settings/framerate`) →
