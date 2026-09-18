---
{
  "order": 317,
  "section": "timeline",
  "path": "timeline-playback-settings/playbackrate",
  "slug": "timeline/timeline-playback-settings/playbackrate",
  "url": "https://animejs.com/documentation/timeline/timeline-playback-settings/playbackrate",
  "title": "playbackRate",
  "breadcrumb": [
    "Timeline",
    "Timeline playback settings",
    "playbackRate"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "frameRate",
    "slug": "timeline/timeline-playback-settings/framerate"
  },
  "next": {
    "title": "playbackEase",
    "slug": "timeline/timeline-playback-settings/playbackease"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# playbackRate

> Source: [https://animejs.com/documentation/timeline/timeline-playback-settings/playbackrate](https://animejs.com/documentation/timeline/timeline-playback-settings/playbackrate)
> Breadcrumb: Timeline → Timeline playback settings → playbackRate

Timeline

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            playbackRate                                              
        

          
        Defines a speed multiplier to speed up or slow down a timeline.

This value can be modified later with `timeline.speed = .5`.

## Accepts

A `Number` greater than or equal to `0`

If set to `0` the timeline won't play.

## Default

`1`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.playbackRate = .75;
```

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $speed ] = utils.$('.speed');

const tl = createTimeline({
  playbackRate: 2,
  loop: true,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');

const updateSpeed = () => {
  const speed = utils.roundPad(+$range.value, 1);
  $speed.innerHTML = speed;
  utils.sync(() => tl.speed = speed);
}

$range.addEventListener('input', updateSpeed);
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
    <span class="label">speed</span>
    <span class="speed value">2.0</span>
  </pre>
</div>
<div class="large row">
  <fieldset class="controls">
    <input type="range" min=0 max=10 value=2 step=.1 class="range" />
  </fieldset>
</div>
```

---

← Prev: **frameRate** (`timeline/timeline-playback-settings/framerate`) | Next: **playbackEase** (`timeline/timeline-playback-settings/playbackease`) →
