---
{
  "order": 151,
  "section": "events",
  "path": "onscroll/scrollobserver-callbacks/onenter",
  "slug": "events/onscroll/scrollobserver-callbacks/onenter",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenter",
  "title": "onEnter",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver callbacks",
    "onEnter"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "ScrollObserver callbacks",
    "slug": "events/onscroll/scrollobserver-callbacks"
  },
  "next": {
    "title": "onEnterForward",
    "slug": "events/onscroll/scrollobserver-callbacks/onenterforward"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onEnter

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenter](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenter)
> Breadcrumb: Events → onScroll → ScrollObserver callbacks → onEnter

Events

                          
              
                onScroll              
                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onEnter                                              
        

          
        Triggers a function every time the `enter` threshold is met.

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
    onEnter: () => $value.textContent = ++entered,
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

← Prev: **ScrollObserver callbacks** (`events/onscroll/scrollobserver-callbacks`) | Next: **onEnterForward** (`events/onscroll/scrollobserver-callbacks/onenterforward`) →
