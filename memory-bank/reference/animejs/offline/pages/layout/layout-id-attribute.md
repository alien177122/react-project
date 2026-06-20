---
{
  "order": 189,
  "section": "layout",
  "path": "layout-id-attribute",
  "slug": "layout/layout-id-attribute",
  "url": "https://animejs.com/documentation/layout/layout-id-attribute",
  "title": "Layout id attribute",
  "breadcrumb": [
    "Layout",
    "Layout id attribute"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "revert()",
    "slug": "layout/layout-methods/revert"
  },
  "next": {
    "title": "Layout callbacks",
    "slug": "layout/layout-callbacks"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# Layout id attribute

> Source: [https://animejs.com/documentation/layout/layout-id-attribute](https://animejs.com/documentation/layout/layout-id-attribute)
> Breadcrumb: Layout → Layout id attribute

Layout

                      

          
                        Since 4.3.0
                      

        
                

## 
          
            Layout id attribute                                              
        

          
        Layout ids are automatically assigned or can be manually defined using a `data-layout-id` attribute.

If two elements share the same id, and one of them is hidden (`display: none`, `visibility: hidden`) and the other one is visible, the layout will automatically animate between the two.

This is generally used when you want to create an animation between two elements in different parts of the DOM without having to clone or move them.

## Code example (js)

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');
const [ $itemA1, $itemA2 ] = utils.$('.item');

// Manually set the same layout id to both items
$itemA1.dataset.layoutId = "item-A";
$itemA2.dataset.layoutId = "item-A";

// Hide item 2
$itemA2.classList.add('is-hidden');

const layout = createLayout('.layout');

function animateLayout() {
  layout.update(({ root }) => {
    // Toggle the visibility and alternate between the two items
    $itemA1.classList.toggle('is-hidden');
    $itemA2.classList.toggle('is-hidden');
  });
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
    <div class="item col">Item A</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Toggle visibility</button>
  </fieldset>
</div>
```

## Code example (css)

```css
#layout-layout-id-attribute .item.is-hidden {
  display: none;
}
```

---

← Prev: **revert()** (`layout/layout-methods/revert`) | Next: **Layout callbacks** (`layout/layout-callbacks`) →
