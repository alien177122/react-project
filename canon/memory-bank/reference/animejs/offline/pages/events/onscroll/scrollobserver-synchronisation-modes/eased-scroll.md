---
{
  "order": 172,
  "section": "events",
  "path": "onscroll/scrollobserver-synchronisation-modes/eased-scroll",
  "slug": "events/onscroll/scrollobserver-synchronisation-modes/eased-scroll",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/eased-scroll",
  "title": "Eased scroll",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver synchronisation modes",
    "Eased scroll"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Smooth scroll",
    "slug": "events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll"
  },
  "next": {
    "title": "ScrollObserver callbacks",
    "slug": "events/onscroll/scrollobserver-callbacks"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Eased scroll

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/eased-scroll](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/eased-scroll)
> Breadcrumb: Events → onScroll → ScrollObserver synchronisation modes → Eased scroll

Events

                          
              
                onScroll              
                          
              
                Synchronisation modes              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Eased scroll                                              
        

          
        Applies an easing function to the synchronised playback progress of the linked object relative to the scroll position.

## Accepts

ease

## Related

- [ease](https://animejs.com/documentation/animation/tween-parameters/ease)

## Code example (js)

```js
import { animate, stagger, onScroll } from 'animejs';

animate('.square', {
  x: '12rem',
  rotate: '1turn',
  ease: 'linear',
  delay: stagger(100, { from: 'last' }),
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: 'inOutCirc',
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
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

← Prev: **Smooth scroll** (`events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll`) | Next: **ScrollObserver callbacks** (`events/onscroll/scrollobserver-callbacks`) →
