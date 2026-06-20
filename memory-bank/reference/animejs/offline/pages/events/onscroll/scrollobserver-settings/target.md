---
{
  "order": 170,
  "section": "events",
  "path": "onscroll/scrollobserver-settings/target",
  "slug": "events/onscroll/scrollobserver-settings/target",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-settings/target",
  "title": "target",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver settings",
    "target"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "container",
    "slug": "events/onscroll/scrollobserver-settings/container"
  },
  "next": {
    "title": "debug",
    "slug": "events/onscroll/scrollobserver-settings/debug"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# target

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-settings/target](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/target)
> Breadcrumb: Events → onScroll → ScrollObserver settings → target

Events

                          
              
                onScroll              
                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            target                                              
        

          
        Specifies which `HTMLElement` triggers the scroll event.

## Accepts

- CSS Selector

- DOM Element

## Defaults

- If defined on an animation, the first targeted `HTMLElement` of the animation.

- `null` if defined outside of an animation

## Related

- [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector)
- [DOM Element](https://animejs.com/documentation/animation/targets/dom-elements)

## Code example (js)

```js
import { createTimer, utils, onScroll } from 'animejs';

const [ $timer ] = utils.$('.timer');

createTimer({
  duration: 2000,
  alternate: true,
  loop: true,
  onUpdate: self => {
    $timer.innerHTML = self.iterationCurrentTime
  },
  autoplay: onScroll({
    target: $timer,
    container: '.scroll-container',
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
      <div class="large centered row">
        <pre class="large log row">
          <span class="label">timer</span>
          <span class="timer value lcd">0</span>
        </pre>
      </div>
    </div>
  </div>
</div>
```

## Code example (css)

```css
#scroll-scrollobserver-settings-target pre {
  left: 3rem;
  width: 12rem;
}
```

---

← Prev: **container** (`events/onscroll/scrollobserver-settings/container`) | Next: **debug** (`events/onscroll/scrollobserver-settings/debug`) →
