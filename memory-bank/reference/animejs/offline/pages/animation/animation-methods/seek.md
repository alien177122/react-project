---
{
  "order": 41,
  "section": "animation",
  "path": "animation-methods/seek",
  "slug": "animation/animation-methods/seek",
  "url": "https://animejs.com/documentation/animation/animation-methods/seek",
  "title": "seek()",
  "breadcrumb": [
    "Animation",
    "Animation methods",
    "seek()"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "reset()",
    "slug": "animation/animation-methods/reset"
  },
  "next": {
    "title": "stretch()",
    "slug": "animation/animation-methods/stretch"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# seek()

> Source: [https://animejs.com/documentation/animation/animation-methods/seek](https://animejs.com/documentation/animation/animation-methods/seek)
> Breadcrumb: Animation → Animation methods → seek()

Animation

                          
              
                Methods              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            seek()                                              
        

          
        Updates the `currentTime` of the animation and advances it to a specific time.

```js
animation.seek(time, muteCallbacks);
```

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| time | `Number` | The new `currentTime` in ms of the animation |
| muteCallbacks=false (opt) | `Boolean` | If `true`, prevent the callbacks from being fired |

## Returns

The animation itself

Can be chained with other animation methods.

## Code example (js)

```js
import { animate, utils, stagger } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $playPauseButton ] = utils.$('.play-pause');

const updateButtonLabel = animation => {
  $playPauseButton.textContent = animation.paused ? 'Play' : 'Pause';
}

const animation = animate('.square', {
  x: '17rem',
  ease: 'inOutSine',
  duration: 1750,
  delay: stagger(250),
  autoplay: false,
  onUpdate: self => {
    $range.value = self.currentTime;
    updateButtonLabel(self);
  },
  onComplete: updateButtonLabel,
});

const seekAnimation = () => animation.seek(+$range.value);

const playPauseAnimation = () => {
  if (animation.paused) {
    animation.play();
  } else {
    animation.pause();
    updateButtonLabel(animation);
  }
}

$range.addEventListener('input', seekAnimation);
$playPauseButton.addEventListener('click', playPauseAnimation);
```

## Code example (html)

```html
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium row">
  <div class="square"></div>
</div>
<div class="medium centered row">
  <fieldset class="controls">
    <input type="range" min=0 max=2000 value=0 class="range" />
    <button style="flex: 0.25;" class="button play-pause">Play</button>
  </fieldset>
</div>
```

---

← Prev: **reset()** (`animation/animation-methods/reset`) | Next: **stretch()** (`animation/animation-methods/stretch`) →
