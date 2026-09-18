---
{
  "order": 214,
  "section": "layout",
  "path": "usage/swap-parent-animation",
  "slug": "layout/usage/swap-parent-animation",
  "url": "https://animejs.com/documentation/layout/usage/swap-parent-animation",
  "title": "Swap parent animation",
  "breadcrumb": [
    "Layout",
    "Usage",
    "Swap parent animation"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "Exit layout animation",
    "slug": "layout/usage/exit-layout-animation"
  },
  "next": {
    "title": "Modal dialog animation",
    "slug": "layout/usage/animate-modal-dialog"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# Swap parent animation

> Source: [https://animejs.com/documentation/layout/usage/swap-parent-animation](https://animejs.com/documentation/layout/usage/swap-parent-animation)
> Breadcrumb: Layout → Usage → Swap parent animation

Layout

                          
              
                Usage              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            Swap parent animation                                              
        

          
        Automatically animates children elements being moved from one parent to another.

## Code example (js)

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout');

function animateLayout() {
  layout.update(({ root }) => {
    const $child = root.querySelector('.item');
    const $parent = $child.parentElement;
    const $nextParent = $parent.nextElementSibling || $parent.previousElementSibling;
    $parent.style.zIndex = '0';
    $nextParent.style.zIndex = '1';
    $nextParent.appendChild($child);
  })
}

$button.addEventListener('click', animateLayout);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container container-a col grid-layout row">
    <div class="item col">Item A</div>
  </div>
  <div class="layout-container container-b col grid-layout row">
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Swap parent</button>
  </fieldset>
</div>
```

## Code example (css)

```css
#layout-usage-swap-parent-animation .container-b {
  flex: 2;
}
```

---

← Prev: **Exit layout animation** (`layout/usage/exit-layout-animation`) | Next: **Modal dialog animation** (`layout/usage/animate-modal-dialog`) →
