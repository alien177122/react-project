---
{
  "order": 311,
  "section": "timeline",
  "path": "timeline-playback-settings/defaults",
  "slug": "timeline/timeline-playback-settings/defaults",
  "url": "https://animejs.com/documentation/timeline/timeline-playback-settings/defaults",
  "title": "defaults",
  "breadcrumb": [
    "Timeline",
    "Timeline playback settings",
    "defaults"
  ],
  "since": "Since 2.0.0",
  "prev": {
    "title": "Timeline playback settings",
    "slug": "timeline/timeline-playback-settings"
  },
  "next": {
    "title": "delay",
    "slug": "timeline/timeline-playback-settings/delay"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# defaults

> Source: [https://animejs.com/documentation/timeline/timeline-playback-settings/defaults](https://animejs.com/documentation/timeline/timeline-playback-settings/defaults)
> Breadcrumb: Timeline → Timeline playback settings → defaults

Timeline

                          
              
                Playback settings              
                      

          
                        Since 2.0.0
                      

        
                

## 
          
            defaults                                              
        

          
        Defines defaults parameters for the timeline children.

## Accepts

An `Object` of Tween parameters (except from and to), Playback settings and Callbacks

## Related

- [Tween parameters](https://animejs.com/documentation/animation/tween-parameters)
- [from value](https://animejs.com/documentation/animation/tween-parameters/from)
- [to](https://animejs.com/documentation/animation/tween-parameters/to)
- [Animation playback settings](https://animejs.com/documentation/animation/animation-playback-settings)
- [Animation callbacks](https://animejs.com/documentation/animation/animation-callbacks)

## Code example (js)

```js
import { createTimeline } from 'animejs';

const tl = createTimeline({
  defaults: {
    ease: 'inOutExpo',
    duration: 500,
    loop: 2,
    reversed: true,
    alternate: true,
  }
})
.add('.square', { x: '15rem' })
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' });
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

← Prev: **Timeline playback settings** (`timeline/timeline-playback-settings`) | Next: **delay** (`timeline/timeline-playback-settings/delay`) →
