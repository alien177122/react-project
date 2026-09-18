---
{
  "order": 179,
  "section": "events",
  "path": "onscroll/scrollobserver-thresholds/positions-shorthands",
  "slug": "events/onscroll/scrollobserver-thresholds/positions-shorthands",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/positions-shorthands",
  "title": "Positions shorthands",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver thresholds",
    "Positions shorthands"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Numeric values",
    "slug": "events/onscroll/scrollobserver-thresholds/numeric-values"
  },
  "next": {
    "title": "Relative position values",
    "slug": "events/onscroll/scrollobserver-thresholds/relative-position-values"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Positions shorthands

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/positions-shorthands](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/positions-shorthands)
> Breadcrumb: Events → onScroll → ScrollObserver thresholds → Positions shorthands

Events

                          
              
                onScroll              
                          
              
                Thresholds              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Positions shorthands                                              
        

          
        Defines the position of the target and container by passing the position name.

## Accepts

| Value | Returns |
| --- | --- |
| `'top'` | The top y value |
| `'bottom'` | The bottom y value |
| `'left'` | The left x value |
| `'right'` | The right x value |
| `'center'` | The center x or y value |
| `'start'` | Equivalent to `'top'` and `'left'` depending of the axis |
| `'end'` | Equivalent to `'bottom'` and `'right'` depending of the axis |

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
    container: '.scroll-container',
    enter: 'center top',
    leave: 'center bottom',
    debug: true
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
    <div class="scroll-section">
    </div>
  </div>
</div>
```

---

← Prev: **Numeric values** (`events/onscroll/scrollobserver-thresholds/numeric-values`) | Next: **Relative position values** (`events/onscroll/scrollobserver-thresholds/relative-position-values`) →
