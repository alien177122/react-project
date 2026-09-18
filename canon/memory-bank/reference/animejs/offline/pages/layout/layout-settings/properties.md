---
{
  "order": 201,
  "section": "layout",
  "path": "layout-settings/properties",
  "slug": "layout/layout-settings/properties",
  "url": "https://animejs.com/documentation/layout/layout-settings/properties",
  "title": "properties",
  "breadcrumb": [
    "Layout",
    "Settings",
    "properties"
  ],
  "since": "Since 4.3.0",
  "prev": {
    "title": "ease",
    "slug": "layout/layout-settings/ease"
  },
  "next": {
    "title": "States parameters",
    "slug": "layout/states-parameters"
  },
  "code_languages": [
    "js",
    "html",
    "css"
  ]
}
---

# properties

> Source: [https://animejs.com/documentation/layout/layout-settings/properties](https://animejs.com/documentation/layout/layout-settings/properties)
> Breadcrumb: Layout → Settings → properties

Layout

                          
              
                Settings              
                      

          
                        Since 4.3.0
                      

        
                

## 
          
            properties                                              
        

          
        Extends the list of CSS properties automatically measured and animated during layout transitions.

Position and dimensions are always handled internally. Use this to add custom properties like CSS variables or properties not included in the defaults.

## Accepts

- `Array` of CSS property name `String`s (including CSS custom properties like `'--my-var'`)

## Default

```js
[
  'opacity',
  'fontSize',
  'color',
  'backgroundColor',
  'borderRadius',
  'border',
  'filter',
  'clipPath'
]
```

## Code example (js)

```js
import { createLayout, utils } from 'animejs';

const [ $button ] = utils.$('.controls button');

const layout = createLayout('.layout-container', {
  duration: 800,
  properties: ['boxShadow']
});

function animateLayout() {
  layout.update(({ root }) => root.classList.toggle('row'));
}

$button.addEventListener('click', animateLayout);
```

## Code example (html)

```html
<div class="large layout centered row">
  <div class="layout-container grid-layout row">
    <div class="item col">animate</div>
    <div class="item col">box-shadow</div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Animate</button>
  </fieldset>
</div>
```

## Code example (css)

```css
#layout-layout-settings-properties .grid-layout .item {
  color: var(--hex-current-1);
  background-color: var(--hex-current-4);
  box-shadow: inset 0px 0px 6px var(--hex-current-1);
}

#layout-layout-settings-properties .grid-layout.row .item {
  box-shadow: inset 0px 0px 20px var(--hex-current-1);
}
```

---

← Prev: **ease** (`layout/layout-settings/ease`) | Next: **States parameters** (`layout/states-parameters`) →
