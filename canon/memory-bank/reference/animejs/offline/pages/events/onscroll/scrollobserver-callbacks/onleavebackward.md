---
{
  "order": 155,
  "section": "events",
  "path": "onscroll/scrollobserver-callbacks/onleavebackward",
  "slug": "events/onscroll/scrollobserver-callbacks/onleavebackward",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleavebackward",
  "title": "onLeaveBackward",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver callbacks",
    "onLeaveBackward"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onLeaveForward",
    "slug": "events/onscroll/scrollobserver-callbacks/onleaveforward"
  },
  "next": {
    "title": "onUpdate",
    "slug": "events/onscroll/scrollobserver-callbacks/onupdate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onLeaveBackward

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleavebackward](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleavebackward)
> Breadcrumb: Events → onScroll → ScrollObserver callbacks → onLeaveBackward

Events

                          
              
                onScroll              
                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onLeaveBackward                                              
        

          
        Triggers a function every time the `leave` threshold is met by scrolling backward.

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
    onLeaveBackward: () => $value.textContent = ++exits,
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

← Prev: **onLeaveForward** (`events/onscroll/scrollobserver-callbacks/onleaveforward`) | Next: **onUpdate** (`events/onscroll/scrollobserver-callbacks/onupdate`) →
