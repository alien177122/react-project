---
{
  "order": 204,
  "section": "layout",
  "path": "states-parameters/leaveTo",
  "slug": "layout/states-parameters/leaveTo",
  "url": "https://animejs.com/documentation/layout/states-parameters/leaveTo",
  "title": "leaveTo",
  "breadcrumb": [
    "Layout",
    "States parameters",
    "leaveTo"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "enterFrom",
    "slug": "layout/states-parameters/enterFrom"
  },
  "next": {
    "title": "swapAt",
    "slug": "layout/states-parameters/swapAt"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# leaveTo

> Source: [https://animejs.com/documentation/layout/states-parameters/leaveTo](https://animejs.com/documentation/layout/states-parameters/leaveTo)
> Breadcrumb: Layout → States parameters → leaveTo

Layout

                          
              
                States              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            leaveTo                                              
        

          
        Defines the final properties and transition timings applied to elements leaving the layout.

An element is considered leaving if one of these conditions is met:

- The element becomes hidden with `display: none`

- The element becomes hidden with `visibility: hidden`

## Accepted properties

Any valid CSS property can be set.

State animations don't support CSS transform shorthands yet.

```js
leaveTo: { x: 100, y: 200 } // Invalid
leaveTo: { transform: 'translate(100px, 200px)' } // Valid
```

## Accepts

An `Object` parameters with the following properties:

- CSS property names: `Number|String|Function`

- `delay`: `Number|Function`

- `duration`: `Number|Function`

- `ease`: `String|Function`

## Default

`{ opacity: 0 }`

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
#layout-states-parameters-leaveTo .is-hidden {
  display: none;
}
```

---

← Prev: **enterFrom** (`layout/states-parameters/enterFrom`) | Next: **swapAt** (`layout/states-parameters/swapAt`) →
