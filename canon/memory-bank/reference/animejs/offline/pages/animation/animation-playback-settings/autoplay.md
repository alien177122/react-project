---
{
  "order": 45,
  "section": "animation",
  "path": "animation-playback-settings/autoplay",
  "slug": "animation/animation-playback-settings/autoplay",
  "url": "https://animejs.com/documentation/animation/animation-playback-settings/autoplay",
  "title": "autoplay",
  "breadcrumb": [
    "Animation",
    "Animation playback settings",
    "autoplay"
  ],
  "since": "Since 1.0.0",
  "prev": {
    "title": "reversed",
    "slug": "animation/animation-playback-settings/reversed"
  },
  "next": {
    "title": "frameRate",
    "slug": "animation/animation-playback-settings/framerate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# autoplay

> Source: [https://animejs.com/documentation/animation/animation-playback-settings/autoplay](https://animejs.com/documentation/animation/animation-playback-settings/autoplay)
> Breadcrumb: Animation → Animation playback settings → autoplay

Animation

                          
              
                Playback settings              
                      

          
                        Since 1.0.0
                      

        
                

## 
          
            autoplay                                              
        

          
        Defines the play mode of an animation.

The autoplay parameter has no effect when the animation is added to a timeline, and will be overridden to `false`.

## Accepts

`Boolean` | `onScroll()`

- If set to `true` the animation plays automatically

- If set to `false` the animation has to be manually played

- If set to `onScroll()` the animation will starts when the scroll thresholds conditions are met

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
animate('.autoplay-true', {
  x: '17rem',
  autoplay: true, // Default
});

animate('.autoplay-false', {
  x: '17rem',
  autoplay: false,
});
```

## Code example (html)

```html
<div class="medium row">
  <div class="circle autoplay-true"></div>
  <div class="padded label">autoplay: true</div>
</div>
<div class="medium row">
  <div class="circle autoplay-false"></div>
  <div class="padded label">autoplay: false</div>
</div>
```

---

← Prev: **reversed** (`animation/animation-playback-settings/reversed`) | Next: **frameRate** (`animation/animation-playback-settings/framerate`) →
