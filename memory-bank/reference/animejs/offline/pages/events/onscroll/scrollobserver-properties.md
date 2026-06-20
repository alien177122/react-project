---
{
  "order": 164,
  "section": "events",
  "path": "onscroll/scrollobserver-properties",
  "slug": "events/onscroll/scrollobserver-properties",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-properties",
  "title": "ScrollObserver properties",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver properties"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "revert()",
    "slug": "events/onscroll/scrollobserver-methods/revert"
  },
  "next": {
    "title": "SVG",
    "slug": "svg"
  }
}
---

# ScrollObserver properties

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-properties](https://animejs.com/documentation/events/onscroll/scrollobserver-properties)
> Breadcrumb: Events → onScroll → ScrollObserver properties

Events

                          
              
                onScroll              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            ScrollObserver properties                                              
        

          
        Properties available on the `ScrollObserver` instance returned by an `onScroll()` function.

```js
const scrollObserver = onScroll(parameters);
               ┌───────┐
scrollObserver.│target │
scrollObserver.│linked ├─ Properties
scrollObserver.│repeat │
               └───────┘
```

| Name | Description |
| --- | --- |
| id | Gets the unique identifier for the ScrollObserver instance (`Number`) |
| container | Gets the scroll container associated with this observer (`ScrollContainer`) |
| target | Gets the target element being observed (`HTMLElement`) |
| linked | Gets the linked object (`Animation` \| `Timer` \| `Timeline`) |
| repeat | Gets whether the observer should repeat (`Boolean`) |
| horizontal | Gets whether the scroll direction is horizontal (`Boolean`) |
| enter | Gets the enter threshold (`String` \| `Number`) |
| leave | Gets and sets the leave threshold (`String` \| `Number`) |
| sync | Gets whether synchronisation is enabled (`Boolean`) |
| velocity | Gets the current scroll velocity (`Number`) |
| backward | Gets whether the scroll direction is backward (`Boolean`) |
| scroll | Gets the current scroll position (`Number`) |
| progress | Gets the current progress of the observed element (0 to 1) (`Number`) |
| completed | Gets whether the observation has completed (`Boolean`) |
| began | Gets whether the observation has begun (`Boolean`) |
| isInView | Gets whether the observed element is currently in view (`Boolean`) |
| offset | Gets the offset of the observed element (`Number`) |
| offsetStart | Gets the start offset of the observed element (`Number`) |
| offsetEnd | Gets the end offset of the observed element (`Number`) |
| distance | Gets the scroll distance for the observed element (`Number`) |

---

← Prev: **revert()** (`events/onscroll/scrollobserver-methods/revert`) | Next: **SVG** (`svg`) →
