---
{
  "order": 209,
  "section": "layout",
  "path": "usage/dom-order-change-animation",
  "slug": "layout/usage/dom-order-change-animation",
  "url": "https://animejs.com/documentation/layout/usage/dom-order-change-animation",
  "title": "DOM order change animation",
  "breadcrumb": [
    "Layout",
    "Usage",
    "DOM order change animation"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "Staggered layout animation",
    "slug": "layout/usage/staggered-layout-animation"
  },
  "next": {
    "title": "Enter layout animation",
    "slug": "layout/usage/enter-layout-animation"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# DOM order change animation

> Source: [https://animejs.com/documentation/layout/usage/dom-order-change-animation](https://animejs.com/documentation/layout/usage/dom-order-change-animation)
> Breadcrumb: Layout → Usage → DOM order change animation

Layout

                          
              
                Usage              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            DOM order change animation                                              
        

          
        Automatically animates DOM order changes.

## Code example (js)

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  layout.update(({ root }) => {
    const items = [...root.querySelectorAll('.item')];
    utils.shuffle(items).forEach($el => root.appendChild($el))
  });
}

$button.addEventListener('click', animateLayout);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container row">
    <div class="item col">A</div>
    <div class="item col">B</div>
    <div class="item col">C</div>
    <div class="item col">D</div>
    <div class="item col">E</div>
    <div class="item col">F</div>
    <div class="item col">G</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Shuffle</button>
  </fieldset>
</div>
```

---

← Prev: **Staggered layout animation** (`layout/usage/staggered-layout-animation`) | Next: **Enter layout animation** (`layout/usage/enter-layout-animation`) →
