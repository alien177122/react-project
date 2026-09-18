---
{
  "order": 193,
  "section": "layout",
  "path": "layout-methods/revert",
  "slug": "layout/layout-methods/revert",
  "url": "https://animejs.com/documentation/layout/layout-methods/revert",
  "title": "revert()",
  "breadcrumb": [
    "Layout",
    "Layout methods",
    "revert()"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "update()",
    "slug": "layout/layout-methods/update"
  },
  "next": {
    "title": "Layout id attribute",
    "slug": "layout/layout-id-attribute"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# revert()

> Source: [https://animejs.com/documentation/layout/layout-methods/revert](https://animejs.com/documentation/layout/layout-methods/revert)
> Breadcrumb: Layout → Layout methods → revert()

Layout

                          
              
                Methods              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            revert()                                              
        

          
        Completes all currently running layout animations, reverting the DOM to its actual current state.

## Returns

`AutoLayout`

## Code example (js)

```js
import { createLayout, utils } from 'animejs';

const [ $animate, $revert ] = utils.$('.controls button');

const layout = createLayout('.layout-container', { duration: 5000, ease: 'out(3)' });

function animateLayout() {
  layout.update(() => {
    const first = layout.root.firstElementChild;
    if (first) layout.root.append(first);
    $revert.disabled = false;
  }).then(() => $revert.disabled = true);
}

function revertLayout() {
  layout.revert();
}

$animate.addEventListener('click', animateLayout);
$revert.addEventListener('click', revertLayout);
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
    <button class="button">animate()</button>
    <button class="button" disabled>revert()</button>
  </fieldset>
</div>
```

---

← Prev: **update()** (`layout/layout-methods/update`) | Next: **Layout id attribute** (`layout/layout-id-attribute`) →
