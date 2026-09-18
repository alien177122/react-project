---
{
  "order": 165,
  "section": "events",
  "path": "onscroll/scrollobserver-settings",
  "slug": "events/onscroll/scrollobserver-settings",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-settings",
  "title": "ScrollObserver settings",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver settings"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "onScroll",
    "slug": "events/onscroll"
  },
  "next": {
    "title": "container",
    "slug": "events/onscroll/scrollobserver-settings/container"
  }
}
---

# ScrollObserver settings

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-settings](https://animejs.com/documentation/events/onscroll/scrollobserver-settings)
> Breadcrumb: Events → onScroll → ScrollObserver settings

Events

                          
              
                onScroll              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            ScrollObserver settings                                              
        

          
        ScrollObserver settings properties are defined directly in the `onScroll()` parameters `Object`.

```js
animate('.square', {
  x: 100,
  autoplay: onScroll({
  ┌──────────────────────────┐
  │ container: '.container', │
  │ target: '.section',      ├─ Settings
  │ axis: 'y',               │
  └──────────────────────────┘
    enter: 'bottom top',
    leave: 'top bottom',
    sync: true,
    onEnter: () => {},
    onLeave: () => {},
    onUpdate: () => {},
  })
});
```

---

← Prev: **onScroll** (`events/onscroll`) | Next: **container** (`events/onscroll/scrollobserver-settings/container`) →
