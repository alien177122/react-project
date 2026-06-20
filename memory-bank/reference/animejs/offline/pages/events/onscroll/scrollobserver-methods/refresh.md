---
{
  "order": 162,
  "section": "events",
  "path": "onscroll/scrollobserver-methods/refresh",
  "slug": "events/onscroll/scrollobserver-methods/refresh",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-methods/refresh",
  "title": "refresh()",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver methods",
    "refresh()"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "link()",
    "slug": "events/onscroll/scrollobserver-methods/link"
  },
  "next": {
    "title": "revert()",
    "slug": "events/onscroll/scrollobserver-methods/revert"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# refresh()

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-methods/refresh](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/refresh)
> Breadcrumb: Events → onScroll → ScrollObserver methods → refresh()

Events

                          
              
                onScroll              
                          
              
                Methods              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            refresh()                                              
        

          
        Updates the bounding values, and re-compute the Function based value of a ScrollObserver instance.

The following parameters can be refreshed when set with a Function based value:

- `repeat`

- `axis`

- `enter`

- `leave`

No need to call `.refresh()` when the container size changes, this is already handled internally.

## Returns

The ScrollObserver itself

## Related

- [Function based values](https://animejs.com/documentation/animation/tween-value-types/function-based)

## Code example (js)

```js
import { animate, onScroll, utils } from 'animejs';

const scrollSettings = {
  enter: 20,
  leave: 60,
}

const animation = animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: () => `bottom-=${scrollSettings.enter} top`,
    leave: () => `top+=${scrollSettings.leave} bottom`,
    sync: .5,
    debug: true,
  })
});

animate(scrollSettings, {
  enter: 90,
  leave: 100,
  loop: true,
  alternate: true,
  modifier: utils.round(0),
  onUpdate: () => animation._autoplay.refresh()
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

← Prev: **link()** (`events/onscroll/scrollobserver-methods/link`) | Next: **revert()** (`events/onscroll/scrollobserver-methods/revert`) →
