---
{
  "order": 156,
  "section": "events",
  "path": "onscroll/scrollobserver-callbacks/onleaveforward",
  "slug": "events/onscroll/scrollobserver-callbacks/onleaveforward",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleaveforward",
  "title": "onLeaveForward",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver callbacks",
    "onLeaveForward"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onLeave",
    "slug": "events/onscroll/scrollobserver-callbacks/onleave"
  },
  "next": {
    "title": "onLeaveBackward",
    "slug": "events/onscroll/scrollobserver-callbacks/onleavebackward"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onLeaveForward

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleaveforward](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleaveforward)
> Breadcrumb: Events → onScroll → ScrollObserver callbacks → onLeaveForward

Events

                          
              
                onScroll              
                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onLeaveForward                                              
        

          
        Triggers a function every time the `leave` threshold is met by scrolling forward.

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
    onLeaveForward: () => $value.textContent = ++exits,
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

← Prev: **onLeave** (`events/onscroll/scrollobserver-callbacks/onleave`) | Next: **onLeaveBackward** (`events/onscroll/scrollobserver-callbacks/onleavebackward`) →
