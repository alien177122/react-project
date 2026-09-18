---
{
  "order": 174,
  "section": "events",
  "path": "onscroll/scrollobserver-synchronisation-modes/playback-progress",
  "slug": "events/onscroll/scrollobserver-synchronisation-modes/playback-progress",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/playback-progress",
  "title": "Playback progress",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver synchronisation modes",
    "Playback progress"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Method names",
    "slug": "events/onscroll/scrollobserver-synchronisation-modes/method-names"
  },
  "next": {
    "title": "Smooth scroll",
    "slug": "events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Playback progress

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/playback-progress](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/playback-progress)
> Breadcrumb: Events → onScroll → ScrollObserver synchronisation modes → Playback progress

Events

                          
              
                onScroll              
                          
              
                Synchronisation modes              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Playback progress                                              
        

          
        Perfectly synchronises the playback progress of the linked object to the scroll position by passing a value of either `true` or `1`.

## Accepts

- `1`

- `true`

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
    sync: true,
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

← Prev: **Method names** (`events/onscroll/scrollobserver-synchronisation-modes/method-names`) | Next: **Smooth scroll** (`events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll`) →
