---
{
  "order": 167,
  "section": "events",
  "path": "onscroll/scrollobserver-settings/container",
  "slug": "events/onscroll/scrollobserver-settings/container",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-settings/container",
  "title": "container",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver settings",
    "container"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "ScrollObserver settings",
    "slug": "events/onscroll/scrollobserver-settings"
  },
  "next": {
    "title": "target",
    "slug": "events/onscroll/scrollobserver-settings/target"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# container

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-settings/container](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/container)
> Breadcrumb: Events → onScroll → ScrollObserver settings → container

Events

                          
              
                onScroll              
                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            container                                              
        

          
        Specifies the container `HTMLElement` to which the scroll event is applied.

## Accepts

- CSS Selector

- DOM Element

## Default

`null`

## Related

- [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector)
- [DOM Element](https://animejs.com/documentation/animation/targets/dom-elements)

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
    container: '.scroll-container'
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
  </div>
</div>
```

---

← Prev: **ScrollObserver settings** (`events/onscroll/scrollobserver-settings`) | Next: **target** (`events/onscroll/scrollobserver-settings/target`) →
