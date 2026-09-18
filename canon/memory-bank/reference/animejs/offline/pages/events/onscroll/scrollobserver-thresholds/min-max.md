---
{
  "order": 177,
  "section": "events",
  "path": "onscroll/scrollobserver-thresholds/min-max",
  "slug": "events/onscroll/scrollobserver-thresholds/min-max",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/min-max",
  "title": "Min max",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver thresholds",
    "Min max"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Relative position values",
    "slug": "events/onscroll/scrollobserver-thresholds/relative-position-values"
  },
  "next": {
    "title": "ScrollObserver synchronisation modes",
    "slug": "events/onscroll/scrollobserver-synchronisation-modes"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Min max

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/min-max](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/min-max)
> Breadcrumb: Events → onScroll → ScrollObserver thresholds → Min max

Events

                          
              
                onScroll              
                          
              
                Thresholds              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Min max                                              
        

          
        Defines a threshold in the minimum or maximum scrollable space available. This is particularly useful in cases where some of the targeted elements initial position are either too small or too big to triggers `enter` and `leave` conditions.

## Accepts

| Value | Description |
| --- | --- |
| `'min'` | The minimum value possible to meet the enter or leave condition |
| `'max'` | The maximum value possible to meet the enter or leave condition |

## Code example (js)

```js
import { animate, onScroll, utils } from 'animejs';

utils.$('.square').forEach($square => {
  animate($square, {
    x: '15rem',
    rotate: '1turn',
    duration: 2000,
    alternate: true,
    ease: 'inOutQuad',
    autoplay: onScroll({
      container: '.scroll-container',
      sync: 1,
      enter: 'max bottom',
      leave: 'min top',
      debug: true
    })
  });
});
```

## Code example (html)

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
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

← Prev: **Relative position values** (`events/onscroll/scrollobserver-thresholds/relative-position-values`) | Next: **ScrollObserver synchronisation modes** (`events/onscroll/scrollobserver-synchronisation-modes`) →
