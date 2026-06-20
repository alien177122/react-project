---
{
  "order": 166,
  "section": "events",
  "path": "onscroll/scrollobserver-settings/axis",
  "slug": "events/onscroll/scrollobserver-settings/axis",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-settings/axis",
  "title": "axis",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver settings",
    "axis"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "debug",
    "slug": "events/onscroll/scrollobserver-settings/debug"
  },
  "next": {
    "title": "repeat",
    "slug": "events/onscroll/scrollobserver-settings/repeat"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# axis

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-settings/axis](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/axis)
> Breadcrumb: Events → onScroll → ScrollObserver settings → axis

Events

                          
              
                onScroll              
                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            axis                                              
        

          
        Specifies the scroll direction of the ScrollObserver container `HTMLElement`.

## Accepts

- `'x'`

- `'y'`

## Defaults

`'y'`

## Code example (js)

```js
import { animate, utils, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    axis: 'x',
  })
});
```

## Code example (html)

```html
<div class="scroll-container scroll-x">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll right →</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
  </div>
</div>
```

## Code example (css)

```css
#scroll-onscroll-settings-target pre {
  left: 3rem;
  width: 12rem;
}
```

---

← Prev: **debug** (`events/onscroll/scrollobserver-settings/debug`) | Next: **repeat** (`events/onscroll/scrollobserver-settings/repeat`) →
