---
{
  "order": 50,
  "section": "animation",
  "path": "animation-playback-settings/persist",
  "slug": "animation/animation-playback-settings/persist",
  "url": "https://animejs.com/documentation/animation/animation-playback-settings/persist",
  "title": "persist",
  "breadcrumb": [
    "Animation",
    "Animation playback settings"
  ],
  "since": "Since 4.2.0",
  "prev": {
    "title": "playbackEase",
    "slug": "animation/animation-playback-settings/playbackease"
  },
  "next": {
    "title": "Animation callbacks",
    "slug": "animation/animation-callbacks"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# persist

> Source: [https://animejs.com/documentation/animation/animation-playback-settings/persist](https://animejs.com/documentation/animation/animation-playback-settings/persist)
> Breadcrumb: Animation → Animation playback settings

Animation

                          
              
                Playback settings              
                      

          
                        Since 4.2.0
                      

        
                

## 
          
            persist                        WAAPI                      
        

          
        By default, WAAPI animations are automatically canceled and released from memory when they complete. This is necessary to prevent animations from running forever and causing potential memory leaks.

This behavior can causes issues when using methods on a completed WAAPI animation, since the animation won't be active anymore.

The `persist` parameter solves that, and keeps the animation active when it completes.

## Accepts

`Boolean`

## Default

`false`

For scroll-controlled WAAPI animations, the `persist` parameter is automatically set to `true`.

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.persist = true;
```

## Related

- [methods](https://animejs.com/documentation/animation/animation-methods)

## Code example (js)

```js
import { waapi, utils } from 'animejs';

const [ $button ] = utils.$('.button');

const animationA = waapi.animate('.square-a', {
  x: '17rem',
  persist: false, // default
});

const animationB = waapi.animate('.square-b', {
  x: '17rem',
  persist: true,
});

const alaternateAnimations = () => {
  animationA.alternate().resume();
  animationB.alternate().resume();
};

$button.addEventListener('click', alaternateAnimations);
```

## Code example (html)

```html
<div class="medium row">
  <div class="square square-a"></div>
  <div class="padded label">persist: false</div>
</div>
<div class="medium row">
  <div class="square square-b"></div>
  <div class="padded label">persist: true</div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

---

← Prev: **playbackEase** (`animation/animation-playback-settings/playbackease`) | Next: **Animation callbacks** (`animation/animation-callbacks`) →
