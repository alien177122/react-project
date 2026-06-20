---
{
  "order": 161,
  "section": "events",
  "path": "onscroll/scrollobserver-methods/link",
  "slug": "events/onscroll/scrollobserver-methods/link",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-methods/link",
  "title": "link()",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver methods",
    "link()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "ScrollObserver methods",
    "slug": "events/onscroll/scrollobserver-methods"
  },
  "next": {
    "title": "refresh()",
    "slug": "events/onscroll/scrollobserver-methods/refresh"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# link()

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-methods/link](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/link)
> Breadcrumb: Events → onScroll → ScrollObserver methods → link()

Events

                          
              
                onScroll              
                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            link()                                              
        

          
        Connects an Animation, Timer or Timeline to a `ScrollObserver` instance.

This is equivalent to defining an `onScroll()` instance on the `autoplay` parameter.

Only one object can be linked at a time, every call to `link()` overrides the previously linked object.

## Accepts

Animation | Timer | Timeline

## Returns

The ScrollObserver itself

## Related

- [Animation](https://animejs.com/documentation/animation)
- [Timer](https://animejs.com/documentation/timer)
- [Timeline](https://animejs.com/documentation/timeline)

## Code example (js)

```js
import { animate, onScroll } from 'animejs';

const animation = animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
});

const scrollObserver = onScroll({
  container: '.scroll-container',
  enter: 'bottom-=50 top',
  leave: 'top+=60 bottom',
  sync: true,
  debug: true,
});

scrollObserver.link(animation);
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

← Prev: **ScrollObserver methods** (`events/onscroll/scrollobserver-methods`) | Next: **refresh()** (`events/onscroll/scrollobserver-methods/refresh`) →
