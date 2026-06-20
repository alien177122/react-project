---
{
  "order": 154,
  "section": "events",
  "path": "onscroll/scrollobserver-callbacks/onleave",
  "slug": "events/onscroll/scrollobserver-callbacks/onleave",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleave",
  "title": "onLeave",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver callbacks",
    "onLeave"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onEnterBackward",
    "slug": "events/onscroll/scrollobserver-callbacks/onenterbackward"
  },
  "next": {
    "title": "onLeaveForward",
    "slug": "events/onscroll/scrollobserver-callbacks/onleaveforward"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onLeave

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleave](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleave)
> Breadcrumb: Events → onScroll → ScrollObserver callbacks → onLeave

Events

                          
              
                onScroll              
                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onLeave                                              
        

          
        Triggers a function every time the `leave` threshold is met.

## Accepts

A `Function` whose first argument is the ScrollObserver instance

## Default

`noop`

## Related

- [threshold](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds)

## Code example (js)

```js
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let exits = 0;

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
    onLeave: () => $value.textContent = ++exits,
  })
});
```

## Code example (html)

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded sticky">
      <div class="large row">
        <pre class="large log row">
          <span class="label">exits</span>
          <span class="value">0</span>
        </pre>
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

← Prev: **onEnterBackward** (`events/onscroll/scrollobserver-callbacks/onenterbackward`) | Next: **onLeaveForward** (`events/onscroll/scrollobserver-callbacks/onleaveforward`) →
