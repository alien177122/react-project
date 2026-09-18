---
{
  "order": 318,
  "section": "timeline",
  "path": "timeline-playback-settings/reversed",
  "slug": "timeline/timeline-playback-settings/reversed",
  "url": "https://animejs.com/documentation/timeline/timeline-playback-settings/reversed",
  "title": "reversed",
  "breadcrumb": [
    "Timeline",
    "Timeline playback settings",
    "reversed"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "alternate",
    "slug": "timeline/timeline-playback-settings/alternate"
  },
  "next": {
    "title": "autoplay",
    "slug": "timeline/timeline-playback-settings/autoplay"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# reversed

> Source: [https://animejs.com/documentation/timeline/timeline-playback-settings/reversed](https://animejs.com/documentation/timeline/timeline-playback-settings/reversed)
> Breadcrumb: Timeline → Timeline playback settings → reversed

Timeline

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            reversed                                              
        

          
        Defines the initial direction of the timeline.

## Accepts

`Boolean`

- If set to `true` the animation plays backwards

- If set to `false` the animation plays forwards

## Default

`false`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.reversed = true;
```

## Code example (js)

```js
import { createTimeline, utils } from 'animejs';

const [ $time ] = utils.$('.time');

const tl = createTimeline({
  reversed: true,
  onUpdate: self => $time.innerHTML = self.currentTime
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');
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
    <span class="time value">0</span>
  </pre>
</div>
```

---

← Prev: **alternate** (`timeline/timeline-playback-settings/alternate`) | Next: **autoplay** (`timeline/timeline-playback-settings/autoplay`) →
