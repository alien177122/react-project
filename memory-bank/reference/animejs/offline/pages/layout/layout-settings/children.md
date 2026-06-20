---
{
  "order": 197,
  "section": "layout",
  "path": "layout-settings/children",
  "slug": "layout/layout-settings/children",
  "url": "https://animejs.com/documentation/layout/layout-settings/children",
  "title": "children",
  "breadcrumb": [
    "Layout",
    "Settings",
    "children"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "Settings",
    "slug": "layout/layout-settings"
  },
  "next": {
    "title": "delay",
    "slug": "layout/layout-settings/delay"
  },
  "code_languages": [
    "js",
    "html"
  ]
}
---

# children

> Source: [https://animejs.com/documentation/layout/layout-settings/children](https://animejs.com/documentation/layout/layout-settings/children)
> Breadcrumb: Layout → Settings → children

Layout

                          
              
                Settings              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            children                                              
        

          
        Targets which elements of the root must have their position / dimensions and specified properties animated.

Descendants of specified children are considered "frozen", and only "swap" state at 50% of their parent transition.

This is mostly used when you don't want to animate elements containing text that reflows during a transition and can cause visual noise.

It's also used to target children elements that are not initially part of the layout root but added during the animation phase, in combination with the layout id data-attribute.

## Accepts

- CSS selector

- DOM element

- NodeList or `Array<DOMTargetSelector>`

## Default

`'*'`

## Related

- [CSS selector](https://animejs.com/documentation/animation/targets/css-selector)
- [DOM element](https://animejs.com/documentation/animation/targets/dom-elements)

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

const animateWithoutFade = () => animateLayout({ opacity: 1 });
const animateWithFade = () => animateLayout({ opacity: 0 });

$buttonA.addEventListener('click', animateWithoutFade);
$buttonB.addEventListener('click', animateWithFade);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container col grid-layout row">
    <div class="item col"><p>These p tags are not targeted</p></div>
    <div class="item col"><p>So they simply swap between states</p></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate without fade</button>
    <button class="button">Animate with fade</button>
  </fieldset>
</div>
```

---

← Prev: **Settings** (`layout/layout-settings`) | Next: **delay** (`layout/layout-settings/delay`) →
