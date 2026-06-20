---
{
  "order": 175,
  "section": "events",
  "path": "onscroll/scrollobserver-synchronisation-modes/smooth-scroll",
  "slug": "events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll",
  "title": "Smooth scroll",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver synchronisation modes",
    "Smooth scroll"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Playback progress",
    "slug": "events/onscroll/scrollobserver-synchronisation-modes/playback-progress"
  },
  "next": {
    "title": "Eased scroll",
    "slug": "events/onscroll/scrollobserver-synchronisation-modes/eased-scroll"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Smooth scroll

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll)
> Breadcrumb: Events → onScroll → ScrollObserver synchronisation modes → Smooth scroll

Events

                          
              
                onScroll              
                          
              
                Synchronisation modes              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Smooth scroll                                              
        

          
        Smoothly animate the playback progress of the linked object to the scroll position by passing a value between `0` and `1`. The closer the value gets to `0`, the longer the animation takes to catch up with the current scroll position.

## Accepts

A `Number` greater than or equal to `0` and lower to or equal `1`

## Code example (js)

```js
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: .25,
    debug: true,
  })
});
```

## Code example (html)

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

← Prev: **Playback progress** (`events/onscroll/scrollobserver-synchronisation-modes/playback-progress`) | Next: **Eased scroll** (`events/onscroll/scrollobserver-synchronisation-modes/eased-scroll`) →
