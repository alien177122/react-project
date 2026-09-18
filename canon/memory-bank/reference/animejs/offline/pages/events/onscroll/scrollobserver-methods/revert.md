---
{
  "order": 163,
  "section": "events",
  "path": "onscroll/scrollobserver-methods/revert",
  "slug": "events/onscroll/scrollobserver-methods/revert",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-methods/revert",
  "title": "revert()",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver methods",
    "revert()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "refresh()",
    "slug": "events/onscroll/scrollobserver-methods/refresh"
  },
  "next": {
    "title": "ScrollObserver properties",
    "slug": "events/onscroll/scrollobserver-properties"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# revert()

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-methods/revert](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/revert)
> Breadcrumb: Events → onScroll → ScrollObserver methods → revert()

Events

                          
              
                onScroll              
                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            revert()                                              
        

          
        Disables the ScrollObserver, removes all `EventListener` and removes the debug `HTMLElement` if necessary.

## Returns

The ScrollObserver itself

## Related

- [debug](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/debug)

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
    sync: 1,
    debug: true,
    onSyncComplete: self => self.revert()
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

← Prev: **refresh()** (`events/onscroll/scrollobserver-methods/refresh`) | Next: **ScrollObserver properties** (`events/onscroll/scrollobserver-properties`) →
