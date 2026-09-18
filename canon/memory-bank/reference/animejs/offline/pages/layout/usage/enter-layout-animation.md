---
{
  "order": 210,
  "section": "layout",
  "path": "usage/enter-layout-animation",
  "slug": "layout/usage/enter-layout-animation",
  "url": "https://animejs.com/documentation/layout/usage/enter-layout-animation",
  "title": "Enter layout animation",
  "breadcrumb": [
    "Layout",
    "Usage",
    "Enter layout animation"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "DOM order change animation",
    "slug": "layout/usage/dom-order-change-animation"
  },
  "next": {
    "title": "Exit layout animation",
    "slug": "layout/usage/exit-layout-animation"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Enter layout animation

> Source: [https://animejs.com/documentation/layout/usage/enter-layout-animation](https://animejs.com/documentation/layout/usage/enter-layout-animation)
> Breadcrumb: Layout → Usage → Enter layout animation

Layout

                          
              
                Usage              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            Enter layout animation                                              
        

          
        Automatically animates elements entering the layout, and optionally specifies initial properties and timings using the `enterFrom` state parameters (default opacity: 0).

## Code example (js)

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 250,
  ease: 'outQuad',
  enterFrom: {
    transform: 'translateY(100px) scale(.25)',
    opacity: 0,
    duration: 350, // Applied to the elements entering the layout
    ease: 'out(3)' // Applied to the elements entering the layout
  }
});

let count = 0;

function addItem() {
  layout.update(({ root }) => {
    const $item = document.createElement('div');
    $item.classList.add('item', 'col');
    $item.innerHTML = ++count;
    if (count > 15) return $button.disabled = true;
    root.appendChild($item);
  });
}

$button.addEventListener('click', addItem);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">

  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Add item</button>
  </fieldset>
</div>
```

---

← Prev: **DOM order change animation** (`layout/usage/dom-order-change-animation`) | Next: **Exit layout animation** (`layout/usage/exit-layout-animation`) →
