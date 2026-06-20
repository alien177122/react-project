---
{
  "order": 168,
  "section": "events",
  "path": "onscroll/scrollobserver-settings/debug",
  "slug": "events/onscroll/scrollobserver-settings/debug",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-settings/debug",
  "title": "debug",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver settings",
    "debug"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "target",
    "slug": "events/onscroll/scrollobserver-settings/target"
  },
  "next": {
    "title": "axis",
    "slug": "events/onscroll/scrollobserver-settings/axis"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# debug

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-settings/debug](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/debug)
> Breadcrumb: Events → onScroll → ScrollObserver settings → debug

Events

                          
              
                onScroll              
                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            debug                                              
        

          
        Displays markers to better visualise the `enter` and `leave` thresholds values.

Each ScrollObserver instances has a dedicated color.

The left side of the ruler represents the container threshold, and the right side the target threshold values.

## Accepts

`Boolean`

## Default

`false`

## Code example (js)

```js
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    debug: true,
  })
});
```

## Code example (html)

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll up</div>
      </div>
    </div>
  </div>
</div>
```

---

← Prev: **target** (`events/onscroll/scrollobserver-settings/target`) | Next: **axis** (`events/onscroll/scrollobserver-settings/axis`) →
