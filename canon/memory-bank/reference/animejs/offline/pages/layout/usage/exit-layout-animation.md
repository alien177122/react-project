---
{
  "order": 211,
  "section": "layout",
  "path": "usage/exit-layout-animation",
  "slug": "layout/usage/exit-layout-animation",
  "url": "https://animejs.com/documentation/layout/usage/exit-layout-animation",
  "title": "Exit layout animation",
  "breadcrumb": [
    "Layout",
    "Usage",
    "Exit layout animation"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "Enter layout animation",
    "slug": "layout/usage/enter-layout-animation"
  },
  "next": {
    "title": "Swap parent animation",
    "slug": "layout/usage/swap-parent-animation"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# Exit layout animation

> Source: [https://animejs.com/documentation/layout/usage/exit-layout-animation](https://animejs.com/documentation/layout/usage/exit-layout-animation)
> Breadcrumb: Layout → Usage → Exit layout animation

Layout

                          
              
                Usage              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            Exit layout animation                                              
        

          
        Automatically animates elements leaving the layout, and optionally specifies their final properties and timings using the `leaveTo` state parameters (defaults to opacity: 0).

## Code example (js)

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 250,
  ease: 'outQuad',
  leaveTo: {
    transform: 'translateY(-100px) scale(.25)',
    opacity: 0,
    duration: 350, // Applied to the elements leaving the layout
    ease: 'out(3)' // Applied to the elements leaving the layout
  }
});

function removeItem() {
  layout.update(({ root }) => {
    const items = root.querySelectorAll('.item:not(.is-hidden)');
    if (!items.length) return $button.disabled = true;
    items[0].classList.add('is-hidden'); // temporarily hide the element using `display: none`
  }).then(() => {
    // Remove the elements from the DOM when the animation finishes
    layout.leaving.forEach($el => $el.remove());
  });
}

$button.addEventListener('click', removeItem);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">1</div>
    <div class="item col">2</div>
    <div class="item col">3</div>
    <div class="item col">4</div>
    <div class="item col">5</div>
    <div class="item col">6</div>
    <div class="item col">7</div>
    <div class="item col">8</div>
    <div class="item col">9</div>
    <div class="item col">10</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Remove item</button>
  </fieldset>
</div>
```

## Code example (css)

```css
#layout-usage-exit-layout-animation .is-hidden {
  display: none;
}
```

---

← Prev: **Enter layout animation** (`layout/usage/enter-layout-animation`) | Next: **Swap parent animation** (`layout/usage/swap-parent-animation`) →
