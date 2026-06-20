---
{
  "order": 213,
  "section": "layout",
  "path": "usage/staggered-layout-animation",
  "slug": "layout/usage/staggered-layout-animation",
  "url": "https://animejs.com/documentation/layout/usage/staggered-layout-animation",
  "title": "Staggered layout animation",
  "breadcrumb": [
    "Layout",
    "Usage",
    "Staggered layout animation"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "CSS display property animation",
    "slug": "layout/usage/css-display-property-animation"
  },
  "next": {
    "title": "DOM order change animation",
    "slug": "layout/usage/dom-order-change-animation"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# Staggered layout animation

> Source: [https://animejs.com/documentation/layout/usage/staggered-layout-animation](https://animejs.com/documentation/layout/usage/staggered-layout-animation)
> Breadcrumb: Layout → Usage → Staggered layout animation

Layout

                          
              
                Usage              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            Staggered layout animation                                              
        

          
        The `AutoLayout` `delay` property accepts the `stagger()` utility method to easily create staggered animations of layout children changes.

## Code example (js)

```js
import { createLayout, utils, stagger } from 'animejs';

const [ $button ] = utils.$('.controls button');
const [ $root ] = utils.$('.layout-container');
const items = utils.$('.item');

const layout = createLayout($root, { ease: 'outExpo' });

function animateLayout() {
  layout.update(() => {
    $root.classList.toggle('row');
  }, {
    // Different stagger "from" param depending on the layout state
    delay: stagger(50, { from: $root.classList.contains('row') ? 'last' : 'first' })
  });
}

$button.addEventListener('click', animateLayout);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container">
    <div class="item col">Item A</div>
    <div class="item col">Item B</div>
    <div class="item col">Item C</div>
    <div class="item col">Item D</div>
    <div class="item col">Item E</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Stagger animation</button>
  </fieldset>
</div>
```

## Code example (css)

```css
#layout-usage-staggered-layout-animation .layout-container {
  overflow: scroll;
  flex-wrap: nowrap;
}

#layout-usage-staggered-layout-animation .layout-container .item {
  min-height: 2rem;
}
```

---

← Prev: **CSS display property animation** (`layout/usage/css-display-property-animation`) | Next: **DOM order change animation** (`layout/usage/dom-order-change-animation`) →
