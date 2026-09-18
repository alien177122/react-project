---
{
  "order": 212,
  "section": "layout",
  "path": "usage/specifying-a-root",
  "slug": "layout/usage/specifying-a-root",
  "url": "https://animejs.com/documentation/layout/usage/specifying-a-root",
  "title": "Specifying a root",
  "breadcrumb": [
    "Layout",
    "Usage",
    "Specifying a root"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "Usage",
    "slug": "layout/usage"
  },
  "next": {
    "title": "CSS display property animation",
    "slug": "layout/usage/css-display-property-animation"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# Specifying a root

> Source: [https://animejs.com/documentation/layout/usage/specifying-a-root](https://animejs.com/documentation/layout/usage/specifying-a-root)
> Breadcrumb: Layout → Usage → Specifying a root

Layout

                          
              
                Usage              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            Specifying a root                                              
        

          
        The root is the only mandatory parameter needed to create a layout.

It defines the root element measured by the layout, and limits all `children` queries to descendants of that element.

By default, all children of a layout are animated.

You can also target elements outside the root by manually defining layout id data attributes (see the modal example).

## Accepts

- CSS selector

- DOM element

## Default

Required

## Related

- [CSS selector](https://animejs.com/documentation/animation/targets/css-selector)
- [DOM element](https://animejs.com/documentation/animation/targets/dom-elements)

## Code example (js)

```js
import { createLayout, utils } from 'animejs';

const [ $rootA, $rootB ] = utils.$('.layout-container');
const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layoutA = createLayout($rootA);
const layoutB = createLayout($rootB);

function animateLayoutA() {
  layoutA.update(({ root }) => root.classList.toggle('row'));
}

function animateLayoutB() {
  layoutB.update(({ root }) => root.classList.toggle('row'));
}

$buttonA.addEventListener('click', animateLayoutA);
$buttonB.addEventListener('click', animateLayoutB);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">A 1</div>
    <div class="item col">A 2</div>
  </div>
  <div class="layout-container col grid-layout row">
    <div class="item col">B 1</div>
    <div class="item col">B 2</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate A</button>
    <button class="button">Animate B</button>
  </fieldset>
</div>
```

---

← Prev: **Usage** (`layout/usage`) | Next: **CSS display property animation** (`layout/usage/css-display-property-animation`) →
