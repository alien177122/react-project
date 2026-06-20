---
{
  "order": 157,
  "section": "events",
  "path": "onscroll/scrollobserver-callbacks/onresize",
  "slug": "events/onscroll/scrollobserver-callbacks/onresize",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onresize",
  "title": "onResize",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver callbacks",
    "onResize"
  ],
  "since": "Since 4.3.3",
  "prev": {
    "title": "onSyncComplete",
    "slug": "events/onscroll/scrollobserver-callbacks/onsynccomplete"
  },
  "next": {
    "title": "ScrollObserver methods",
    "slug": "events/onscroll/scrollobserver-methods"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# onResize

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onresize](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onresize)
> Breadcrumb: Events → onScroll → ScrollObserver callbacks → onResize

Events

                          
              
                onScroll              
                          
              
                Callbacks              
                      

          
                        Since 4.3.3
                      

        
                

## 
          
            onResize                                              
        

          
        Triggers a function when a ScrollObserver's container resizes.

## Accepts

A `Function` whose first argument is the ScrollObserver instance

## Default

`noop`

## Code example (js)

```js
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let resizes = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom top',
    leave: 'center bottom',
    sync: .5,
    onResize: () => $value.textContent = ++resizes,
  })
});
```

## Code example (html)

```html
<div class="iframe-content resizable">
  <div class="scroll-container scroll-y">
    <div class="scroll-content grid square-grid">
      <div class="scroll-section sticky">
        <div class="large row">
          <pre class="large log row">
            <span class="label">resize</span>
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
</div>
```

---

← Prev: **onSyncComplete** (`events/onscroll/scrollobserver-callbacks/onsynccomplete`) | Next: **ScrollObserver methods** (`events/onscroll/scrollobserver-methods`) →
