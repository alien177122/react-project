---
{
  "order": 203,
  "section": "layout",
  "path": "states-parameters/enterFrom",
  "slug": "layout/states-parameters/enterFrom",
  "url": "https://animejs.com/documentation/layout/states-parameters/enterFrom",
  "title": "enterFrom",
  "breadcrumb": [
    "Layout",
    "States parameters",
    "enterFrom"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "States parameters",
    "slug": "layout/states-parameters"
  },
  "next": {
    "title": "leaveTo",
    "slug": "layout/states-parameters/leaveTo"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# enterFrom

> Source: [https://animejs.com/documentation/layout/states-parameters/enterFrom](https://animejs.com/documentation/layout/states-parameters/enterFrom)
> Breadcrumb: Layout → States parameters → enterFrom

Layout

                          
              
                States              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            enterFrom                                              
        

          
        Defines the initial properties and transition timings applied to elements entering the layout.

An element is considered entering if one of these conditions is met:

- The element becomes visible from `display: none`

- The element becomes visible from `visibility: hidden`

- The element has just been added to the layout (e.g. `$root.appendChild($el)`)

## Accepted properties

Any valid CSS property can be set.

State animations don't support CSS transform shorthands yet.

```js
enterFrom: { x: 100, y: 200 } // Invalid
enterFrom: { transform: 'translate(100px, 200px)' } // Valid
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
  enterFrom: {
    transform: 'translateY(100px) scale(.25)',
    opacity: 0,
    duration: 350, // Applied to the elements entering the layout
    ease: 'out(3)' // Applied to the elements entering the layout
  }
});

let count = 0;

function addItem() {
  layout.update(({ root }) => {
    const $item = document.createElement('div');
    $item.classList.add('item', 'col');
    $item.innerHTML = ++count;
    if (count > 15) return $button.disabled = true;
    root.appendChild($item);
  });
}

$button.addEventListener('click', addItem);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">

  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Add item</button>
  </fieldset>
</div>
```

---

← Prev: **States parameters** (`layout/states-parameters`) | Next: **leaveTo** (`layout/states-parameters/leaveTo`) →
