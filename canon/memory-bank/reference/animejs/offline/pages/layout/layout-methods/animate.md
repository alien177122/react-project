---
{
  "order": 191,
  "section": "layout",
  "path": "layout-methods/animate",
  "slug": "layout/layout-methods/animate",
  "url": "https://animejs.com/documentation/layout/layout-methods/animate",
  "title": "animate()",
  "breadcrumb": [
    "Layout",
    "Layout methods",
    "animate()"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "record()",
    "slug": "layout/layout-methods/record"
  },
  "next": {
    "title": "update()",
    "slug": "layout/layout-methods/update"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# animate()

> Source: [https://animejs.com/documentation/layout/layout-methods/animate](https://animejs.com/documentation/layout/layout-methods/animate)
> Breadcrumb: Layout → Layout methods → animate()

Layout

                          
              
                Methods              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            animate()                                              
        

          
        Compares the last `record()` snapshot with the latest measurements and returns a `Timeline` that automatically animates every changed property between the two states.

## Accepts

An optional `Object` of animation parameters to override default layout timing and easing for this specific transition.

## Returns

`Timeline`

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
  layout.animate({
    duration: 750,
    ease: 'out(4)',
  });
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

← Prev: **record()** (`layout/layout-methods/record`) | Next: **update()** (`layout/layout-methods/update`) →
