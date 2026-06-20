---
{
  "order": 178,
  "section": "events",
  "path": "onscroll/scrollobserver-thresholds/numeric-values",
  "slug": "events/onscroll/scrollobserver-thresholds/numeric-values",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/numeric-values",
  "title": "Numeric values",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver thresholds",
    "Numeric values"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "ScrollObserver thresholds",
    "slug": "events/onscroll/scrollobserver-thresholds"
  },
  "next": {
    "title": "Positions shorthands",
    "slug": "events/onscroll/scrollobserver-thresholds/positions-shorthands"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Numeric values

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/numeric-values](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/numeric-values)
> Breadcrumb: Events → onScroll → ScrollObserver thresholds → Numeric values

Events

                          
              
                onScroll              
                          
              
                Thresholds              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Numeric values                                              
        

          
        Defines an offset from the top of the target and container by passing a numeric values.

If no unit is defined, the values is interpreted as pixels.

## Accepts

| Type | Example | Description |
| --- | --- | --- |
| Number | `100` | 100px from the top of the target or container |
| Unit | `'1rem'` | 1rem from the top of the target or container |
| Percentage | `'10%'` | 10% of the target or container height, from the top of the target or container |

## Default unit

`px`

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
    // 80% from the top of the container, -50px from the top of the target 
    enter: '80% 20%',
    // 50px from the top of the container, 100px from the top of the target
    leave: '50 -25',
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

← Prev: **ScrollObserver thresholds** (`events/onscroll/scrollobserver-thresholds`) | Next: **Positions shorthands** (`events/onscroll/scrollobserver-thresholds/positions-shorthands`) →
