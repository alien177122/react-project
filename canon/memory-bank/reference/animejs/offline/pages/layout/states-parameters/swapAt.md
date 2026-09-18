---
{
  "order": 205,
  "section": "layout",
  "path": "states-parameters/swapAt",
  "slug": "layout/states-parameters/swapAt",
  "url": "https://animejs.com/documentation/layout/states-parameters/swapAt",
  "title": "swapAt",
  "breadcrumb": [
    "Layout",
    "States parameters",
    "swapAt"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "leaveTo",
    "slug": "layout/states-parameters/leaveTo"
  },
  "next": {
    "title": "Layout methods",
    "slug": "layout/layout-methods"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# swapAt

> Source: [https://animejs.com/documentation/layout/states-parameters/swapAt](https://animejs.com/documentation/layout/states-parameters/swapAt)
> Breadcrumb: Layout → States parameters → swapAt

Layout

                          
              
                States              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            swapAt                                              
        

          
        Defines the mid-transition properties applied to non-animated children of animated elements.

The animation interpolates to these values at 50% progress, then back to the element's computed state.

## Accepted properties

Any valid CSS property can be set.

State animations don't support CSS transform shorthands yet.

```js
swapAt: { scale: 1.2 } // Invalid
swapAt: { transform: 'scale(1.2)' } // Valid
```

## Accepts

An `Object` parameters with the following properties:

- CSS property names: `Number|String|Function`

- `delay`: `Number|Function`

- `duration`: `Number|Function`

- `ease`: `String|Function`

## Default

`{ opacity: 0, ease: 'inOut(1.75)' }`

## Code example (js)

```js
import { createLayout, utils } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  children: '.item',
  duration: 1000,
});

function animateLayout(swapAt) {
  layout.update(({ root }) => root.classList.toggle('row'), { swapAt });
}

const animateWithFade = () => animateLayout({ opacity: 0, filter: 'blur(3px)' });
const animateWithoutFade = () => animateLayout({ opacity: 1 });

$buttonA.addEventListener('click', animateWithFade);
$buttonB.addEventListener('click', animateWithoutFade);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col"><p>These p tags are not animated</p></div>
    <div class="item col"><p>They only swap at 50% progress</p></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate with fade</button>
    <button class="button">Animate without fade</button>
  </fieldset>
</div>
```

---

← Prev: **leaveTo** (`layout/states-parameters/leaveTo`) | Next: **Layout methods** (`layout/layout-methods`) →
