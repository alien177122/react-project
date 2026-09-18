---
{
  "order": 169,
  "section": "events",
  "path": "onscroll/scrollobserver-settings/repeat",
  "slug": "events/onscroll/scrollobserver-settings/repeat",
  "url": "https://animejs.com/documentation/events/onscroll/scrollobserver-settings/repeat",
  "title": "repeat",
  "breadcrumb": [
    "Events",
    "onScroll",
    "ScrollObserver settings",
    "repeat"
  ],
  "since": "Since 4.0.0",
  "prev": {
    "title": "axis",
    "slug": "events/onscroll/scrollobserver-settings/axis"
  },
  "next": {
    "title": "ScrollObserver thresholds",
    "slug": "events/onscroll/scrollobserver-thresholds"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# repeat

> Source: [https://animejs.com/documentation/events/onscroll/scrollobserver-settings/repeat](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/repeat)
> Breadcrumb: Events → onScroll → ScrollObserver settings → repeat

Events

                          
              
                onScroll              
                          
              
                Settings              
                      

          
                        Since 4.0.0
                      

        
                

## 
          
            repeat                                              
        

          
        Specifies if the scroll synchronisation should repeat after the linked object completes.

If the repeat property is set to `false`, the scrollContainer instance will be reverted.

## Accepts

`Boolean`

## Defaults

`true`

## Code example (js)

```js
import { createTimer, onScroll, utils } from 'animejs';

const [ $repeat ] = utils.$('.repeat .value');
const [ $noRepeat ] = utils.$('.no-repeat .value');

let repeatUpdates = 0;
let noRepeatUpdates = 0;

createTimer({
  duration: 1000,
  autoplay: onScroll({
    container: '.scroll-container',
    target: '.repeat',
    enter: 'bottom-=40 top',
    leave: 'top+=60 bottom',
    onUpdate: () => $repeat.innerHTML = repeatUpdates++,
    repeat: true,
    debug: true,
  })
});

createTimer({
  duration: 1000,
  autoplay: onScroll({
    container: '.scroll-container',
    target: '.no-repeat',
    enter: 'bottom-=40 top',
    leave: 'top+=60 bottom',
    onUpdate: () => $noRepeat.innerHTML = noRepeatUpdates++,
    repeat: false,
    debug: true,
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
        <pre class="repeat large log row">
          <span class="label">repeat upddates</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <pre class="no-repeat large log row">
          <span class="label">no repeat updates</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll up</div>
      </div>
    </div>
  </div>
</div>
```

---

← Prev: **axis** (`events/onscroll/scrollobserver-settings/axis`) | Next: **ScrollObserver thresholds** (`events/onscroll/scrollobserver-thresholds`) →
