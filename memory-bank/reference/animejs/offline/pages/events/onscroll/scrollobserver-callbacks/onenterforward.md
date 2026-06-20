---
{
  "order": 153,
  "section": "events",
  "path": "onscroll/scrollobserver-callbacks/onenterforward",
  "slug": "events/onscroll/scrollobserver-callbacks/onenterforward",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenterforward",
  "title": "onEnterForward",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver callbacks",
    "onEnterForward"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onEnter",
    "slug": "events/onscroll/scrollobserver-callbacks/onenter"
  },
  "next": {
    "title": "onEnterBackward",
    "slug": "events/onscroll/scrollobserver-callbacks/onenterbackward"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onEnterForward

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenterforward](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenterforward)
> Breadcrumb: Events → onScroll → ScrollObserver callbacks → onEnterForward

Events

                          
              
                onScroll              
                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onEnterForward                                              
        

          
        Triggers a function every time the `enter` threshold is met by scrolling forward.

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

let entered = 0;

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
    onEnterForward: () => $value.textContent = ++entered,
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
          <span class="label">entered</span>
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

← Prev: **onEnter** (`events/onscroll/scrollobserver-callbacks/onenter`) | Next: **onEnterBackward** (`events/onscroll/scrollobserver-callbacks/onenterbackward`) →
