---
{
  "order": 192,
  "section": "layout",
  "path": "layout-methods/record",
  "slug": "layout/layout-methods/record",
  "url": "https://animejs.com/documentation/layout/layout-methods/record",
  "title": "record()",
  "breadcrumb": [
    "Layout",
    "Layout methods",
    "record()"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "Layout methods",
    "slug": "layout/layout-methods"
  },
  "next": {
    "title": "animate()",
    "slug": "layout/layout-methods/animate"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# record()

> Source: [https://animejs.com/documentation/layout/layout-methods/record](https://animejs.com/documentation/layout/layout-methods/record)
> Breadcrumb: Layout → Layout methods → record()

Layout

                          
              
                Methods              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            record()                                              
        

          
        Record a layout snapshot that will be used as the initial state of the next animation created with `animate()`.

## Returns

`AutoLayout`

## Code example (js)

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  // Record the current state of the layout
  layout.record();
  // Update the layout state
  const first = layout.root.firstElementChild;
  if (first) layout.root.append(first);
  // Animate to the new state
  layout.animate();
}

$button.addEventListener('click', animateLayout);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
    <div class="item col">Item 3</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">record() + animate()</button>
  </fieldset>
</div>
```

---

← Prev: **Layout methods** (`layout/layout-methods`) | Next: **animate()** (`layout/layout-methods/animate`) →
