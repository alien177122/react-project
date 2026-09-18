---
{
  "order": 316,
  "section": "timeline",
  "path": "timeline-playback-settings/playbackease",
  "slug": "timeline/timeline-playback-settings/playbackease",
  "url": "https://animejs.com/documentation/timeline/timeline-playback-settings/playbackease",
  "title": "playbackEase",
  "breadcrumb": [
    "Timeline",
    "Timeline playback settings",
    "playbackEase"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "playbackRate",
    "slug": "timeline/timeline-playback-settings/playbackrate"
  },
  "next": {
    "title": "Timeline callbacks",
    "slug": "timeline/timeline-callbacks"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# playbackEase

> Source: [https://animejs.com/documentation/timeline/timeline-playback-settings/playbackease](https://animejs.com/documentation/timeline/timeline-playback-settings/playbackease)
> Breadcrumb: Timeline → Timeline playback settings → playbackEase

Timeline

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            playbackEase                                              
        

          
        Applies and easing function to the entire playback of the timeline.

```text
0 ──────────playbackEase──────────› 1
A ──ease──› B ──ease──› C ──ease──› D
```

## Accepts

ease

## Default

`null`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.playbackEase = 'inOut';
```

## Related

- [ease](https://animejs.com/documentation/animation/tween-parameters/ease)

## Code example (js)

```js
import { createTimeline } from 'animejs';

const tl = createTimeline({
  playbackEase: 'inOut(3)', // this ease is applied across all children
})
.add('.circle', { x: '15rem', ease: 'out(1)' })
.add('.triangle', { x: '15rem', ease: 'out(2)' })
.add('.square', { x: '15rem', ease: 'out(3)' });
```

## Code example (html)

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

---

← Prev: **playbackRate** (`timeline/timeline-playback-settings/playbackrate`) | Next: **Timeline callbacks** (`timeline/timeline-callbacks`) →
