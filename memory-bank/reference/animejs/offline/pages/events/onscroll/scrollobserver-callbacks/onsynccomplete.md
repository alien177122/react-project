---
{
  "order": 158,
  "section": "events",
  "path": "onscroll/scrollobserver-callbacks/onsynccomplete",
  "slug": "events/onscroll/scrollobserver-callbacks/onsynccomplete",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onsynccomplete",
  "title": "onSyncComplete",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver callbacks",
    "onSyncComplete"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onUpdate",
    "slug": "events/onscroll/scrollobserver-callbacks/onupdate"
  },
  "next": {
    "title": "onResize",
    "slug": "events/onscroll/scrollobserver-callbacks/onresize"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onSyncComplete

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onsynccomplete](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onsynccomplete)
> Breadcrumb: Events → onScroll → ScrollObserver callbacks → onSyncComplete

Events

                          
              
                onScroll              
                          
              
                Callbacks              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            onSyncComplete                                              
        

          
        Triggers a function when the linked object synchronisation completes.

## Accepts

A `Function` whose first argument is the ScrollObserver instance

## Default

`noop`

## Code example (js)

```js
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let completions = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom top',
    leave: 'center bottom',
    sync: .5,
    debug: true,
    onSyncComplete: () => $value.textContent = ++completions,
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
          <span class="label">completions</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section"></div>
  </div>
</div>
```

---

← Prev: **onUpdate** (`events/onscroll/scrollobserver-callbacks/onupdate`) | Next: **onResize** (`events/onscroll/scrollobserver-callbacks/onresize`) →
