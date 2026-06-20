---
{
  "order": 48,
  "section": "animation",
  "path": "animation-playback-settings/framerate",
  "slug": "animation/animation-playback-settings/framerate",
  "url": "https://animejs.com/documentation/animation/animation-playback-settings/framerate",
  "title": "frameRate",
  "breadcrumb": [
    "Animation",
    "Animation playback settings"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "autoplay",
    "slug": "animation/animation-playback-settings/autoplay"
  },
  "next": {
    "title": "playbackRate",
    "slug": "animation/animation-playback-settings/playbackrate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# frameRate

> Source: [https://animejs.com/documentation/animation/animation-playback-settings/framerate](https://animejs.com/documentation/animation/animation-playback-settings/framerate)
> Breadcrumb: Animation → Animation playback settings

Animation

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            frameRate                                    JS          
        

          
        Determines the number of frames per second (fps) an animation is played at.

This value can be modified later with `animation.fps = 30`.

## Accepts

A `Number` greater than `0`

The frame rate is capped to the monitor refresh rate or in some cases by the browser itself.

## Default

`120`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.frameRate = 30;
```

## Code example (js)

```js
import { animate } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $fps ] = utils.$('.fps');

const animation = animate('.circle', {
  x: '16rem',
  loop: true,
  alternate: true,
  frameRate: 60,
});

const updateFps = () => {
  const { value } = $range;
  $fps.innerHTML = value;
  animation.fps = value;
}

$range.addEventListener('input', updateFps);
```

## Code example (html)

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">fps</span>
    <span class="fps value">60</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=120 value=60 step=1 class="range" />
  </fieldset>
</div>
```

---

← Prev: **autoplay** (`animation/animation-playback-settings/autoplay`) | Next: **playbackRate** (`animation/animation-playback-settings/playbackrate`) →
