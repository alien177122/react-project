---
{
  "order": 200,
  "section": "layout",
  "path": "layout-settings/ease",
  "slug": "layout/layout-settings/ease",
  "url": "https://animejs.com/documentation/layout/layout-settings/ease",
  "title": "ease",
  "breadcrumb": [
    "Layout",
    "Settings",
    "ease"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "duration",
    "slug": "layout/layout-settings/duration"
  },
  "next": {
    "title": "properties",
    "slug": "layout/layout-settings/properties"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# ease

> Source: [https://animejs.com/documentation/layout/layout-settings/ease](https://animejs.com/documentation/layout/layout-settings/ease)
> Breadcrumb: Layout → Settings → ease

Layout

                          
              
                Settings              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            ease                                              
        

          
        Sets the default easing curve or spring applied to every animation during a layout transition.

## Accepts

- An easing `Function`

- A built-in ease `String`

- A Function based value that returns an easing `Function` or a built-in ease `String`

## Default

`'inOut(3.5)'`

## Related

- [easing](https://animejs.com/documentation/easings)
- [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based)

## Code example (js)

```js
import { createLayout, utils, spring } from 'animejs';

const [ $buttonA, $buttonB ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  ease: 'outExpo'
});

function animateLayout(ease) {
  // You can override the layout default ease in the update() method parameters
  layout.update(({ root }) => root.classList.toggle('row'), { ease });
}

const animateWith500MsDelay = () => animateLayout();
const animateWithStaggerDelay = () => animateLayout(spring());

$buttonA.addEventListener('click', animateWith500MsDelay);
$buttonB.addEventListener('click', animateWithStaggerDelay);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col">Item 1</div>
    <div class="item col">Item 2</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">'outExpo'</button>
    <button class="button">spring()</button>
  </fieldset>
</div>
```

---

← Prev: **duration** (`layout/layout-settings/duration`) | Next: **properties** (`layout/layout-settings/properties`) →
