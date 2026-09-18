---
{
  "order": 159,
  "section": "events",
  "path": "onscroll/scrollobserver-callbacks/onupdate",
  "slug": "events/onscroll/scrollobserver-callbacks/onupdate",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onupdate",
  "title": "onUpdate",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver callbacks",
    "onUpdate"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onLeaveBackward",
    "slug": "events/onscroll/scrollobserver-callbacks/onleavebackward"
  },
  "next": {
    "title": "onSyncComplete",
    "slug": "events/onscroll/scrollobserver-callbacks/onsynccomplete"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onUpdate

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onupdate](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onupdate)
> Breadcrumb: Events → onScroll → ScrollObserver callbacks → onUpdate

Events

                          
              
                onScroll              
                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onUpdate                                              
        

          
        Triggers a function every time the linked object progress updates during scroll synchronisation.

## Accepts

A `Function` whose first argument is the ScrollObserver instance

## Default

`noop`

## Code example (js)

```js
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let updates = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: .5,
    debug: true,
    onUpdate: () => $value.textContent = ++updates,
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
          <span class="label">updates</span>
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

← Prev: **onLeaveBackward** (`events/onscroll/scrollobserver-callbacks/onleavebackward`) | Next: **onSyncComplete** (`events/onscroll/scrollobserver-callbacks/onsynccomplete`) →
