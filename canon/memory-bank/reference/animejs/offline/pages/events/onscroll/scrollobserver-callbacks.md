---
{
  "order": 150,
  "section": "events",
  "path": "onscroll/scrollobserver-callbacks",
  "slug": "events/onscroll/scrollobserver-callbacks",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks",
  "title": "ScrollObserver callbacks",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver callbacks"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "Eased scroll",
    "slug": "events/onscroll/scrollobserver-synchronisation-modes/eased-scroll"
  },
  "next": {
    "title": "onEnter",
    "slug": "events/onscroll/scrollobserver-callbacks/onenter"
  }
}
---

# ScrollObserver callbacks

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks)
> Breadcrumb: Events → onScroll → ScrollObserver callbacks

Events

                          
              
                onScroll              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            ScrollObserver callbacks                                              
        

          
        Triggers functions at specific points during scroll.

`ScrollObserver` callbacks functions are defined directly in the `onScroll()` parameters object.

```js
animate('.square', {
  x: 100,
  autoplay: onScroll({
    container: '.container',
    target: '.section',
    axis: 'y',
    enter: 'bottom top',
    leave: 'top bottom',
    sync: true,
┌──────────────────────────┐
│   onEnter: () => {},     │
│   onLeave: () => {},     ├─ Callbacks
│   onUpdate: () => {},    │
└──────────────────────────┘
  })
});
```

---

← Prev: **Eased scroll** (`events/onscroll/scrollobserver-synchronisation-modes/eased-scroll`) | Next: **onEnter** (`events/onscroll/scrollobserver-callbacks/onenter`) →
