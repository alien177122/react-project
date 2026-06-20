---
{
  "order": 53,
  "section": "animation",
  "path": "animation-playback-settings/playbackrate",
  "slug": "animation/animation-playback-settings/playbackrate",
  "url": "https://animejs.com/documentation/animation/animation-playback-settings/playbackrate",
  "title": "playbackRate",
  "breadcrumb": [
    "Animation",
    "Animation playback settings",
    "playbackRate"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "frameRate",
    "slug": "animation/animation-playback-settings/framerate"
  },
  "next": {
    "title": "playbackEase",
    "slug": "animation/animation-playback-settings/playbackease"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# playbackRate

> Source: [https://animejs.com/documentation/animation/animation-playback-settings/playbackrate](https://animejs.com/documentation/animation/animation-playback-settings/playbackrate)
> Breadcrumb: Animation → Animation playback settings → playbackRate

Animation

                          
              
                Playback settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            playbackRate                                              
        

          
        Defines a speed multiplier to speed up or slow down an animation.

This value can be modified later with `animation.speed = .5`.

## Accepts

A `Number` greater than or equal to `0`

If set to `0` the animation won't play.

## Default

`1`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.playbackRate = .75;
```

## Code example (js)

```js
import { animate, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $speed ] = utils.$('.speed');

const animation = animate('.circle', {
  x: '16rem',
  loop: true,
  alternate: true,
  playbackRate: 1,
});

const updateSpeed = () => {
  const { value } = $range;
  $speed.innerHTML = utils.roundPad(+value, 2);
  utils.sync(() => animation.speed = value);
}

$range.addEventListener('input', updateSpeed);
```

## Code example (html)

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">speed</span>
    <span class="speed value">1.00</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=5 value=1 step=.01 class="range" />
  </fieldset>
</div>
```

---

← Prev: **frameRate** (`animation/animation-playback-settings/framerate`) | Next: **playbackEase** (`animation/animation-playback-settings/playbackease`) →
