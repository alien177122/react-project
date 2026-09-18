---
{
  "order": 194,
  "section": "layout",
  "path": "layout-methods/update",
  "slug": "layout/layout-methods/update",
  "url": "https://animejs.com/documentation/layout/layout-methods/update",
  "title": "update()",
  "breadcrumb": [
    "Layout",
    "Layout methods",
    "update()"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "animate()",
    "slug": "layout/layout-methods/animate"
  },
  "next": {
    "title": "revert()",
    "slug": "layout/layout-methods/revert"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# update()

> Source: [https://animejs.com/documentation/layout/layout-methods/update](https://animejs.com/documentation/layout/layout-methods/update)
> Breadcrumb: Layout → Layout methods → update()

Layout

                          
              
                Methods              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            update()                                              
        

          
        One-call helper that runs `record()`, executes your DOM mutations, and calls `animate()` with optional overrides.

This might not work in some frameworks (I haven't tested all of them).

Use the manual `record()` / `.animate()` combo if the animation doesn't work with `.update()`.

## Parameters

- A callback `Function` to update the layout

- An optional `Object` of animation parameters to override default layout timing and easing for this specific transition.

## Returns

`Timeline`

## Code example (js)

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container');

function animateLayout() {
  // Triggers both layout.record() and layout.animate()
  layout.update(() => {
    const first = layout.root.firstElementChild;
    if (first) layout.root.append(first);  
  }, {
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
    <button class="button">update()</button>
  </fieldset>
</div>
```

---

← Prev: **animate()** (`layout/layout-methods/animate`) | Next: **revert()** (`layout/layout-methods/revert`) →
