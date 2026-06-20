---
{
  "order": 171,
  "section": "events",
  "path": "onscroll/scrollobserver-synchronisation-modes",
  "slug": "events/onscroll/scrollobserver-synchronisation-modes",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes",
  "title": "ScrollObserver synchronisation modes",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver synchronisation modes"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Min max",
    "slug": "events/onscroll/scrollobserver-thresholds/min-max"
  },
  "next": {
    "title": "Method names",
    "slug": "events/onscroll/scrollobserver-synchronisation-modes/method-names"
  }
}
---

# ScrollObserver synchronisation modes

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes)
> Breadcrumb: Events → onScroll → ScrollObserver synchronisation modes

Events

                          
              
                onScroll              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            ScrollObserver synchronisation modes                                              
        

          
        Determines the behaviour of the animation and how it is synchronised relative to the scroll progress or by meeting certain thresholds.

The different synchronisation modes are defined on the `sync` property of the `onScroll()` parameters `Object`.

```js
animate('.square', {
  x: 100,
  autoplay: onScroll({
    container: '.container',
    target: '.section',
    axis: 'y',
    enter: 'bottom top',
    leave: 'top bottom',
┌──────────────────────────┐
│   sync: true,            ├─ Synchronisation Mode
└──────────────────────────┘
    onEnter: () => {},
    onLeave: () => {},
    onUpdate: () => {},
  })
});
```

---

← Prev: **Min max** (`events/onscroll/scrollobserver-thresholds/min-max`) | Next: **Method names** (`events/onscroll/scrollobserver-synchronisation-modes/method-names`) →
