---
{
  "order": 180,
  "section": "events",
  "path": "onscroll/scrollobserver-thresholds/relative-position-values",
  "slug": "events/onscroll/scrollobserver-thresholds/relative-position-values",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/relative-position-values",
  "title": "Relative position values",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver thresholds",
    "Relative position values"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Positions shorthands",
    "slug": "events/onscroll/scrollobserver-thresholds/positions-shorthands"
  },
  "next": {
    "title": "Min max",
    "slug": "events/onscroll/scrollobserver-thresholds/min-max"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Relative position values

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/relative-position-values](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/relative-position-values)
> Breadcrumb: Events → onScroll → ScrollObserver thresholds → Relative position values

Events

                          
              
                onScroll              
                          
              
                Thresholds              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Relative position values                                              
        

          
        Defines position values relative to the target and container top coordinate using a a Relative value syntax.

## Accepts

| Prefix | Effect | Example |
| --- | --- | --- |
| `'+='` | Add | `'+=45'` |
| `'-='` | Subtracts | `'-=50%'` |
| `'*='` | Multiply | `'*=.5'` |

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
    enter: 'center+=1em top-=100%',
    leave: 'center-=1em bottom+=100%',
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

← Prev: **Positions shorthands** (`events/onscroll/scrollobserver-thresholds/positions-shorthands`) | Next: **Min max** (`events/onscroll/scrollobserver-thresholds/min-max`) →
