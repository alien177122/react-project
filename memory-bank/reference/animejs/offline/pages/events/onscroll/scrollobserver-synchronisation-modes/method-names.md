---
{
  "order": 173,
  "section": "events",
  "path": "onscroll/scrollobserver-synchronisation-modes/method-names",
  "slug": "events/onscroll/scrollobserver-synchronisation-modes/method-names",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/method-names",
  "title": "Method names",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver synchronisation modes",
    "Method names"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "ScrollObserver synchronisation modes",
    "slug": "events/onscroll/scrollobserver-synchronisation-modes"
  },
  "next": {
    "title": "Playback progress",
    "slug": "events/onscroll/scrollobserver-synchronisation-modes/playback-progress"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Method names

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/method-names](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/method-names)
> Breadcrumb: Events → onScroll → ScrollObserver synchronisation modes → Method names

Events

                          
              
                onScroll              
                          
              
                Synchronisation modes              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            Method names                                              
        

          
        Defines a list of method names of the linked `Object` to be called when specific callbacks are triggered.

## Accepts

A `String` containing a list of Animation methods, Timer methods or Timeline methods names separated by an empty space

## Callbacks definition order

## `'enter'`

Defines a method to be triggered when the enter threshold is crossed or when the element re-enters the viewport.

```js
{
  sync: 'play',
}
```

## `'enter leave'`

Defines methods to be triggered when the enter and leave thresholds are crossed.

```js
{
  sync: 'play pause',
}
```

## `'enterForward leaveForward enterBackward leaveBackward'`

Defines methods to be triggered when the enter and leave thresholds are crossed when scrolling forward and when the enter and leave thresholds are crossed when scrolling backward.

```js
{
  sync: 'play pause reverse reset',
}
```

## Default

`'play pause'`

## Related

- [callbacks](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks)
- [Animation methods](https://animejs.com/documentation/animation/animation-methods)
- [Timer methods](https://animejs.com/documentation/timer/timer-methods)

## Code example (js)

```js
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: 'resume pause reverse reset',
    debug: true
  })
});
```

## Code example (html)

```html
<div class="scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
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

← Prev: **ScrollObserver synchronisation modes** (`events/onscroll/scrollobserver-synchronisation-modes`) | Next: **Playback progress** (`events/onscroll/scrollobserver-synchronisation-modes/playback-progress`) →
